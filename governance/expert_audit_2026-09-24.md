# Comprehensive Architecture, Assessment & Product Audit

**Audit Date:** 2026-09-24  
**Subject:** ATELIER-AI Repository & Commercial Service Architecture  
**Auditor:** Expert Architecture & Psychometrics Review  
**Target Repository:** `FrankAsanteVanLaarhoven/ATELIER-AI`

---

## 1. Executive Summary

ATELIER-AI demonstrates deep technical ambition, high feature velocity, and strong domain grounding. However, it currently operates as a **high-end prototype that has outgrown its verification and product-boundary layer**.

The primary defensible value proposition is **not** a standard multiple-choice question bank. The defensible product and competitive moat is the **complete competency verification loop**:

$$\text{Learn} \longrightarrow \text{Simulate} \longrightarrow \text{Build} \longrightarrow \text{Inject Failures} \longrightarrow \text{Prove Invariants} \longrightarrow \text{Defend Capstone} \longrightarrow \text{Measure Competence}$$

The driving-theory test UX serves as the accessible top of funnel; the applied architecture lab is the enterprise moat.

---

## 2. Key Findings & Critical Vulnerabilities

### Finding 1: Claim Inflation vs. Empirical Evidence
- **Observation:** Several public claims in repository documentation outstrip the underlying implementation. Examples include language claiming candidates are *"officially ready"*, holding *"clearance voucher authorization"*, issuing *"verified capstone credentials"* with *"on-chain audit hashes"*, and implying compliance with physical safety standards or vendor-backed certification authority.
- **Risk:** Legal exposure, trademark infringement risk regarding Anthropic and Pearson VUE, loss of enterprise credibility, and confusion over credential validity.
- **Remediation:** Enforce the 3-tier Claims and Evidence Policy (`governance/claims_evidence_policy.md`). Label all simulated elements, illustrative formulas, and Atelier-issued badges accurately.

### Finding 2: Monolithic Client-Side Concentration Risk
- **Observation:** Architectural logic, exam timing, protected answer keys, scoring engines, Claude Code orchestration, MCP harness evaluations, proctoring telemetry, and credential decisions converge heavily within client-side browser JavaScript.
- **Risk:** Easily bypassed exam integrity (answer keys inspecting in dev tools), lost candidate state during network flakiness, zero enterprise audit guarantees, and fragile execution of consequential agent tools.
- **Remediation:** Split into decoupled services: move protected answer keys, scoring, session recovery, and authorization gates behind server-side APIs (`services/assessment`, `packages/policy`).

### Finding 3: Assessment Engineering & Psychometric Calibration Gap
- **Observation:** The project has strong foundational assessment design (domain quotas, original items, structured rationales, psychometric metadata schemas). However, it lacks empirical calibration data.
- **Risk:** Adding hundreds of uncalibrated questions creates maintenance debt rather than predictive validity.
- **Remediation:** Stop adding raw questions. Measure empirical item metrics on pilot cohorts:
  - $p$-value (item difficulty)
  - Point-biserial discrimination ($r_{pb} \ge 0.20$)
  - Distractor efficiency ($\ge 70\%$ distractors selected)
  - Item exposure rates and retest memorization effects

### Finding 4: Cyber-Physical & Safety Demarcation
- **Observation:** The repository features electrical harness engineering (USCAR, AS50881, IPC) and robotics safety labs. While highly differentiating, LLMs must never be portrayed as safety interlocks or certified controllers.
- **Remediation:** Add strict disclaimers that browser DRCs and agent scripts are illustrative educational simulations. All cited standards must specify exact edition, section, and applicability.

### Finding 5: Proctoring Telemetry vs. Legal Integrity
- **Observation:** Blur detection, webcam monitoring, and clipboard disabling are deterrence controls, not forensic identity proof.
- **Remediation:** Reframe proctoring features as candidate telemetry. Implement explicit consent dialogs, retention/auto-purge policies, accessibility accommodations, and human appeal workflows.

