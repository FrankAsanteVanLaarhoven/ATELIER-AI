/**
 * @file response.ts
 * Typed contracts for candidate responses, autosave payloads, and submission payloads.
 */

import type { OptionKey } from './question.ts';

export interface LearnerResponse {
  itemId: string;
  selectedOptions: OptionKey[];
  timeSpentSeconds: number;
  flaggedForReview: boolean;
  answeredAt: string; // ISO-8601 timestamp
  attemptNumber?: number;
}

export interface ResponseAutosavePayload {
  sessionId: string;
  itemId: string;
  selectedOptions: OptionKey[];
  timeSpentSeconds: number;
  flaggedForReview?: boolean;
  clientTimestamp: string;
}

export interface AutosaveAck {
  success: boolean;
  sessionId: string;
  itemId: string;
  serverTimestamp: string;
  serverRemainingSeconds: number;
  totalAnsweredCount: number;
}

export interface ExamSubmissionPayload {
  sessionId: string;
  responses: Record<string, OptionKey[]>;
  telemetryAudit?: {
    blurCount: number;
    visibilityHiddenCount: number;
    incidentCount: number;
  };
  submittedAt: string;
}
