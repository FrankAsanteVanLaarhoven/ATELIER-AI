import { COACH_TIERS } from '../../../packages/schemas/src/coach.ts';
import type { CoachTier, CoachPromptRequest, CoachAdviceResponse, LearnerIndependenceRecord } from '../../../packages/schemas/src/coach.ts';
import { LAB_CATALOG } from '../../lab_runtime/src/lab_registry.ts';

export class AiCoachEngine {
  private static learnerRecords: Map<string, LearnerIndependenceRecord> = new Map();

  public static getLearnerRecord(learnerId: string): LearnerIndependenceRecord {
    let rec = this.learnerRecords.get(learnerId);
    if (!rec) {
      rec = {
        learnerId,
        verifiedIndependentBuildRate: 100, // Starts at 100% until hints are consumed
        totalHintsRequested: 0,
        hintsByTier: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
        repairAfterFailureRate: 100,
        assistanceDependencyTrend: 'decreasing'
      };
      this.learnerRecords.set(learnerId, rec);
    }
    return rec;
  }

  /**
   * Generates a progressive diagnostic assistance response tailored to the learner's current tier request.
   */
  public static requestHint(learnerId: string, req: CoachPromptRequest): CoachAdviceResponse {
    const lab = LAB_CATALOG.find(l => l.id === req.labId);
    const tierMeta = COACH_TIERS[req.requestedTier] || COACH_TIERS[1];
    const rec = this.getLearnerRecord(learnerId);

    // Update telemetry
    rec.totalHintsRequested++;
    rec.hintsByTier[req.requestedTier] = (rec.hintsByTier[req.requestedTier] || 0) + 1;

    // Deduct penalty from independence score
    const penalty = tierMeta.independencePenaltyPercent;
    rec.verifiedIndependentBuildRate = Math.max(10, rec.verifiedIndependentBuildRate - (penalty * 0.15));

    let hintContent = '';
    let suggestedAction = '';
    let docsRef = 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code';

    if (req.requestedTier === 0) {
      hintContent = 'AI Coach observing in stealth mode. No assistance provided. You are working completely independently.';
      suggestedAction = 'Inspect the current error log or acceptance test failure and propose a thesis.';
    } else if (req.requestedTier === 1) {
      hintContent = `Conceptual Overview: ${lab?.objective || 'Review the core invariant contract for this capability.'}`;
      suggestedAction = 'Re-read the problem statement and identify which component holds authority.';
    } else if (req.requestedTier === 2) {
      hintContent = `Target Claude Capability: Look into Claude Code "${lab?.title || 'capabilities'}" and configuration hooks.`;
      suggestedAction = 'Search the documentation for how Claude intercepts and validates tool executions.';
    } else if (req.requestedTier === 3) {
      hintContent = `Architectural Blueprint: Structure your solution in 3 layers: 1) Invariant Interceptor, 2) Execution Engine, 3) Telemetry Recorder.`;
      suggestedAction = 'Ensure the security check executes BEFORE any mutation occurs.';
    } else if (req.requestedTier === 4) {
      hintContent = `Configuration Hint: Use standard hook signature: export async function preToolUse(toolCall) { if (...) return { allow: false }; }`;
      suggestedAction = 'Add the condition check to the hook file in your workspace.';
    } else if (req.requestedTier === 5) {
      hintContent = `Partial Scaffold:
if (call.name === 'target_tool' && call.params.amount > 500) {
  // TODO: Check approval token
  if (!call.params.token) return { allow: false, reason: 'POLICY_VIOLATION' };
}`;
      suggestedAction = 'Fill in the remaining token verification logic.';
    } else if (req.requestedTier === 6) {
      hintContent = `Guided Diagnostic: Your previous attempt failed because: ${req.lastError || 'Input validation returned an unhandled error'}. The model tried to perform an unverified write.`;
      suggestedAction = 'Wrap the check in a try/catch and enforce fail-closed security.';
    } else if (req.requestedTier === 7) {
      const ref = lab?.referenceSolution;
      hintContent = `Reference Solution Explanation:
${ref?.explanation || 'Full verified reference pattern.'}

Code:
${ref?.files.map(f => `// ${f.path}\n${f.content}`).join('\n\n') || '// See reference solution'}`;
      suggestedAction = 'Review the reference architecture, reset the lab, and attempt it independently.';
    }

    return {
      tierServed: req.requestedTier,
      tierName: tierMeta.name,
      hintContent,
      relevantDocsReference: docsRef,
      suggestedAction,
      penaltyApplied: penalty,
      remainingIndependenceScore: Math.round(rec.verifiedIndependentBuildRate)
    };
  }
}
