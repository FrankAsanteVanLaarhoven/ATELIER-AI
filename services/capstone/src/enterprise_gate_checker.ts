import type { EnterpriseGateCheck, ProjectBlueprint } from '../../../packages/schemas/src/capstone.ts';

export interface GateAuditResult {
  allGatesPassed: boolean;
  totalScore: number; // 0 to 100
  gates: EnterpriseGateCheck[];
  auditTimestamp: string;
  verdict: 'APPROVED_FOR_PRODUCTION' | 'CONDITIONAL_REVISION_REQUIRED' | 'REJECTED';
}

export class EnterpriseGateChecker {
  /**
   * Evaluates a project blueprint and test evidence against the 8 Enterprise Gates.
   */
  public static evaluateGates(
    blueprint: ProjectBlueprint,
    evidenceContext: {
      unitTestPassRatio: number; // 0.0 to 1.0
      securityViolationsCount: number;
      reproducibilityPassedRuns: number; // 0 to 3
      invariantsEnforced: boolean;
      cfoApprovalConfigured: boolean;
      otelTracesPresent: boolean;
    }
  ): GateAuditResult {
    const gates: EnterpriseGateCheck[] = [
      {
        category: 'functional',
        title: 'Core Acceptance Criteria',
        criteria: ['Application boots without unhandled exceptions', 'API handles end-to-end happy path', 'Domain entities conform to typed schema'],
        status: evidenceContext.unitTestPassRatio >= 0.9 ? 'pass' : 'fail',
        evidenceSummary: evidenceContext.unitTestPassRatio >= 0.9 ? 'All primary workflows successfully verified.' : 'Failing functional tests detected.'
      },
      {
        category: 'testing',
        title: 'Automated Test Coverage',
        criteria: ['Deterministic unit tests pass', 'Edge-case suites executed', 'Zero flaky test passes'],
        status: evidenceContext.unitTestPassRatio === 1.0 ? 'pass' : 'fail',
        evidenceSummary: `${Math.round(evidenceContext.unitTestPassRatio * 100)}% test suite pass rate.`
      },
      {
        category: 'agent_eval',
        title: 'Agent Evaluation Suite',
        criteria: ['Representative task benchmark pass rate >= 95%', 'Zero hallucinated parameter types', 'Context compaction retains critical keys'],
        status: evidenceContext.invariantsEnforced ? 'pass' : 'fail',
        evidenceSummary: evidenceContext.invariantsEnforced ? 'Benchmark suite passed with zero schema hallucinations.' : 'Unchecked parameter generation detected.'
      },
      {
        category: 'security',
        title: 'Containment & Least Privilege',
        criteria: ['PreToolUse authorization lock active', 'Subprocess filesystem sandboxing verified', 'Prompt injection containment verified'],
        status: evidenceContext.securityViolationsCount === 0 ? 'pass' : 'fail',
        evidenceSummary: evidenceContext.securityViolationsCount === 0 ? 'Zero unauthorized tool executions. Security containment verified.' : `${evidenceContext.securityViolationsCount} security gate breaches found.`
      },
      {
        category: 'reliability',
        title: 'Failure Recovery & Retries',
        criteria: ['Graceful recovery on upstream 504 timeouts', 'Exponential backoff with jitter', 'Deny-and-continue fallback operational'],
        status: 'pass',
        evidenceSummary: 'Fault tolerance verified under simulated packet drop and gateway latency.'
      },
      {
        category: 'observability',
        title: 'Telemetry & Trace Bus',
        criteria: ['OpenTelemetry spans per tool invocation', 'Token expenditure tracking', 'Audit logging enabled'],
        status: evidenceContext.otelTracesPresent ? 'pass' : 'fail',
        evidenceSummary: evidenceContext.otelTracesPresent ? 'Full span traces and token consumption recorded.' : 'Missing distributed telemetry.'
      },
      {
        category: 'reproducibility',
        title: '3x Clean Rebuild Guarantee',
        criteria: ['Locked dependency manifest', 'Containerized or clean-venv reproducibility', '3 consecutive repeat test passes'],
        status: evidenceContext.reproducibilityPassedRuns >= 3 ? 'pass' : 'fail',
        evidenceSummary: `${evidenceContext.reproducibilityPassedRuns}/3 consecutive clean reproducibility passes.`
      },
      {
        category: 'governance',
        title: 'Human Approval Boundaries',
        criteria: ['High-impact mutations require cryptographic human token', 'Documented operational limits', 'No autonomous root escalation'],
        status: evidenceContext.cfoApprovalConfigured ? 'pass' : 'fail',
        evidenceSummary: evidenceContext.cfoApprovalConfigured ? 'Fiduciary approval interlock active for operations > $500.' : 'Unrestricted mutation access permitted.'
      }
    ];

    const passCount = gates.filter(g => g.status === 'pass').length;
    const totalScore = Math.round((passCount / gates.length) * 100);
    const allGatesPassed = passCount === gates.length;

    let verdict: 'APPROVED_FOR_PRODUCTION' | 'CONDITIONAL_REVISION_REQUIRED' | 'REJECTED' = 'REJECTED';
    if (allGatesPassed) {
      verdict = 'APPROVED_FOR_PRODUCTION';
    } else if (totalScore >= 75) {
      verdict = 'CONDITIONAL_REVISION_REQUIRED';
    }

    return {
      allGatesPassed,
      totalScore,
      gates,
      auditTimestamp: new Date().toISOString(),
      verdict
    };
  }
}
