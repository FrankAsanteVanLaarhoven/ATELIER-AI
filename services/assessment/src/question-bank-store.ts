/**
 * @file question-bank-store.ts
 * Server-side repository for protected CCAR-F psychometric items.
 * Answer keys are held in server memory and never dispatched to learners during active exams.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Question, DomainId, DifficultyLevel, QuestionType, OptionKey } from '../../../packages/schemas/src/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class QuestionBankStore {
  private itemsById: Map<string, Question> = new Map();
  private itemsByDomain: Map<DomainId, Question[]> = new Map();

  constructor(filePath?: string) {
    const defaultPath = path.resolve(__dirname, '../../../exam_engine/question_bank.json');
    const targetPath = filePath || defaultPath;
    this.loadFromDisk(targetPath);
  }

  private loadFromDisk(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Authoritative question bank not found at path: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const rawItems: any[] = data.items || [];

    for (const rawItem of rawItems) {
      const q: Question = {
        id: String(rawItem.id),
        version: Number(rawItem.version || 1),
        status: (rawItem.status as any) || 'active',
        domain: Number(rawItem.domain) as DomainId,
        task: String(rawItem.task),
        taskTitle: String(rawItem.task_title || rawItem.taskTitle || ''),
        scenario: String(rawItem.scenario || ''),
        scenarioTitle: String(rawItem.scenario_title || rawItem.scenarioTitle || ''),
        type: (rawItem.type as QuestionType) || 'single',
        selectN: Number(rawItem.select_n || rawItem.selectN || 1),
        stem: String(rawItem.stem),
        options: rawItem.options,
        correct: (rawItem.correct as OptionKey[]) || [],
        rationale: String(rawItem.rationale || ''),
        whyOthersFail: String(rawItem.why_others_fail || rawItem.whyOthersFail || ''),
        difficultyTarget: (rawItem.difficulty_target || rawItem.difficultyTarget || 'intermediate') as DifficultyLevel,
        sourceRefs: rawItem.source_refs || rawItem.sourceRefs || [],
        lastVerified: String(rawItem.last_verified || rawItem.lastVerified || new Date().toISOString().split('T')[0]),
      };

      this.itemsById.set(q.id, q);

      const domainList = this.itemsByDomain.get(q.domain) || [];
      domainList.push(q);
      this.itemsByDomain.set(q.domain, domainList);
    }
  }

  public getById(id: string): Question | undefined {
    return this.itemsById.get(id);
  }

  public getAll(): Question[] {
    return Array.from(this.itemsById.values());
  }

  public getByDomain(domain: DomainId): Question[] {
    return this.itemsByDomain.get(domain) || [];
  }

  public size(): number {
    return this.itemsById.size;
  }
}
