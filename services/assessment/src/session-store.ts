/**
 * @file session-store.ts
 * Manages active exam attempts, server-authoritative timers, optimistic autosave,
 * and 100% state recovery after client disconnects or browser crashes.
 */

import { QuestionBankStore } from './question-bank-store.ts';
import { FormGenerator } from './form-generator.ts';
import { ScoringEngine } from './scoring-engine.ts';
import type {
  ExamSession,
  PublicExamSession,
  SessionConfig,
  OptionKey,
  ScoredAttemptResult,
} from '../../../packages/schemas/src/index.ts';
import { toPublicExamSession } from '../../../packages/schemas/src/index.ts';

export class SessionStore {
  private bank: QuestionBankStore;
  private sessions: Map<string, ExamSession> = new Map();
  private formGenerator: FormGenerator;
  private scoringEngine: ScoringEngine;

  constructor(bank: QuestionBankStore) {
    this.bank = bank;
    this.formGenerator = new FormGenerator(bank);
    this.scoringEngine = new ScoringEngine();
  }

  /**
   * Initializes a new stateful exam attempt.
   */
  public createSession(config: SessionConfig): PublicExamSession {
    const sessionId = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const questions = this.formGenerator.generateMockForm({ seed: config.seed });

    const now = Date.now();
    const durationMinutes = config.timeLimitMinutes || 120;
    const expiresAt = new Date(now + durationMinutes * 60 * 1000).toISOString();

    const session: ExamSession = {
      sessionId,
      candidateId: config.candidateId,
      candidateName: config.candidateName,
      mode: config.mode,
      status: 'in_progress',
      startedAt: new Date(now).toISOString(),
      expiresAt,
      durationMinutes,
      serverRemainingSeconds: durationMinutes * 60,
      questions,
      responses: {},
      auditEvents: [
        {
          type: 'session_initialized',
          timestamp: new Date().toISOString(),
          details: { questionCount: questions.length, mode: config.mode },
        },
      ],
    };

    this.sessions.set(sessionId, session);
    return toPublicExamSession(session);
  }

  /**
   * Retrieves active public session view for candidate reconnection/recovery.
   */
  public getPublicSession(sessionId: string): PublicExamSession | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    // Check if time expired
    const remaining = Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000);
    if (remaining <= 0 && session.status === 'in_progress') {
      session.status = 'expired';
    }
    session.serverRemainingSeconds = Math.max(0, remaining);

    return toPublicExamSession(session);
  }

  /**
   * Optimistically autosaves a candidate response.
   */
  public saveResponse(
    sessionId: string,
    itemId: string,
    selectedOptions: OptionKey[],
    timeSpentSeconds: number,
    flagged: boolean = false
  ): { success: boolean; serverRemainingSeconds: number; answeredCount: number } {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Exam session ${sessionId} not found`);
    }

    if (session.status !== 'in_progress') {
      throw new Error(`Cannot save response: session status is ${session.status}`);
    }

    session.responses[itemId] = {
      itemId,
      selectedOptions,
      timeSpentSeconds,
      flaggedForReview: flagged,
      answeredAt: new Date().toISOString(),
    };

    const remaining = Math.max(
      0,
      Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000)
    );
    session.serverRemainingSeconds = remaining;

    return {
      success: true,
      serverRemainingSeconds: remaining,
      answeredCount: Object.keys(session.responses).length,
    };
  }

  /**
   * Finalizes and evaluates the exam attempt authoritatively.
   */
  public submitSession(
    sessionId: string,
    finalAnswers?: Record<string, OptionKey[]>,
    telemetry?: Record<string, unknown>
  ): ScoredAttemptResult {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Exam session ${sessionId} not found`);
    }

    if (session.status === 'submitted') {
      throw new Error(`Exam session ${sessionId} has already been submitted`);
    }

    // Merge any answers sent with final submission
    if (finalAnswers) {
      for (const [id, opts] of Object.entries(finalAnswers)) {
        if (!session.responses[id]) {
          session.responses[id] = {
            itemId: id,
            selectedOptions: opts,
            timeSpentSeconds: 0,
            flaggedForReview: false,
            answeredAt: new Date().toISOString(),
          };
        } else {
          session.responses[id].selectedOptions = opts;
        }
      }
    }

    const answersMap: Record<string, OptionKey[]> = {};
    for (const [id, resp] of Object.entries(session.responses)) {
      answersMap[id] = resp.selectedOptions;
    }

    const timeSpentSeconds = Math.max(
      0,
      Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000)
    );

    const scoredResult = this.scoringEngine.evaluateAttempt(
      sessionId,
      session.candidateId,
      session.candidateName,
      session.questions,
      answersMap,
      timeSpentSeconds
    );

    session.status = 'submitted';
    session.submittedAt = new Date().toISOString();
    session.auditEvents.push({
      type: 'session_submitted',
      timestamp: session.submittedAt,
      details: {
        score: scoredResult.overallScorePercent,
        passed: scoredResult.passedBenchmark,
        telemetry,
      },
    });

    return scoredResult;
  }
}
