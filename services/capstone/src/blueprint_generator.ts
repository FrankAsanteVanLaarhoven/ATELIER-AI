import type { ProjectBlueprint, ProjectDomain, RequiredCapability, CapstoneMilestone, EnterpriseGateCheck } from '../../../packages/schemas/src/capstone.ts';

export class BlueprintGenerator {
  /**
   * Generates a fully-structured personal Capstone Blueprint from freeform natural language idea.
   */
  public static generateBlueprint(
    learnerId: string,
    learnerName: string,
    idea: string,
    domainHint?: ProjectDomain
  ): ProjectBlueprint {
    const lower = idea.toLowerCase();
    let domain: ProjectDomain = domainHint || 'custom';
    let title = 'Autonomous Claude Enterprise System';
    let objective = 'Design, build, and harden an end-to-end autonomous agent workflow.';
    let framework = 'FastAPI';
    let database = 'PostgreSQL';

    if (lower.includes('complaint') || lower.includes('support') || lower.includes('ticket') || lower.includes('customer')) {
      domain = 'customer_intelligence';
      title = 'Customer Intelligence & Routing Agent';
      objective = 'Classify incoming customer communications, identify urgency/churn signals, securely route to CRM, and generate audit-backed responses.';
      framework = 'FastAPI';
      database = 'PostgreSQL + pgvector';
    } else if (lower.includes('finance') || lower.includes('finops') || lower.includes('spend') || lower.includes('cloud') || lower.includes('cost')) {
      domain = 'finops_orchestration';
      title = 'Autonomous Multi-Cloud FinOps Orchestrator';
      objective = 'Audit multi-cloud spending, detect zombie workloads, and execute cost remediations with strict cryptographic human CFO approval locks.';
      framework = 'Python AsyncIO';
      database = 'PostgreSQL';
    } else if (lower.includes('legal') || lower.includes('contract') || lower.includes('clause') || lower.includes('compliance')) {
      domain = 'legal_document_analysis';
      title = 'Enterprise Legal Contract Risk Analyzer';
      objective = 'Analyze high-volume master service agreements, highlight indemnification liabilities, compare against playbook, and generate redline diffs.';
      framework = 'Next.js + FastAPI';
      database = 'Supabase PostgreSQL';
    } else if (lower.includes('robot') || lower.includes('hardware') || lower.includes('sensor') || lower.includes('cad') || lower.includes('harness')) {
      domain = 'autonomous_robotics';
      title = 'Industrial Cyber-Physical Systems Harness';
      objective = 'Design and route industrial wiring harnesses with deterministic USCAR-21 and IP68 design rule checks, preventing wiring stress failures.';
      framework = 'Python CAD Kernel';
      database = 'SQLite Telemetry Store';
    } else if (lower.includes('deploy') || lower.includes('ci/cd') || lower.includes('devops') || lower.includes('pr') || lower.includes('code review')) {
      domain = 'devops_automation';
      title = 'Autonomous CI/CD Triage & PR Verification Fleet';
      objective = 'Intercept failing builds, perform root-cause attribution, synthesize minimal reproducing test cases, and open verified self-healing PRs.';
      framework = 'Node.js / TypeScript';
      database = 'Redis State Bus';
    }

    const requiredCapabilities: RequiredCapability[] = [
      { capabilityId: 'cap-01', name: 'Reasoning-Effort & Model Configuration', level: 'L1', description: 'Calibrate inference depth and budget tokens for cost-efficient analysis.', unlocked: true, appliedToCapstone: false },
      { capabilityId: 'cap-02', name: 'Repository Context & CLAUDE.md Rules', level: 'L1', description: 'Enforce domain architecture and formatting rules in the repository.', unlocked: true, appliedToCapstone: false },
      { capabilityId: 'cap-03', name: 'Custom Executable Skills', level: 'L2', description: 'Package deterministic calculations and domain scripts in dynamic skills.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-04', name: 'Model Context Protocol (MCP) Integration', level: 'L2', description: 'Expose database, CRM, and APIs as structured JSON-RPC tools with error taxonomy.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-05', name: 'Deterministic Lifecycle Hooks', level: 'L3', description: 'Intercept PreToolUse to block unauthorized mutations without valid cryptographic tokens.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-06', name: 'State Checkpoints & /rewind Recovery', level: 'L3', description: 'Rollback broken multi-turn agent trajectories cleanly.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-07', name: 'Subagent Specialist Dispatch', level: 'L4', description: 'Coordinate parallel workers with scoped contexts to prevent token bloat.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-08', name: 'Tool Search & Deferred Tool Loading', level: 'L4', description: 'Scale tool access to 100+ endpoints without 134k token overhead.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-09', name: 'Sandboxing & Prompt-Injection Defense', level: 'L5', description: 'Isolate subprocess execution and sanitize untrusted tool outputs.', unlocked: false, appliedToCapstone: false },
      { capabilityId: 'cap-10', name: 'Auto Mode & Deny-and-Continue Routing', level: 'L5', description: 'Classify action risk and gracefully recover when high-risk actions are prohibited.', unlocked: false, appliedToCapstone: false }
    ];

    const milestones: CapstoneMilestone[] = [
      { id: 'ms-01', title: 'Architecture Blueprint & CLAUDE.md Briefing', level: 'L1', description: 'Define repository rules, forbidden operations, and domain boundary in CLAUDE.md.', deliverable: '/CLAUDE.md + /atelier.yaml', status: 'available' },
      { id: 'ms-02', title: 'Data Contracts & Schema Validation', level: 'L2', description: 'Implement typed domain entities and database migrations.', deliverable: '/src/schemas/ + /migrations/', status: 'locked' },
      { id: 'ms-03', title: 'Executable Skills & Auto-Discovery', level: 'L2', description: 'Build domain skill folder with deterministic validation script.', deliverable: '/.claude/skills/domain-verifier/SKILL.md', status: 'locked' },
      { id: 'ms-04', title: 'MCP Tool Integration & Error Taxonomy', level: 'L2', description: 'Connect live APIs using Model Context Protocol with structured error handlers.', deliverable: '/mcp/server.py', status: 'locked' },
      { id: 'ms-05', title: 'PreToolUse Invariant Security Gate', level: 'L3', description: 'Implement hard-coded code gate halting unauthorized destructive tool executions.', deliverable: '/.claude/hooks/PreToolUse.ts', status: 'locked' },
      { id: 'ms-06', title: 'Specialist Subagent Delegation', level: 'L4', description: 'Orchestrate parallel reviewer or parser subagents with isolated context windows.', deliverable: '/agents/agent_catalog.yaml', status: 'locked' },
      { id: 'ms-07', title: 'Failure Injection & Resilience Suite', level: 'L5', description: 'Pass 100% of injected failure tests (504 timeout, bad payload, prompt injection).', deliverable: '/evals/adversarial_suite.yaml', status: 'locked' },
      { id: 'ms-08', title: '3x Reproducibility Pass & Defense', level: 'L8', description: 'Clean environment rebuild and 3 consecutive repeat run passes.', deliverable: '/atelier.yaml (Cryptographically Signed)', status: 'locked' }
    ];

    const enterpriseGates: EnterpriseGateCheck[] = [
      { category: 'functional', title: 'Core Acceptance Criteria', criteria: ['Application boots cleanly', 'Primary workflow executes end-to-end', 'API returns 200 with schema-valid output'], status: 'pending', evidenceSummary: 'Awaiting implementation' },
      { category: 'testing', title: 'Automated Test Coverage', criteria: ['Unit tests pass 100%', 'Integration tests pass', 'Deterministic reproducibility verified'], status: 'pending', evidenceSummary: 'Awaiting test run' },
      { category: 'agent_eval', title: 'Agent Evaluation Suite', criteria: ['Representative task benchmarks >= 95%', 'Zero unauthorized write actions', 'Hallucination rate < 0.5%'], status: 'pending', evidenceSummary: 'Awaiting eval run' },
      { category: 'security', title: 'Containment & Least Privilege', criteria: ['PreToolUse authorization lock active', 'Subprocess filesystem sandboxing verified', 'Prompt injection containment verified'], status: 'pending', evidenceSummary: 'Awaiting security scan' },
      { category: 'reliability', title: 'Failure Recovery & Retries', criteria: ['Graceful recovery on HTTP 504', 'Exponential backoff with jitter', 'Deny-and-continue alternative routing'], status: 'pending', evidenceSummary: 'Awaiting failure injection' },
      { category: 'observability', title: 'Telemetry & Audit Logs', criteria: ['OpenTelemetry traces per step', 'Token expenditure telemetry', 'Deterministic audit ledger with cryptographic hash'], status: 'pending', evidenceSummary: 'Awaiting telemetry telemetry tap' },
      { category: 'reproducibility', title: '3x Clean Rebuild Guarantee', criteria: ['Locked dependency manifest', 'Containerized or clean-venv reproducibility', '3 consecutive repeat test passes'], status: 'pending', evidenceSummary: 'Awaiting repeat runs' },
      { category: 'governance', title: 'Human Approval Boundaries', criteria: ['High-impact mutations require cryptographic human token', 'Documented operational limits', 'No autonomous root escalation'], status: 'pending', evidenceSummary: 'Awaiting policy audit' }
    ];

    return {
      projectId: `proj-${Date.now().toString(36)}`,
      learnerId,
      createdAt: new Date().toISOString(),
      title,
      domain,
      naturalLanguageIdea: idea,
      objective,
      techStack: {
        coreModel: 'claude-3-7-sonnet-20250219',
        language: 'TypeScript / Python',
        framework,
        database,
        protocols: ['MCP (v2024-11-05)', 'OpenTelemetry', 'JSON-RPC']
      },
      requiredCapabilities,
      milestones,
      acceptanceCriteria: [
        { id: 'ac-01', description: 'Application starts and initializes state without uncaught exceptions', testCommand: 'npm run test:init', passed: false, deterministic: true },
        { id: 'ac-02', description: 'PreToolUse invariant gate rejects any unauthenticated mutation call', testCommand: 'npm run test:security', passed: false, deterministic: true },
        { id: 'ac-03', description: 'Claude discovers and executes domain skill without manual invocation hint', testCommand: 'npm run test:discovery', passed: false, deterministic: true },
        { id: 'ac-04', description: 'System recovers from injected HTTP 504 socket timeout with zero data loss', testCommand: 'npm run test:resilience', passed: false, deterministic: true }
      ],
      enterpriseGates,
      progressPercent: 12 // Day 1 start
    };
  }
}
