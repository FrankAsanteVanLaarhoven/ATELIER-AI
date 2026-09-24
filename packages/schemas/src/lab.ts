/**
 * ATELIER-AI Reproducible Lab Runtime Schemas
 * Standardizes the "Explain -> Demonstrate -> Learner Executes -> System Observes -> Test -> Diagnose -> Learner Repairs -> Verify" cycle.
 */

import type { CapabilityLevel } from './capstone.ts';

export interface LabFile {
  path: string;
  content: string;
  isReadOnly?: boolean;
}

export interface LabFailureVector {
  id: string;
  name: string;
  trigger: string;
  injectedBehavior: string;
  remedyHint: string;
  validationTestId: string;
}

export interface LabAcceptanceTest {
  id: string;
  name: string;
  description: string;
  command: string;
  deterministicExpectation: string;
  isSecurityGate?: boolean;
}

export interface LabStep {
  stepNumber: number;
  title: string;
  instruction: string;
  conceptProof: string;
  expectedArtifact: string;
}

export interface LabSpec {
  id: string;
  level: CapabilityLevel;
  capabilityId: string;
  title: string;
  subtitle: string;
  objective: string;
  estimatedMinutes: number;
  starterRepo: {
    files: LabFile[];
    environment: {
      runtime: string;
      dependencies: string[];
      claudeModel: string;
      defaultEffort: 'low' | 'medium' | 'high' | 'xhigh';
    };
  };
  steps: LabStep[];
  acceptanceTests: LabAcceptanceTest[];
  failureVectors: LabFailureVector[];
  referenceSolution: {
    files: LabFile[];
    explanation: string;
  };
}

export interface TestRunResult {
  testId: string;
  name: string;
  passed: boolean;
  output: string;
  durationMs: number;
}

export interface ReproducibilityAttempt {
  attemptNumber: number;
  timestamp: string;
  passed: boolean;
  testsTotal: number;
  testsPassed: number;
  durationMs: number;
  hash: string;
}

export interface LabExecutionState {
  labId: string;
  activeStep: number;
  modifiedFiles: Record<string, string>; // path -> content
  historyCommands: Array<{ time: string; cmd: string; output: string; exitCode: number }>;
  lastTestResults?: {
    allPassed: boolean;
    tests: TestRunResult[];
    totalDurationMs: number;
  };
  reproducibilityAttempts: ReproducibilityAttempt[];
  activeFailureInjection?: string;
  hintsUsedCount: number;
  completed: boolean;
}
