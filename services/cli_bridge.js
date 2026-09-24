#!/usr/bin/env node
/**
 * CLI Bridge between Python demo server and TypeScript services.
 */

import { BlueprintGenerator } from './capstone/src/blueprint_generator.ts';
import { ReproducibilityEngine } from './capstone/src/reproducibility_engine.ts';
import { EnterpriseGateChecker } from './capstone/src/enterprise_gate_checker.ts';
import { SandboxManager } from './lab_runtime/src/sandbox_manager.ts';
import { LAB_CATALOG } from './lab_runtime/src/lab_registry.ts';
import { AiCoachEngine } from './coach/src/ai_coach_engine.ts';
import { EvidenceLedger } from './evidence/src/evidence_ledger.ts';

const [,, cmd, ...args] = process.argv;

async function main() {
  try {
    if (cmd === 'generate-blueprint') {
      const payload = JSON.parse(args[0] || '{}');
      const bp = BlueprintGenerator.generateBlueprint(
        payload.learnerId || 'learner-001',
        payload.learnerName || 'Frank Van Laarhoven',
        payload.idea || 'Customer Intelligence Agent',
        payload.domainHint
      );
      console.log(JSON.stringify(bp));
    } else if (cmd === 'list-labs') {
      const labs = SandboxManager.listLabs();
      console.log(JSON.stringify(labs));
    } else if (cmd === 'get-lab') {
      const labId = args[0] || 'lab-1.1-reasoning-effort';
      const lab = SandboxManager.getLab(labId);
      const state = SandboxManager.getLabState(labId);
      console.log(JSON.stringify({ lab, state }));
    } else if (cmd === 'reset-lab') {
      const labId = args[0] || 'lab-1.1-reasoning-effort';
      const state = SandboxManager.resetLab(labId);
      console.log(JSON.stringify(state));
    } else if (cmd === 'run-tests') {
      const labId = args[0];
      const files = JSON.parse(args[1] || '{}');
      const results = await SandboxManager.runAcceptanceTests(labId, files);
      console.log(JSON.stringify(results));
    } else if (cmd === 'run-3x') {
      const labId = args[0];
      const files = JSON.parse(args[1] || '{}');
      const results = await SandboxManager.run3xReproducibility(labId, files);
      console.log(JSON.stringify(results));
    } else if (cmd === 'inject-failure') {
      const labId = args[0];
      const vectorId = args[1];
      const res = SandboxManager.injectFailure(labId, vectorId);
      console.log(JSON.stringify(res));
    } else if (cmd === 'request-hint') {
      const payload = JSON.parse(args[0] || '{}');
      const hint = AiCoachEngine.requestHint(payload.learnerId || 'learner-001', payload);
      console.log(JSON.stringify(hint));
    } else if (cmd === 'evaluate-gates') {
      const payload = JSON.parse(args[0] || '{}');
      const bp = payload.blueprint || BlueprintGenerator.generateBlueprint('learner-001', 'Frank', 'Customer complaints');
      const res = EnterpriseGateChecker.evaluateGates(bp, payload.evidenceContext || {
        unitTestPassRatio: 1.0,
        securityViolationsCount: 0,
        reproducibilityPassedRuns: 3,
        invariantsEnforced: true,
        cfoApprovalConfigured: true,
        otelTracesPresent: true
      });
      console.log(JSON.stringify(res));
    } else if (cmd === 'get-portfolio') {
      const payload = JSON.parse(args[0] || '{}');
      const bp = payload.blueprint || BlueprintGenerator.generateBlueprint('learner-001', 'Frank', 'Customer complaints');
      const portfolio = EvidenceLedger.buildPortfolio(
        payload.learnerName || 'Frank Van Laarhoven',
        payload.learnerRole || 'Enterprise AI Architect',
        bp,
        payload.independenceRate || 94
      );
      console.log(JSON.stringify(portfolio));
    } else {
      console.log(JSON.stringify({ error: `Unknown command: ${cmd}` }));
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
