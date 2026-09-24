/**
 * @file form-generator.ts
 * Generates stratified CCAR-F examination forms conforming to public blueprint weights.
 * Domain 1: 27% (16 items)
 * Domain 2: 18% (11 items)
 * Domain 3: 20% (12 items)
 * Domain 4: 20% (12 items)
 * Domain 5: 15% (9 items)
 * Total: 60 items
 */

import { QuestionBankStore } from './question-bank-store.ts';
import type { Question, DomainId } from '../../../packages/schemas/src/index.ts';

// Deterministic Linear Congruential Generator (LCG) for reproducible seed forms
class SeededRNG {
  private state: number;

  constructor(seed: number = 42) {
    this.state = seed % 2147483647;
    if (this.state <= 0) this.state += 2147483646;
  }

  public next(): number {
    this.state = (this.state * 16807) % 2147483647;
    return (this.state - 1) / 2147483646;
  }

  public shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

export interface FormGenerationOptions {
  seed?: number;
  questionCount?: number;
}

export class FormGenerator {
  private bank: QuestionBankStore;

  constructor(bank: QuestionBankStore) {
    this.bank = bank;
  }

  public generateMockForm(options: FormGenerationOptions = {}): Question[] {
    const seed = options.seed ?? Math.floor(Math.random() * 100000);
    const rng = new SeededRNG(seed);

    const quotas: Record<DomainId, number> = {
      1: 16,
      2: 11,
      3: 12,
      4: 12,
      5: 9,
    };

    const selected: Question[] = [];

    for (let d = 1; d <= 5; d++) {
      const domain = d as DomainId;
      const needed = quotas[domain];
      const available = this.bank.getByDomain(domain);

      if (available.length === 0) {
        throw new Error(`Insufficient questions in QuestionBank for Domain ${domain}`);
      }

      const shuffled = rng.shuffle(available);
      const chosen = shuffled.slice(0, Math.min(needed, shuffled.length));

      // If available items are fewer than quota, cycle deterministically
      while (chosen.length < needed) {
        chosen.push(shuffled[chosen.length % shuffled.length]);
      }

      selected.push(...chosen);
    }

    return rng.shuffle(selected);
  }
}
