/**
 * ATELIER-AI Capstone & Personal Project Schemas
 * Standardizes AI-directed engineering, Day 1 capstones, reproducibility manifests, and enterprise gates.
 */

export type ProjectDomain = 
  | 'customer_intelligence'
  | 'finops_orchestration'
  | 'legal_document_analysis'
  | 'devops_automation'
  | 'medical_triage'
  | 'supply_chain_optimization'
  | 'autonomous_robotics'
  | 'custom';

export type CapabilityLevel = 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | 'L8';

export interface RequiredCapability {
  capabilityId: string;
  name: string;
  level: CapabilityLevel;
  description: string;
  unlocked: boolean;
  appliedToCapstone: boolean;
}

export interface CapstoneMilestone {
  id: string;
  title: string;
  level: CapabilityLevel;
  description: string;
  deliverable: string;
  status: 'locked' | 'available' | 'in_progress' | 'verified';
  evidenceHash?: string;
  verifiedAt?: string;
}

export interface AcceptanceCriterion {
  id: string;
  description: string;
  testCommand: string;
  passed: boolean;
  deterministic: boolean;
}

export interface ReproducibilityManifest {
  projectName: string;
  curriculumVersion: string;
  runtime: {
    language: string;
    version: string;
    dependenciesLocked: boolean;
    containerized: boolean;
  };
  claude: {
    model: string;
    instructionsVerified: boolean;
    skillsVerified: boolean;
    hooksVerified: boolean;
    mcpVerified: boolean;
    agentsVerified: boolean;
  };
  evaluation: {
    unitTests: string; // e.g. "42/42"
    integrationTests: string; // e.g. "16/16"
    agentEvals: string; // e.g. "47/50"
    securityTests: string; // e.g. "18/18"
  };
  reproducibility: {
    cleanInstall: boolean;
    cleanBuild: boolean;
    cleanTest: boolean;
    repeatRunsPassed: number; // e.g. 3 for Attempt 1, 2, 3
  };
  auditHash: string;
}

export interface EnterpriseGateCheck {
  category: 'functional' | 'testing' | 'agent_eval' | 'security' | 'reliability' | 'observability' | 'reproducibility' | 'operations' | 'governance';
  title: string;
  criteria: string[];
  status: 'pass' | 'fail' | 'pending';
  evidenceSummary: string;
}

export interface ProjectBlueprint {
  projectId: string;
  learnerId: string;
  createdAt: string;
  title: string;
  domain: ProjectDomain;
  naturalLanguageIdea: string;
  objective: string;
  techStack: {
    coreModel: string;
    language: string;
    framework: string;
    database: string;
    protocols: string[];
  };
  requiredCapabilities: RequiredCapability[];
  milestones: CapstoneMilestone[];
  acceptanceCriteria: AcceptanceCriterion[];
  manifest?: ReproducibilityManifest;
  enterpriseGates: EnterpriseGateCheck[];
  progressPercent: number;
}
