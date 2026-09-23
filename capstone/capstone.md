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

## Pass bands for this training service
- 85–100: production-readiness evidence is strong; minor improvements remain.
- 70–84: technically competent but important gaps remain before production.
- 55–69: partial capability; remediation required before advanced deployment.
- <55: rebuild core architecture/evaluation components and resubmit.

These are training-service bands, not Anthropic certification scores.

## Defense questions
- Which invariant is enforced in code rather than prompt text, and why?
- Which agent has the narrowest tool set, and what failure does that prevent?
- What happens when a source is inaccessible but other sources succeed?
- How do you resume safely after a mid-task failure?
- Which metric would make you roll back the skill/harness release?
- What evidence shows your slide deck did not introduce unsupported claims?
