# Curriculum Map

## Core certification-aligned domains

### Domain 1 — Agentic Architecture & Orchestration (27%)
1.1 Agentic loops for autonomous task execution  
1.2 Coordinator–subagent orchestration  
1.3 Subagent invocation, context passing and spawning  
1.4 Multi-step workflow enforcement and handoff  
1.5 Agent SDK hooks for interception/normalization  
1.6 Task-decomposition strategies  
1.7 Session state, resumption and forking

### Domain 2 — Tool Design & MCP Integration (18%)
2.1 Tool interfaces, descriptions and boundaries  
2.2 Structured tool/MCP error responses  
2.3 Tool distribution and `tool_choice`  
2.4 MCP server integration  
2.5 Built-in tool selection: Read, Write, Edit, Bash, Grep, Glob

### Domain 3 — Claude Code Configuration & Workflows (20%)
3.1 `CLAUDE.md` hierarchy, scope and modular organization  
3.2 Custom commands and skills  
3.3 Path-specific rules / conditional convention loading  
3.4 Plan mode vs direct execution  
3.5 Iterative refinement  
3.6 CI/CD integration and machine-readable execution

### Domain 4 — Prompt Engineering & Structured Output (20%)
4.1 Explicit criteria and false-positive reduction  
4.2 Few-shot prompting  
4.3 Structured output with tool use / JSON schemas  
4.4 Validation, retry and feedback loops  
4.5 Batch-processing strategies  
4.6 Multi-instance / multi-pass review

### Domain 5 — Context Management & Reliability (15%)
5.1 Preserve critical context across long interactions  
5.2 Escalation and ambiguity resolution  
5.3 Error propagation across multi-agent systems  
5.4 Large-codebase context management  
5.5 Human review and confidence calibration  
5.6 Provenance and uncertainty in multi-source synthesis

## Extended applied tracks

### Track A — Claude Chat / reasoning surface
- Problem framing and high-quality delegation.
- Source-grounded research and synthesis.
- Projects, artifacts and reusable context.
- Structured reasoning outputs and review loops.
- Human decision ownership and approval boundaries.

### Track B — Claude Cowork / delegated knowledge work
- Working folders, local files, browser and connectors.
- Multi-step delegation and progress steering.
- Skills and plugins for repeatable organizational workflows.
- Scheduled tasks and background work.
- Safe review/approval before consequential actions.
- Office workflows: documents, spreadsheets, presentations and email.

### Track C — Claude Code / software engineering
- Repository exploration and scoped context.
- `CLAUDE.md`, `.claude/rules/`, skills and commands.
- Plan/direct execution selection.
- Hooks and permission controls.
- Subagents and parallel task decomposition.
- MCP integrations.
- Non-interactive CI/CD use and structured outputs.
- Agent SDK patterns for production agents.

### Track D — Agent/Skill/Harness Engineering
- Skill authoring with progressive disclosure.
- Deterministic validators around probabilistic agents.
- Typed tool contracts and structured errors.
- Session/checkpoint/resume semantics.
- Evals-first development.
- Multi-agent role separation and least-tool access.
- Observability, replay and provenance.

### Track E — Claude Slides / Design
- Story architecture: audience → decision → evidence → narrative.
- Design-system ingestion: typography, spacing, components, brand rules.
- Slide-generation skill with reusable layouts and content constraints.
- Evidence-linked charts/tables and source footers.
- On-canvas iteration, comments and review.
- Export to PPTX/PDF and handoff between Design and Code where appropriate.
- Executive, technical and training deck variants.
