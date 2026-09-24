/**
 * @file question.ts
 * Typed contracts for CCAR-F psychometric items, versions, and source provenance.
 */

export type DomainId = 1 | 2 | 3 | 4 | 5;

export const DOMAIN_TITLES: Record<DomainId, string> = {
  1: 'Agentic Architecture & Orchestration',
  2: 'Tool Design & MCP Integration',
  3: 'Claude Code Configuration & Workflows',
  4: 'Prompt Engineering & Structured Output',
  5: 'Context Management & Reliability',
};

export const DOMAIN_QUOTAS_CCAR_F: Record<DomainId, { percentage: number; targetItems: number }> = {
  1: { percentage: 27, targetItems: 16 },
  2: { percentage: 18, targetItems: 11 },
  3: { percentage: 20, targetItems: 12 },
  4: { percentage: 20, targetItems: 12 },
  5: { percentage: 15, targetItems: 9 },
};

export type DifficultyLevel = 'foundational' | 'intermediate' | 'advanced';

export type QuestionLifecycleStatus = 'draft' | 'in_review' | 'calibrating' | 'active' | 'retired';

export type QuestionType = 'single' | 'multiple';

export type EvidenceTier = 'tier_1_verified' | 'tier_2_simulated' | 'tier_3_roadmap';

export interface SourceReference {
  id: string;
  title: string;
  url: string;
  retrievedAt: string; // ISO-8601 date
  evidenceTier: EvidenceTier;
  applicableSection?: string;
  notes?: string;
}

export type OptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  E?: string;
}

/**
 * Full Question Contract (Protected server-side state).
 * Must NEVER be dispatched to client JavaScript while an exam attempt is active.
 */
export interface Question {
  id: string;
  version: number;
  status: QuestionLifecycleStatus;
  domain: DomainId;
  task: string;
  taskTitle: string;
  scenario: string;
  scenarioTitle: string;
  type: QuestionType;
  selectN: number;
  stem: string;
  options: QuestionOptions;
  correct: OptionKey[];
  rationale: string;
  whyOthersFail: string;
  difficultyTarget: DifficultyLevel;
  sourceRefs: SourceReference[] | string[];
  lastVerified: string; // ISO-8601 date
  metadata?: {
    author?: string;
    reviewedBy?: string[];
    adversarialReviewPassed?: boolean;
    calibrationSampleSize?: number;
    pBiserial?: number;
    pVal?: number;
  };
}

/**
 * Sanitized Question Contract (Safe for client-side evaluation).
 * Correct options and explanations are stripped to prevent dev-tools exfiltration.
 */
export interface SanitizedQuestion {
  id: string;
  domain: DomainId;
  task: string;
  taskTitle: string;
  scenario: string;
  scenarioTitle: string;
  type: QuestionType;
  selectN: number;
  stem: string;
  options: QuestionOptions;
  difficultyTarget: DifficultyLevel;
}

/**
 * Strips protected answer keys and rationales from a full Question object.
 */
export function sanitizeQuestion(q: Question): SanitizedQuestion {
  return {
    id: q.id,
    domain: q.domain,
    task: q.task,
    taskTitle: q.taskTitle,
    scenario: q.scenario,
    scenarioTitle: q.scenarioTitle,
    type: q.type,
    selectN: q.selectN,
    stem: q.stem,
    options: { ...q.options },
    difficultyTarget: q.difficultyTarget,
  };
}

/**
 * Runtime Type Guard for Question
 */
export function isValidQuestion(obj: unknown): obj is Question {
  if (!obj || typeof obj !== 'object') return false;
  const q = obj as Partial<Question>;
  return (
    typeof q.id === 'string' &&
    typeof q.domain === 'number' &&
    [1, 2, 3, 4, 5].includes(q.domain as number) &&
    typeof q.stem === 'string' &&
    typeof q.options === 'object' &&
    q.options !== null &&
    Array.isArray(q.correct) &&
    q.correct.length > 0 &&
    typeof q.rationale === 'string'
  );
}
