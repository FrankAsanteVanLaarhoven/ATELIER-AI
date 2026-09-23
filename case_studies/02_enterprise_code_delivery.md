# Case Study 2 — Enterprise Claude Code Delivery Harness

## Real-world brief
A software organization wants Claude Code to accelerate feature work and pull-request review across a monorepo without violating repository conventions or flooding CI with noisy comments.

## Business objective
Increase engineering throughput while keeping code review precise, reproducible and auditable.

## System
- Project `CLAUDE.md` plus modular `.claude/rules/`.
- Skills for test generation, migration review and release notes.
- MCP integrations for issue tracker and internal docs.
- Subagents for bounded repository research and independent review.
- Hooks for prohibited paths, secret checks and validation.
- CI non-interactive runner with structured output.

## Learner tasks
1. Convert a monolithic instruction file into layered project/path rules.
2. Decide plan mode vs direct execution for five change requests.
3. Build one skill with progressive disclosure and three evals.
4. Define least-privilege tool sets for coder, reviewer and dependency researcher.
5. Implement a CI review contract with deduplication and severity criteria.
6. Produce a regression suite for prompt/skill changes.

## Failure injections
- A user-only instruction is mistakenly assumed to be shared.
- The review agent repeats already-resolved findings.
- A subagent reads an unrelated large directory and exhausts context.
- A generated migration passes syntax checks but violates a business invariant.
- MCP issue tracker is temporarily unavailable.

## Required deliverables
Repository config tree, one production skill, hook policy, CI schema, 12 eval cases, failure analysis, 7-slide engineering review.

## Acceptance criteria
- Shared rules load consistently for all team runs.
- No critical write tool exposed to read-only research agents.
- CI output validates against schema on every test.
- Duplicate findings reduced to zero in the fixed regression fixtures.
- Unavailable external systems are represented as coverage gaps, not empty success.
