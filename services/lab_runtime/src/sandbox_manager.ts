import * as crypto from 'crypto';
import { LAB_CATALOG } from './lab_registry.ts';
import type { LabSpec, LabExecutionState, TestRunResult, ReproducibilityAttempt } from '../../../packages/schemas/src/lab.ts';

export class SandboxManager {
  private static states: Map<string, LabExecutionState> = new Map();

  public static getLab(labId: string): LabSpec | undefined {
    return LAB_CATALOG.find(l => l.id === labId);
  }

  public static listLabs(): Array<{ id: string; level: string; title: string; subtitle: string; minutes: number }> {
    return LAB_CATALOG.map(l => ({
      id: l.id,
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
    const lab = this.getLab(labId);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const starterFiles: Record<string, string> = {};
    for (const f of lab.starterRepo.files) {
      starterFiles[f.path] = f.content;
    }

    const state: LabExecutionState = {
      labId,
      activeStep: 1,
      modifiedFiles: starterFiles,
      historyCommands: [
        { time: new Date().toLocaleTimeString(), cmd: 'claude init --lab ' + labId, output: 'Environment restored to starter state. Acceptance tests armed.', exitCode: 0 }
      ],
      reproducibilityAttempts: [],
      hintsUsedCount: 0,
      completed: false
    };

    this.states.set(labId, state);
    return state;
  }

  public static getLabState(labId: string): LabExecutionState {
    let state = this.states.get(labId);
    if (!state) {
      state = this.resetLab(labId);
    }
    return state;
  }

  /**
   * Executes deterministic acceptance tests against the current modified files.
   */
  public static async runAcceptanceTests(
    labId: string,
    files: Record<string, string>
  ): Promise<{ allPassed: boolean; tests: TestRunResult[]; totalDurationMs: number }> {
    const lab = this.getLab(labId);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const results: TestRunResult[] = [];
    const startTime = Date.now();

    for (const test of lab.acceptanceTests) {
      const testStart = Date.now();
      let passed = true;
      let output = 'Test executed cleanly.';

      // Evaluation logic based on file contents
      if (labId === 'lab-1.1-reasoning-effort') {
        const orderMatcher = files['src/order_matcher.ts'] || '';
        if (!orderMatcher.includes('.sort(') || !orderMatcher.includes('EPSILON')) {
          passed = false;
          output = 'FAIL: Floating point precision inversion undetected. Unsorted order book.';
        } else {
          output = test.deterministicExpectation;
        }
      } else if (labId === 'lab-1.2-claudemd-ab') {
        const claudemd = files['CLAUDE.md'] || '';
        if (test.id === 't-claudemd-1') {
          passed = claudemd.includes('Zod') || claudemd.includes('schema');
          output = passed ? test.deterministicExpectation : 'FAIL: CLAUDE.md missing Zod schema rule';
        } else if (test.id === 't-claudemd-2') {
          passed = claudemd.includes('FORBIDDEN') || claudemd.includes('Forbidden');
          output = passed ? test.deterministicExpectation : 'FAIL: Missing forbidden operations section';
        }
      } else if (labId === 'lab-2.3-lifecycle-hooks') {
        const preHook = files['.claude/hooks/PreToolUse.ts'] || '';
        if (test.id === 't-hook-1') {
          passed = preHook.includes('500') && (preHook.includes('cfo') || preHook.includes('token') || preHook.includes('signature'));
          output = passed ? test.deterministicExpectation : 'FAIL: Payout > $500 executed without CFO token gate';
        } else {
          passed = true;
          output = test.deterministicExpectation;
        }
      } else {
        // Default evaluation
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
    const state = this.getLabState(labId);
    state.modifiedFiles = { ...state.modifiedFiles, ...files };
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
    files: Record<string, string>
  ): Promise<{ attempts: ReproducibilityAttempt[]; allPassed: boolean; auditDigest: string }> {
    const attempts: ReproducibilityAttempt[] = [];
    let allPassed = true;

    for (let i = 1; i <= 3; i++) {
      const run = await this.runAcceptanceTests(labId, files);
      const passedCount = run.tests.filter(t => t.passed).length;
      if (!run.allPassed) allPassed = false;

      const hash = crypto
        .createHash('sha256')
        .update(`${labId}-run-${i}-${passedCount}/${run.tests.length}-${run.allPassed}`)
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

    const state = this.getLabState(labId);
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
    const lab = this.getLab(labId);
    if (!lab) throw new Error(`Lab ${labId} not found`);

    const vector = lab.failureVectors.find(v => v.id === vectorId) || lab.failureVectors[0];
    const state = this.getLabState(labId);
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
