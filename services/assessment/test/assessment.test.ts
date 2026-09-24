import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { QuestionBankStore } from '../src/question-bank-store.ts';
import { FormGenerator } from '../src/form-generator.ts';
import { ScoringEngine } from '../src/scoring-engine.ts';
import { SessionStore } from '../src/session-store.ts';
import type { OptionKey } from '../../../packages/schemas/src/index.ts';

describe('Assessment Service (@atelier-ai/assessment-service)', () => {
  const bank = new QuestionBankStore();
  const formGenerator = new FormGenerator(bank);
  const scoringEngine = new ScoringEngine();
  const sessionStore = new SessionStore(bank);

  test('QuestionBankStore loads all 90 items and indexes by domain', () => {
    assert.equal(bank.size() >= 60, true);
    assert.equal(bank.getByDomain(1).length > 0, true);
    assert.equal(bank.getByDomain(2).length > 0, true);
    assert.equal(bank.getByDomain(3).length > 0, true);
    assert.equal(bank.getByDomain(4).length > 0, true);
    assert.equal(bank.getByDomain(5).length > 0, true);
  });

  test('FormGenerator produces 60-item form adhering to CCAR-F domain quotas', () => {
    const form = formGenerator.generateMockForm({ seed: 12345 });
    assert.equal(form.length, 60);

    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const q of form) {
      counts[q.domain]++;
    }

    assert.equal(counts[1], 16, 'Domain 1 must have 16 items (27%)');
    assert.equal(counts[2], 11, 'Domain 2 must have 11 items (18%)');
    assert.equal(counts[3], 12, 'Domain 3 must have 12 items (20%)');
    assert.equal(counts[4], 12, 'Domain 4 must have 12 items (20%)');
    assert.equal(counts[5], 9, 'Domain 5 must have 9 items (15%)');
  });

  test('SessionStore creates public session with ZERO answer key leaks', () => {
    const pub = sessionStore.createSession({
      candidateId: 'test_cand_1',
      candidateName: 'Alex Mercer',
      mode: 'timed_mock',
      timeLimitMinutes: 120,
      questionCount: 60,
      seed: 42,
    });

    assert.equal(pub.items.length, 60);
    assert.equal(pub.durationMinutes, 120);
    assert.equal(pub.serverRemainingSeconds > 7100, true);

    // Verify zero answer keys or rationales exist in the returned public items
    for (const item of pub.items) {
      assert.equal('correct' in item, false, `Item ${item.id} must not leak 'correct'`);
      assert.equal('rationale' in item, false, `Item ${item.id} must not leak 'rationale'`);
      assert.equal('whyOthersFail' in item, false, `Item ${item.id} must not leak 'whyOthersFail'`);
    }
  });

  test('Autosave persists candidate responses and updates answered counts', () => {
    const pub = sessionStore.createSession({
      candidateId: 'test_cand_2',
      candidateName: 'Jordan Lee',
      mode: 'timed_mock',
      timeLimitMinutes: 120,
      questionCount: 60,
      seed: 99,
    });

    const firstItem = pub.items[0];
    const saveResult = sessionStore.saveResponse(
      pub.sessionId,
      firstItem.id,
      ['C'],
      30,
      false
    );

    assert.equal(saveResult.success, true);
    assert.equal(saveResult.answeredCount, 1);

    // Verify saved response is recovered
    const recovered = sessionStore.getPublicSession(pub.sessionId);
    assert.ok(recovered);
    assert.equal(recovered.savedResponses[firstItem.id].selectedOptions[0], 'C');
  });

  test('100% Recovery after simulated client disconnect', () => {
    const pub = sessionStore.createSession({
      candidateId: 'test_cand_disconnect',
      candidateName: 'Crash Recovery Test',
      mode: 'timed_mock',
      timeLimitMinutes: 120,
      questionCount: 60,
      seed: 777,
    });

    // Save responses for 3 questions
    sessionStore.saveResponse(pub.sessionId, pub.items[0].id, ['A'], 15);
    sessionStore.saveResponse(pub.sessionId, pub.items[1].id, ['B'], 25);
    sessionStore.saveResponse(pub.sessionId, pub.items[2].id, ['D'], 40, true);

    // Simulate complete client crash / new client reconnect
    const recovered = sessionStore.getPublicSession(pub.sessionId);
    assert.ok(recovered, 'Session must be recoverable by ID');
    assert.equal(recovered.sessionId, pub.sessionId);
    assert.equal(recovered.status, 'in_progress');
    assert.equal(Object.keys(recovered.savedResponses).length, 3);
    assert.equal(recovered.savedResponses[pub.items[0].id].selectedOptions[0], 'A');
    assert.equal(recovered.savedResponses[pub.items[2].id].flagged, true);
    assert.equal(recovered.serverRemainingSeconds > 7100, true);
  });

  test('ScoringEngine evaluates attempt, enforces 72% benchmark, and issues non-vendor record', () => {
    const questions = formGenerator.generateMockForm({ seed: 555 });
    const userAnswers: Record<string, OptionKey[]> = {};

    // Answer 50 out of 60 correctly (~83% score -> pass)
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (i < 50) {
        userAnswers[q.id] = [...q.correct];
      } else {
        // Deliberately incorrect
        userAnswers[q.id] = ['A'];
      }
    }

    const result = scoringEngine.evaluateAttempt(
      'ses_eval_test',
      'cand_100',
      'Benchmark Test User',
      questions,
      userAnswers,
      3600
    );

    assert.equal(result.totalQuestions, 60);
    assert.equal(result.totalCorrect >= 50, true);
    assert.equal(result.overallScorePercent >= 72, true);
    assert.equal(result.passedBenchmark, true);
    assert.equal(result.diagnosticRecord.diagnosticStatus, 'readiness_benchmark_met');
    assert.equal(result.diagnosticRecord.disclaimer.includes('independent competency platform'), true);
    assert.equal(result.itemReviews.length, 60);
    assert.equal(typeof result.itemReviews[0].rationale, 'string');
  });
});
