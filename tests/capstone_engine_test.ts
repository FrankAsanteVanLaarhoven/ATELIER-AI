import test from 'node:test';
import assert from 'node:assert';
import { BlueprintGenerator } from '../services/capstone/src/blueprint_generator.ts';
import { ReproducibilityEngine } from '../services/capstone/src/reproducibility_engine.ts';
import { EnterpriseGateChecker } from '../services/capstone/src/enterprise_gate_checker.ts';
import { SandboxManager } from '../services/lab_runtime/src/sandbox_manager.ts';
import { AiCoachEngine } from '../services/coach/src/ai_coach_engine.ts';
import { EvidenceLedger } from '../services/evidence/src/evidence_ledger.ts';

test('Capstone Engine: generates structured project blueprint from natural language idea', () => {
  const blueprint = BlueprintGenerator.generateBlueprint(
    'learner-001',
    'Frank Van Laarhoven',
    'I want an AI customer complaint router that classifies tickets and alerts human managers on urgent ones'
  );

  assert.strictEqual(blueprint.domain, 'customer_intelligence');
  assert.ok(blueprint.title.includes('Customer Intelligence'));
  assert.ok(blueprint.requiredCapabilities.length >= 8);
  assert.ok(blueprint.milestones.length >= 6);
  assert.ok(blueprint.enterpriseGates.length === 8);
  assert.strictEqual(blueprint.progressPercent, 12);
});

test('Capstone Engine: handles fintech and robotics domains accurately', () => {
  const finops = BlueprintGenerator.generateBlueprint('learner-002', 'Alice', 'autonomous cloud finops spend auditor');
  assert.strictEqual(finops.domain, 'finops_orchestration');
  assert.ok(finops.title.includes('FinOps'));

  const robotics = BlueprintGenerator.generateBlueprint('learner-003', 'Bob', 'industrial wiring harness cad router');
  assert.strictEqual(robotics.domain, 'autonomous_robotics');
});

test('Reproducibility Engine: executes 3x repeat verification loop and yields atelier.yaml', async () => {
  const result = await ReproducibilityEngine.execute3xReproducibilityLoop(
    'customer-intelligence-agent',
    async (attempt) => ({
      passed: true,
      testsTotal: 24,
      testsPassed: 24,
      logs: `Attempt ${attempt} passed cleanly`
    })
  );

  assert.strictEqual(result.allAttemptsPassed, true);
  assert.strictEqual(result.attempts.length, 3);
  assert.ok(result.auditSignature.length > 20);

  const yaml = ReproducibilityEngine.toAtelierYaml(result.manifest);
  assert.ok(yaml.includes('atelier_project:'));
  assert.ok(yaml.includes('repeat_runs: "3/3 PASS"'));
});

test('Enterprise Gate Checker: evaluates 8 gates and assigns appropriate verdict', () => {
  const blueprint = BlueprintGenerator.generateBlueprint('learner-001', 'Frank', 'customer complaints');
  const passingAudit = EnterpriseGateChecker.evaluateGates(blueprint, {
    unitTestPassRatio: 1.0,
    securityViolationsCount: 0,
    reproducibilityPassedRuns: 3,
    invariantsEnforced: true,
    cfoApprovalConfigured: true,
    otelTracesPresent: true
  });

  assert.strictEqual(passingAudit.allGatesPassed, true);
  assert.strictEqual(passingAudit.verdict, 'APPROVED_FOR_PRODUCTION');
  assert.strictEqual(passingAudit.totalScore, 100);

  const failingAudit = EnterpriseGateChecker.evaluateGates(blueprint, {
    unitTestPassRatio: 0.7,
    securityViolationsCount: 2,
    reproducibilityPassedRuns: 1,
    invariantsEnforced: false,
    cfoApprovalConfigured: false,
    otelTracesPresent: false
  });

  assert.strictEqual(failingAudit.allGatesPassed, false);
  assert.notStrictEqual(failingAudit.verdict, 'APPROVED_FOR_PRODUCTION');
});

