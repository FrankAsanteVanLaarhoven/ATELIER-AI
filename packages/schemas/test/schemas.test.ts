import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeQuestion,
  isValidQuestion,
  toPublicExamSession,
  type Question,
  type ExamSession,
} from '../src/index.ts';

describe('Contracts & Schemas (@atelier-ai/schemas)', () => {
  const sampleQuestion: Question = {
    id: 'Q-01-TEST',
    version: 1,
    status: 'active',
    domain: 1,
    task: '1.1',
    taskTitle: 'Coordinator-Subagent Topologies',
    scenario: 'S1',
    scenarioTitle: 'Autonomous Financial Orchestration',
    type: 'single',
    selectN: 1,
    stem: 'What invariant protects high-value money movement?',
    options: {
      A: 'Prompt instruction only',
      B: 'Deterministic authorization hook with dual signature',
      C: 'Lowering temperature to zero',
      D: 'Allowing the agent to retry without limits',
    },
    correct: ['B'],
    rationale: 'Deterministic PreToolUse gates prevent unauthorized financial execution.',
    whyOthersFail: 'Adjectives, temperature, and unconstrained retries do not guarantee invariants.',
    difficultyTarget: 'advanced',
    sourceRefs: ['https://docs.anthropic.com'],
    lastVerified: '2026-09-24',
  };

  test('isValidQuestion correctly validates well-formed question', () => {
    assert.equal(isValidQuestion(sampleQuestion), true);
    assert.equal(isValidQuestion({ id: 'bad' }), false);
  });

  test('sanitizeQuestion completely removes correct answers and rationales', () => {
    const sanitized = sanitizeQuestion(sampleQuestion);
    assert.equal(sanitized.id, 'Q-01-TEST');
    assert.equal(sanitized.stem, sampleQuestion.stem);
    assert.equal('correct' in sanitized, false);
    assert.equal('rationale' in sanitized, false);
    assert.equal('whyOthersFail' in sanitized, false);
    assert.equal((sanitized as unknown as Record<string, unknown>).correct, undefined);
  });

  test('toPublicExamSession serializes session without answer leakage', () => {
    const session: ExamSession = {
      sessionId: 'ses_test_123',
      candidateId: 'cand_456',
      candidateName: 'Jane Doe',
      mode: 'timed_mock',
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
      durationMinutes: 120,
      serverRemainingSeconds: 7200,
      questions: [sampleQuestion],
      responses: {
        'Q-01-TEST': {
          itemId: 'Q-01-TEST',
          selectedOptions: ['B'],
          timeSpentSeconds: 45,
          flaggedForReview: false,
          answeredAt: new Date().toISOString(),
        },
      },
      auditEvents: [],
    };

    const pub = toPublicExamSession(session);
    assert.equal(pub.sessionId, 'ses_test_123');
    assert.equal(pub.items.length, 1);
    assert.equal('correct' in pub.items[0], false);
    assert.equal(pub.savedResponses['Q-01-TEST'].selectedOptions[0], 'B');
  });
});
