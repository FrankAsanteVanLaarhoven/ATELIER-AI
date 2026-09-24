# Capstone — Governed Multi-Surface Claude Operating System

## Challenge
Design and demonstrate a production-ready Claude solution that starts with a real business request, uses the appropriate Claude surface(s), performs multi-step work with tools/agents, produces a verified deliverable, and presents the decision to stakeholders.

The capstone must use at least:
- one Claude Code or Agent SDK workflow;
- one MCP integration or equivalent structured external tool integration;
- one reusable skill;
- one deterministic validator/hook/policy gate;
- one Cowork/knowledge-work workflow;
- one Claude Slides/Design output;
- one human approval gate;
- one evaluation suite with baseline and improved result.

## Required architecture
Intake → classify risk → plan → retrieve/act → validate → review → human gate → publish → audit.

## Deliverables
1. Problem statement and measurable success criteria.
2. Architecture and trust-boundary diagram.
3. Tool/MCP contracts and permission matrix.
4. Agent/skill/harness configuration.
5. Working demonstration or reproducible trace.
6. Eval suite with at least 15 cases, including negative and ambiguity tests.
7. Failure-recovery report for at least three injected faults.
8. Provenance ledger.
9. Executive memo.
10. 10-slide final presentation.

## 100-point rubric
- Architecture and decomposition — 15
- Tool/MCP design and least privilege — 10
- Claude Code / Agent SDK implementation — 10
- Skills/hooks/harness quality — 10
- Context, provenance and reliability — 15
- Evaluation quality and regression evidence — 15
- Human oversight, security and governance — 10
- Deliverable quality and factual traceability — 5
- Slide narrative/design quality — 5
- Demonstration and defense — 5

## Pass bands & Atelier Credentialing
- **Band 1 (85–100 points)**: *Production-Readiness Verified* — Issues the **Atelier Certified Architect — Capstone Defense Record (`ATELIER-CAPSTONE-2026`)** with verifiable execution traces and cryptographic SHA-256 artifact digest.
- **Band 2 (70–84 points)**: *Technically Competent* — Core invariants satisfied; requires secondary review before production release.
- **Band 3 (55–69 points)**: *Remediation Required* — Gaps in failure recovery, tool boundaries, or test coverage.
- **Band 4 (<55 points)**: *Unsatisfactory* — Fundamental architectural or invariant defects; resubmission required.

> **Governance Notice:** *These evaluation bands and badges represent internal Atelier competency frameworks and do not confer official Anthropic or Pearson VUE credentials.*

## Required Claude Surface Coverage
Candidates must demonstrate distinct understanding across three separate operating profiles:
1. **Claude (Chat / Web)**: Advanced multi-step reasoning, trade-off analysis, and document synthesis.
2. **Claude Code (CLI / IDE)**: Repository-aware engineering, `CLAUDE.md`, `.claude/rules/`, progressive disclosure skills, and headless CI verification.
3. **Cowork / Delegated Operations**: File connectors, long-running batch tasks, human approvals, and operational provenance.

## Defense Questions (Oral Examination)
- Which invariant is enforced in deterministic code rather than prompt text, and why?
- Which agent has the narrowest tool set, and what failure does that boundary prevent?
- What happens when a source is inaccessible but other sources succeed?
- How do you resume safely and idempotently after a mid-task failure?
- Which metric would trigger an automated rollback of your skill/harness release?
- What evidence proves your slide deck did not introduce unsupported claims?
- How do you verify that LLMs are not deployed as primary safety functions in physical operations?