test('Sandbox Manager: loads labs, resets state, and injects controlled failure', async () => {
  const lab = SandboxManager.getLab('lab-1.1-reasoning-effort');
  assert.ok(lab !== undefined);
  assert.strictEqual(lab?.level, 'L1');

  const cleanState = SandboxManager.resetLab('lab-1.1-reasoning-effort');
  assert.strictEqual(cleanState.activeStep, 1);
  assert.ok('src/order_matcher.ts' in cleanState.modifiedFiles);

  // Run test on uncorrected code
  const initialTest = await SandboxManager.runAcceptanceTests('lab-1.1-reasoning-effort', cleanState.modifiedFiles);
  assert.strictEqual(initialTest.allPassed, false); // initial bug should fail

  // Fix code
  const fixedFiles = {
    ...cleanState.modifiedFiles,
    'src/order_matcher.ts': `export function matchLimitOrders(bids: number[], asks: number[]) {
      const sortedBids = [...bids].sort((a,b) => b-a);
      const sortedAsks = [...asks].sort((a,b) => a-b);
      const EPSILON = 1e-9;
      return { matched: 1, spread: 0 };
    }`
  };

  const fixedTest = await SandboxManager.runAcceptanceTests('lab-1.1-reasoning-effort', fixedFiles);
  assert.strictEqual(fixedTest.allPassed, true);

  // 3x Reproducibility
  const repro = await SandboxManager.run3xReproducibility('lab-1.1-reasoning-effort', fixedFiles);
  assert.strictEqual(repro.allPassed, true);
  assert.strictEqual(repro.attempts.length, 3);

  // Inject failure
  const fault = SandboxManager.injectFailure('lab-1.1-reasoning-effort', 'fv-effort-timeout');
  assert.ok(fault.failure.length > 0);
  assert.ok(fault.remedyHint.length > 0);
});

test('AI Coach Engine: serves progressive assistance ladder and tracks independence score', () => {
  const learnerId = 'learner-test-01';
  
  // Tier 1 Hint
  const hint1 = AiCoachEngine.requestHint(learnerId, {
    labId: 'lab-1.1-reasoning-effort',
    stepNumber: 1,
    currentFiles: {},
    requestedTier: 1
  });
  assert.strictEqual(hint1.tierServed, 1);
  assert.ok(hint1.hintContent.length > 10);
  assert.ok(hint1.remainingIndependenceScore < 100);

  // Tier 4 Hint
  const hint4 = AiCoachEngine.requestHint(learnerId, {
    labId: 'lab-1.1-reasoning-effort',
    stepNumber: 2,
    currentFiles: {},
    requestedTier: 4
  });
  assert.strictEqual(hint4.tierServed, 4);
  assert.ok(hint4.remainingIndependenceScore < hint1.remainingIndependenceScore);
});

test('Evidence Ledger: records immutable records and builds shareable portfolio', () => {
  const record = EvidenceLedger.recordEvidence({
    learnerId: 'learner-001',
    projectId: 'proj-cust-intel',
    labId: 'lab-1.1-reasoning-effort',
    capabilityId: 'cap-01',
    level: 'L1',
    type: 'reproducibility_3x_pass',
    summary: 'Passed 3x clean reproducibility loop for Reasoning Effort Lab',
    details: {
      testsPassed: 2,
      testsTotal: 2,
      reproducibilityHash: 'abcd1234ef5678',
      independenceScore: 92,
      coachTierMaxUsed: 2,
      durationSeconds: 120
    }
  });

  assert.ok(record.id.startsWith('ev-'));
  assert.ok(record.cryptographicSignature.length === 64);

  const blueprint = BlueprintGenerator.generateBlueprint('learner-001', 'Frank', 'Customer intelligence agent');
  const portfolio = EvidenceLedger.buildPortfolio('Frank Van Laarhoven', 'Enterprise AI Architect', blueprint, 92);

  assert.ok(portfolio.portfolioId.startsWith('port-'));
  assert.strictEqual(portfolio.metrics.verifiedIndependentBuildRate, 92);
  assert.ok(portfolio.verificationUrl.includes('https://atelier.ai/verify/portfolio/'));
  assert.ok(portfolio.masteredCapabilities.length >= 2);
});
