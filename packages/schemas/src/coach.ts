/**
 * ATELIER-AI Multi-Tier AI Coach Schemas
 * Implements the progressive assistance ladder (Level 0 to Level 7) and independence metrics.
 */

export type CoachTier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface CoachTierDescriptor {
  tier: CoachTier;
  name: string;
  description: string;
  independencePenaltyPercent: number;
}

export const COACH_TIERS: Record<CoachTier, CoachTierDescriptor> = {
  0: { tier: 0, name: 'Observation Only', description: 'No assistance provided. Pure independent execution.', independencePenaltyPercent: 0 },
  1: { tier: 1, name: 'Conceptual Hint', description: 'Reminds learner of underlying architectural concept or model behavior.', independencePenaltyPercent: 5 },
  2: { tier: 2, name: 'Capability Indicator', description: 'Points to the relevant Claude mechanism (e.g. PreToolUse hook, /init, Tool Search).', independencePenaltyPercent: 12 },
  3: { tier: 3, name: 'Architectural Blueprint', description: 'Outlines the system topology and lifecycle sequence.', independencePenaltyPercent: 20 },
  4: { tier: 4, name: 'Command / Configuration Hint', description: 'Provides specific syntax or CLI flag template.', independencePenaltyPercent: 35 },
  5: { tier: 5, name: 'Partial Implementation', description: 'Provides scaffolded code snippet with TODO markers for the learner to complete.', independencePenaltyPercent: 50 },
  6: { tier: 6, name: 'Guided Diagnostic Repair', description: 'Analyzes learner error log step-by-step and points out the exact root cause.', independencePenaltyPercent: 70 },
  7: { tier: 7, name: 'Reference Solution Explanation', description: 'Reveals and explains the complete verified reference solution.', independencePenaltyPercent: 100 }
};

export interface CoachPromptRequest {
  labId: string;
  stepNumber: number;
  currentFiles: Record<string, string>;
  lastCommand?: string;
  lastError?: string;
  requestedTier: CoachTier;
  learnerQuestion?: string;
}

export interface CoachAdviceResponse {
  tierServed: CoachTier;
  tierName: string;
  hintContent: string;
  relevantDocsReference?: string;
  suggestedAction: string;
  penaltyApplied: number;
  remainingIndependenceScore: number;
}

export interface LearnerIndependenceRecord {
  learnerId: string;
  verifiedIndependentBuildRate: number; // 0 to 100%
  totalHintsRequested: number;
  hintsByTier: Record<CoachTier, number>;
  repairAfterFailureRate: number; // percentage of failed tests resolved independently
  assistanceDependencyTrend: 'decreasing' | 'stable' | 'increasing';
}
