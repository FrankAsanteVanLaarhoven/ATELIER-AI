/**
 * @file metrics.ts
 * Typed contracts for psychometric calibration, item difficulty (p-value),
 * point-biserial discrimination (r_pb), distractor efficiency, and cohort telemetry.
 */

import type { OptionKey } from './question.ts';

export interface DistractorMetrics {
  option: OptionKey;
  selectionCount: number;
  selectionRate: number; // 0.0 to 1.0
  isEffective: boolean; // >= 5% selection rate in calibration sample
}

export interface ItemMetrics {
  itemId: string;
  version: number;
  totalExposures: number;
  totalAttempts: number;
  correctAttempts: number;
  
  /**
   * Classical Test Theory difficulty index (p-value).
   * Ratio of correct responses to total responses (0.0 to 1.0).
   * Target for CCAR-F items: 0.35 to 0.75.
   */
  pValue: number;

  /**
   * Point-biserial discrimination coefficient (r_pb).
   * Correlation between candidate score on this item and overall test score (-1.0 to 1.0).
   * Target threshold: r_pb >= 0.20 (items < 0.20 are flagged for revision/retirement).
   */
  pointBiserial: number;

  /**
   * Average response time in seconds.
   */
  averageTimeSeconds: number;

  /**
   * Distractor distribution and efficiency.
   * Target: >= 70% of distractors selected by at least one candidate.
   */
  distractorAnalysis: Record<OptionKey, DistractorMetrics>;
  distractorEfficiencyRate: number;

  /**
   * Retest / memorization index: ratio of score gain on repeat attempts vs fresh attempts.
   */
  retestGainRatio?: number;

  lastCalculatedAt: string; // ISO-8601
}

export interface CohortPsychometricSummary {
  cohortId: string;
  cohortSize: number;
  examFormId: string;
  meanScorePercent: number;
  medianScorePercent: number;
  standardDeviation: number;
  cronbachAlpha: number; // Internal consistency reliability
  flaggedItemsCount: number; // Items with r_pb < 0.20 or p-val < 0.20 / > 0.90
  calibrationStatus: 'provisional' | 'calibrated' | 'insufficient_sample';
}
