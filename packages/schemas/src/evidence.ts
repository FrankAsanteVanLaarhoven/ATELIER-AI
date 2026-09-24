/**
 * ATELIER-AI Evidence Ledger & Capability Unlock System Schemas
 * Replaces vanity badges with cryptographic verification, 3x repeat runs, and proof portfolios.
 */

import type { CapabilityLevel } from './capstone.ts';

export interface EvidenceRecord {
  id: string;
  timestamp: string;
  learnerId: string;
  projectId: string;
  labId: string;
  capabilityId: string;
  level: CapabilityLevel;
  type: 'lab_completion' | 'reproducibility_3x_pass' | 'adversarial_repair' | 'security_gate_pass' | 'capstone_defense';
  summary: string;
  details: {
    testsPassed: number;
    testsTotal: number;
    reproducibilityHash: string;
    independenceScore: number;
    coachTierMaxUsed: number;
    durationSeconds: number;
  };
  cryptographicSignature: string;
}

export interface CapabilityGate {
  capabilityId: string;
  name: string;
  level: CapabilityLevel;
  unlocked: boolean;
  prerequisites: string[]; // IDs of prerequisite capabilities
  requiredVerificationsCount: number;
  completedVerificationsCount: number;
  badge: string;
  description: string;
}

export interface EvidencePortfolio {
  portfolioId: string;
  learnerName: string;
  learnerRole: string;
  issuedAt: string;
  personalProject: {
    title: string;
    domain: string;
    objective: string;
    repositoryUrl?: string;
    manifestHash: string;
    progressPercent: number;
    enterpriseReady: boolean;
  };
  metrics: {
    verifiedIndependentBuildRate: number; // e.g. 92%
    cleanBuildReproducibility: number; // e.g. 100%
    repairAfterFailureRate: number; // e.g. 88%
    totalPracticalLabsCompleted: number; // e.g. 14
    totalDebuggingChallengesSolved: number; // e.g. 9
    securityGatesPassed: number; // e.g. 6
  };
  masteredCapabilities: Array<{
    capabilityId: string;
    name: string;
    level: CapabilityLevel;
    verifiedDate: string;
    evidenceHash: string;
  }>;
  evidenceRecords: EvidenceRecord[];
  verificationUrl: string;
  auditDigest: string;
}
