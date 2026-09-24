import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  ToolPolicyRegistry,
  FinancialGate,
  SecurityInterceptors,
  ClaimsValidator,
} from '../src/index.ts';

describe('Deterministic Policy Engine (@atelier-ai/policy)', () => {
  const policyRegistry = new ToolPolicyRegistry();
  const financialGate = new FinancialGate();

  test('ToolPolicyRegistry authorizes read-only tools and gates consequential tools', () => {
    // Read-only tool
    const readDecision = policyRegistry.evaluateToolCall('read_file', { path: 'test.txt' });
    assert.equal(readDecision.allowed, true);
    assert.equal(readDecision.requiresHumanApproval, false);

    // Consequential tool without human approval -> blocked
    const execDecision = policyRegistry.evaluateToolCall('execute_command', { command: 'ls' });
    assert.equal(execDecision.allowed, false);
    assert.equal(execDecision.requiresHumanApproval, true);

    // Consequential tool with human approval and idempotency key -> allowed
    const approvedDecision = policyRegistry.evaluateToolCall(
      'execute_command',
      { command: 'ls' },
      { hasHumanApproval: true, idempotencyKey: 'cmd_12345' }
    );
    assert.equal(approvedDecision.allowed, true);
  });

  test('FinancialGate enforces $500 autonomous ceiling and requires dual signature', () => {
    financialGate.resetKeys();

    // 1. Transaction under $500 -> approved autonomously
    const underCeiling = financialGate.evaluateTransaction(
      {
        actionId: 'act_1',
        amount: 250.0,
        currency: 'USD',
        recipientId: 'rec_1',
        idempotencyKey: 'idemp_under_500',
        reason: 'Customer refund Tier 1',
      },
      { agentAuthorized: true }
    );
    assert.equal(underCeiling.approved, true);
    assert.equal(underCeiling.requiresDualSignature, false);
    assert.equal(underCeiling.transactionStatus, 'authorized');

    // 2. Transaction over $500 without CFO signature -> escalated for approval
    const overCeilingNoCfo = financialGate.evaluateTransaction(
      {
        actionId: 'act_2',
        amount: 1200.0,
        currency: 'USD',
        recipientId: 'rec_2',
        idempotencyKey: 'idemp_over_500_1',
        reason: 'Large SLA credit',
      },
      { agentAuthorized: true, cfoApproved: false }
    );
    assert.equal(overCeilingNoCfo.approved, false);
    assert.equal(overCeilingNoCfo.requiresDualSignature, true);
    assert.equal(overCeilingNoCfo.transactionStatus, 'escalated_for_approval');

    // 3. Transaction over $500 with CFO signature -> approved
    const overCeilingWithCfo = financialGate.evaluateTransaction(
      {
        actionId: 'act_3',
        amount: 1200.0,
        currency: 'USD',
        recipientId: 'rec_3',
        idempotencyKey: 'idemp_over_500_2',
        reason: 'Approved large SLA credit',
      },
      { agentAuthorized: true, cfoApproved: true }
    );
    assert.equal(overCeilingWithCfo.approved, true);

    // 4. Duplicate transaction key -> rejected
    const duplicate = financialGate.evaluateTransaction(
      {
        actionId: 'act_4',
        amount: 50.0,
        currency: 'USD',
        recipientId: 'rec_4',
        idempotencyKey: 'idemp_under_500', // Already used in act_1
        reason: 'Replay attempt',
      },
      { agentAuthorized: true }
    );
    assert.equal(duplicate.approved, false);
    assert.equal(duplicate.transactionStatus, 'rejected_invariant_violation');
  });

  test('SecurityInterceptors blocks directory traversal and prohibited CLI flags', () => {
    const baseDir = '/Users/favl/workspace/app';

    // Directory traversal attempt
    const traversal = SecurityInterceptors.validatePathContainment('../../etc/passwd', baseDir);
    assert.equal(traversal.allowed, false);
    assert.equal(traversal.violationReason?.includes('Path containment violation'), true);

    // Forbidden --dangerously-skip-permissions flag
    const badCommand = SecurityInterceptors.validateCommandSecurity('claude code --dangerously-skip-permissions');
    assert.equal(badCommand.allowed, false);
    assert.equal(badCommand.violationReason?.includes('Forbidden flag'), true);

    // Safe command
    const safeCommand = SecurityInterceptors.validateCommandSecurity('npm test');
    assert.equal(safeCommand.allowed, true);
  });

  test('ClaimsValidator detects prohibited marketing inflation phrases', () => {
    const inflatedCopy = 'Our candidates are officially ready and hold clearance voucher authorization.';
    const findings = ClaimsValidator.auditContent(inflatedCopy);
    assert.equal(findings.length, 2);
    assert.equal(findings[0].prohibitedPhrase, 'officially ready');
    assert.equal(findings[1].prohibitedPhrase, 'clearance voucher authorized');

    const cleanCopy = 'Candidates achieved readiness benchmark on the CCAR-F practice mock.';
    const cleanFindings = ClaimsValidator.auditContent(cleanCopy);
    assert.equal(cleanFindings.length, 0);
  });
});
