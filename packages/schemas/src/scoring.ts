/**
 * @file scoring.ts
 * Typed contracts for server-scored assessment results, domain breakdowns,
 * and Atelier-issued diagnostic records (strictly non-vendor clearance).
 */

import type { DomainId, OptionKey } from './question.ts';

export interface DomainScore {
  domainId: DomainId;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  percentageScore: number;
  passedBenchmark: boolean; // >= 72%
}

export interface QuestionReviewResult {
  itemId: string;
  domain: DomainId;
  task: string;
  taskTitle: string;
  stem: string;
  userSelected: OptionKey[];
  correctOptions: OptionKey[];
  isCorrect: boolean;
  rationale: string;
  whyOthersFail: string;
  sourceReferences: Array<{ title: string; url: string; applicableSection?: string }>;
}

export interface ScoredAttemptResult {
  sessionId: string;
  candidateId: string;
  candidateName: string;
  submittedAt: string;
  totalQuestions: number;
  totalCorrect: number;
  overallScorePercent: number;
  passedBenchmark: boolean; // >= 72% diagnostic threshold
  timeSpentSeconds: number;
  domainScores: Record<DomainId, DomainScore>;
  weakestTasks: Array<{ task: string; taskTitle: string; domain: DomainId; accuracy: number }>;
  itemReviews: QuestionReviewResult[];
  diagnosticRecord: {
    recordId: string;
    issuedAt: string;
    diagnosticStatus: 'readiness_benchmark_met' | 'remediation_required';
    disclaimer: string;
  };
}
