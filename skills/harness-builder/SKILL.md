---
name: harness-builder
description: Designs and evaluates production agent harnesses using Claude Code, Agent SDK, hooks, skills, subagents, MCP, validators, permissions and observability. Use when building or hardening an agentic workflow.
---
# Harness Builder

## Build sequence
1. Define success and failure conditions.
2. Identify invariants that must be deterministic.
3. Minimize tools by agent role.
4. Define typed tool inputs, outputs and errors.
5. Add checkpoints/session recovery.
6. Add validators before model-based reviewers.
7. Add human gates for consequential/ambiguous actions.
8. Instrument tool calls, retries, failures, cost, latency and outcomes.
9. Build at least three evals before broad rollout.
10. Run regression tests after every skill/prompt/tool change.
