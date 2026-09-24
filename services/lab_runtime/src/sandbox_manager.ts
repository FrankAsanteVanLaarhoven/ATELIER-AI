import * as crypto from 'crypto';
import { LAB_CATALOG } from './lab_registry.ts';
import type { LabSpec, LabExecutionState, TestRunResult, ReproducibilityAttempt } from '../../../packages/schemas/src/lab.ts';

const ID_ALIASES: Record<string, string> = {
  'L1.1': 'lab-1.1-reasoning-effort',
  'L1.2': 'lab-1.2-claudemd-ab',
  'L2.2': 'lab-2.2-executable-skills',
  'L2.3': 'lab-2.3-lifecycle-hooks',
  'L4.1': 'lab-4.1-tool-search',
  'L5.1': 'lab-5.1-auto-mode-deny-continue',
};

function resolveLabId(id: string): string {
  return ID_ALIASES[id] || id;
}

function normalizeFiles(files: any): Record<string, string> {
  if (Array.isArray(files)) {
    const map: Record<string, string> = {};
    for (const f of files) {
      if (f && f.path) {
        map[f.path] = f.content || '';
      }
    }
    return map;
  }
  return files || {};
}

export class SandboxManager {
  private static states: Map<string, LabExecutionState> = new Map();

  public static getLab(labId: string): LabSpec | undefined {
    const canonical = resolveLabId(labId);
    return LAB_CATALOG.find(l => l.id === canonical || l.id === labId);
  }

  public static listLabs(): Array<{ id: string; alias: string; level: string; title: string; subtitle: string; minutes: number }> {
    const reverseAliases: Record<string, string> = {};
    for (const [alias, id] of Object.entries(ID_ALIASES)) {
      reverseAliases[id] = alias;
    }

    return LAB_CATALOG.map(l => ({
      id: l.id,
      alias: reverseAliases[l.id] || l.level,
      level: l.level,
      title: l.title,
      subtitle: l.subtitle,
      minutes: l.estimatedMinutes
    }));
  }

  /**
   * Resets the lab to clean starter state.
   */
  public static resetLab(labId: string): LabExecutionState {
    const canonical = resolveLabId(labId);
    const lab = this.getLab(canonical);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const starterFiles: Record<string, string> = {};
    for (const f of lab.starterRepo.files) {
      starterFiles[f.path] = f.content;
    }

    const state: LabExecutionState = {
      labId: canonical,
      activeStep: 1,
      modifiedFiles: starterFiles,
      historyCommands: [
        { time: new Date().toLocaleTimeString(), cmd: 'claude init --lab ' + canonical, output: 'Environment restored to starter state. Acceptance tests armed.', exitCode: 0 }
      ],
      reproducibilityAttempts: [],
      hintsUsedCount: 0,
      completed: false
    };

    this.states.set(canonical, state);
    if (labId !== canonical) {
      this.states.set(labId, state);
    }
    return state;
  }

  public static getLabState(labId: string): LabExecutionState {
    const canonical = resolveLabId(labId);
    let state = this.states.get(canonical);
    if (!state) {
      state = this.resetLab(canonical);
    }
    return state;
  }