---

## 3. Recommended Monorepo Architecture

To support an enterprise-grade service, the codebase should evolve from a client-centric bundle into a modular monorepo:

```
atelier-ai/
├── apps/
│   ├── web/                    # Learner UI: lessons, labs, theory-test interface
│   └── admin/                  # Authoring, question review, cohort analytics, item stats
├── services/
│   ├── assessment/             # Server-side form generation, timing, autosave, scoring, recovery
│   ├── content/                # Curriculum, sources, cases, skills, versions
│   ├── evals/                  # Capstone execution, failure injection, rubric evaluation
│   └── integrations/           # Claude API, MCP runtime, enterprise connectors
└── packages/
    ├── policy/                 # Deterministic gates, authorization, rate limits
    ├── schemas/                # Typed shared contracts (Zod / JSON Schema)
    └── design-system/          # Reusable tokens and components
```

---

## 4. Commercial Product Triad

The platform should be packaged into three distinct offerings:

1. **Atelier Learn:** Source-grounded courses covering Claude reasoning, Claude Code, MCP, agent architecture, structured output, and context engineering.
2. **Atelier Assess:** Theory-test diagnostics, timed mocks, weakness retests, cohort analytics, and psychometric competency reporting.
3. **Atelier Labs:** Executable sandboxes for agent failure injection, cyber-physical harness DRCs, voice runtimes, and capstone defense.

---

## 5. Distinct Claude Competency Surfaces

Ensure learners understand the separate operational profiles of the Claude ecosystem:

1. **Claude (Chat / Web):** Advanced reasoning, document synthesis, multi-step thought processes, and architectural trade-off analysis.
2. **Claude Code (CLI / IDE):** Repository-aware engineering, `CLAUDE.md`, rules, skills, hooks, subagents, and automated CI test loops.
3. **Cowork / Delegated Operations:** File connectors, human-in-the-loop approvals, long-running batch workflows, and operational provenance.

---

## 6. SWOT Analysis

| Aspect | Factors |
| :--- | :--- |
| **Strengths** | Differentiated competency loop (learn $\to$ capstone); practical cyber-physical harness simulation; cross-surface Claude coverage; domain-aligned psychometric foundations. |
| **Weaknesses** | Monolithic client-side state; answer keys exposed in browser; claim inflation; zero empirical item calibration data. |
| **Opportunities** | Enterprise AI upskilling; corporate AI architecture readiness assessments; role-based certification prep; verifiable applied AI lab portfolios. |
| **Threats** | Vendor trademark/IP conflicts; rapid API/interface shifts in upstream Claude products; privacy liabilities with proctoring telemetry; credibility damage from unverified safety claims. |

---

## 7. 90-Day SMART Objective & Key Performance Indicators

### SMART Target
> **Within 90 days, transform ATELIER-AI from a high-end integrated prototype into a pilot-ready assessment and laboratory platform with server-side exam state, evidence-classified claims, CI/security gates, versioned source provenance, at least one end-to-end automated capstone case, and measurable learner telemetry across a 20–50 candidate pilot cohort.**

### 90-Day KPIs
1. **Source Lineage:** 100% of scored items source-linked to official documentation and independently reviewed.
2. **Claims Integrity:** 0 public claims that exceed their established evidence class (Tier 1 compliance).
3. **Test Coverage:** $\ge 80\%$ automated unit and integration test coverage for core assessment and policy services.
4. **Attempt Recovery:** 100% state recovery of active exam sessions after simulated client disconnects or browser crashes.
5. **Tool Safety & Idempotency:** 100% of consequential agent tools governed by explicit authorization gates and idempotency/retry policies.
6. **Empirical Calibration:** Execution of a controlled 20–50 candidate pilot producing baseline psychometric statistics ($p$-values, $r_{pb}$, distractor distributions).
