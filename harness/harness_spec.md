# Agent & Harness Specification

## Principle
Use deterministic software for invariants and probabilistic agents for judgment. Never ask the model to enforce what code can enforce reliably.

## Runtime stages
1. Intake validator — validates task, tenant, permissions, data classification.
2. Planner — selects workflow and decomposes work.
3. Policy gate — checks allowed tools/actions.
4. Specialist agents — run with least-privilege tool sets.
5. Deterministic validators — schema, tests, lint, numeric checks, citation presence.
6. Critic/reviewer — inspects only unresolved semantic quality issues.
7. Human gate — required for consequential or ambiguous outputs.
8. Publisher — writes approved artifact/result.
9. Telemetry — records prompt/version/tools/errors/latency/cost/outcome.

## Claude Code harness
- Project `CLAUDE.md` for shared conventions.
- `.claude/rules/` for conditional/path rules.
- Skills for reusable workflows.
- Hooks for deterministic policy checks and post-tool validation.
- Subagents for bounded parallel research/review.
- MCP servers for external systems.
- CI invokes non-interactively and consumes structured output.

## Claude Chat harness
- System/project context + source pack.
- Explicit output contract.
- Retrieval/source requirement for factual claims.
- Review pass for high-impact deliverables.
- No external side effect without explicit tool/action and approval.

## Claude Cowork harness
- Workspace/folder scope.
- Connector allowlist and read/write split.
- Skills/plugins bundle the organization’s process.
- Checkpoints after plan, before external write, and before publication.
- Scheduled work runs with the same policy bundle and audit trail.

## Eval harness
For every reusable skill/agent:
- Minimum three representative evals before release.
- Baseline without skill/agent.
- Expected-behavior rubric.
- Negative tests and ambiguity tests.
- Regression suite on every version.
- Track pass rate, policy violations, retries, tool misuse, provenance completeness, cost and latency.