  /**
   * Executes deterministic acceptance tests against the current modified files.
   */
  public static async runAcceptanceTests(
    labId: string,
    files: any
  ): Promise<{ allPassed: boolean; tests: TestRunResult[]; totalDurationMs: number }> {
    const canonical = resolveLabId(labId);
    const lab = this.getLab(canonical);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const fileMap = normalizeFiles(files);
    const results: TestRunResult[] = [];
    const startTime = Date.now();

    for (const test of lab.acceptanceTests) {
      const testStart = Date.now();
      let passed = true;
      let output = 'Test executed cleanly.';

      // Evaluation logic based on file contents
      if (canonical === 'lab-1.1-reasoning-effort') {
        const orderMatcher = fileMap['src/order_matcher.ts'] || '';
        if (!orderMatcher.includes('.sort(') || !orderMatcher.includes('EPSILON')) {
          passed = false;
          output = 'FAIL: Floating point precision inversion undetected. Unsorted order book.';
        } else {
          output = test.deterministicExpectation;
        }
      } else if (canonical === 'lab-1.2-claudemd-ab') {
        const claudemd = fileMap['CLAUDE.md'] || '';
        if (test.id === 't-claudemd-1') {
          passed = claudemd.includes('Zod') || claudemd.includes('schema') || claudemd.includes('Schema');
          output = passed ? test.deterministicExpectation : 'FAIL: CLAUDE.md missing Zod schema rule';
        } else if (test.id === 't-claudemd-2') {
          passed = claudemd.includes('FORBIDDEN') || claudemd.includes('Forbidden');
          output = passed ? test.deterministicExpectation : 'FAIL: Missing forbidden operations section';
        }
      } else if (canonical === 'lab-2.2-executable-skills') {
        const script = fileMap['.claude/skills/electrical-derating/scripts/calc_derating.py'] || '';
        if (test.id === 't-skill-1') {
          passed = script.includes('calculate_thermal_derating') || script.includes('calc_derating') || script.includes('DERATED_MAX_AMPS');
          output = passed ? test.deterministicExpectation : 'FAIL: Missing derating calculation implementation';
        } else {
          passed = true;
          output = test.deterministicExpectation;
        }
      } else if (canonical === 'lab-2.3-lifecycle-hooks') {
        const preHook = fileMap['.claude/hooks/PreToolUse.ts'] || '';
        if (test.id === 't-hook-1') {
          passed = preHook.includes('500') && (preHook.includes('cfo') || preHook.includes('token') || preHook.includes('signature') || preHook.includes('Signature'));
          output = passed ? test.deterministicExpectation : 'FAIL: Payout > $500 executed without CFO token gate';
        } else {
          passed = true;
          output = test.deterministicExpectation;
        }
      } else if (canonical === 'lab-4.1-tool-search') {
        const toolSearch = fileMap['src/tool_search.ts'] || '';
        if (test.id === 't-ts-1') {
          passed = toolSearch.includes('searchTools') || toolSearch.includes('DynamicToolSearchGateway');
          output = passed ? test.deterministicExpectation : 'FAIL: Dynamic tool search engine missing';
        } else {
          passed = true;
          output = test.deterministicExpectation;
        }
      } else if (canonical === 'lab-5.1-auto-mode-deny-continue') {
        const agentLoop = fileMap['src/agent_loop.ts'] || '';
        if (test.id === 't-auto-1') {
          passed = agentLoop.includes('classifyRisk') && (agentLoop.includes('PROHIBITED') || agentLoop.includes('id_rsa'));
          output = passed ? test.deterministicExpectation : 'FAIL: Prompt injection screening missing';
        } else {
          passed = true;
          output = test.deterministicExpectation;
        }
      } else {
        passed = true;
        output = test.deterministicExpectation;
      }

      results.push({
        testId: test.id,
        name: test.name,
        passed,
        output,
        durationMs: Date.now() - testStart
      });
    }

    const allPassed = results.every(r => r.passed);
    const state = this.getLabState(canonical);
    state.modifiedFiles = { ...state.modifiedFiles, ...fileMap };
    state.lastTestResults = {
      allPassed,
      tests: results,
      totalDurationMs: Date.now() - startTime
    };

    if (allPassed) {
      state.completed = true;
    }

    return state.lastTestResults;
  }

  /**
   * Executes 3x reproducibility repeat loop.
   */
  public static async run3xReproducibility(
    labId: string,
    files: any
  ): Promise<{ attempts: ReproducibilityAttempt[]; allPassed: boolean; auditDigest: string }> {
    const canonical = resolveLabId(labId);
    const attempts: ReproducibilityAttempt[] = [];
    let allPassed = true;

    for (let i = 1; i <= 3; i++) {
      const run = await this.runAcceptanceTests(canonical, files);
      const passedCount = run.tests.filter(t => t.passed).length;
      if (!run.allPassed) allPassed = false;

      const hash = crypto
        .createHash('sha256')
        .update(`${canonical}-run-${i}-${passedCount}/${run.tests.length}-${run.allPassed}`)
        .digest('hex');

      attempts.push({
        attemptNumber: i,
        timestamp: new Date().toISOString(),
        passed: run.allPassed,
        testsTotal: run.tests.length,
        testsPassed: passedCount,
        durationMs: run.totalDurationMs,
        hash
      });
    }

    const state = this.getLabState(canonical);
    state.reproducibilityAttempts = attempts;

    const auditDigest = crypto
      .createHash('sha256')
      .update(attempts.map(a => a.hash).join('|'))
      .digest('hex');

    return { attempts, allPassed, auditDigest };
  }

  /**
   * Injects an intentional failure vector into the lab environment (Break It -> Fix It -> Harden It).
   */
  public static injectFailure(labId: string, vectorId: string): { state: LabExecutionState; failure: string; remedyHint: string } {
    const canonical = resolveLabId(labId);
    const lab = this.getLab(canonical);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const vector = lab.failureVectors.find(v => v.id === vectorId) || lab.failureVectors[0];
    const state = this.getLabState(canonical);
    state.activeFailureInjection = vector.id;

    state.historyCommands.push({
      time: new Date().toLocaleTimeString(),
      cmd: `[FAULT INJECTION] ${vector.name}`,
      output: `SIMULATED FAILURE ACTIVATED: ${vector.injectedBehavior}. Trigger: ${vector.trigger}`,
      exitCode: 1
    });

    return {
      state,
      failure: vector.injectedBehavior,
      remedyHint: vector.remedyHint
    };
  }
}
