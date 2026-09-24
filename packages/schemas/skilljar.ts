/**
 * packages/schemas/skilljar.ts
 * 
 * Formal typed schema contracts for Anthropic Skilljar Academy courses,
 * on-the-fly curriculum ingestion, and Top 1% Enterprise Capstone Lab specifications.
 */

export type SkilljarTrack = 
  | 'developer-api'
  | 'claude-code-agents'
  | 'mcp-protocols'
  | 'cloud-infrastructure'
  | 'enterprise-governance'
  | 'ai-fluency-leadership';

export type EnterpriseTier = 'Tier-1-Global-Bank' | 'Autonomous-Automotive' | 'Critical-Healthcare' | 'Hyperscale-Fintech' | 'Defense-Aerospace' | 'Mission-Critical-Infra';

export interface InvariantGate {
  id: string;
  name: string;
  deterministicRule: string;
  failureRisk: string;
  enforcementLayer: 'PreToolUse-Gateway' | 'PostValidation-Hook' | 'Dual-Signature-Auth' | 'AirGap-Redaction-Filter';
}

export interface SimulationFailureVector {
  id: string;
  scenarioName: string;
  injectedFault: string;
  expectedAgentBehavior: string;
  drcErrorCode: string;
}

export interface EnterpriseCapstoneSpec {
  capstoneId: string;
  title: string;
  enterpriseClient: string;
  industryTier: EnterpriseTier;
  executiveBrief: string;
  problemStatement: string;
  architecturalConstraints: string[];
  invariantGates: InvariantGate[];
  failureInjectionSuite: SimulationFailureVector[];
  requiredClaudeSurfaces: ('Claude Chat' | 'Claude Code CLI' | 'Cowork' | 'MCP Gateway' | 'Agentic Mesh')[];
  deliverables: string[];
  rubric: {
    category: string;
    weightPoints: number;
    criteria: string;
  }[];
  oralDefensePrompts: string[];
}

export interface SkilljarLesson {
  lessonId: string;
  title: string;
  durationMinutes: number;
  learningObjectives: string[];
  interactiveLabLink?: string;
}

export interface SkilljarCourse {
  slug: string;
  oid?: string;
  coid?: string;
  title: string;
  description: string;
  track: SkilljarTrack;
  canonicalUrl: string;
  promoImageUrl: string;
  estimatedHours: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Enterprise Architect';
  skillsGained: string[];
  lessons: SkilljarLesson[];
  enterpriseCapstone: EnterpriseCapstoneSpec;
  lastSyncedAt?: string;
  ingestionStatus: 'ready' | 'synced' | 'customized';
}

export interface SkilljarCatalogSyncResult {
  sourceUrl: string;
  syncedAt: string;
  totalCourses: number;
  tracks: Record<SkilljarTrack, number>;
  courses: SkilljarCourse[];
}
