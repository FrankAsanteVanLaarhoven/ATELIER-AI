/**
 * @file session.ts
 * Typed contracts for server-authoritative exam sessions, attempt state, and disconnect recovery.
 */

import type { Question, SanitizedQuestion } from './question.ts';
import { sanitizeQuestion } from './question.ts';
import type { LearnerResponse } from './response.ts';

export type SessionStatus = 'initialized' | 'in_progress' | 'paused' | 'submitted' | 'expired' | 'abandoned';

export type SessionMode = 'diagnostic' | 'timed_mock' | 'domain_drill' | 'remediation';

export interface SessionConfig {
  mode: SessionMode;
  timeLimitMinutes: number;
  questionCount: number;
  domainFilter?: number[];
  seed?: number;
  candidateId: string;
  candidateName: string;
  candidateOrg?: string;
  clientUserAgent?: string;
}

/**
 * Server-Authoritative Exam Session.
 * Stored securely in database / cache; contains full questions with protected keys.
 */
export interface ExamSession {
  sessionId: string;
  candidateId: string;
  candidateName: string;
  mode: SessionMode;
  status: SessionStatus;
  startedAt: string; // ISO-8601
  expiresAt: string; // ISO-8601 server-enforced deadline
  submittedAt?: string;
  durationMinutes: number;
  serverRemainingSeconds: number;
  questions: Question[]; // Protected items
  responses: Record<string, LearnerResponse>;
  clientIp?: string;
  auditEvents: Array<{
    type: string;
    timestamp: string;
    details?: Record<string, unknown>;
  }>;
}

/**
 * Client-Facing Public Session View.
 * Strips answer keys so learners cannot inspect answers via DevTools.
 */
export interface PublicExamSession {
  sessionId: string;
  candidateName: string;
  mode: SessionMode;
  status: SessionStatus;
  startedAt: string;
  expiresAt: string;
  durationMinutes: number;
  serverRemainingSeconds: number;
  items: SanitizedQuestion[];
  savedResponses: Record<string, { selectedOptions: string[]; flagged: boolean }>;
}

/**
 * Serializes an internal ExamSession into a safe PublicExamSession for client consumption.
 */
export function toPublicExamSession(session: ExamSession): PublicExamSession {
  const savedResponses: Record<string, { selectedOptions: string[]; flagged: boolean }> = {};
  for (const [id, r] of Object.entries(session.responses)) {
    savedResponses[id] = {
      selectedOptions: r.selectedOptions,
      flagged: r.flaggedForReview,
    };
  }

  return {
    sessionId: session.sessionId,
    candidateName: session.candidateName,
    mode: session.mode,
    status: session.status,
    startedAt: session.startedAt,
    expiresAt: session.expiresAt,
    durationMinutes: session.durationMinutes,
    serverRemainingSeconds: Math.max(
      0,
      Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000)
    ),
    items: session.questions.map(sanitizeQuestion),
    savedResponses,
  };
}
