/**
 * @file scoring-engine.ts
 * Authoritative server-side evaluation engine.
 * Computes domain scores, weakest tasks, and Atelier diagnostic records
 * against protected answer keys stored strictly on the server.
 */

import type {
  Question,
  DomainId,
  OptionKey,
  ScoredAttemptResult,
  DomainScore,
  QuestionReviewResult,
} from '../../../packages/schemas/src/index.ts';
import { DOMAIN_TITLES } from '../../../packages/schemas/src/index.ts';

export class ScoringEngine {
  private static readonly PASSING_BENCHMARK_PERCENT = 72;

  /**
   * Authoritatively evaluates candidate responses against protected questions.
   */
  public evaluateAttempt(
    sessionId: string,
    candidateId: string,
    candidateName: string,
    questions: Question[],
    userResponses: Record<string, OptionKey[]>,
    timeSpentSeconds: number
  ): ScoredAttemptResult {
    let totalCorrect = 0;
    const domainAccumulators: Record<DomainId, { correct: number; total: number }> = {
      1: { correct: 0, total: 0 },
      2: { correct: 0, total: 0 },
      3: { correct: 0, total: 0 },
      4: { correct: 0, total: 0 },
      5: { correct: 0, total: 0 },
    };

    const taskStats: Map<string, { taskTitle: string; domain: DomainId; total: number; correct: number }> = new Map();
    const itemReviews: QuestionReviewResult[] = [];

    for (const q of questions) {
      domainAccumulators[q.domain].total++;

      const taskKey = q.task;
      const currentTask = taskStats.get(taskKey) || {
        taskTitle: q.taskTitle,
        domain: q.domain,
        total: 0,
        correct: 0,
      };
      currentTask.total++;

      const selected = (userResponses[q.id] || []).map(o => o.toUpperCase().trim() as OptionKey).sort();
      const expected = (q.correct || []).map(o => o.toUpperCase().trim() as OptionKey).sort();

      const isCorrect = selected.length === expected.length && selected.every((val, idx) => val === expected[idx]);

      if (isCorrect) {
        totalCorrect++;
        domainAccumulators[q.domain].correct++;
        currentTask.correct++;
      }

      taskStats.set(taskKey, currentTask);

      // Extract source references
      const sourceReferences = (q.sourceRefs || []).map(ref => {
        if (typeof ref === 'string') {
          return { title: 'Anthropic Core Architecture Documentation', url: ref };
        }
        return {
          title: ref.title,
          url: ref.url,
          applicableSection: ref.applicableSection,
        };
      });

      itemReviews.push({
        itemId: q.id,
        domain: q.domain,
        task: q.task,
        taskTitle: q.taskTitle,
        stem: q.stem,
        userSelected: selected,
        correctOptions: expected,
        isCorrect,
        rationale: q.rationale,
        whyOthersFail: q.whyOthersFail,
        sourceReferences,
      });
    }

    const overallScorePercent = Math.round((totalCorrect / questions.length) * 100);
    const passedBenchmark = overallScorePercent >= ScoringEngine.PASSING_BENCHMARK_PERCENT;

    const domainScores: Record<DomainId, DomainScore> = {} as any;
    for (let d = 1; d <= 5; d++) {
      const domainId = d as DomainId;
      const acc = domainAccumulators[domainId];
      const pct = acc.total > 0 ? Math.round((acc.correct / acc.total) * 100) : 0;
      domainScores[domainId] = {
        domainId,
        title: DOMAIN_TITLES[domainId],
        totalQuestions: acc.total,
        correctAnswers: acc.correct,
        percentageScore: pct,
        passedBenchmark: pct >= ScoringEngine.PASSING_BENCHMARK_PERCENT,
      };
    }

    // Rank weakest tasks (accuracy < 70%, sorted ascending)
    const weakestTasks = Array.from(taskStats.entries())
      .map(([task, stats]) => ({
        task,
        taskTitle: stats.taskTitle,
        domain: stats.domain,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const recordId = `ATL-CCARF-DIAG-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;

    return {
      sessionId,
      candidateId,
      candidateName,
      submittedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      totalCorrect,
      overallScorePercent,
      passedBenchmark,
      timeSpentSeconds,
      domainScores,
      weakestTasks,
      itemReviews,
      diagnosticRecord: {
        recordId,
        issuedAt: new Date().toISOString(),
        diagnosticStatus: passedBenchmark ? 'readiness_benchmark_met' : 'remediation_required',
        disclaimer:
          'ATELIER-AI is an independent competency platform and is not affiliated with, sponsored by, or endorsed by Anthropic, PBC or Pearson VUE. This diagnostic report evaluates alignment with the public CCAR-F blueprint and does not confer official vendor certification.',
      },
    };
  }
}
