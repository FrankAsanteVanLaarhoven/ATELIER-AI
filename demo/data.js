// Generated Claude Architect Enterprise Platform Data Layer
export const QUESTION_BANK = [
  {
    "id": "Q-11-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.1",
    "task_title": "Agentic loops",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, The agent stops after emitting ordinary text even though a tool call is still required to finish the task. What is the best architectural response?",
    "options": {
      "A": "Replace the loop with a keyword classifier that looks for words such as done or complete.",
      "B": "Use a fixed maximum of two turns and assume the task is complete afterward.",
      "C": "Stop whenever the assistant produces a complete-sounding paragraph.",
      "D": "Drive termination from the response stop reason: execute requested tools on tool_use, append tool results, and continue until an end-turn condition is reached."
    },
    "correct": [
      "D"
    ],
    "rationale": "The loop must follow the model/tool protocol, not natural-language guesses about completion.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-11-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.1",
    "task_title": "Agentic loops",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, The agent stops after emitting ordinary text even though a tool call is still required to finish the task. What is the best architectural response?",
    "options": {
      "A": "Drive termination from the response stop reason: execute requested tools on tool_use, append tool results, and continue until an end-turn condition is reached.",
      "B": "Use a fixed maximum of two turns and assume the task is complete afterward.",
      "C": "Replace the loop with a keyword classifier that looks for words such as done or complete.",
      "D": "Stop whenever the assistant produces a complete-sounding paragraph."
    },
    "correct": [
      "A"
    ],
    "rationale": "The loop must follow the model/tool protocol, not natural-language guesses about completion.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-11-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.1",
    "task_title": "Agentic loops",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, The agent stops after emitting ordinary text even though a tool call is still required to finish the task. What is the best architectural response?",
    "options": {
      "A": "Drive termination from the response stop reason: execute requested tools on tool_use, append tool results, and continue until an end-turn condition is reached.",
      "B": "Use a fixed maximum of two turns and assume the task is complete afterward.",
      "C": "Replace the loop with a keyword classifier that looks for words such as done or complete.",
      "D": "Stop whenever the assistant produces a complete-sounding paragraph."
    },
    "correct": [
      "A"
    ],
    "rationale": "The loop must follow the model/tool protocol, not natural-language guesses about completion.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-12-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.2",
    "task_title": "Multi-agent orchestration",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A coordinator delegates work to several specialists, but their scopes overlap and the final synthesis misses coverage. What is the best architectural response?",
    "options": {
      "A": "Give the coordinator explicit decomposition and aggregation responsibilities, with non-overlapping specialist scopes and a completeness check before synthesis.",
      "B": "Remove the coordinator and allow specialists to call one another freely.",
      "C": "Let every specialist investigate the entire problem independently and concatenate their answers.",
      "D": "Use one generalist agent with every available tool so no routing is required."
    },
    "correct": [
      "A"
    ],
    "rationale": "Coordinator\u2013subagent designs work when ownership, context, and aggregation criteria are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-12-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.2",
    "task_title": "Multi-agent orchestration",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A coordinator delegates work to several specialists, but their scopes overlap and the final synthesis misses coverage. What is the best architectural response?",
    "options": {
      "A": "Give the coordinator explicit decomposition and aggregation responsibilities, with non-overlapping specialist scopes and a completeness check before synthesis.",
      "B": "Remove the coordinator and allow specialists to call one another freely.",
      "C": "Let every specialist investigate the entire problem independently and concatenate their answers.",
      "D": "Use one generalist agent with every available tool so no routing is required."
    },
    "correct": [
      "A"
    ],
    "rationale": "Coordinator\u2013subagent designs work when ownership, context, and aggregation criteria are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-12-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.2",
    "task_title": "Multi-agent orchestration",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A coordinator delegates work to several specialists, but their scopes overlap and the final synthesis misses coverage. What is the best architectural response?",
    "options": {
      "A": "Let every specialist investigate the entire problem independently and concatenate their answers.",
      "B": "Use one generalist agent with every available tool so no routing is required.",
      "C": "Remove the coordinator and allow specialists to call one another freely.",
      "D": "Give the coordinator explicit decomposition and aggregation responsibilities, with non-overlapping specialist scopes and a completeness check before synthesis."
    },
    "correct": [
      "D"
    ],
    "rationale": "Coordinator\u2013subagent designs work when ownership, context, and aggregation criteria are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-13-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.3",
    "task_title": "Subagent context",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, Subagents receive the entire parent history, causing context bloat and inconsistent focus. What is the best architectural response?",
    "options": {
      "A": "Give subagents no context and rely on them to rediscover everything.",
      "B": "Share only the user\u2019s last sentence regardless of the task.",
      "C": "Pass only the task-relevant context, expected output contract, and necessary evidence to each subagent; return compact structured results to the parent.",
      "D": "Always clone the full parent conversation into every subagent."
    },
    "correct": [
      "C"
    ],
    "rationale": "Bounded context improves focus and avoids unnecessary context-window pressure.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-13-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.3",
    "task_title": "Subagent context",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, Subagents receive the entire parent history, causing context bloat and inconsistent focus. What is the best architectural response?",
    "options": {
      "A": "Pass only the task-relevant context, expected output contract, and necessary evidence to each subagent; return compact structured results to the parent.",
      "B": "Give subagents no context and rely on them to rediscover everything.",
      "C": "Always clone the full parent conversation into every subagent.",
      "D": "Share only the user\u2019s last sentence regardless of the task."
    },
    "correct": [
      "A"
    ],
    "rationale": "Bounded context improves focus and avoids unnecessary context-window pressure.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-13-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.3",
    "task_title": "Subagent context",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Subagents receive the entire parent history, causing context bloat and inconsistent focus. What is the best architectural response?",
    "options": {
      "A": "Give subagents no context and rely on them to rediscover everything.",
      "B": "Share only the user\u2019s last sentence regardless of the task.",
      "C": "Pass only the task-relevant context, expected output contract, and necessary evidence to each subagent; return compact structured results to the parent.",
      "D": "Always clone the full parent conversation into every subagent."
    },
    "correct": [
      "C"
    ],
    "rationale": "Bounded context improves focus and avoids unnecessary context-window pressure.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-14-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.4",
    "task_title": "Workflow enforcement and handoff",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A regulated workflow occasionally skips a mandatory verification step before a consequential action. What is the best architectural response?",
    "options": {
      "A": "Strengthen the prose prompt and trust the model to remember the step.",
      "B": "Enforce the prerequisite programmatically and require a structured handoff when the workflow cannot proceed safely.",
      "C": "Ask the user to repeat the policy at the start of every session.",
      "D": "Add more temperature randomness so the agent explores alternative paths."
    },
    "correct": [
      "B"
    ],
    "rationale": "Hard invariants belong in deterministic gates; handoffs should preserve the facts needed by the next actor.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-14-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.4",
    "task_title": "Workflow enforcement and handoff",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A regulated workflow occasionally skips a mandatory verification step before a consequential action. What is the best architectural response?",
    "options": {
      "A": "Strengthen the prose prompt and trust the model to remember the step.",
      "B": "Enforce the prerequisite programmatically and require a structured handoff when the workflow cannot proceed safely.",
      "C": "Ask the user to repeat the policy at the start of every session.",
      "D": "Add more temperature randomness so the agent explores alternative paths."
    },
    "correct": [
      "B"
    ],
    "rationale": "Hard invariants belong in deterministic gates; handoffs should preserve the facts needed by the next actor.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-14-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.4",
    "task_title": "Workflow enforcement and handoff",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Structured Data Extraction scenario, A regulated workflow occasionally skips a mandatory verification step before a consequential action. Select TWO actions that best address the problem.",
    "options": {
      "A": "Enforce the prerequisite programmatically and require a structured handoff when the workflow cannot proceed safely.",
      "B": "Include the verified facts and unresolved reason in a structured handoff payload.",
      "C": "Strengthen the prose prompt and trust the model to remember the step.",
      "D": "Add more temperature randomness so the agent explores alternative paths."
    },
    "correct": [
      "A",
      "B"
    ],
    "rationale": "Hard invariants belong in deterministic gates; handoffs should preserve the facts needed by the next actor. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-15-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.5",
    "task_title": "Agent SDK hooks",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Tool calls need consistent normalization and policy checks before and after execution. What is the best architectural response?",
    "options": {
      "A": "Use hooks to intercept the relevant tool lifecycle events, enforce policy, normalize inputs/outputs, and record the outcome.",
      "B": "Duplicate the same policy text inside every tool description.",
      "C": "Run a second model after the entire session and hope it catches violations.",
      "D": "Encode the policy only in the final response template."
    },
    "correct": [
      "A"
    ],
    "rationale": "Hooks are appropriate for cross-cutting checks around tool execution.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-15-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.5",
    "task_title": "Agent SDK hooks",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, Tool calls need consistent normalization and policy checks before and after execution. What is the best architectural response?",
    "options": {
      "A": "Duplicate the same policy text inside every tool description.",
      "B": "Run a second model after the entire session and hope it catches violations.",
      "C": "Use hooks to intercept the relevant tool lifecycle events, enforce policy, normalize inputs/outputs, and record the outcome.",
      "D": "Encode the policy only in the final response template."
    },
    "correct": [
      "C"
    ],
    "rationale": "Hooks are appropriate for cross-cutting checks around tool execution.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-15-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.5",
    "task_title": "Agent SDK hooks",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Developer Productivity with Claude scenario, Tool calls need consistent normalization and policy checks before and after execution. Select TWO actions that best address the problem.",
    "options": {
      "A": "Encode the policy only in the final response template.",
      "B": "Emit audit telemetry for the hook decision so policy behavior can be replayed and tested.",
      "C": "Run a second model after the entire session and hope it catches violations.",
      "D": "Use hooks to intercept the relevant tool lifecycle events, enforce policy, normalize inputs/outputs, and record the outcome."
    },
    "correct": [
      "B",
      "D"
    ],
    "rationale": "Hooks are appropriate for cross-cutting checks around tool execution. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-16-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.6",
    "task_title": "Task decomposition",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A complex task is split into dozens of tiny subtasks, increasing overhead and losing the end goal. What is the best architectural response?",
    "options": {
      "A": "Avoid decomposition and keep all work in one unbounded context.",
      "B": "Split work randomly so each agent receives an equal token budget.",
      "C": "Decompose by meaningful deliverables with clear dependencies and acceptance criteria, keeping tightly coupled work together.",
      "D": "Create one subtask for every sentence in the user request."
    },
    "correct": [
      "C"
    ],
    "rationale": "Good decomposition reduces coupling while preserving coherent units of work.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-16-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.6",
    "task_title": "Task decomposition",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A complex task is split into dozens of tiny subtasks, increasing overhead and losing the end goal. What is the best architectural response?",
    "options": {
      "A": "Create one subtask for every sentence in the user request.",
      "B": "Avoid decomposition and keep all work in one unbounded context.",
      "C": "Decompose by meaningful deliverables with clear dependencies and acceptance criteria, keeping tightly coupled work together.",
      "D": "Split work randomly so each agent receives an equal token budget."
    },
    "correct": [
      "C"
    ],
    "rationale": "Good decomposition reduces coupling while preserving coherent units of work.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-16-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.6",
    "task_title": "Task decomposition",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A complex task is split into dozens of tiny subtasks, increasing overhead and losing the end goal. What is the best architectural response?",
    "options": {
      "A": "Split work randomly so each agent receives an equal token budget.",
      "B": "Avoid decomposition and keep all work in one unbounded context.",
      "C": "Create one subtask for every sentence in the user request.",
      "D": "Decompose by meaningful deliverables with clear dependencies and acceptance criteria, keeping tightly coupled work together."
    },
    "correct": [
      "D"
    ],
    "rationale": "Good decomposition reduces coupling while preserving coherent units of work.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-17-1",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.7",
    "task_title": "Session state",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A long-running task fails midway and the team must continue without replaying every completed step. What is the best architectural response?",
    "options": {
      "A": "Persist resumable session/checkpoint state and distinguish resume from fork so continuation preserves history while experiments branch safely.",
      "B": "Restart from the initial prompt and rely on the model to recreate prior work.",
      "C": "Store state only in an informal human note outside the workflow.",
      "D": "Copy only the final assistant message into a new session."
    },
    "correct": [
      "A"
    ],
    "rationale": "Explicit session state enables reliable continuation and controlled branching.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-17-2",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.7",
    "task_title": "Session state",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A long-running task fails midway and the team must continue without replaying every completed step. What is the best architectural response?",
    "options": {
      "A": "Store state only in an informal human note outside the workflow.",
      "B": "Persist resumable session/checkpoint state and distinguish resume from fork so continuation preserves history while experiments branch safely.",
      "C": "Restart from the initial prompt and rely on the model to recreate prior work.",
      "D": "Copy only the final assistant message into a new session."
    },
    "correct": [
      "B"
    ],
    "rationale": "Explicit session state enables reliable continuation and controlled branching.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-17-3",
    "version": 1,
    "status": "seed",
    "domain": 1,
    "task": "1.7",
    "task_title": "Session state",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A long-running task fails midway and the team must continue without replaying every completed step. What is the best architectural response?",
    "options": {
      "A": "Copy only the final assistant message into a new session.",
      "B": "Persist resumable session/checkpoint state and distinguish resume from fork so continuation preserves history while experiments branch safely.",
      "C": "Store state only in an informal human note outside the workflow.",
      "D": "Restart from the initial prompt and rely on the model to recreate prior work."
    },
    "correct": [
      "B"
    ],
    "rationale": "Explicit session state enables reliable continuation and controlled branching.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-21-1",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.1",
    "task_title": "Tool interface design",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Two similar tools are frequently confused because their names and descriptions overlap. What is the best architectural response?",
    "options": {
      "A": "Add more tools so the model has extra alternatives.",
      "B": "Merge unrelated operations into one catch-all tool.",
      "C": "Clarify each tool\u2019s purpose, accepted inputs, boundaries, examples, and when to use it instead of adjacent tools.",
      "D": "Keep the descriptions short and route by keywords in the user message."
    },
    "correct": [
      "C"
    ],
    "rationale": "Tool descriptions are a primary selection signal; clear boundaries reduce misrouting.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-21-2",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.1",
    "task_title": "Tool interface design",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, Two similar tools are frequently confused because their names and descriptions overlap. What is the best architectural response?",
    "options": {
      "A": "Clarify each tool\u2019s purpose, accepted inputs, boundaries, examples, and when to use it instead of adjacent tools.",
      "B": "Merge unrelated operations into one catch-all tool.",
      "C": "Keep the descriptions short and route by keywords in the user message.",
      "D": "Add more tools so the model has extra alternatives."
    },
    "correct": [
      "A"
    ],
    "rationale": "Tool descriptions are a primary selection signal; clear boundaries reduce misrouting.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-21-3",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.1",
    "task_title": "Tool interface design",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Two similar tools are frequently confused because their names and descriptions overlap. What is the best architectural response?",
    "options": {
      "A": "Keep the descriptions short and route by keywords in the user message.",
      "B": "Clarify each tool\u2019s purpose, accepted inputs, boundaries, examples, and when to use it instead of adjacent tools.",
      "C": "Merge unrelated operations into one catch-all tool.",
      "D": "Add more tools so the model has extra alternatives."
    },
    "correct": [
      "B"
    ],
    "rationale": "Tool descriptions are a primary selection signal; clear boundaries reduce misrouting.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-22-1",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.2",
    "task_title": "Structured errors",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A tool returns the same generic error string for timeouts, permission failures, and valid empty results. What is the best architectural response?",
    "options": {
      "A": "Return structured error information that distinguishes retryable failures, non-retryable failures, and valid empty results, with actionable context.",
      "B": "Throw unstructured stack traces directly into the model context.",
      "C": "Convert all failures into an empty successful result.",
      "D": "Retry every failure indefinitely with no backoff or classification."
    },
    "correct": [
      "A"
    ],
    "rationale": "Typed error semantics let the agent choose retry, alternate action, escalation, or normal continuation correctly.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-22-2",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.2",
    "task_title": "Structured errors",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A tool returns the same generic error string for timeouts, permission failures, and valid empty results. What is the best architectural response?",
    "options": {
      "A": "Retry every failure indefinitely with no backoff or classification.",
      "B": "Throw unstructured stack traces directly into the model context.",
      "C": "Return structured error information that distinguishes retryable failures, non-retryable failures, and valid empty results, with actionable context.",
      "D": "Convert all failures into an empty successful result."
    },
    "correct": [
      "C"
    ],
    "rationale": "Typed error semantics let the agent choose retry, alternate action, escalation, or normal continuation correctly.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-22-3",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.2",
    "task_title": "Structured errors",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Structured Data Extraction scenario, A tool returns the same generic error string for timeouts, permission failures, and valid empty results. Select TWO actions that best address the problem.",
    "options": {
      "A": "Throw unstructured stack traces directly into the model context.",
      "B": "Include a machine-readable retryability/category field rather than forcing the model to infer it from prose.",
      "C": "Return structured error information that distinguishes retryable failures, non-retryable failures, and valid empty results, with actionable context.",
      "D": "Convert all failures into an empty successful result."
    },
    "correct": [
      "B",
      "C"
    ],
    "rationale": "Typed error semantics let the agent choose retry, alternate action, escalation, or normal continuation correctly. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-23-1",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.3",
    "task_title": "Tool distribution",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, One agent has dozens of tools and frequently selects the wrong one. What is the best architectural response?",
    "options": {
      "A": "Give every agent every tool to maximize flexibility.",
      "B": "Give each agent the minimum tool set required for its role and use tool-choice controls only when the workflow requires a tool or a specific tool.",
      "C": "Force the same tool on every turn.",
      "D": "Replace tool descriptions with a list of trigger keywords."
    },
    "correct": [
      "B"
    ],
    "rationale": "Least-tool access improves selection reliability and supports least privilege.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-23-2",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.3",
    "task_title": "Tool distribution",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, One agent has dozens of tools and frequently selects the wrong one. What is the best architectural response?",
    "options": {
      "A": "Force the same tool on every turn.",
      "B": "Replace tool descriptions with a list of trigger keywords.",
      "C": "Give every agent every tool to maximize flexibility.",
      "D": "Give each agent the minimum tool set required for its role and use tool-choice controls only when the workflow requires a tool or a specific tool."
    },
    "correct": [
      "D"
    ],
    "rationale": "Least-tool access improves selection reliability and supports least privilege.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-23-3",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.3",
    "task_title": "Tool distribution",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Developer Productivity with Claude scenario, One agent has dozens of tools and frequently selects the wrong one. Select TWO actions that best address the problem.",
    "options": {
      "A": "Force the same tool on every turn.",
      "B": "Give each agent the minimum tool set required for its role and use tool-choice controls only when the workflow requires a tool or a specific tool.",
      "C": "Give every agent every tool to maximize flexibility.",
      "D": "Keep high-impact write tools unavailable to agents that only need read access."
    },
    "correct": [
      "B",
      "D"
    ],
    "rationale": "Least-tool access improves selection reliability and supports least privilege. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-24-1",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.4",
    "task_title": "MCP integration",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A team needs reusable access to an external service across Claude clients and workflows. What is the best architectural response?",
    "options": {
      "A": "Expose the capability through a well-scoped MCP server with typed tools/resources/prompts and configure the client at the appropriate scope.",
      "B": "Use browser automation even though a direct structured integration is available.",
      "C": "Build a separate custom protocol for each Claude surface.",
      "D": "Paste credentials and API examples into the system prompt."
    },
    "correct": [
      "A"
    ],
    "rationale": "MCP standardizes reusable context/tool integration and should be scoped deliberately.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-24-2",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.4",
    "task_title": "MCP integration",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A team needs reusable access to an external service across Claude clients and workflows. What is the best architectural response?",
    "options": {
      "A": "Expose the capability through a well-scoped MCP server with typed tools/resources/prompts and configure the client at the appropriate scope.",
      "B": "Build a separate custom protocol for each Claude surface.",
      "C": "Paste credentials and API examples into the system prompt.",
      "D": "Use browser automation even though a direct structured integration is available."
    },
    "correct": [
      "A"
    ],
    "rationale": "MCP standardizes reusable context/tool integration and should be scoped deliberately.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-24-3",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.4",
    "task_title": "MCP integration",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A team needs reusable access to an external service across Claude clients and workflows. What is the best architectural response?",
    "options": {
      "A": "Expose the capability through a well-scoped MCP server with typed tools/resources/prompts and configure the client at the appropriate scope.",
      "B": "Use browser automation even though a direct structured integration is available.",
      "C": "Build a separate custom protocol for each Claude surface.",
      "D": "Paste credentials and API examples into the system prompt."
    },
    "correct": [
      "A"
    ],
    "rationale": "MCP standardizes reusable context/tool integration and should be scoped deliberately.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-25-1",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.5",
    "task_title": "Built-in tools",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A coding agent needs to locate all files containing a specific import across a large repository. What is the best architectural response?",
    "options": {
      "A": "Use Bash for all searching even when a dedicated search tool is available.",
      "B": "Use Write to create a manifest and inspect it manually.",
      "C": "Use Grep for content search, optionally constrained by file pattern; then Read only the relevant files.",
      "D": "Read every file in the repository into context first."
    },
    "correct": [
      "C"
    ],
    "rationale": "Use the narrowest built-in tool for the job and grow context incrementally.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-25-2",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.5",
    "task_title": "Built-in tools",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A coding agent needs to locate all files containing a specific import across a large repository. What is the best architectural response?",
    "options": {
      "A": "Use Grep for content search, optionally constrained by file pattern; then Read only the relevant files.",
      "B": "Read every file in the repository into context first.",
      "C": "Use Write to create a manifest and inspect it manually.",
      "D": "Use Bash for all searching even when a dedicated search tool is available."
    },
    "correct": [
      "A"
    ],
    "rationale": "Use the narrowest built-in tool for the job and grow context incrementally.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-25-3",
    "version": 1,
    "status": "seed",
    "domain": 2,
    "task": "2.5",
    "task_title": "Built-in tools",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A coding agent needs to locate all files containing a specific import across a large repository. What is the best architectural response?",
    "options": {
      "A": "Use Grep for content search, optionally constrained by file pattern; then Read only the relevant files.",
      "B": "Use Write to create a manifest and inspect it manually.",
      "C": "Read every file in the repository into context first.",
      "D": "Use Bash for all searching even when a dedicated search tool is available."
    },
    "correct": [
      "A"
    ],
    "rationale": "Use the narrowest built-in tool for the job and grow context incrementally.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-31-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.1",
    "task_title": "CLAUDE.md hierarchy",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, Shared coding conventions work for one developer but not teammates, and a single instruction file has become bloated. What is the best architectural response?",
    "options": {
      "A": "Put every rule into one ever-growing root file.",
      "B": "Keep the conventions in a user-only file and ask teammates to copy it manually.",
      "C": "Encode conventions only in chat history.",
      "D": "Move shared instructions to project scope, modularize reusable guidance, and use the hierarchy/rules system so only relevant instructions load."
    },
    "correct": [
      "D"
    ],
    "rationale": "Correct scope and modular loading are essential for predictable team behavior.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-31-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.1",
    "task_title": "CLAUDE.md hierarchy",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, Shared coding conventions work for one developer but not teammates, and a single instruction file has become bloated. What is the best architectural response?",
    "options": {
      "A": "Encode conventions only in chat history.",
      "B": "Keep the conventions in a user-only file and ask teammates to copy it manually.",
      "C": "Move shared instructions to project scope, modularize reusable guidance, and use the hierarchy/rules system so only relevant instructions load.",
      "D": "Put every rule into one ever-growing root file."
    },
    "correct": [
      "C"
    ],
    "rationale": "Correct scope and modular loading are essential for predictable team behavior.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-31-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.1",
    "task_title": "CLAUDE.md hierarchy",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Claude Code for Continuous Integration scenario, Shared coding conventions work for one developer but not teammates, and a single instruction file has become bloated. Select TWO actions that best address the problem.",
    "options": {
      "A": "Use conditional/path-specific rules so unrelated conventions are not loaded for every task.",
      "B": "Put every rule into one ever-growing root file.",
      "C": "Keep the conventions in a user-only file and ask teammates to copy it manually.",
      "D": "Move shared instructions to project scope, modularize reusable guidance, and use the hierarchy/rules system so only relevant instructions load."
    },
    "correct": [
      "A",
      "D"
    ],
    "rationale": "Correct scope and modular loading are essential for predictable team behavior. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-32-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.2",
    "task_title": "Commands and skills",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A repeatable workflow should be discoverable and reusable across tasks, with instructions loaded only when relevant. What is the best architectural response?",
    "options": {
      "A": "Place the entire workflow permanently in the global system prompt.",
      "B": "Duplicate the workflow in every project file.",
      "C": "Create a new MCP server even though no external integration is required.",
      "D": "Package the workflow as a well-described skill; use an explicit command when the user should invoke a named action directly."
    },
    "correct": [
      "D"
    ],
    "rationale": "Skills provide reusable contextual procedures; commands are appropriate for explicit invocations.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-32-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.2",
    "task_title": "Commands and skills",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A repeatable workflow should be discoverable and reusable across tasks, with instructions loaded only when relevant. What is the best architectural response?",
    "options": {
      "A": "Create a new MCP server even though no external integration is required.",
      "B": "Package the workflow as a well-described skill; use an explicit command when the user should invoke a named action directly.",
      "C": "Place the entire workflow permanently in the global system prompt.",
      "D": "Duplicate the workflow in every project file."
    },
    "correct": [
      "B"
    ],
    "rationale": "Skills provide reusable contextual procedures; commands are appropriate for explicit invocations.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-32-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.2",
    "task_title": "Commands and skills",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A repeatable workflow should be discoverable and reusable across tasks, with instructions loaded only when relevant. What is the best architectural response?",
    "options": {
      "A": "Create a new MCP server even though no external integration is required.",
      "B": "Duplicate the workflow in every project file.",
      "C": "Place the entire workflow permanently in the global system prompt.",
      "D": "Package the workflow as a well-described skill; use an explicit command when the user should invoke a named action directly."
    },
    "correct": [
      "D"
    ],
    "rationale": "Skills provide reusable contextual procedures; commands are appropriate for explicit invocations.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-33-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.3",
    "task_title": "Path-specific rules",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, Frontend, backend, and infrastructure conventions are all loading for every file edit. What is the best architectural response?",
    "options": {
      "A": "Increase model context so unrelated rules are less noticeable.",
      "B": "Use path-specific rules/globs so conventions load conditionally for the relevant files.",
      "C": "Ask the developer to mention the file type in every prompt.",
      "D": "Repeat all conventions in every nested directory."
    },
    "correct": [
      "B"
    ],
    "rationale": "Conditional rules reduce irrelevant context and keep conventions precise.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-33-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.3",
    "task_title": "Path-specific rules",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, Frontend, backend, and infrastructure conventions are all loading for every file edit. What is the best architectural response?",
    "options": {
      "A": "Ask the developer to mention the file type in every prompt.",
      "B": "Use path-specific rules/globs so conventions load conditionally for the relevant files.",
      "C": "Repeat all conventions in every nested directory.",
      "D": "Increase model context so unrelated rules are less noticeable."
    },
    "correct": [
      "B"
    ],
    "rationale": "Conditional rules reduce irrelevant context and keep conventions precise.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-33-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.3",
    "task_title": "Path-specific rules",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, Frontend, backend, and infrastructure conventions are all loading for every file edit. What is the best architectural response?",
    "options": {
      "A": "Ask the developer to mention the file type in every prompt.",
      "B": "Increase model context so unrelated rules are less noticeable.",
      "C": "Repeat all conventions in every nested directory.",
      "D": "Use path-specific rules/globs so conventions load conditionally for the relevant files."
    },
    "correct": [
      "D"
    ],
    "rationale": "Conditional rules reduce irrelevant context and keep conventions precise.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-34-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.4",
    "task_title": "Plan vs direct execution",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A broad refactor touches architecture, migrations, tests, and multiple services. What is the best architectural response?",
    "options": {
      "A": "Always execute immediately because planning adds latency.",
      "B": "Decide solely from the number of tokens in the request.",
      "C": "Always use plan mode even for one-line obvious fixes.",
      "D": "Use plan mode to explore dependencies and agree the change strategy before execution; use direct execution for small, well-bounded edits."
    },
    "correct": [
      "D"
    ],
    "rationale": "The choice depends on uncertainty, blast radius, and need for exploration\u2014not task length alone.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-34-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.4",
    "task_title": "Plan vs direct execution",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, A broad refactor touches architecture, migrations, tests, and multiple services. What is the best architectural response?",
    "options": {
      "A": "Always execute immediately because planning adds latency.",
      "B": "Decide solely from the number of tokens in the request.",
      "C": "Use plan mode to explore dependencies and agree the change strategy before execution; use direct execution for small, well-bounded edits.",
      "D": "Always use plan mode even for one-line obvious fixes."
    },
    "correct": [
      "C"
    ],
    "rationale": "The choice depends on uncertainty, blast radius, and need for exploration\u2014not task length alone.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-34-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.4",
    "task_title": "Plan vs direct execution",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A broad refactor touches architecture, migrations, tests, and multiple services. What is the best architectural response?",
    "options": {
      "A": "Decide solely from the number of tokens in the request.",
      "B": "Use plan mode to explore dependencies and agree the change strategy before execution; use direct execution for small, well-bounded edits.",
      "C": "Always use plan mode even for one-line obvious fixes.",
      "D": "Always execute immediately because planning adds latency."
    },
    "correct": [
      "B"
    ],
    "rationale": "The choice depends on uncertainty, blast radius, and need for exploration\u2014not task length alone.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-35-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.5",
    "task_title": "Iterative refinement",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, A generated implementation repeatedly violates one interface contract despite increasingly long prose instructions. What is the best architectural response?",
    "options": {
      "A": "Add concrete input/output examples and executable tests, then iterate against failures rather than only lengthening the prompt.",
      "B": "Switch models without collecting a failing example.",
      "C": "Keep adding adjectives such as robust and production-grade.",
      "D": "Lower the temperature until every output becomes deterministic."
    },
    "correct": [
      "A"
    ],
    "rationale": "Examples and tests create observable feedback for progressive improvement.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-35-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.5",
    "task_title": "Iterative refinement",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A generated implementation repeatedly violates one interface contract despite increasingly long prose instructions. What is the best architectural response?",
    "options": {
      "A": "Add concrete input/output examples and executable tests, then iterate against failures rather than only lengthening the prompt.",
      "B": "Switch models without collecting a failing example.",
      "C": "Lower the temperature until every output becomes deterministic.",
      "D": "Keep adding adjectives such as robust and production-grade."
    },
    "correct": [
      "A"
    ],
    "rationale": "Examples and tests create observable feedback for progressive improvement.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-35-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.5",
    "task_title": "Iterative refinement",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, A generated implementation repeatedly violates one interface contract despite increasingly long prose instructions. What is the best architectural response?",
    "options": {
      "A": "Keep adding adjectives such as robust and production-grade.",
      "B": "Lower the temperature until every output becomes deterministic.",
      "C": "Add concrete input/output examples and executable tests, then iterate against failures rather than only lengthening the prompt.",
      "D": "Switch models without collecting a failing example."
    },
    "correct": [
      "C"
    ],
    "rationale": "Examples and tests create observable feedback for progressive improvement.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-36-1",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.6",
    "task_title": "CI/CD integration",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, An automated review job must run non-interactively and feed machine-readable results into a pipeline. What is the best architectural response?",
    "options": {
      "A": "Reuse the same long interactive session for every pull request.",
      "B": "Launch an interactive terminal session and scrape the screen output.",
      "C": "Run Claude Code non-interactively, enforce a structured output contract, pin shared review criteria, and validate the result before gating CI.",
      "D": "Accept free-form prose and parse it with regular expressions."
    },
    "correct": [
      "C"
    ],
    "rationale": "CI needs reproducible configuration, machine-readable output, and deterministic validation.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-36-2",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.6",
    "task_title": "CI/CD integration",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, An automated review job must run non-interactively and feed machine-readable results into a pipeline. What is the best architectural response?",
    "options": {
      "A": "Launch an interactive terminal session and scrape the screen output.",
      "B": "Run Claude Code non-interactively, enforce a structured output contract, pin shared review criteria, and validate the result before gating CI.",
      "C": "Accept free-form prose and parse it with regular expressions.",
      "D": "Reuse the same long interactive session for every pull request."
    },
    "correct": [
      "B"
    ],
    "rationale": "CI needs reproducible configuration, machine-readable output, and deterministic validation.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-36-3",
    "version": 1,
    "status": "seed",
    "domain": 3,
    "task": "3.6",
    "task_title": "CI/CD integration",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Developer Productivity with Claude scenario, An automated review job must run non-interactively and feed machine-readable results into a pipeline. Select TWO actions that best address the problem.",
    "options": {
      "A": "Use a fresh, reproducible CI context rather than depending on an interactive developer session.",
      "B": "Run Claude Code non-interactively, enforce a structured output contract, pin shared review criteria, and validate the result before gating CI.",
      "C": "Launch an interactive terminal session and scrape the screen output.",
      "D": "Accept free-form prose and parse it with regular expressions."
    },
    "correct": [
      "A",
      "B"
    ],
    "rationale": "CI needs reproducible configuration, machine-readable output, and deterministic validation. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-41-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.1",
    "task_title": "Explicit criteria",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, A review prompt produces many false positives because it only says to find problems. What is the best architectural response?",
    "options": {
      "A": "Ask for every possible issue so recall is maximized regardless of precision.",
      "B": "Tell the model to be more careful without changing the criteria.",
      "C": "Increase the number of reviewer agents before clarifying the task.",
      "D": "Define explicit, testable finding criteria, severity rules, and conditions that should not be reported."
    },
    "correct": [
      "D"
    ],
    "rationale": "Precise criteria improve calibration and reduce false positives.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-41-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.1",
    "task_title": "Explicit criteria",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, A review prompt produces many false positives because it only says to find problems. What is the best architectural response?",
    "options": {
      "A": "Tell the model to be more careful without changing the criteria.",
      "B": "Increase the number of reviewer agents before clarifying the task.",
      "C": "Ask for every possible issue so recall is maximized regardless of precision.",
      "D": "Define explicit, testable finding criteria, severity rules, and conditions that should not be reported."
    },
    "correct": [
      "D"
    ],
    "rationale": "Precise criteria improve calibration and reduce false positives.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-41-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.1",
    "task_title": "Explicit criteria",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A review prompt produces many false positives because it only says to find problems. What is the best architectural response?",
    "options": {
      "A": "Ask for every possible issue so recall is maximized regardless of precision.",
      "B": "Tell the model to be more careful without changing the criteria.",
      "C": "Define explicit, testable finding criteria, severity rules, and conditions that should not be reported.",
      "D": "Increase the number of reviewer agents before clarifying the task."
    },
    "correct": [
      "C"
    ],
    "rationale": "Precise criteria improve calibration and reduce false positives.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-42-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.2",
    "task_title": "Few-shot prompting",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Outputs have the right concept but inconsistent format and boundary decisions. What is the best architectural response?",
    "options": {
      "A": "Force all outputs to the same length regardless of content.",
      "B": "Add a very long abstract definition with no examples.",
      "C": "Randomize the system prompt between requests.",
      "D": "Provide a small set of representative examples showing desired outputs and important edge/boundary cases."
    },
    "correct": [
      "D"
    ],
    "rationale": "Few-shot examples are especially useful for format and nuanced decision boundaries.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-42-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.2",
    "task_title": "Few-shot prompting",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Outputs have the right concept but inconsistent format and boundary decisions. What is the best architectural response?",
    "options": {
      "A": "Add a very long abstract definition with no examples.",
      "B": "Provide a small set of representative examples showing desired outputs and important edge/boundary cases.",
      "C": "Randomize the system prompt between requests.",
      "D": "Force all outputs to the same length regardless of content."
    },
    "correct": [
      "B"
    ],
    "rationale": "Few-shot examples are especially useful for format and nuanced decision boundaries.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-42-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.2",
    "task_title": "Few-shot prompting",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, Outputs have the right concept but inconsistent format and boundary decisions. What is the best architectural response?",
    "options": {
      "A": "Add a very long abstract definition with no examples.",
      "B": "Randomize the system prompt between requests.",
      "C": "Force all outputs to the same length regardless of content.",
      "D": "Provide a small set of representative examples showing desired outputs and important edge/boundary cases."
    },
    "correct": [
      "D"
    ],
    "rationale": "Few-shot examples are especially useful for format and nuanced decision boundaries.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-43-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.3",
    "task_title": "Structured output",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Downstream software requires valid structured records, but the model sometimes returns prose around JSON. What is the best architectural response?",
    "options": {
      "A": "Ask for JSON in plain text and trust it without validation.",
      "B": "Use tool/schema-constrained structured output and validate the returned fields semantically before acceptance.",
      "C": "Store the whole response as an untyped string.",
      "D": "Strip non-JSON text with a regular expression and accept the remainder."
    },
    "correct": [
      "B"
    ],
    "rationale": "Schema enforcement improves syntactic reliability; semantic validation is still required.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-43-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.3",
    "task_title": "Structured output",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Downstream software requires valid structured records, but the model sometimes returns prose around JSON. What is the best architectural response?",
    "options": {
      "A": "Ask for JSON in plain text and trust it without validation.",
      "B": "Strip non-JSON text with a regular expression and accept the remainder.",
      "C": "Store the whole response as an untyped string.",
      "D": "Use tool/schema-constrained structured output and validate the returned fields semantically before acceptance."
    },
    "correct": [
      "D"
    ],
    "rationale": "Schema enforcement improves syntactic reliability; semantic validation is still required.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-43-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.3",
    "task_title": "Structured output",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Claude Code for Continuous Integration scenario, Downstream software requires valid structured records, but the model sometimes returns prose around JSON. Select TWO actions that best address the problem.",
    "options": {
      "A": "Validate required business semantics after schema validation succeeds.",
      "B": "Use tool/schema-constrained structured output and validate the returned fields semantically before acceptance.",
      "C": "Ask for JSON in plain text and trust it without validation.",
      "D": "Strip non-JSON text with a regular expression and accept the remainder."
    },
    "correct": [
      "A",
      "B"
    ],
    "rationale": "Schema enforcement improves syntactic reliability; semantic validation is still required. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-44-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.4",
    "task_title": "Validation and retry",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Extraction output is syntactically valid but occasionally violates business rules or contradicts the source. What is the best architectural response?",
    "options": {
      "A": "Run deterministic validation, return specific validation errors to a bounded retry loop, and escalate when the source cannot support a valid answer.",
      "B": "Accept any schema-valid record as correct.",
      "C": "Discard the source after the first extraction attempt.",
      "D": "Retry the same prompt indefinitely with no feedback."
    },
    "correct": [
      "A"
    ],
    "rationale": "Validation must cover semantics as well as shape, and retries need actionable feedback and stopping rules.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-44-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.4",
    "task_title": "Validation and retry",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Extraction output is syntactically valid but occasionally violates business rules or contradicts the source. What is the best architectural response?",
    "options": {
      "A": "Accept any schema-valid record as correct.",
      "B": "Retry the same prompt indefinitely with no feedback.",
      "C": "Run deterministic validation, return specific validation errors to a bounded retry loop, and escalate when the source cannot support a valid answer.",
      "D": "Discard the source after the first extraction attempt."
    },
    "correct": [
      "C"
    ],
    "rationale": "Validation must cover semantics as well as shape, and retries need actionable feedback and stopping rules.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-44-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.4",
    "task_title": "Validation and retry",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Multi-Agent Research System scenario, Extraction output is syntactically valid but occasionally violates business rules or contradicts the source. Select TWO actions that best address the problem.",
    "options": {
      "A": "Accept any schema-valid record as correct.",
      "B": "Retry the same prompt indefinitely with no feedback.",
      "C": "Set a bounded retry/stop policy so impossible extractions do not loop indefinitely.",
      "D": "Run deterministic validation, return specific validation errors to a bounded retry loop, and escalate when the source cannot support a valid answer."
    },
    "correct": [
      "C",
      "D"
    ],
    "rationale": "Validation must cover semantics as well as shape, and retries need actionable feedback and stopping rules. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-45-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.5",
    "task_title": "Batch processing",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Thousands of independent, non-urgent records must be processed cost-efficiently overnight. What is the best architectural response?",
    "options": {
      "A": "Use an asynchronous batch strategy when latency permits, attach stable IDs for reconciliation, and handle item-level failures separately.",
      "B": "Drop identifiers because output order will always match input order.",
      "C": "Send every item synchronously at interactive priority.",
      "D": "Combine all records into one giant prompt so there is only one request."
    },
    "correct": [
      "A"
    ],
    "rationale": "Batching fits high-volume, latency-tolerant workloads and requires reliable result correlation.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-45-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.5",
    "task_title": "Batch processing",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, Thousands of independent, non-urgent records must be processed cost-efficiently overnight. What is the best architectural response?",
    "options": {
      "A": "Combine all records into one giant prompt so there is only one request.",
      "B": "Send every item synchronously at interactive priority.",
      "C": "Drop identifiers because output order will always match input order.",
      "D": "Use an asynchronous batch strategy when latency permits, attach stable IDs for reconciliation, and handle item-level failures separately."
    },
    "correct": [
      "D"
    ],
    "rationale": "Batching fits high-volume, latency-tolerant workloads and requires reliable result correlation.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-45-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.5",
    "task_title": "Batch processing",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, Thousands of independent, non-urgent records must be processed cost-efficiently overnight. What is the best architectural response?",
    "options": {
      "A": "Drop identifiers because output order will always match input order.",
      "B": "Send every item synchronously at interactive priority.",
      "C": "Use an asynchronous batch strategy when latency permits, attach stable IDs for reconciliation, and handle item-level failures separately.",
      "D": "Combine all records into one giant prompt so there is only one request."
    },
    "correct": [
      "C"
    ],
    "rationale": "Batching fits high-volume, latency-tolerant workloads and requires reliable result correlation.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-46-1",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.6",
    "task_title": "Multi-pass review",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, One-pass generation misses subtle defects, but duplicating the same review produces correlated mistakes. What is the best architectural response?",
    "options": {
      "A": "Average the reviewers\u2019 text without checking the underlying evidence.",
      "B": "Ask the same instance to repeat its answer verbatim.",
      "C": "Use role-separated or independent passes with explicit review criteria, then reconcile disagreements with evidence.",
      "D": "Add more tokens to the original prompt but keep one pass."
    },
    "correct": [
      "C"
    ],
    "rationale": "Independent review passes reduce correlated errors when their roles and reconciliation rules are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-46-2",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.6",
    "task_title": "Multi-pass review",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, One-pass generation misses subtle defects, but duplicating the same review produces correlated mistakes. What is the best architectural response?",
    "options": {
      "A": "Average the reviewers\u2019 text without checking the underlying evidence.",
      "B": "Use role-separated or independent passes with explicit review criteria, then reconcile disagreements with evidence.",
      "C": "Add more tokens to the original prompt but keep one pass.",
      "D": "Ask the same instance to repeat its answer verbatim."
    },
    "correct": [
      "B"
    ],
    "rationale": "Independent review passes reduce correlated errors when their roles and reconciliation rules are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-46-3",
    "version": 1,
    "status": "seed",
    "domain": 4,
    "task": "4.6",
    "task_title": "Multi-pass review",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, One-pass generation misses subtle defects, but duplicating the same review produces correlated mistakes. What is the best architectural response?",
    "options": {
      "A": "Ask the same instance to repeat its answer verbatim.",
      "B": "Average the reviewers\u2019 text without checking the underlying evidence.",
      "C": "Use role-separated or independent passes with explicit review criteria, then reconcile disagreements with evidence.",
      "D": "Add more tokens to the original prompt but keep one pass."
    },
    "correct": [
      "C"
    ],
    "rationale": "Independent review passes reduce correlated errors when their roles and reconciliation rules are explicit.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-51-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.1",
    "task_title": "Context preservation",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Long conversations are summarized, but exact amounts, dates, commitments, or identifiers disappear. What is the best architectural response?",
    "options": {
      "A": "Make the rolling summary longer every turn.",
      "B": "Discard earlier facts once a new topic appears.",
      "C": "Trust the model to remember exact values from distant turns.",
      "D": "Maintain critical case facts in structured persistent state and keep summaries for narrative context rather than as the sole source of truth."
    },
    "correct": [
      "D"
    ],
    "rationale": "Critical facts should survive compaction in structured state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-51-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.1",
    "task_title": "Context preservation",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, Long conversations are summarized, but exact amounts, dates, commitments, or identifiers disappear. What is the best architectural response?",
    "options": {
      "A": "Make the rolling summary longer every turn.",
      "B": "Trust the model to remember exact values from distant turns.",
      "C": "Discard earlier facts once a new topic appears.",
      "D": "Maintain critical case facts in structured persistent state and keep summaries for narrative context rather than as the sole source of truth."
    },
    "correct": [
      "D"
    ],
    "rationale": "Critical facts should survive compaction in structured state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-51-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.1",
    "task_title": "Context preservation",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, Long conversations are summarized, but exact amounts, dates, commitments, or identifiers disappear. What is the best architectural response?",
    "options": {
      "A": "Discard earlier facts once a new topic appears.",
      "B": "Maintain critical case facts in structured persistent state and keep summaries for narrative context rather than as the sole source of truth.",
      "C": "Make the rolling summary longer every turn.",
      "D": "Trust the model to remember exact values from distant turns."
    },
    "correct": [
      "B"
    ],
    "rationale": "Critical facts should survive compaction in structured state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-52-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.2",
    "task_title": "Escalation and ambiguity",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, The system guesses between two plausible customer/account matches and also refuses to hand off when a user explicitly asks for a human. What is the best architectural response?",
    "options": {
      "A": "Choose the most likely match based on model confidence.",
      "B": "Ask a clarifying question when identity is ambiguous and honor explicit human escalation or policy-gap triggers.",
      "C": "Never escalate if the model can produce any answer.",
      "D": "Use negative sentiment as the primary escalation rule."
    },
    "correct": [
      "B"
    ],
    "rationale": "Ambiguity should be resolved, not guessed; escalation needs explicit operational triggers.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-52-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.2",
    "task_title": "Escalation and ambiguity",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, The system guesses between two plausible customer/account matches and also refuses to hand off when a user explicitly asks for a human. What is the best architectural response?",
    "options": {
      "A": "Ask a clarifying question when identity is ambiguous and honor explicit human escalation or policy-gap triggers.",
      "B": "Choose the most likely match based on model confidence.",
      "C": "Use negative sentiment as the primary escalation rule.",
      "D": "Never escalate if the model can produce any answer."
    },
    "correct": [
      "A"
    ],
    "rationale": "Ambiguity should be resolved, not guessed; escalation needs explicit operational triggers.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-52-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.2",
    "task_title": "Escalation and ambiguity",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, The system guesses between two plausible customer/account matches and also refuses to hand off when a user explicitly asks for a human. What is the best architectural response?",
    "options": {
      "A": "Use negative sentiment as the primary escalation rule.",
      "B": "Ask a clarifying question when identity is ambiguous and honor explicit human escalation or policy-gap triggers.",
      "C": "Choose the most likely match based on model confidence.",
      "D": "Never escalate if the model can produce any answer."
    },
    "correct": [
      "B"
    ],
    "rationale": "Ambiguity should be resolved, not guessed; escalation needs explicit operational triggers.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-53-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.3",
    "task_title": "Error propagation",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, A research subagent encounters an access failure but reports \u201cno evidence found,\u201d causing the coordinator to treat missing coverage as negative evidence. What is the best architectural response?",
    "options": {
      "A": "Propagate structured failure context, partial results, and coverage gaps so downstream agents can distinguish failure from a valid empty result.",
      "B": "Convert every failure into an empty successful result.",
      "C": "Abort the entire workflow on any recoverable subagent error.",
      "D": "Hide the error from the final synthesis to keep the output concise."
    },
    "correct": [
      "A"
    ],
    "rationale": "Downstream reasoning depends on preserving the difference between failure, absence, and partial coverage.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-53-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.3",
    "task_title": "Error propagation",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, A research subagent encounters an access failure but reports \u201cno evidence found,\u201d causing the coordinator to treat missing coverage as negative evidence. What is the best architectural response?",
    "options": {
      "A": "Propagate structured failure context, partial results, and coverage gaps so downstream agents can distinguish failure from a valid empty result.",
      "B": "Convert every failure into an empty successful result.",
      "C": "Hide the error from the final synthesis to keep the output concise.",
      "D": "Abort the entire workflow on any recoverable subagent error."
    },
    "correct": [
      "A"
    ],
    "rationale": "Downstream reasoning depends on preserving the difference between failure, absence, and partial coverage.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-53-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.3",
    "task_title": "Error propagation",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Claude Code for Continuous Integration scenario, A research subagent encounters an access failure but reports \u201cno evidence found,\u201d causing the coordinator to treat missing coverage as negative evidence. Select TWO actions that best address the problem.",
    "options": {
      "A": "Convert every failure into an empty successful result.",
      "B": "Mark downstream synthesis with the resulting coverage gap when a source could not be accessed.",
      "C": "Abort the entire workflow on any recoverable subagent error.",
      "D": "Propagate structured failure context, partial results, and coverage gaps so downstream agents can distinguish failure from a valid empty result."
    },
    "correct": [
      "B",
      "D"
    ],
    "rationale": "Downstream reasoning depends on preserving the difference between failure, absence, and partial coverage. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-54-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.4",
    "task_title": "Large-codebase context",
    "scenario": "S2",
    "scenario_title": "Code Generation with Claude Code",
    "type": "single",
    "select_n": 1,
    "stem": "In the Code Generation with Claude Code scenario, After exploring a large repository, the agent starts relying on generic patterns instead of the actual codebase. What is the best architectural response?",
    "options": {
      "A": "Load the whole repository into context at once.",
      "B": "Restart the investigation whenever context gets large.",
      "C": "Stop reading source files and rely on general framework knowledge.",
      "D": "Use targeted search/read steps, scratch/manifest state, bounded subagents for noisy exploration, and compact/resume techniques as context grows."
    },
    "correct": [
      "D"
    ],
    "rationale": "Large-codebase work needs progressive discovery and explicit working state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-54-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.4",
    "task_title": "Large-codebase context",
    "scenario": "S4",
    "scenario_title": "Developer Productivity with Claude",
    "type": "single",
    "select_n": 1,
    "stem": "In the Developer Productivity with Claude scenario, After exploring a large repository, the agent starts relying on generic patterns instead of the actual codebase. What is the best architectural response?",
    "options": {
      "A": "Restart the investigation whenever context gets large.",
      "B": "Use targeted search/read steps, scratch/manifest state, bounded subagents for noisy exploration, and compact/resume techniques as context grows.",
      "C": "Stop reading source files and rely on general framework knowledge.",
      "D": "Load the whole repository into context at once."
    },
    "correct": [
      "B"
    ],
    "rationale": "Large-codebase work needs progressive discovery and explicit working state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-54-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.4",
    "task_title": "Large-codebase context",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, After exploring a large repository, the agent starts relying on generic patterns instead of the actual codebase. What is the best architectural response?",
    "options": {
      "A": "Use targeted search/read steps, scratch/manifest state, bounded subagents for noisy exploration, and compact/resume techniques as context grows.",
      "B": "Stop reading source files and rely on general framework knowledge.",
      "C": "Restart the investigation whenever context gets large.",
      "D": "Load the whole repository into context at once."
    },
    "correct": [
      "A"
    ],
    "rationale": "Large-codebase work needs progressive discovery and explicit working state.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-55-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.5",
    "task_title": "Human review and calibration",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Aggregate accuracy looks high, but one rare high-risk segment performs poorly. What is the best architectural response?",
    "options": {
      "A": "Remove human review once the aggregate score exceeds a threshold.",
      "B": "Use only overall average accuracy to decide automation.",
      "C": "Let the model self-report confidence and treat it as calibrated.",
      "D": "Measure performance by segment and field, calibrate confidence against labeled data, and route high-risk or uncertain cases to human review."
    },
    "correct": [
      "D"
    ],
    "rationale": "Risk-sensitive systems need segmented evaluation and calibrated routing.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-55-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.5",
    "task_title": "Human review and calibration",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "single",
    "select_n": 1,
    "stem": "In the Customer Support Resolution Agent scenario, Aggregate accuracy looks high, but one rare high-risk segment performs poorly. What is the best architectural response?",
    "options": {
      "A": "Measure performance by segment and field, calibrate confidence against labeled data, and route high-risk or uncertain cases to human review.",
      "B": "Use only overall average accuracy to decide automation.",
      "C": "Let the model self-report confidence and treat it as calibrated.",
      "D": "Remove human review once the aggregate score exceeds a threshold."
    },
    "correct": [
      "A"
    ],
    "rationale": "Risk-sensitive systems need segmented evaluation and calibrated routing.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-55-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.5",
    "task_title": "Human review and calibration",
    "scenario": "S5",
    "scenario_title": "Claude Code for Continuous Integration",
    "type": "single",
    "select_n": 1,
    "stem": "In the Claude Code for Continuous Integration scenario, Aggregate accuracy looks high, but one rare high-risk segment performs poorly. What is the best architectural response?",
    "options": {
      "A": "Let the model self-report confidence and treat it as calibrated.",
      "B": "Remove human review once the aggregate score exceeds a threshold.",
      "C": "Measure performance by segment and field, calibrate confidence against labeled data, and route high-risk or uncertain cases to human review.",
      "D": "Use only overall average accuracy to decide automation."
    },
    "correct": [
      "C"
    ],
    "rationale": "Risk-sensitive systems need segmented evaluation and calibrated routing.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-56-1",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.6",
    "task_title": "Provenance and uncertainty",
    "scenario": "S3",
    "scenario_title": "Multi-Agent Research System",
    "type": "single",
    "select_n": 1,
    "stem": "In the Multi-Agent Research System scenario, Multiple credible sources disagree on a value and the final synthesis silently chooses one. What is the best architectural response?",
    "options": {
      "A": "Average conflicting values into one number.",
      "B": "Preserve claim-to-source provenance, include source dates/context, and represent unresolved conflicts or uncertainty explicitly.",
      "C": "Choose the newest number without checking what period it refers to.",
      "D": "Remove citations so the final answer reads more smoothly."
    },
    "correct": [
      "B"
    ],
    "rationale": "Reliable synthesis keeps provenance and makes unresolved disagreement visible.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "foundational",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-56-2",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.6",
    "task_title": "Provenance and uncertainty",
    "scenario": "S6",
    "scenario_title": "Structured Data Extraction",
    "type": "single",
    "select_n": 1,
    "stem": "In the Structured Data Extraction scenario, Multiple credible sources disagree on a value and the final synthesis silently chooses one. What is the best architectural response?",
    "options": {
      "A": "Average conflicting values into one number.",
      "B": "Preserve claim-to-source provenance, include source dates/context, and represent unresolved conflicts or uncertainty explicitly.",
      "C": "Remove citations so the final answer reads more smoothly.",
      "D": "Choose the newest number without checking what period it refers to."
    },
    "correct": [
      "B"
    ],
    "rationale": "Reliable synthesis keeps provenance and makes unresolved disagreement visible.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "applied",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  },
  {
    "id": "Q-56-3",
    "version": 1,
    "status": "seed",
    "domain": 5,
    "task": "5.6",
    "task_title": "Provenance and uncertainty",
    "scenario": "S1",
    "scenario_title": "Customer Support Resolution Agent",
    "type": "multiple",
    "select_n": 2,
    "stem": "In the Customer Support Resolution Agent scenario, Multiple credible sources disagree on a value and the final synthesis silently chooses one. Select TWO actions that best address the problem.",
    "options": {
      "A": "Keep conflicting credible values separately labeled instead of silently collapsing them.",
      "B": "Choose the newest number without checking what period it refers to.",
      "C": "Preserve claim-to-source provenance, include source dates/context, and represent unresolved conflicts or uncertainty explicitly.",
      "D": "Average conflicting values into one number."
    },
    "correct": [
      "A",
      "C"
    ],
    "rationale": "Reliable synthesis keeps provenance and makes unresolved disagreement visible. The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.",
    "why_others_fail": "The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.",
    "difficulty_target": "advanced",
    "source_refs": [
      "public-ccar-f-task-map",
      "official-claude-docs"
    ],
    "last_verified": "2026-09-23"
  }
];

export const AGENTS_CATALOG = [
  {
    "id": "curriculum_orchestrator",
    "mission": "Map learners to current syllabus tasks and assign the next best activity.",
    "tools": [
      "content_read",
      "analytics_read"
    ],
    "outputs": [
      "study_plan",
      "task_queue"
    ]
  },
  {
    "id": "source_verifier",
    "mission": "Verify technical claims against approved official sources and flag stale claims.",
    "tools": [
      "approved_web_read",
      "source_registry"
    ],
    "outputs": [
      "verification_report"
    ]
  },
  {
    "id": "item_author",
    "mission": "Draft original scenario-based questions from a task statement and source pack.",
    "tools": [
      "content_read"
    ],
    "outputs": [
      "draft_item"
    ]
  },
  {
    "id": "item_adversary",
    "mission": "Try to prove the item ambiguous, find alternate correct answers, and test distractors.",
    "tools": [
      "content_read"
    ],
    "outputs": [
      "adversarial_review"
    ]
  },
  {
    "id": "case_simulator",
    "mission": "Run branching real-world case studies and inject controlled failures.",
    "tools": [
      "scenario_state",
      "lab_tools"
    ],
    "outputs": [
      "events",
      "feedback"
    ]
  },
  {
    "id": "capstone_assessor",
    "mission": "Score evidence against the published rubric; never infer missing evidence.",
    "tools": [
      "submission_read",
      "rubric_read"
    ],
    "outputs": [
      "criterion_scores",
      "evidence_gaps"
    ]
  },
  {
    "id": "slide_architect",
    "mission": "Convert verified analysis into a decision-oriented deck using the tenant design system.",
    "tools": [
      "source_read",
      "design_system_read"
    ],
    "outputs": [
      "storyboard",
      "slide_spec"
    ]
  },
  {
    "id": "harness_engineer",
    "mission": "Build and evaluate least-privilege skills, hooks, MCP integrations and agent harnesses.",
    "tools": [
      "repo_read",
      "sandbox",
      "eval_runner"
    ],
    "outputs": [
      "harness_spec",
      "eval_report"
    ]
  }
];

export const CASE_STUDIES = [
  {
    "path": "case_studies/01_support_refund_agent.md",
    "name": "01_support_refund_agent",
    "content": "# Case Study 1 \u2014 Regulated Customer Support Resolution Agent\n\n## Real-world brief\nA subscription business wants an agent that resolves common customer requests while preventing incorrect refunds, protecting account data and escalating policy gaps.\n\n## Business objective\nIncrease first-contact resolution without allowing the agent to bypass identity verification, refund limits or human escalation rules.\n\n## System\n- Claude Agent SDK orchestration.\n- MCP tools: `get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`.\n- Persistent case-facts store.\n- Pre-tool policy gate and post-tool audit hook.\n- Human review queue.\n\n## Learner tasks\n1. Define tool contracts and error taxonomy.\n2. Implement the agentic loop and termination logic.\n3. Enforce `get_customer` verification before order/refund actions.\n4. Design ambiguity and escalation behavior.\n5. Preserve exact case facts during long conversations.\n6. Add replayable telemetry and an eval suite.\n\n## Failure injections\n- Two customers share a similar name.\n- Refund tool times out after payment authorization.\n- User explicitly asks for a human.\n- Policy contains no rule for a disputed edge case.\n- Tool returns valid empty order history.\n\n## Required deliverables\nArchitecture diagram, tool schemas, policy/hook design, 10 eval cases, three failure replays, risk register, 5-slide executive readout.\n\n## Acceptance criteria\n- 0 unverified refund attempts in the test suite.\n- 100% explicit human requests honored.\n- Failure vs valid-empty differentiated in all injected cases.\n- Exact amount/date/identity facts retained across context compaction.\n- Every consequential tool action has an audit record.\n"
  },
  {
    "path": "case_studies/02_enterprise_code_delivery.md",
    "name": "02_enterprise_code_delivery",
    "content": "# Case Study 2 \u2014 Enterprise Claude Code Delivery Harness\n\n## Real-world brief\nA software organization wants Claude Code to accelerate feature work and pull-request review across a monorepo without violating repository conventions or flooding CI with noisy comments.\n\n## Business objective\nIncrease engineering throughput while keeping code review precise, reproducible and auditable.\n\n## System\n- Project `CLAUDE.md` plus modular `.claude/rules/`.\n- Skills for test generation, migration review and release notes.\n- MCP integrations for issue tracker and internal docs.\n- Subagents for bounded repository research and independent review.\n- Hooks for prohibited paths, secret checks and validation.\n- CI non-interactive runner with structured output.\n\n## Learner tasks\n1. Convert a monolithic instruction file into layered project/path rules.\n2. Decide plan mode vs direct execution for five change requests.\n3. Build one skill with progressive disclosure and three evals.\n4. Define least-privilege tool sets for coder, reviewer and dependency researcher.\n5. Implement a CI review contract with deduplication and severity criteria.\n6. Produce a regression suite for prompt/skill changes.\n\n## Failure injections\n- A user-only instruction is mistakenly assumed to be shared.\n- The review agent repeats already-resolved findings.\n- A subagent reads an unrelated large directory and exhausts context.\n- A generated migration passes syntax checks but violates a business invariant.\n- MCP issue tracker is temporarily unavailable.\n\n## Required deliverables\nRepository config tree, one production skill, hook policy, CI schema, 12 eval cases, failure analysis, 7-slide engineering review.\n\n## Acceptance criteria\n- Shared rules load consistently for all team runs.\n- No critical write tool exposed to read-only research agents.\n- CI output validates against schema on every test.\n- Duplicate findings reduced to zero in the fixed regression fixtures.\n- Unavailable external systems are represented as coverage gaps, not empty success.\n"
  },
  {
    "path": "case_studies/03_executive_cowork_slides.md",
    "name": "03_executive_cowork_slides",
    "content": "# Case Study 3 \u2014 Executive Operations, Cowork and Slides\n\n## Real-world brief\nA leadership team wants Claude to assemble a weekly operating review from email, calendar, CRM extracts, spreadsheets and project updates, then produce a concise decision memo and an on-brand slide deck.\n\n## Business objective\nReduce manual synthesis time while preserving source provenance, approval control and presentation quality.\n\n## System\n- Claude conversation/Cowork workflow.\n- Read-only connectors for source collection; separate approval-gated write actions.\n- Organization skill/plugin for the weekly operating review.\n- Source register and claim-to-source map.\n- Claude Slides/Design with imported design system.\n- Scheduled task that prepares drafts but does not publish without approval.\n\n## Learner tasks\n1. Define the delegation prompt and clarification rules.\n2. Build the reusable operating-review skill.\n3. Specify connector permissions and human approval points.\n4. Reconcile conflicting revenue/pipeline values without hiding disagreement.\n5. Generate a 1-page memo and 8-slide deck from the same verified evidence set.\n6. Create an eval comparing on-brand, provenance and factual consistency before/after the skill.\n\n## Failure injections\n- CRM and finance sheet disagree because of different cutoff dates.\n- A source link is inaccessible.\n- A slide claims a percentage not present in any source.\n- Scheduled run encounters an unanswered ambiguity.\n- A team member requests an external email send without final approval.\n\n## Required deliverables\nSkill bundle, connector permission matrix, evidence ledger, memo, slide storyboard, final deck specification, 10 eval cases and approval log.\n\n## Acceptance criteria\n- Every quantitative slide claim maps to a source.\n- Conflicting values remain labeled with date/definition until resolved.\n- No external message is sent without the defined human approval.\n- Deck conforms to imported design-system rules.\n- Scheduled run stops/asks when a decision requires human judgment.\n"
  }
];

export const SKILLS = [
  {
    "name": "cowork-workflow",
    "content": "---\nname: cowork-workflow\ndescription: Encodes repeatable Claude Cowork knowledge-work processes across files, connectors, browser tasks, documents, spreadsheets and presentations. Use for recurring multi-step business workflows that need review and approval.\n---\n# Cowork Workflow\n\n1. Declare source locations and connector permissions.\n2. Separate read actions from write/send/publish actions.\n3. Define the finished artifact and acceptance criteria.\n4. Ask only decision-critical clarifying questions.\n5. Preserve a source/claim ledger while synthesizing.\n6. Require review before external writes or publication.\n7. For scheduled runs, define what to do when data is missing or ambiguous.\n8. Validate deliverables and log the final approval state.\n"
  },
  {
    "name": "exam-item-author",
    "content": "---\nname: exam-item-author\ndescription: Authors original scenario-based certification practice questions from an approved syllabus and source pack. Use for question-bank creation, mock exams, domain drills, answer rationales, and distractor design.\n---\n# Exam Item Author\n\n1. Start from one task statement and verified source evidence.\n2. Test applied judgment, not trivia.\n3. Put one decisive constraint in the stem.\n4. Create one best answer for single-choice; if multiple-response, state exactly how many choices to select.\n5. Make distractors plausible but wrong for a documented reason.\n6. Do not copy, paraphrase closely, reconstruct, or solicit live proprietary exam items.\n7. Add rationale and why each distractor fails.\n8. Send every item to an adversarial reviewer before release.\n"
  },
  {
    "name": "harness-builder",
    "content": "---\nname: harness-builder\ndescription: Designs and evaluates production agent harnesses using Claude Code, Agent SDK, hooks, skills, subagents, MCP, validators, permissions and observability. Use when building or hardening an agentic workflow.\n---\n# Harness Builder\n\n## Build sequence\n1. Define success and failure conditions.\n2. Identify invariants that must be deterministic.\n3. Minimize tools by agent role.\n4. Define typed tool inputs, outputs and errors.\n5. Add checkpoints/session recovery.\n6. Add validators before model-based reviewers.\n7. Add human gates for consequential/ambiguous actions.\n8. Instrument tool calls, retries, failures, cost, latency and outcomes.\n9. Build at least three evals before broad rollout.\n10. Run regression tests after every skill/prompt/tool change.\n"
  },
  {
    "name": "slide-deck-builder",
    "content": "---\nname: slide-deck-builder\ndescription: Creates evidence-linked executive, technical, and training slide decks from verified source material and an optional design system. Use when a user requests slides, a presentation, a board deck, an architecture review, or a training deck.\n---\n# Slide Deck Builder\n\n## Workflow\n1. Identify audience, decision, time limit and desired action.\n2. Build a one-sentence narrative spine.\n3. Create a storyboard before slide prose.\n4. For every factual claim, attach a source reference before design.\n5. Choose one message per slide; remove paragraphs that do not change a decision.\n6. Use the provided design system. If none exists, use restrained enterprise typography, spacing and hierarchy rather than decorative AI styling.\n7. Prefer diagrams, tables and charts only when they communicate structure or evidence better than text.\n8. Run the checks below before release.\n\n## Required slide checks\n- Title states the point, not just the topic.\n- No unsupported number or factual claim.\n- Visual hierarchy is readable at presentation distance.\n- Consistent grid, typography and component rules.\n- No fake logos, citations, customer claims or generated data.\n- Appendix contains technical detail that would overload the core narrative.\n\n## Common structures\nExecutive decision deck: context \u2192 evidence \u2192 options/tradeoffs \u2192 recommendation requested from audience \u2192 implementation \u2192 risk \u2192 KPI.\nTechnical architecture deck: problem \u2192 requirements \u2192 architecture \u2192 control flow \u2192 failure modes \u2192 evals \u2192 benchmark \u2192 deployment \u2192 risks.\nTraining deck: objective \u2192 concept \u2192 worked example \u2192 failure case \u2192 practice \u2192 answer/reasoning \u2192 summary.\n"
  },
  {
    "name": "source-verifier",
    "content": "---\nname: source-verifier\ndescription: Verifies Claude product, API, certification, and architecture claims against approved current sources. Use before publishing lessons, exam explanations, case studies, or product guidance.\n---\n# Source Verifier\n\n## Source priority\n1. Official certification guide/page.\n2. Official Claude Academy.\n3. Official developer/product/help documentation.\n4. Official release notes/blog for time-sensitive product changes.\n5. Independent references only for cross-checking, never as sole authority when an official source exists.\n\n## Output\nFor each claim return: status (verified/stale/unsupported), source, last-updated date if known, affected curriculum task, and required correction.\n"
  }
];

export const CAPSTONE_SPEC = "# Capstone \u2014 Governed Multi-Surface Claude Operating System\n\n## Challenge\nDesign and demonstrate a production-ready Claude solution that starts with a real business request, uses the appropriate Claude surface(s), performs multi-step work with tools/agents, produces a verified deliverable, and presents the decision to stakeholders.\n\nThe capstone must use at least:\n- one Claude Code or Agent SDK workflow;\n- one MCP integration or equivalent structured external tool integration;\n- one reusable skill;\n- one deterministic validator/hook/policy gate;\n- one Cowork/knowledge-work workflow;\n- one Claude Slides/Design output;\n- one human approval gate;\n- one evaluation suite with baseline and improved result.\n\n## Required architecture\nIntake \u2192 classify risk \u2192 plan \u2192 retrieve/act \u2192 validate \u2192 review \u2192 human gate \u2192 publish \u2192 audit.\n\n## Deliverables\n1. Problem statement and measurable success criteria.\n2. Architecture and trust-boundary diagram.\n3. Tool/MCP contracts and permission matrix.\n4. Agent/skill/harness configuration.\n5. Working demonstration or reproducible trace.\n6. Eval suite with at least 15 cases, including negative and ambiguity tests.\n7. Failure-recovery report for at least three injected faults.\n8. Provenance ledger.\n9. Executive memo.\n10. 10-slide final presentation.\n\n## 100-point rubric\n- Architecture and decomposition \u2014 15\n- Tool/MCP design and least privilege \u2014 10\n- Claude Code / Agent SDK implementation \u2014 10\n- Skills/hooks/harness quality \u2014 10\n- Context, provenance and reliability \u2014 15\n- Evaluation quality and regression evidence \u2014 15\n- Human oversight, security and governance \u2014 10\n- Deliverable quality and factual traceability \u2014 5\n- Slide narrative/design quality \u2014 5\n- Demonstration and defense \u2014 5\n\n## Pass bands for this training service\n- 85\u2013100: production-readiness evidence is strong; minor improvements remain.\n- 70\u201384: technically competent but important gaps remain before production.\n- 55\u201369: partial capability; remediation required before advanced deployment.\n- <55: rebuild core architecture/evaluation components and resubmit.\n\nThese are training-service bands, not Anthropic certification scores.\n\n## Defense questions\n- Which invariant is enforced in code rather than prompt text, and why?\n- Which agent has the narrowest tool set, and what failure does that prevent?\n- What happens when a source is inaccessible but other sources succeed?\n- How do you resume safely after a mid-task failure?\n- Which metric would make you roll back the skill/harness release?\n- What evidence shows your slide deck did not introduce unsupported claims?\n";

export const CURRICULUM_MD = "# Curriculum Map\n\n## Core certification-aligned domains\n\n### Domain 1 \u2014 Agentic Architecture & Orchestration (27%)\n1.1 Agentic loops for autonomous task execution  \n1.2 Coordinator\u2013subagent orchestration  \n1.3 Subagent invocation, context passing and spawning  \n1.4 Multi-step workflow enforcement and handoff  \n1.5 Agent SDK hooks for interception/normalization  \n1.6 Task-decomposition strategies  \n1.7 Session state, resumption and forking\n\n### Domain 2 \u2014 Tool Design & MCP Integration (18%)\n2.1 Tool interfaces, descriptions and boundaries  \n2.2 Structured tool/MCP error responses  \n2.3 Tool distribution and `tool_choice`  \n2.4 MCP server integration  \n2.5 Built-in tool selection: Read, Write, Edit, Bash, Grep, Glob\n\n### Domain 3 \u2014 Claude Code Configuration & Workflows (20%)\n3.1 `CLAUDE.md` hierarchy, scope and modular organization  \n3.2 Custom commands and skills  \n3.3 Path-specific rules / conditional convention loading  \n3.4 Plan mode vs direct execution  \n3.5 Iterative refinement  \n3.6 CI/CD integration and machine-readable execution\n\n### Domain 4 \u2014 Prompt Engineering & Structured Output (20%)\n4.1 Explicit criteria and false-positive reduction  \n4.2 Few-shot prompting  \n4.3 Structured output with tool use / JSON schemas  \n4.4 Validation, retry and feedback loops  \n4.5 Batch-processing strategies  \n4.6 Multi-instance / multi-pass review\n\n### Domain 5 \u2014 Context Management & Reliability (15%)\n5.1 Preserve critical context across long interactions  \n5.2 Escalation and ambiguity resolution  \n5.3 Error propagation across multi-agent systems  \n5.4 Large-codebase context management  \n5.5 Human review and confidence calibration  \n5.6 Provenance and uncertainty in multi-source synthesis\n\n## Extended applied tracks\n\n### Track A \u2014 Claude Chat / reasoning surface\n- Problem framing and high-quality delegation.\n- Source-grounded research and synthesis.\n- Projects, artifacts and reusable context.\n- Structured reasoning outputs and review loops.\n- Human decision ownership and approval boundaries.\n\n### Track B \u2014 Claude Cowork / delegated knowledge work\n- Working folders, local files, browser and connectors.\n- Multi-step delegation and progress steering.\n- Skills and plugins for repeatable organizational workflows.\n- Scheduled tasks and background work.\n- Safe review/approval before consequential actions.\n- Office workflows: documents, spreadsheets, presentations and email.\n\n### Track C \u2014 Claude Code / software engineering\n- Repository exploration and scoped context.\n- `CLAUDE.md`, `.claude/rules/`, skills and commands.\n- Plan/direct execution selection.\n- Hooks and permission controls.\n- Subagents and parallel task decomposition.\n- MCP integrations.\n- Non-interactive CI/CD use and structured outputs.\n- Agent SDK patterns for production agents.\n\n### Track D \u2014 Agent/Skill/Harness Engineering\n- Skill authoring with progressive disclosure.\n- Deterministic validators around probabilistic agents.\n- Typed tool contracts and structured errors.\n- Session/checkpoint/resume semantics.\n- Evals-first development.\n- Multi-agent role separation and least-tool access.\n- Observability, replay and provenance.\n\n### Track E \u2014 Claude Slides / Design\n- Story architecture: audience \u2192 decision \u2192 evidence \u2192 narrative.\n- Design-system ingestion: typography, spacing, components, brand rules.\n- Slide-generation skill with reusable layouts and content constraints.\n- Evidence-linked charts/tables and source footers.\n- On-canvas iteration, comments and review.\n- Export to PPTX/PDF and handoff between Design and Code where appropriate.\n- Executive, technical and training deck variants.\n";

export const SOURCES_MD = "# Source Register\n\n## Extracted from the uploaded video\nThe video promotes the **Claude Certified Architect \u2014 Foundations** certification and visibly shows:\n- Exam length: **120 minutes** (approximately 135 minutes seat time shown in the video capture).\n- Questions: **60**.\n- Price: **$125 USD**.\n- Free preparation resources, including visible tiles for:\n  - AI Fluency: Framework & Foundations\n  - Claude 101\n  - Building with the Claude API\n  - Claude with Amazon Bedrock\n- The certification is positioned as an architecture-oriented credential for implementing Claude-based AI systems and agentic workflows.\n\n## Current official resources to use as source of truth\n1. Claude Certified Architect \u2014 Foundations certification page (Anthropic Academy / Skilljar).\n2. Claude Academy \u2014 Build with Claude collection.\n3. AI Fluency: Framework & Foundations.\n4. Claude 101.\n5. Building with the Claude API.\n6. Claude with Amazon Bedrock.\n7. Claude with Google Cloud / Vertex AI.\n8. Introduction to Model Context Protocol.\n9. Claude Code in Action.\n10. Claude Code 101.\n11. Introduction to agent skills.\n12. Introduction to subagents.\n13. Introduction to Claude Cowork.\n14. Claude Developer/Code documentation for MCP, Agent SDK, tool use, hooks, skills, subagents, context and structured output.\n15. Claude Help Center / product documentation for Cowork, Claude Design and Claude Slides.\n\n## Current product note (September 2026)\nAnthropic announced that Claude Chat and Cowork are being merged into one Claude experience, while Claude Docs and Claude Slides are new and Claude Design is available in conversations. This curriculum still separates **Chat reasoning** from **Cowork delegated execution** pedagogically, because they teach different operating patterns even when the UI converges.\n\n## Evidence policy\n- Tier A: official Anthropic certification guide/page and product documentation.\n- Tier B: official Claude Academy course content.\n- Tier C: official technical docs and release notes.\n- Tier D: reputable independent study guides used only to cross-check the published task taxonomy.\n- No exam dumps, leaked questions, memory-based reconstruction, or unverifiable \u201creal question\u201d claims are allowed in the commercial bank.\n";

export const HARNESS_MD = "# Agent & Harness Specification\n\n## Principle\nUse deterministic software for invariants and probabilistic agents for judgment. Never ask the model to enforce what code can enforce reliably.\n\n## Runtime stages\n1. Intake validator \u2014 validates task, tenant, permissions, data classification.\n2. Planner \u2014 selects workflow and decomposes work.\n3. Policy gate \u2014 checks allowed tools/actions.\n4. Specialist agents \u2014 run with least-privilege tool sets.\n5. Deterministic validators \u2014 schema, tests, lint, numeric checks, citation presence.\n6. Critic/reviewer \u2014 inspects only unresolved semantic quality issues.\n7. Human gate \u2014 required for consequential or ambiguous outputs.\n8. Publisher \u2014 writes approved artifact/result.\n9. Telemetry \u2014 records prompt/version/tools/errors/latency/cost/outcome.\n\n## Claude Code harness\n- Project `CLAUDE.md` for shared conventions.\n- `.claude/rules/` for conditional/path rules.\n- Skills for reusable workflows.\n- Hooks for deterministic policy checks and post-tool validation.\n- Subagents for bounded parallel research/review.\n- MCP servers for external systems.\n- CI invokes non-interactively and consumes structured output.\n\n## Claude Chat harness\n- System/project context + source pack.\n- Explicit output contract.\n- Retrieval/source requirement for factual claims.\n- Review pass for high-impact deliverables.\n- No external side effect without explicit tool/action and approval.\n\n## Claude Cowork harness\n- Workspace/folder scope.\n- Connector allowlist and read/write split.\n- Skills/plugins bundle the organization\u2019s process.\n- Checkpoints after plan, before external write, and before publication.\n- Scheduled work runs with the same policy bundle and audit trail.\n\n## Eval harness\nFor every reusable skill/agent:\n- Minimum three representative evals before release.\n- Baseline without skill/agent.\n- Expected-behavior rubric.\n- Negative tests and ambiguity tests.\n- Regression suite on every version.\n- Track pass rate, policy violations, retries, tool misuse, provenance completeness, cost and latency.\n";


export const VIDEO_MODULES = [
  {
    "id": "mod-1",
    "domain": 1,
    "title": "Domain 1: Agentic Architecture & Orchestration",
    "weight": "27%",
    "tag": "FOUNDATIONAL TO ADVANCED",
    "poster": "assets/domain1.jpg",
    "badge": "Veo 3 Pro 4K HDR",
    "duration": "18:45",
    "description": "Master autonomous agentic loops, coordinator-subagent task decomposition, context-passing boundaries, and deterministic lifecycle hooks.",
    "chapters": [
      {
        "time": "00:00",
        "seconds": 0,
        "title": "The Invariant Rule: Deterministic vs Probabilistic"
      },
      {
        "time": "03:15",
        "seconds": 195,
        "title": "Coordinator\u2013Subagent Topology Design"
      },
      {
        "time": "07:40",
        "seconds": 460,
        "title": "Bounded Context vs Token Context Bloat"
      },
      {
        "time": "12:20",
        "seconds": 740,
        "title": "Agent SDK Lifecycle Hooks & Normalization"
      },
      {
        "time": "15:50",
        "seconds": 950,
        "title": "Checkpointing, Resumption & Safe Forking"
      }
    ],
    "checkpoints": [
      {
        "time": 460,
        "title": "Context Bloat Challenge",
        "prompt": "A subagent was spawned with full parent history and exceeded the token window. Select the architectural correction to isolate scope.",
        "code_initial": "// Coordinator spawning subagent\nconst subagent = await spawnAgent({\n  role: \"researcher\",\n  history: parentSession.fullHistory // Defect!\n});",
        "code_solution": "const subagent = await spawnAgent({\n  role: \"researcher\",\n  context: extractTaskScopedEvidence(parentSession.task),\n  contract: outputSchema\n});",
        "explanation": "Pass only task-relevant evidence and explicit output contracts to subagents to prevent context bloat and focus loss."
      },
      {
        "time": 740,
        "title": "Agent SDK Hook Challenge",
        "prompt": "Implement a pre-tool policy hook to intercept consequential write operations before execution.",
        "code_initial": "sdk.registerHook(\"preToolUse\", async (event) => {\n  // TODO: Check if tool is consequential\n});",
        "code_solution": "sdk.registerHook(\"preToolUse\", async (event) => {\n  if (CONSEQUENTIAL_TOOLS.includes(event.toolName)) {\n    return await enforceHumanGate(event);\n  }\n});",
        "explanation": "Hard invariants and high-consequence side effects belong in deterministic pre-tool hooks, not prompt prose."
      }
    ],
    "transcript": [
      {
        "start": 0,
        "text": "Welcome to Domain 1 of the Claude Certified Architect series. Today we explore autonomous orchestration..."
      },
      {
        "start": 195,
        "text": "When architecting multi-agent systems, the cardinal rule is: never give every agent every tool..."
      },
      {
        "start": 460,
        "text": "Context bloat is the number one cause of degraded reasoning in deep subagent trees..."
      },
      {
        "start": 740,
        "text": "Deterministic hooks provide zero-shot safety gates around probabilistic model calls..."
      }
    ]
  },
  {
    "id": "mod-2",
    "domain": 2,
    "title": "Domain 2: Tool Design & Model Context Protocol (MCP)",
    "weight": "18%",
    "tag": "APPLIED SOTA",
    "poster": "assets/domain2.jpg",
    "badge": "Nano Banana Enhanced",
    "duration": "22:15",
    "description": "Construct production-grade JSON-RPC tools, structured error responses, least-privilege scoping, and enterprise MCP server architectures.",
    "chapters": [
      {
        "time": "00:00",
        "seconds": 0,
        "title": "Tool Interface Design & Negative Scope Definition"
      },
      {
        "time": "04:30",
        "seconds": 270,
        "title": "Structured Error Responses vs Prose Exceptions"
      },
      {
        "time": "09:15",
        "seconds": 555,
        "title": "Tool Distribution & tool_choice Mechanics"
      },
      {
        "time": "14:40",
        "seconds": 880,
        "title": "MCP Architecture: Tools, Resources & Prompts"
      },
      {
        "time": "19:10",
        "seconds": 1150,
        "title": "Built-in Tool Selection: Grep, Glob, Read, Edit"
      }
    ],
    "checkpoints": [
      {
        "time": 270,
        "title": "Structured Error Schema Challenge",
        "prompt": "A tool returns an ambiguous error string. Convert it into a typed structured error schema distinguishing retryable vs permanent failures.",
        "code_initial": "return { error: \"Request failed: 429 too many requests\" }; // Bad!",
        "code_solution": "return {\n  is_error: true,\n  error_code: \"RATE_LIMIT_EXCEEDED\",\n  is_retryable: true,\n  backoff_seconds: 5,\n  suggested_action: \"BACKOFF_AND_RETRY\"\n};",
        "explanation": "Structured errors allow the model or agent harness to make deterministic branching decisions."
      }
    ],
    "transcript": [
      {
        "start": 0,
        "text": "In this module we break down Model Context Protocol tool design and error engineering..."
      },
      {
        "start": 270,
        "text": "A generic string error confuses the agent. Providing structured attributes gives the agent recovery logic..."
      },
      {
        "start": 880,
        "text": "MCP separates tools that execute side effects from resources that provide read-only context..."
      }
    ]
  },
  {
    "id": "mod-3",
    "domain": 3,
    "title": "Domain 3: Claude Code CLI & Enterprise Delivery",
    "weight": "20%",
    "tag": "SOFTWARE ARCHITECTURE",
    "poster": "assets/domain3.jpg",
    "badge": "Veo 3 Pro 4K HDR",
    "duration": "25:30",
    "description": "Master CLAUDE.md hierarchy, progressive disclosure skills, plan mode vs direct execution, and headless CI/CD integration.",
    "chapters": [
      {
        "time": "00:00",
        "seconds": 0,
        "title": "CLAUDE.md Architecture & Modular Rules Tree"
      },
      {
        "time": "05:20",
        "seconds": 320,
        "title": "Creating Production Skills with Progressive Disclosure"
      },
      {
        "time": "11:10",
        "seconds": 670,
        "title": "Plan Mode vs Direct Execution Selection Matrix"
      },
      {
        "time": "17:00",
        "seconds": 1020,
        "title": "Headless Claude Code in Non-Interactive CI/CD"
      },
      {
        "time": "21:30",
        "seconds": 1290,
        "title": "Regression Test Fixtures & Prompt Evals"
      }
    ],
    "checkpoints": [
      {
        "time": 670,
        "title": "Plan Mode Strategy Challenge",
        "prompt": "Decide whether to execute directly or activate Plan Mode for a 7-file database schema migration touching 3 microservices.",
        "code_initial": "// High uncertainty refactor\nconst mode = \"direct\"; // Defect!",
        "code_solution": "const mode = \"plan\"; // High uncertainty and wide blast radius requires pre-execution alignment.",
        "explanation": "Wide blast radius, architectural mutations, and cross-service dependencies mandate Plan Mode before touching files."
      }
    ],
    "transcript": [
      {
        "start": 0,
        "text": "Claude Code provides a specialized developer agent harness. In this masterclass, we explore enterprise configurations..."
      },
      {
        "start": 320,
        "text": "Skills keep your global system prompt clean by loading contextual procedures on demand..."
      },
      {
        "start": 1020,
        "text": "Running Claude Code non-interactively in CI requires strict JSON schema gating and exit codes..."
      }
    ]
  },
  {
    "id": "mod-4",
    "domain": 4,
    "title": "Domain 4 & 5: Prompt Reliability, Structured Output & Context Management",
    "weight": "35%",
    "tag": "CORE RELIABILITY",
    "poster": "assets/hero.jpg",
    "badge": "Veo 3 Pro 4K HDR",
    "duration": "21:40",
    "description": "Design explicit criteria to eliminate false positives, enforce JSON schemas, manage multi-pass reviews, and compact context without losing critical facts.",
    "chapters": [
      {
        "time": "00:00",
        "seconds": 0,
        "title": "Explicit Finding Criteria vs Vague Prompts"
      },
      {
        "time": "04:15",
        "seconds": 255,
        "title": "Tool-Constrained Structured Output & Schema Validation"
      },
      {
        "time": "08:45",
        "seconds": 525,
        "title": "Multi-Instance Adversarial Review Loops"
      },
      {
        "time": "13:30",
        "seconds": 810,
        "title": "Compacting Rolling Context Without Losing Critical Facts"
      },
      {
        "time": "17:50",
        "seconds": 1070,
        "title": "Operational Escalation Boundaries & Provenance Ledgers"
      }
    ],
    "checkpoints": [
      {
        "time": 810,
        "title": "Critical Fact Compaction Challenge",
        "prompt": "A long conversation is being compacted. How should exact amounts, account numbers, and policy dates be preserved?",
        "code_initial": "// Storing all state in rolling prose summary\nconversation.summary = await summarize(conversation.turns);",
        "code_solution": "conversation.structuredFacts = extractExactEntities(conversation.turns);\nconversation.narrativeSummary = await summarize(conversation.turns);",
        "explanation": "Never trust rolling prose summaries to maintain exact figures and IDs. Store critical facts in structured state."
      }
    ],
    "transcript": [
      {
        "start": 0,
        "text": "Domains 4 and 5 form the reliability spine of any enterprise Claude deployment..."
      },
      {
        "start": 255,
        "text": "Prose JSON is vulnerable to markdown formatting issues. Use tool use schemas for guaranteed JSON output..."
      },
      {
        "start": 810,
        "text": "In regulated environments, losing an invoice number during summarization is fatal. Separate narrative from structured facts..."
      }
    ]
  },
  {
    "id": "mod-5",
    "domain": 6,
    "title": "Executive Capstone: Governed Multi-Surface Operating System",
    "weight": "100 PTS",
    "tag": "CAPSTONE & DEFENSE",
    "poster": "assets/capstone.jpg",
    "badge": "Executive Masterclass",
    "duration": "31:00",
    "description": "Complete the 10-deliverable enterprise capstone, defend your architecture against adversarial faculty, and earn your verified certificate.",
    "chapters": [
      {
        "time": "00:00",
        "seconds": 0,
        "title": "Capstone Architecture: Intake to Audit Store"
      },
      {
        "time": "06:10",
        "seconds": 370,
        "title": "The 100-Point Scoring Rubric & Band Breakdown"
      },
      {
        "time": "12:40",
        "seconds": 760,
        "title": "Injecting and Defending 3 Fault Scenarios"
      },
      {
        "time": "19:20",
        "seconds": 1160,
        "title": "Generating the 10-Slide Executive Presentation"
      },
      {
        "time": "25:00",
        "seconds": 1500,
        "title": "Oral Defense Simulation & Verification"
      }
    ],
    "checkpoints": [
      {
        "time": 760,
        "title": "Defense Invariant Question",
        "prompt": "Which invariant in your capstone is enforced programmatically in software rather than via prompt instructions, and why?",
        "code_initial": "// Prompt text:\n// \"Please make sure refund does not exceed \"",
        "code_solution": "// Programmatic pre-tool gate:\nif (transaction.amount > 250.00) {\n  throw new PolicyViolationError(\"Refund exceeds auto-approval threshold of .00\");\n}",
        "explanation": "Monetary thresholds, data deletion, and credential access must be gated by deterministic code invariants."
      }
    ],
    "transcript": [
      {
        "start": 0,
        "text": "Welcome to the Capstone briefing. The capstone represents the culmination of all five domains..."
      },
      {
        "start": 760,
        "text": "The oral defense panel will test whether you understand the boundary between probabilistic and deterministic code..."
      }
    ]
  }
];

export const CURRICULUM_DOMAINS = [
  {
    "domain": 1,
    "title": "Agentic Architecture & Orchestration",
    "weight": "27%",
    "desc": "Core patterns for autonomous execution, multi-agent coordination, context scoping, and SDK lifecycle hooks.",
    "tasks": [
      {
        "id": "1.1",
        "title": "Agentic loops for autonomous task execution",
        "sub": "Termination conditions, tool feedback loop, max iteration guardrails"
      },
      {
        "id": "1.2",
        "title": "Coordinator\u2013subagent orchestration",
        "sub": "Delegation hierarchy, role specialization, aggregation checkpoints"
      },
      {
        "id": "1.3",
        "title": "Subagent invocation, context passing and spawning",
        "sub": "Context pruning, scoped inputs, structured results"
      },
      {
        "id": "1.4",
        "title": "Multi-step workflow enforcement and handoff",
        "sub": "State machines, deterministic prerequisite gates, verified handoff packets"
      },
      {
        "id": "1.5",
        "title": "Agent SDK hooks for interception/normalization",
        "sub": "Pre/post tool execution filters, security policy enforcement"
      },
      {
        "id": "1.6",
        "title": "Task-decomposition strategies",
        "sub": "Coupling vs cohesion, deliverable-driven boundaries"
      },
      {
        "id": "1.7",
        "title": "Session state, resumption and forking",
        "sub": "Checkpoint persistence, rollbacks, branching experiments"
      }
    ]
  },
  {
    "domain": 2,
    "title": "Tool Design & MCP Integration",
    "weight": "18%",
    "desc": "Designing robust tool contracts, structured error schemas, tool distribution, and enterprise Model Context Protocol integration.",
    "tasks": [
      {
        "id": "2.1",
        "title": "Tool interfaces, descriptions and boundaries",
        "sub": "Clear parameter schemas, negative scope definitions, concrete usage examples"
      },
      {
        "id": "2.2",
        "title": "Structured tool/MCP error responses",
        "sub": "Distinguishing retryable vs fatal errors, returning actionable context"
      },
      {
        "id": "2.3",
        "title": "Tool distribution and tool_choice",
        "sub": "Least-tool access principle, forcing specific tools when required"
      },
      {
        "id": "2.4",
        "title": "MCP server integration",
        "sub": "Resources vs tools vs prompts, tenant-scoped configuration"
      },
      {
        "id": "2.5",
        "title": "Built-in tool selection",
        "sub": "Read, Write, Edit, Bash, Grep, Glob optimization"
      }
    ]
  },
  {
    "domain": 3,
    "title": "Claude Code Configuration & Workflows",
    "weight": "20%",
    "desc": "Advanced configuration of developer agent harnesses, CLAUDE.md hierarchy, custom skills, and non-interactive CI/CD.",
    "tasks": [
      {
        "id": "3.1",
        "title": "CLAUDE.md hierarchy and modular rules",
        "sub": "Root vs directory-level scoping, path-specific rule activation"
      },
      {
        "id": "3.2",
        "title": "Custom commands and skills",
        "sub": "Packaging repeatable organizational knowledge with progressive disclosure"
      },
      {
        "id": "3.3",
        "title": "Path-specific rules / conditional loading",
        "sub": "Applying security, style, and testing rules only to relevant modules"
      },
      {
        "id": "3.4",
        "title": "Plan mode vs direct execution",
        "sub": "Selecting planning mode based on uncertainty and blast radius"
      },
      {
        "id": "3.5",
        "title": "Iterative refinement",
        "sub": "Refining prompts with concrete failure examples and executable tests"
      },
      {
        "id": "3.6",
        "title": "CI/CD integration & machine-readable execution",
        "sub": "Non-interactive execution flags, exit codes, JSON outputs"
      }
    ]
  },
  {
    "domain": 4,
    "title": "Prompt Engineering & Structured Output",
    "weight": "20%",
    "desc": "Reliable prompting, strict JSON schema output contracts, validation loops, and multi-pass adversarial reviews.",
    "tasks": [
      {
        "id": "4.1",
        "title": "Explicit criteria and false-positive reduction",
        "sub": "Eliminating ambiguous adjectives, establishing severity thresholds"
      },
      {
        "id": "4.2",
        "title": "Few-shot prompting for edge cases",
        "sub": "Demonstrating boundary decisions and negative examples"
      },
      {
        "id": "4.3",
        "title": "Structured output with tool use / JSON schemas",
        "sub": "Constrained generation, programmatic schema validation"
      },
      {
        "id": "4.4",
        "title": "Validation, retry and feedback loops",
        "sub": "Error feedback insertion, max retry bounds, failure categorization"
      },
      {
        "id": "4.5",
        "title": "Batch-processing strategies",
        "sub": "Asynchronous job batching, cost optimization, correlation IDs"
      },
      {
        "id": "4.6",
        "title": "Multi-instance / multi-pass review",
        "sub": "Adversarial peer review, uncorrelated reviewer models"
      }
    ]
  },
  {
    "domain": 5,
    "title": "Context Management & Reliability",
    "weight": "15%",
    "desc": "Preserving factual integrity across long horizons, error propagation, human oversight, and provenance tracking.",
    "tasks": [
      {
        "id": "5.1",
        "title": "Preserve critical context across long interactions",
        "sub": "Compacting rolling history into structured fact stores"
      },
      {
        "id": "5.2",
        "title": "Escalation and ambiguity resolution",
        "sub": "Explicit human escalation triggers, clarifying questions"
      },
      {
        "id": "5.3",
        "title": "Error propagation across multi-agent systems",
        "sub": "Preventing missing data from being treated as negative evidence"
      },
      {
        "id": "5.4",
        "title": "Large-codebase context management",
        "sub": "Bounded subagents, scratch manifests, progressive discovery"
      },
      {
        "id": "5.5",
        "title": "Human review and confidence calibration",
        "sub": "Review queues for consequential decisions, calibrated uncertainty"
      },
      {
        "id": "5.6",
        "title": "Provenance and uncertainty in multi-source synthesis",
        "sub": "Claim-to-source traceability, handling conflicting data"
      }
    ]
  }
];

export const APPLIED_TRACKS = [
  {
    "id": "track-a",
    "code": "TRACK A",
    "title": "Claude Chat / Reasoning Surface",
    "tag": "Executive Reasoning",
    "desc": "Problem framing, source-grounded research, projects, artifacts, structured decision memos, and human sign-off boundaries."
  },
  {
    "id": "track-b",
    "code": "TRACK B",
    "title": "Claude Cowork / Delegated Knowledge Work",
    "tag": "Autonomous Workflow",
    "desc": "Working folders, connectors, multi-step progress steering, organizational skills, scheduled background tasks, and safe approval checkpoints."
  },
  {
    "id": "track-c",
    "code": "TRACK C",
    "title": "Claude Code / Software Engineering",
    "tag": "Developer Harness",
    "desc": "Repository exploration, CLAUDE.md architecture, plan mode selection, hooks, subagents, MCP servers, and headless CI/CD execution."
  },
  {
    "id": "track-d",
    "code": "TRACK D",
    "title": "Agent/Skill/Harness Engineering",
    "tag": "Systems Engineering",
    "desc": "Evals-first development, progressive disclosure skills, typed tool schemas, deterministic gates, and multi-agent role isolation."
  },
  {
    "id": "track-e",
    "code": "TRACK E",
    "title": "Claude Slides & Design Studio",
    "tag": "Executive Presentation",
    "desc": "Narrative architecture, brand design-system ingestion, claim-linked charts and footnotes, on-canvas iteration, and export-ready decks."
  }
];

export const CAPSTONE_PRESETS = [
  {
    id: "case-01",
    code: "CASE STUDY 01",
    title: "Regulated Customer Support Resolution Agent",
    domain: "Domain 1: Agentic Orchestration & Policy Enforcement",
    brief: "A high-volume subscription platform requires an autonomous support agent to resolve refunds and account updates while strictly preventing identity spoofing, unauthorized payments, and policy edge-case drift.",
    tools: ["get_customer", "lookup_order", "process_refund", "escalate_to_human"],
    invariants: "Hard code ceiling: refunds <= $250.00 enforced in PreToolUse hook. 0 unverified refunds.",
    surface: "Claude Agent SDK + Pre/Post Tool Hooks",
    rubricHighlights: "Deterministic refund gate, customer identity pre-check, human escalation fallback.",
    terminalPresets: [
      "claude agent init --harness support-refund --tools get_customer,lookup_order,process_refund,escalate_to_human",
      "cat << 'EOF' > hooks/pre_tool_use.ts\nexport function verifyRefundCeiling(tool: string, args: any) {\n  if (tool === 'process_refund' && args.amount > 250.00) {\n    throw new PolicyViolation('Refund exceeds $250.00 hard deterministic invariant');\n  }\n}\nEOF",
      "claude eval run --suite evals/support_refund_suite.yaml --record-telemetry"
    ],
    evalSuite: [
      { name: "Positive verified refund", input: "Verified VIP request for $49.00 duplicate charge", expected: "process_refund called with idempotency key" },
      { name: "Unverified identity block", input: "User asks for refund before get_customer verification", expected: "BLOCKED: get_customer pre-condition enforced in hook" },
      { name: "Monetary ceiling breach", input: "Customer demands $850.00 manual refund", expected: "BLOCKED: Exceeds $250.00 ceiling, routed to human queue" },
      { name: "Idempotent payment timeout", input: "Payment gateway times out after authorization", expected: "Compensation transaction executed with exact transaction ID" }
    ],
    baseScore: 94
  },
  {
    id: "case-02",
    code: "CASE STUDY 02",
    title: "Enterprise Monorepo Code Delivery Harness",
    domain: "Domain 3: Claude Code Configuration & Modular Rules",
    brief: "An engineering org deploys Claude Code across a 500k-line monorepo. The harness must prevent context window bloat, enforce path-scoped rules, and run non-interactive CI pull-request reviews with structured JSON output.",
    tools: ["read_file", "search_web", "git_commit", "mcp_jira_lookup", "ci_linter"],
    invariants: "Read-only tools for research subagents. Critical write tools restricted to review-approved coder agents. Prohibited directories (/secrets, /infra) blocked in hook.",
    surface: "Claude Code CLI + .claude/rules/ + MCP Subagents",
    rubricHighlights: "Least privilege tool sets, CLAUDE.md modular rules hierarchy, zero duplicate CI comments.",
    terminalPresets: [
      "claude config set --global defaultMode plan",
      "mkdir -p .claude/rules && cat << 'EOF' > .claude/rules/monorepo_boundaries.md\n# Path exclusion\nNever ingest /node_modules, /dist, or /infra into coordinator context.\nEOF",
      "claude mcp add jira-tracker -- npx -y @modelcontextprotocol/server-jira",
      "claude -p 'Review PR #481 for compliance' --output-format json > pr_review_audit.json"
    ],
    evalSuite: [
      { name: "Context containment", input: "Subagent attempts to grep root node_modules", expected: "BLOCKED by path-exclusion rule, 0 context bloat" },
      { name: "Least privilege isolation", input: "Researcher agent attempts to call git_commit", expected: "BLOCKED: tool not permitted in researcher toolset" },
      { name: "CI JSON contract validation", input: "PR analysis executed in non-interactive CI mode", expected: "Emits strict JSON schema with deduplicated finding hashes" }
    ],
    baseScore: 92
  },
  {
    id: "case-03",
    code: "CASE STUDY 03",
    title: "Executive Strategy & Financial Reporting Engine",
    domain: "Domain 5: Context Provenance & Multi-Source Synthesis",
    brief: "Executive coworking workspace synthesizing quarterly revenue across CRM and ERP databases. Must reconcile conflicting data sources with explicit date cutoffs, generate on-brand presentations, and mandate claim-to-source footnote citations.",
    tools: ["mcp_crm_query", "mcp_accounting_db", "render_slides", "export_pdf"],
    invariants: "Every numeric claim on slides must include an immutable source citation token. Zero hallucinated metrics.",
    surface: "Claude Cowork Workspace + Slide Studio + MCP DB",
    rubricHighlights: "Strict claim-to-source footnotes, accounting vs CRM discrepancy callouts, board-grade slide formatting.",
    terminalPresets: [
      "claude mcp add erp-db -- npx -y @modelcontextprotocol/server-postgres --read-only",
      "claude mcp add crm-sales -- npx -y @modelcontextprotocol/server-salesforce --read-only",
      "claude cowork sync --workspace q3-financials --enforce-source-footnotes",
      "claude render slides --template board-executive --verify-citations"
    ],
    evalSuite: [
      { name: "Discrepancy detection", input: "CRM shows $14.2M while ERP shows $13.8M due to cutoff date", expected: "Explicitly flags $400k timing variance in footnote" },
      { name: "Mandatory citation enforcement", input: "Draft slide generated without source tag", expected: "BLOCKED: Pre-publish validator rejects uncited metric" },
      { name: "Human sign-off checkpoint", input: "Publishing final deck to board portal", expected: "Checkpoints with executive approval prompt before export" }
    ],
    baseScore: 95
  },
  {
    id: "case-04",
    code: "CASE STUDY 04",
    title: "Industrial Cyber-Physical & Agentic Harness Engineering",
    domain: "Domain 2 & 4: Invariants, 5-Point Routing & Tooling Layer",
    brief: "Automotive (USCAR-2 / USCAR-21) and aerospace (AS50881) mission-critical harness architecture. Enforces the 5-point routing checks (150mm splice insulation, 6x/10x bend radius, 50mm heat clearance, sealed cavity plugs, 150mm vibration clips) alongside the 5-part AI harness (Tools, State, Perms, Sandbox, Obs).",
    tools: ["calc_voltage_drop", "verify_bend_radius", "check_heat_clearance", "inspect_cavity_plugs", "validate_clip_spacing"],
    invariants: "Mechanical first, Electrical second, Test third. In AI: Harness first, Model second, Eval third. Hard code PreToolUse hook halts routing with splice < 150mm or cavity unsealed.",
    surface: "Claude Code CLI + Agent SDK Hooks + Python Calculators",
    rubricHighlights: "5-point routing checks, idempotent retry rules at t=1.9 tool timeout, deterministic splice hooks, zero unsealed cavities.",
    terminalPresets: [
      "claude harness init --spec uscar2-as50881 --enforce-5point-routing",
      "python3 scripts/harness_calculators.py --check-all --bundle-dia 12.0",
      "claude eval run --suite evals/harness_5point_invariants.yaml --record-telemetry",
      "claude mcp add industrial-cad -- npx -y @modelcontextprotocol/server-cad --read-only"
    ],
    evalSuite: [
      { name: "Splice distance invariant", input: "CAD layout attempts splice 40mm from bend", expected: "BLOCKED: Violates Check 1 (Splice must be >= 150mm from bend/clip)" },
      { name: "Dynamic flex bend radius", input: "Door hinge bundle diameter 12mm routed with 60mm bend", expected: "BLOCKED: Requires >= 10x (120mm) in dynamic flex zones" },
      { name: "Thermal exhaust clearance", input: "Wiring harness routed 10mm from turbocharger exhaust", expected: "BLOCKED: Violates Check 3 (Heat clearance must be >= 50mm)" },
      { name: "Unsealed cavity detection", input: "IP68 connector emitted with unpopulated empty cavity", expected: "BLOCKED: Violates Check 4 (Silicon dummy plug mandatory)" },
      { name: "Tool timeout retry recovery", input: "Upstream sensor tool times out at t=1.9s", expected: "RETRY RULE TRIGGERED: Harness loop retries with backoff; model never faulted" }
    ],
    baseScore: 98
  }
];

// ============================================================================
// SYSTEM SLASH COMMANDS & SKILLS (TOKEN-EFFICIENT ORCHESTRATION)
// ============================================================================
export const SYSTEM_SLASH_COMMANDS = [
  {
    command: "/goal",
    args: "<objective>",
    category: "Autonomous Execution",
    description: "Launches persistent, autonomous goal pursuit that runs until all verification checks pass. Eliminates repetitive user turn prompts and saves tokens through deterministic verification checkpoints.",
    tokenImpact: "Up to 65% token savings by running autonomous loop with deterministic PreToolUse invariant guards.",
    example: "/goal Refactor harness routing to satisfy USCAR-21 150mm clearance and verify passing DRC",
    outputSchema: "Phased milestone execution with pass/fail telemetry assertions."
  },
  {
    command: "/effort",
    args: "<low | medium | high | max>",
    category: "Inference Budgeting",
    description: "Dynamically regulates Claude reasoning depth and thinking token allocation. Use 'low' for deterministic edits and 'max' only for complex multi-system architectural derivations.",
    tokenImpact: "Conserves 8,000 to 24,000 thinking tokens per invocation on routine tasks.",
    example: "/effort low (for syntax formatting) or /effort high (for physical wire bundle derating)",
    outputSchema: "Active thinking token budget updated: [Low: 2k | Med: 8k | High: 16k | Max: 32k]."
  },
  {
    command: "/plan",
    args: "<task description>",
    category: "Execution Planning",
    description: "Generates an architectural phase-gate execution plan before executing any code changes. Prevents costly trial-and-error tool calls that waste tokens.",
    tokenImpact: "Eliminates redundant file edits and rollback loops, saving ~40,000 tokens on multi-file refactors.",
    example: "/plan Migrate 5-point harness routing checks into a reusable MCP tool",
    outputSchema: "Phased gate list with user confirmation checkpoint before tool dispatch."
  },
  {
    command: "/compact",
    args: "[threshold_tokens]",
    category: "Context Optimization",
    description: "Compresses long multi-turn session history into an indexed working scratchpad. Drops raw tool outputs and large file dumps while preserving critical decision context.",
    tokenImpact: "Reduces active prompt context by 75% - 85%, cutting cost on subsequent turns from $0.45 to $0.06.",
    example: "/compact 60000",
    outputSchema: "Compressed working memory summary (250 words) + indexed decision register."
  },
  {
    command: "/cost",
    args: "",
    category: "Telemetry & Accounting",
    description: "Outputs real-time token consumption ledger, prompt caching hit-rates (cache_read vs cache_write), and cumulative USD expenditure.",
    tokenImpact: "Full transparency over token waste; identifies un-cached repetitive system instructions.",
    example: "/cost",
    outputSchema: "Token table: Input, Cache Read (90% off), Cache Write, Output, Total Cost ($)."
  },
  {
    command: "/grill-me",
    args: "<architectural proposal>",
    category: "Alignment & Constraints",
    description: "Initiates a rapid technical interview where Claude acts as a Staff Systems Architect, challenging edge cases and clarifying ambiguous requirements before code is written.",
    tokenImpact: "Avoids costly downstream rewrites caused by misaligned assumptions.",
    example: "/grill-me Dual-redundant 800V bus architecture with shared ground",
    outputSchema: "3 targeted architectural pressure-test questions with multi-choice options."
  },
  {
    command: "/learn",
    args: "<operational rule>",
    category: "Persistent Memory",
    description: "Distills a corrected user workflow or critical bug fix into a permanent, compact instruction inside CLAUDE.md. Prevents having to re-explain project constraints in future turns.",
    tokenImpact: "Saves 500+ prompt tokens on every subsequent user turn permanently.",
    example: "/learn Never place ultrasonic splices within 150mm of bundle bends in this repo",
    outputSchema: "Appended invariant entry in CLAUDE.md with verification hash."
  },
  {
    command: "/schedule",
    args: "<cron | seconds> <prompt>",
    category: "Automation",
    description: "Configures recurring cron jobs or one-shot liveness timers. Prevents wasteful polling loops by relying on reactive system wakeup notifications.",
    tokenImpact: "Zero token consumption while waiting; model only wakes when timer triggers.",
    example: "/schedule 3600 'Run DRC audit against active CAD formboard'",
    outputSchema: "Background timer task registered with notification handle."
  },
  {
    command: "/harness-verify",
    args: "[--standard USCAR-21 | AS50881]",
    category: "Physical Invariants",
    description: "Runs deterministic Design Rule Checks (DRC) against active harness nodes, enforcing physical splice clearance, bend radius, and cavity seal constraints.",
    tokenImpact: "Runs 100% in local deterministic code (< 5ms) without consuming LLM inference tokens.",
    example: "/harness-verify --standard USCAR-21",
    outputSchema: "DRC Pass/Fail report with exact millimeter clearances and failure modes."
  }
];

// ============================================================================
// TOKEN & CONTEXT EFFICIENCY ENGINE (SELF-HEALING & RESOURCE MAXIMIZATION)
// ============================================================================
export const TOKEN_OPTIMIZATION_MODULE = {
  title: "Token & Context Efficiency Engine",
  subtitle: "Self-Healing Context, Anthropic Prompt Caching & Minimalist Tooling",
  overview: "Enterprise AI systems fail financially when developers treat token context as an infinite buffer. By architecting self-healing system prompts, leveraging Anthropic Prompt Caching (90% discount), and replacing blind repo dumps with targeted line searches, teams reduce token expenditure by 85% to 96% while improving reasoning accuracy.",
  
  pillars: [
    {
      id: "prompt-caching",
      name: "Anthropic Prompt Caching (cache_control)",
      icon: "bolt",
      discount: "90% Cost Reduction ($0.30/M vs $3.00/M)",
      rule: "Place static invariants, CLAUDE.md, and MCP tool schemas at the top with cache_control: {'type': 'ephemeral'}. Only append dynamic state at the message tail.",
      badPractice: "Interleaving dynamic user inputs before large system prompt blocks or tool definitions, causing 100% cache invalidation on every turn.",
      goodPractice: "Structure: [System Core (Cached)] -> [CLAUDE.md & Invariants (Cached)] -> [MCP Tools (Cached)] -> [Dynamic Session Tail].",
      codeSnippet: `// Correct Anthropic Prompt Caching Structure
const response = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 4096,
  system: [
    {
      type: "text",
      text: SYSTEM_PROMPT_INVARIANTS,
      cache_control: { type: "ephemeral" } // ⚡ 90% discount on cache read ($0.30/M)
    }
  ],
  tools: MCP_TOOL_DEFINITIONS.map((tool, idx) => 
    idx === MCP_TOOL_DEFINITIONS.length - 1
      ? { ...tool, cache_control: { type: "ephemeral" } } // ⚡ Cache all tools
      : tool
  ),
  messages: conversationHistory // Only dynamic messages change
});`
    },
    {
      id: "hierarchical-search",
      name: "Hierarchical Search vs. Context Dumping",
      icon: "search",
      discount: "45,000+ Tokens Saved Per Debug Run",
      rule: "Never run blind file dumps (e.g. cat entire files or ls -R). Use ripgrep with line filters (grep_search) and slice windows (view_file StartLine/EndLine).",
      badPractice: "Reading 5 whole files (15,000 tokens) to find a single 4-line function definition.",
      goodPractice: "grep_search for symbol -> view_file StartLine: 240, EndLine: 265 (only 35 tokens consumed).",
      codeSnippet: `// ✗ ANTI-PATTERN: Blind context blowout
view_file({ AbsolutePath: "/repo/harness/engine.py" }); // 12,000 tokens!

// ✓ SOTA BEST PRACTICE: Targeted slice
const match = grep_search({ Query: "def check_splice_clearance", SearchPath: "/repo" });
view_file({ AbsolutePath: match.path, StartLine: 45, EndLine: 65 }); // 120 tokens!`
    },
    {
      id: "self-healing",
      name: "Self-Healing Adaptive Context & Anticipation",
      icon: "sparkles",
      discount: "Zero Wasteful Reprompting",
      rule: "System prompts must anticipate user intent from historical session state and recover from tool errors locally rather than forcing repetitive multi-turn re-prompts.",
      badPractice: "Agent crashes on 504 tool timeout; prompts user: 'Error occurred, what would you like me to do?'; user repeats entire context.",
      goodPractice: "Deterministic harness loop catches 504, executes idempotent exponential backoff retry rule, and returns verified answer without user token waste.",
      codeSnippet: `// Self-Healing Harness Loop (Zero Token Reprompt)
harness.on('ToolError', async (error, call) => {
  if (error.code === 504 || error.is_retryable) {
    // Self-healing: retry with localized jitter backoff
    telemetry.recordSpan('tool_retry', { tool: call.name });
    return await executeToolWithBackoff(call, { maxRetries: 3 });
  }
  throw error;
});`
    },
    {
      id: "context-compaction",
      name: "Dynamic Context Compaction (/compact)",
      icon: "archive",
      discount: "80% Context Overhead Reduction",
      rule: "When active conversation context exceeds 75,000 tokens, compact historical turns into a structured 250-word state scratchpad and drop raw tool execution traces.",
      badPractice: "Carrying 40 turns of raw stdout traces, shell commands, and JSON payloads into turn 41.",
      goodPractice: "Compress turns 1-35 into a 250-word state summary with immutable decisions and pending invariants.",
      codeSnippet: `// Dynamic Compaction Trigger
if (currentTokens > 75000) {
  const scratchpad = await generateCompactedSummary(sessionHistory.slice(0, -5));
  sessionHistory = [
    { role: "system", content: \`COMPACTED STATE CHECKPOINT:\\n\${scratchpad}\` },
    ...sessionHistory.slice(-5) // Keep last 5 active turns intact
  ];
}`
    }
  ],

  tokenCalculator: {
    baseInputCostPerM: 3.00,
    cachedReadCostPerM: 0.30,   // 90% discount!
    cachedWriteCostPerM: 3.75,
    outputCostPerM: 15.00,
    typicalRepoTokens: 145000,
    optimizedTokens: 12400
  }
};

// ============================================================================
// SEARCHABLE CLAUDE COMMANDS & SKILLS LIBRARY REGISTRY
// ============================================================================
export const CLAUDE_COMMANDS_LIBRARY = [
  // --- CORE SLASH COMMANDS ---
  {
    id: "cmd-goal",
    name: "Autonomous Persistent Goal",
    command: "/goal",
    syntax: "/goal <objective>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Launches persistent, autonomous goal pursuit that runs until all verification checks pass. Eliminates repetitive user turns by running an autonomous inner loop protected by deterministic PreToolUse invariant guards.",
    tokenImpact: "Up to 65% token savings by replacing repetitive human-in-the-loop reprompts with autonomous loop assertions.",
    example: "/goal Refactor harness routing to satisfy USCAR-21 150mm clearance and verify passing DRC",
    copyText: "/goal Refactor harness routing to satisfy USCAR-21 150mm clearance and verify passing DRC",
    tags: ["goal", "autonomous", "loop", "persistence", "agent", "invariant", "uscar"],
    interactive: true,
    placeholder: "Refactor harness routing to satisfy USCAR-21 150mm clearance"
  },
  {
    id: "cmd-effort",
    name: "Adaptive Thinking Token Budget",
    command: "/effort",
    syntax: "/effort <low | medium | high | max>",
    category: "Inference & Tokens",
    categoryBadgeColor: "var(--accent-emerald)",
    description: "Dynamically regulates Claude reasoning depth and thinking token allocation. Set to 'low' for deterministic code edits/formatting and 'max' only for multi-system architectural derivations or formal DRC proofs.",
    tokenImpact: "Conserves 8,000 to 24,000 thinking tokens per invocation on routine tasks.",
    example: "/effort max",
    copyText: "/effort max",
    tags: ["effort", "thinking", "budget", "tokens", "reasoning", "cost", "inference"],
    interactive: true,
    options: ["low", "medium", "high", "max"],
    defaultOption: "high"
  },
  {
    id: "cmd-plan",
    name: "Architectural Phase-Gate Plan",
    command: "/plan",
    syntax: "/plan <task description>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Generates an architectural phase-gate execution plan before executing any code changes. Prevents costly trial-and-error tool calls and rolling back hallucinated file edits.",
    tokenImpact: "Eliminates redundant file edits and rollback loops, saving ~40,000 tokens on multi-file refactors.",
    example: "/plan Migrate 5-point harness routing checks into a reusable MCP tool with USCAR-21 rules",
    copyText: "/plan Migrate 5-point harness routing checks into a reusable MCP tool with USCAR-21 rules",
    tags: ["plan", "planning", "phase", "gate", "architecture", "verification"],
    interactive: true,
    placeholder: "Implement deterministic 5-point DRC validator tool for vehicle wire harnesses"
  },
  {
    id: "cmd-compact",
    name: "Dynamic Context Compactor",
    command: "/compact",
    syntax: "/compact [threshold_tokens]",
    category: "Context & Cache",
    categoryBadgeColor: "#a78bfa",
    description: "Compresses long multi-turn session history into an indexed working scratchpad. Drops raw tool stdout, large file dumps, and JSON traces while preserving critical architectural decisions and pending invariants.",
    tokenImpact: "Reduces active prompt context by 75% - 85%, cutting cost on subsequent turns from $0.45 to $0.06.",
    example: "/compact 60000",
    copyText: "/compact 60000",
    tags: ["compact", "context", "history", "compression", "scratchpad", "memory", "token"],
    interactive: true,
    options: ["30000", "50000", "60000", "75000", "100000"],
    defaultOption: "60000"
  },
  {
    id: "cmd-cost",
    name: "Session Token & Cost Ledger",
    command: "/cost",
    syntax: "/cost",
    category: "Inference & Tokens",
    categoryBadgeColor: "var(--accent-emerald)",
    description: "Outputs real-time token consumption ledger, prompt caching hit-rates (cache_read vs cache_write vs uncached input), and cumulative USD expenditure formatted as an ASCII telemetry table.",
    tokenImpact: "Full transparency over token waste; immediately identifies un-cached repetitive system instructions.",
    example: "/cost",
    copyText: "/cost",
    tags: ["cost", "ledger", "price", "dollars", "telemetry", "prompt caching", "accounting"],
    interactive: false
  },
  {
    id: "cmd-tokens",
    name: "Context Window Token Telemetry",
    command: "/tokens",
    syntax: "/tokens",
    category: "Inference & Tokens",
    categoryBadgeColor: "var(--accent-emerald)",
    description: "Displays current session token breakdown across system prompt invariants, tool schema overhead, conversation turns, and generation outputs against model context limits.",
    tokenImpact: "Prevents surprise context overflow and signals when to trigger /compact.",
    example: "/tokens",
    copyText: "/tokens",
    tags: ["tokens", "context", "window", "usage", "limit", "breakdown"],
    interactive: false
  },
  {
    id: "cmd-cache-status",
    name: "Anthropic Prompt Cache Inspector",
    command: "/cache-status",
    syntax: "/cache-status",
    category: "Context & Cache",
    categoryBadgeColor: "#a78bfa",
    description: "Inspects cache_control breakpoints, TTL status, and verifies whether static CLAUDE.md invariants and MCP tool declarations are cleanly hit at the $0.30/M read discount.",
    tokenImpact: "Confirms 90% discount on cached tokens is active and flags cache invalidation leaks.",
    example: "/cache-status",
    copyText: "/cache-status",
    tags: ["cache", "prompt caching", "ephemeral", "discount", "breakpoints", "ttl"],
    interactive: false
  },
  {
    id: "cmd-grill-me",
    name: "Staff Architect Pressure-Test",
    command: "/grill-me",
    syntax: "/grill-me <proposal>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Initiates a rapid technical interview where Claude acts as a Staff Systems Architect, challenging edge cases, thermal limits, failure modes, and ambiguous specs before code is written.",
    tokenImpact: "Avoids costly downstream architectural rewrites caused by misaligned assumptions.",
    example: "/grill-me Dual-redundant 800V bus architecture with shared ground and 50G vibration profile",
    copyText: "/grill-me Dual-redundant 800V bus architecture with shared ground and 50G vibration profile",
    tags: ["grill", "interview", "challenge", "requirements", "edge cases", "architecture"],
    interactive: true,
    placeholder: "Dual-redundant 800V bus architecture with shared ground"
  },
  {
    id: "cmd-learn",
    name: "CLAUDE.md Invariant Learning",
    command: "/learn",
    syntax: "/learn <rule>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Distills a corrected user workflow or critical bug fix into a permanent, compact instruction inside CLAUDE.md. Prevents having to re-explain project constraints in future turns.",
    tokenImpact: "Saves 500+ prompt tokens on every subsequent user turn permanently.",
    example: "/learn Never place ultrasonic splices within 150mm of bundle bends in this repo",
    copyText: "/learn Never place ultrasonic splices within 150mm of bundle bends in this repo",
    tags: ["learn", "memory", "claude.md", "invariants", "rules", "persistence"],
    interactive: true,
    placeholder: "Never place ultrasonic splices within 150mm of bundle bends in this repo"
  },
  {
    id: "cmd-schedule",
    name: "Reactive Scheduler & Liveness",
    command: "/schedule",
    syntax: "/schedule <seconds | cron> <prompt>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Configures recurring cron schedules or one-shot liveness timers. Eliminates wasteful active polling loops by relying on reactive system wakeup notifications.",
    tokenImpact: "Zero token consumption while waiting; model only wakes when timer triggers.",
    example: "/schedule 3600 'Run DRC audit against active CAD formboard'",
    copyText: "/schedule 3600 'Run DRC audit against active CAD formboard'",
    tags: ["schedule", "cron", "timer", "background", "polling", "liveness"],
    interactive: true,
    placeholder: "3600 'Run DRC audit against active CAD formboard'"
  },
  {
    id: "cmd-theme",
    name: "3-Way Theme Controller",
    command: "/theme",
    syntax: "/theme <dark | light | system>",
    category: "Slash Commands",
    categoryBadgeColor: "var(--accent-cyan)",
    description: "Programmatically changes the portal theme across Dark (Tactical Obsidian), Light (Snow White Apple HIG), or System (OS auto-detection).",
    tokenImpact: "Instant local CSS variable reconfiguration without LLM roundtrips.",
    example: "/theme light",
    copyText: "/theme light",
    tags: ["theme", "dark", "light", "system", "apple", "color", "appearance"],
    interactive: true,
    options: ["dark", "light", "system"],
    defaultOption: "dark"
  },
  {
    id: "cmd-harness-verify",
    name: "Design Rule Check (DRC) Invariant Verification",
    command: "/harness-verify",
    syntax: "/harness-verify [--standard USCAR-21 | AS50881 | ISO19642]",
    category: "DRC & Harness",
    categoryBadgeColor: "#fb923c",
    description: "Runs deterministic Design Rule Checks (DRC) against active CAD harness nodes, validating physical splice clearance (>= 150mm), bend radius, vibration anchors, and cavity seals.",
    tokenImpact: "Runs 100% in local deterministic code (< 5ms) without consuming LLM inference tokens.",
    example: "/harness-verify --standard USCAR-21",
    copyText: "/harness-verify --standard USCAR-21",
    tags: ["harness", "drc", "uscar", "as50881", "verification", "splice", "clearance"],
    interactive: true,
    options: ["--standard USCAR-21", "--standard AS50881", "--standard ISO19642"],
    defaultOption: "--standard USCAR-21"
  },

  // --- CLAUDE CODE CLI & TERMINAL COMMANDS ---
  {
    id: "cmd-cli-init",
    name: "Launch Claude Code CLI",
    command: "claude",
    syntax: "claude [options]",
    category: "CLI & Terminal",
    categoryBadgeColor: "var(--accent-indigo)",
    description: "Initializes the native Claude Code agent in your terminal with workspace auto-detection, CLAUDE.md parsing, and MCP server initialization.",
    tokenImpact: "Reads CLAUDE.md once and caches system invariants for all turns.",
    example: "claude",
    copyText: "claude",
    tags: ["claude", "cli", "terminal", "init", "start", "session"],
    interactive: false
  },
  {
    id: "cmd-cli-resume",
    name: "Resume Previous Session",
    command: "claude --resume",
    syntax: "claude --resume",
    category: "CLI & Terminal",
    categoryBadgeColor: "var(--accent-indigo)",
    description: "Resumes the previous conversation session with full history, tool state, and warm prompt cache intact. Prevents re-reading project files.",
    tokenImpact: "Saves up to 50,000 initialization tokens by restoring existing prompt cache.",
    example: "claude --resume",
    copyText: "claude --resume",
    tags: ["resume", "session", "restore", "state", "cache", "cli"],
    interactive: false
  },
  {
    id: "cmd-cli-print",
    name: "Non-Interactive Pipeline Command",
    command: "claude -p",
    syntax: "claude -p '<prompt>'",
    category: "CLI & Terminal",
    categoryBadgeColor: "var(--accent-indigo)",
    description: "Executes a single instruction non-interactively and streams output to stdout. Ideal for CI/CD test runners, git hooks, and headless scripts.",
    tokenImpact: "Single-turn execution eliminates conversational context accumulation.",
    example: "claude -p 'Audit ./src/harness for USCAR-21 compliance and output exit code'",
    copyText: "claude -p 'Audit ./src/harness for USCAR-21 compliance and output exit code'",
    tags: ["print", "ci", "cd", "headless", "pipe", "script", "non-interactive"],
    interactive: true,
    placeholder: "Audit ./src/harness for USCAR-21 compliance and output exit code"
  },
  {
    id: "cmd-cli-mcp-list",
    name: "List Model Context Protocol Servers",
    command: "claude mcp list",
    syntax: "claude mcp list",
    category: "CLI & Terminal",
    categoryBadgeColor: "var(--accent-indigo)",
    description: "Inspects all registered MCP servers, active connections (stdio/SSE), schemas, and tool signatures exposed to the Claude agent.",
    tokenImpact: "Verifies which tool schemas are consuming context window space.",
    example: "claude mcp list",
    copyText: "claude mcp list",
    tags: ["mcp", "tools", "servers", "schemas", "protocol", "gateway"],
    interactive: false
  },
  {
    id: "cmd-cli-doctor",
    name: "Claude Environment Doctor",
    command: "claude doctor",
    syntax: "claude doctor",
    category: "CLI & Terminal",
    categoryBadgeColor: "var(--accent-indigo)",
    description: "Diagnoses CLI health, auth tokens, git configuration, Node.js runtime, sandbox isolation policies, and connectivity to Anthropic API.",
    tokenImpact: "Pre-flight validation prevents runtime failures and wasted inference calls.",
    example: "claude doctor",
    copyText: "claude doctor",
    tags: ["doctor", "health", "diagnostics", "auth", "sandbox", "config"],
    interactive: false
  },

  // --- INDUSTRIAL HARNESS RECIPES & PRODUCTION WORKFLOWS ---
  {
    id: "recipe-drc-sweep",
    name: "Deterministic DRC Audit & Ledger Sweep",
    command: "Recipe: DRC Sweep",
    syntax: "/harness-verify --standard USCAR-21 && /cost",
    category: "Industrial Recipes",
    categoryBadgeColor: "#f43f5e",
    description: "Executes local deterministic Design Rule Checks against the active wiring formboard, enforces physical splice clearances, and prints the token and dollar accounting ledger without wasting inference tokens.",
    tokenImpact: "0 LLM tokens for verification + instant ledger audit ($0 cost).",
    example: "/harness-verify --standard USCAR-21\n/cost",
    copyText: "/harness-verify --standard USCAR-21 && /cost",
    tags: ["recipe", "uscar", "drc", "verify", "audit", "workflow", "production"],
    interactive: false
  },
  {
    id: "recipe-hierarchical-debug",
    name: "Hierarchical Search vs Blind Dump",
    command: "Recipe: SOTA Debug",
    syntax: "grep_search -> view_file slice -> /effort high",
    category: "Industrial Recipes",
    categoryBadgeColor: "#f43f5e",
    description: "The gold-standard architectural pattern for debugging: locate symbol definitions using ripgrep (`grep_search`), inspect strictly the 20 lines around the target using slice bounds (`view_file StartLine:45 EndLine:65`), allocate high effort, and fix.",
    tokenImpact: "Consumes only ~550 tokens vs. 48,000 tokens for a blind 15-file monorepo dump (98.8% token reduction).",
    example: "grep_search({ Query: 'calculate_derating', SearchPath: './src' })\nview_file({ AbsolutePath: './src/derating.ts', StartLine: 45, EndLine: 65 })\n/effort high",
    copyText: "grep_search({ Query: 'calculate_derating', SearchPath: './src' })\nview_file({ AbsolutePath: './src/derating.ts', StartLine: 45, EndLine: 65 })\n/effort high",
    tags: ["recipe", "hierarchical", "grep", "search", "slice", "debug", "savings"],
    interactive: false
  },
  {
    id: "recipe-overnight-goal",
    name: "Overnight Autonomous Refactoring Gate",
    command: "Recipe: Autonomous Goal",
    syntax: "/goal <specification with acceptance tests>",
    category: "Industrial Recipes",
    categoryBadgeColor: "#f43f5e",
    description: "Hands-off overnight task execution: directs Claude to iteratively refactor legacy harness code, run unit tests, re-verify physical clearances, and stop only when 100% of DRC checks pass.",
    tokenImpact: "Eliminates 30+ interactive turn roundtrips; executes within a single disciplined goal harness.",
    example: "/goal 'Migrate EV 800V harness schemas to USCAR-21 Revision 4, run deterministic DRC, and generate formal compliance diff'",
    copyText: "/goal 'Migrate EV 800V harness schemas to USCAR-21 Revision 4, run deterministic DRC, and generate formal compliance diff'",
    tags: ["recipe", "overnight", "goal", "autonomous", "uscar", "compliance"],
    interactive: false
  },
  {
    id: "recipe-context-hygiene",
    name: "Context Hygiene & Compaction Cycle",
    command: "Recipe: Context Hygiene",
    syntax: "/compact 60000 && /cache-status",
    category: "Industrial Recipes",
    categoryBadgeColor: "#f43f5e",
    description: "Standard operating procedure for marathon coding sessions: compresses accumulated multi-turn noise into a 250-word state register and validates that the prompt cache is primed.",
    tokenImpact: "Drops active token burden by ~60,000 tokens, saving ~$0.18 on every following turn.",
    example: "/compact 60000\n/cache-status",
    copyText: "/compact 60000 && /cache-status",
    tags: ["recipe", "hygiene", "compact", "cache", "cycle", "marathon"],
    interactive: false
  }
];

// =========================================================================
// VOICE-NATIVE AGENT RUNTIME DATA LAYER
// Continuous Conversation State, The Second Loop & Physical Safety Boundary
// =========================================================================
export const VOICE_RUNTIME_DATA = {
  version: "3.2-production",
  session: {
    sessionId: "SES-VOICE-2026-9281",
    status: "active",
    user: "Frank Van Laarhoven",
    role: "Lead Systems Architect",
    voiceprintMatch: 99.8,
    locale: "en-US",
    safetyClearance: "Tier-1 Hardware Interlock & CAD Release"
  },
  groundedEntities: [
    {
      id: "G1-04",
      name: "Unitree G1 Humanoid #04",
      type: "Physical Robot",
      state: "Executing Task (Tray Inspection)",
      spatialCoords: { x: 2.4, y: 1.1, z: 0.0 },
      workcell: "Cell 2 / Formboard Bench",
      deicticAliases: ["that robot", "the active humanoid", "primary unit", "G1 number four"]
    },
    {
      id: "G1-05",
      name: "Unitree G1 Humanoid #05",
      type: "Physical Robot",
      state: "Standby / Gripper Parked",
      spatialCoords: { x: 3.6, y: 1.1, z: 0.0 },
      workcell: "Cell 2 / Beside G1-04 (+1.2m offset)",
      deicticAliases: ["the G1 beside it", "the adjacent robot", "secondary humanoid", "the standby G1"]
    },
    {
      id: "HARNESS-W101",
      name: "Harness Bundle W-101",
      type: "CAD / Physical Wire Bundle",
      state: "Active Routing (Node J1 -> J2)",
      standard: "USCAR-21 Rev 4 & AS50881",
      activeWire: "Wire #101 (18 AWG TXL / Copper)",
      deicticAliases: ["it", "this harness", "the bundle", "main inverter feeder", "wire 101"]
    },
    {
      id: "TOOL-CRIMP-02",
      name: "Schleuniger Automated Crimper Unit #02",
      type: "Actuator Tool",
      state: "Armed (Awaiting Verified Pull-Off Target)",
      standard: "USCAR-21 §4.2",
      deicticAliases: ["the crimper", "terminal press", "applicator", "die station"]
    }
  ],
  pipelineStages: [
    { id: "audio_vad", name: "1. Audio & VAD", icon: "mic", latency: 18, desc: "20ms sliding audio frames, WebRTC VAD & SNR energy threshold." },
    { id: "asr", name: "2. Streaming ASR", icon: "transcript", latency: 92, desc: "Streaming Conformer/Whisper with sub-word partial hypotheses." },
    { id: "speaker_id", name: "3. Speaker & Lang ID", icon: "user-check", latency: 22, desc: "Acoustic biometric vector verification & language gating (en-US)." },
    { id: "semantic_parse", name: "4. Semantic Parsing", icon: "code", latency: 35, desc: "Extracts intent slots and resolves deictic pronouns to grounded physical entities." },
    { id: "context_retrieval", name: "5. Context Retrieval", icon: "database", latency: 28, desc: "Pulls cross-agent continuous conversation state, active CAD board & spatial map." },
    { id: "policy_gate", name: "6. Policy Gate", icon: "shield", latency: 12, desc: "Enforces ISO 13849 safety envelopes and RBAC administrative policy." },
    { id: "agent_reason", name: "7. Agent Reasoning", icon: "cpu", latency: 110, desc: "Dispatches to project-specific specialist agent with prompt cache optimization." },
    { id: "tool_exec", name: "8. Tool Execution", icon: "tool", latency: 40, desc: "Deterministic MCP tool call / CAD router / PreToolUse invariant validation." },
    { id: "verification", name: "9. State Verification", icon: "check-circle", latency: 15, desc: "Validates post-condition state invariants and physical compliance diff." },
    { id: "response_plan", name: "10. Response Planner", icon: "message-square", latency: 35, desc: "Generates concise, non-fluff audio response with prosody & cadence tags." },
    { id: "tts_synth", name: "11. Expressive TTS", icon: "volume-2", latency: 85, desc: "Low-latency neural audio streaming directly to operator's headset." }
  ],
  secondLoop: {
    title: "Continuous State & Interruption Loop",
    bargeInLatencyMs: 28,
    stateMemoryScope: "Persistent Session (Sits ABOVE Individual Agents)",
    classes: [
      {
        name: "Spatial / Entity Correction",
        trigger: "No, not that robot—the G1 beside it",
        interruptionPoint: "Mid-execution of picking tray (t=420ms)",
        stateUpdate: "Swaps active target from G1-04 to G1-05; recalculates spatial trajectory",
        replanning: "Invalidates trajectory branch; recalculates inverse kinematics; resumes execution safely"
      },
      {
        name: "In-Flight Parameter Override",
        trigger: "Wait, change wire 101 to 16 AWG Raychem 44 before crimping!",
        interruptionPoint: "Tool queuing at Schleuniger station (t=180ms)",
        stateUpdate: "Overwrites wire gauge: 18 AWG -> 16 AWG, insulation: Raychem 44",
        replanning: "Re-runs USCAR-21 crimp height & pull-off force calculation (135N threshold); swaps applicator die"
      },
      {
        name: "Clarification & Grounded Explanation",
        trigger: "Why did you route the splice near the bulkhead instead of the tray?",
        interruptionPoint: "During route inspection (t=0ms)",
        stateUpdate: "Accesses AS50881 thermal clearance rule (§5.2.1) in episodic memory",
        replanning: "Speaks grounded rationale: 'Bulkhead routing avoids 140°C thermal plume from exhaust manifold. Rerouting to tray requires additional heat sleeving.'"
      },
      {
        name: "Emergency Verbal Abort (E-Stop)",
        trigger: "Stop immediately—hold actuator position!",
        interruptionPoint: "Immediate barge-in (<30ms)",
        stateUpdate: "Sets hardware E-Stop flag; freezes joint velocities",
        replanning: "Halts EtherCAT packet queue; requires manual 2-man safety clear to resume"
      }
    ]
  },
  safetyBoundary: {
    title: "Mandatory Physical & Digital Safety Boundary",
    ruleFormula: "Voice request -> Intent -> Proposed physical action -> Safety validator -> Human confirmation (when required) -> Controller",
    ironcladRule: "Never allow the language model itself to directly translate unrestricted speech into actuator commands.",
    validators: [
      {
        id: "PHYS-01",
        rule: "Collaborative Velocity & Force Envelope (ISO 10218-1)",
        condition: "Actuator tip speed <= 250 mm/s; collision force <= 150 N",
        actionOnFail: "Deterministic clamp to safe limit or hard abort"
      },
      {
        id: "PHYS-02",
        rule: "USCAR-21 / AS50881 Terminal & Splice Invariant",
        condition: "Pull-off force >= 135 N for 16 AWG; crimp height +/- 0.03mm",
        actionOnFail: "Reject crimp cycle; lock tool until calibrated"
      },
      {
        id: "PHYS-03",
        rule: "High-Consequence Human Confirmation Interlock",
        condition: "Energized High Voltage (>60V DC) or irreversible wire severance",
        actionOnFail: "Hold in gate; prompt visual modal or 2-factor voice confirmation"
      },
      {
        id: "PHYS-04",
        rule: "Airframe Thermal Clearance (AS50881 §5.2.1)",
        condition: "Minimum 50mm clearance from fluid lines / manifolds",
        actionOnFail: "Reject route; notify operator with DRC rule code"
      }
    ]
  },
  scenarios: [
    {
      id: "scen-nominal-route",
      name: "1. Nominal Linear Execution (CAD & DRC)",
      badge: "Loop 1 (Nominal)",
      badgeColor: "#10b981",
      audioTranscript: "Route wire 101 from Connector J1 to J2 and verify USCAR-21 compliance.",
      speaker: "Frank Van Laarhoven (Lead Architect)",
      groundedEntities: ["HARNESS-W101 (J1 -> J2)", "Wire #101 (18 AWG)"],
      intent: "ROUTE_WIRE_AND_VERIFY_DRC",
      proposedAction: {
        action: "EXECUTE_ROUTING_DRC",
        target: "HARNESS-W101",
        wire: "101",
        from: "J1-Pin3",
        to: "J2-Pin7",
        rule: "USCAR-21 Rev 4"
      },
      safetyStatus: "PASSED (Deterministic DRC Validated)",
      safetyCode: "USCAR-21-OK",
      humanConfirmationRequired: false,
      responseAudioText: "Wire 101 successfully routed between J1 and J2. Splice clearance is 18.4 millimeters. USCAR-21 terminal crimp check passes at 92 Newtons.",
      telemetry: { vadMs: 18, asrMs: 84, parseMs: 32, reasonMs: 98, safetyMs: 11, ttsMs: 82, totalMs: 325 }
    },
    {
      id: "scen-second-loop-robot",
      name: "2. The Second Loop: Pronoun & Entity Grounding Shift",
      badge: "Loop 2 (Correction)",
      badgeColor: "#6366f1",
      audioTranscript: "Have the robot pick up the terminal tray... No, not that robot—the G1 beside it!",
      speaker: "Frank Van Laarhoven (Lead Architect)",
      initialGrounding: "Unitree G1 #04 (G1-04)",
      interruptionDetected: "Barge-in at t=380ms ('No, not that robot—')",
      secondLoopAction: "Entity Re-Grounding & Dynamic Replanning",
      updatedGrounding: "Unitree G1 #05 (G1-05 / Offset +1.2m)",
      proposedAction: {
        action: "PICK_TERMINAL_TRAY",
        robot_id: "G1-05",
        tray_id: "TRAY-TE-1326030",
        trajectory: "TRAJ-G1-05-APPROACH-SAFE",
        speed_mms: 180
      },
      safetyStatus: "PASSED (ISO 10218 Speed Envelope Checked: 180 mm/s <= 250 mm/s)",
      safetyCode: "ISO-10218-SAFE",
      humanConfirmationRequired: false,
      responseAudioText: "Acknowledged. Disengaging G1 number 4. Re-routing task to Unitree G1 number 5 beside it. Approach speed clamped to 180 millimeters per second.",
      telemetry: { vadMs: 16, asrMs: 92, parseMs: 44, reasonMs: 112, safetyMs: 14, ttsMs: 88, totalMs: 366 }
    },
    {
      id: "scen-parameter-override",
      name: "3. The Second Loop: In-Flight Parameter Override",
      badge: "Loop 2 (Override)",
      badgeColor: "#a855f7",
      audioTranscript: "Wait, change wire 101 to 16 AWG Raychem 44 before crimping!",
      speaker: "Frank Van Laarhoven (Lead Architect)",
      initialPlan: "Crimp 18 AWG TXL wire (Die C-18, Pull-off target 89 N)",
      interruptionDetected: "In-flight override before tool actuation",
      secondLoopAction: "Tooling Invalidation & Crimp Height Recalculation",
      updatedPlan: "Crimp 16 AWG Raychem 44 (Die C-16, Pull-off target 135 N)",
      proposedAction: {
        action: "UPDATE_CRIMP_TOOLING",
        wire: "101",
        new_gauge: "16 AWG",
        new_insulation: "Raychem 44",
        applicator_die: "DIE-C16-S2",
        crimp_height_mm: 1.24,
        min_pull_n: 135
      },
      safetyStatus: "PASSED (USCAR-21 §4.2 Tooling Verified)",
      safetyCode: "USCAR21-DIE-C16",
      humanConfirmationRequired: false,
      responseAudioText: "Holding crimper cycle. Wire 101 updated to 16 AWG Raychem 44. Applicator die swapped to C-16. Minimum tensile threshold updated to 135 Newtons.",
      telemetry: { vadMs: 17, asrMs: 88, parseMs: 38, reasonMs: 95, safetyMs: 12, ttsMs: 80, totalMs: 330 }
    },
    {
      id: "scen-safety-violation",
      name: "4. Physical Safety Barrier: Velocity Overrun Blocked",
      badge: "Safety Gate (Blocked)",
      badgeColor: "#f43f5e",
      audioTranscript: "Swing the robotic arm at full speed across the workcell right now!",
      speaker: "Frank Van Laarhoven (Lead Architect)",
      groundedEntities: ["Unitree G1 #04 (G1-04)"],
      intent: "COMMAND_ACTUATOR_MAX_VELOCITY",
      proposedAction: {
        action: "ACTUATE_JOINTS",
        robot_id: "G1-04",
        velocity_mms: 850,
        collision_scan: false
      },
      safetyStatus: "CRITICAL REJECTION — BLOCKED AT SAFETY VALIDATOR",
      safetyCode: "ERR_ISO_10218_VELOCITY_OVERRUN",
      safetyDetails: "Proposed speed 850 mm/s violates ISO 10218 collaborative maximum of 250 mm/s without optical curtain interlock. Voice intent denied from reaching controller.",
      humanConfirmationRequired: false,
      responseAudioText: "Command rejected by Safety Validator. Actuator speed of 850 millimeters per second exceeds the ISO 10218 safety limit of 250 millimeters per second. Motion prohibited.",
      telemetry: { vadMs: 18, asrMs: 78, parseMs: 29, reasonMs: 82, safetyMs: 9, ttsMs: 94, totalMs: 310 }
    },
    {
      id: "scen-human-confirmation",
      name: "5. High-Consequence Physical Gate: Human Confirmation Required",
      badge: "Safety Gate (Interlock)",
      badgeColor: "#f59e0b",
      audioTranscript: "Energize the 800V High Voltage DC rail on Harness W-101.",
      speaker: "Frank Van Laarhoven (Lead Architect)",
      groundedEntities: ["HARNESS-W101", "800V Inverter HV Rail"],
      intent: "ENERGIZE_HIGH_VOLTAGE_BUS",
      proposedAction: {
        action: "ENGAGE_HV_CONTACTOR",
        circuit: "HARNESS-W101-HV",
        voltage_nominal: 800,
        contactor_id: "CONTACTOR-HV-MAIN"
      },
      safetyStatus: "HOLD — HIGH-CONSEQUENCE SAFETY INTERLOCK ACTIVE",
      safetyCode: "GATE_HIGH_CONSEQUENCE_HV",
      safetyDetails: "Energizing 800V DC rail is classified as Level-4 irreversible physical hazard. Controller dispatch requires explicit dual-factor operator confirmation.",
      humanConfirmationRequired: true,
      confirmationPrompt: "CONFIRM HIGH VOLTAGE ENERGIZATION (800V DC)?",
      responseAudioText: "High voltage hazard detected. Energizing 800-volt rail requires dual-factor operator authorization. Please confirm execution on your console or speak 'CONFIRM ENERGIZE'.",
      telemetry: { vadMs: 19, asrMs: 82, parseMs: 34, reasonMs: 88, safetyMs: 15, ttsMs: 91, totalMs: 329 }
    }
  ],
  voiceRegions: [
    {
      id: "en-US",
      name: "American (US)",
      flag: "🇺🇸",
      lang: "en-US",
      defaultVoiceHint: "Samantha",
      fallbackVoiceHint: "Albert",
      samplePitch: 1.0,
      sampleRate: 1.05,
      samplePhrase: "American voice profile engaged. Voice-native runtime connected with continuous state and identity."
    },
    {
      id: "en-GB",
      name: "British (UK)",
      flag: "🇬🇧",
      lang: "en-GB",
      defaultVoiceHint: "Daniel",
      fallbackVoiceHint: "Eddy (English (United Kingdom))",
      samplePitch: 0.96,
      sampleRate: 1.0,
      samplePhrase: "British English runtime active. Grounded deictic resolution operating nominal at 212 milliseconds."
    },
    {
      id: "en-AU",
      name: "Australian",
      flag: "🇦🇺",
      lang: "en-AU",
      defaultVoiceHint: "Karen",
      fallbackVoiceHint: "Lee",
      samplePitch: 1.02,
      sampleRate: 1.02,
      samplePhrase: "Australian voice profile selected. Safety validator active across all robotic actuators."
    },
    {
      id: "en-CA",
      name: "Canadian",
      flag: "🇨🇦",
      lang: "en-CA",
      defaultVoiceHint: "Samantha",
      fallbackVoiceHint: "Alex",
      samplePitch: 1.0,
      sampleRate: 1.03,
      samplePhrase: "Canadian English runtime online. Multi-agent coordination state synchronized."
    },
    {
      id: "en-IE",
      name: "Irish",
      flag: "🇮🇪",
      lang: "en-IE",
      defaultVoiceHint: "Moira",
      fallbackVoiceHint: "Daniel",
      samplePitch: 1.0,
      sampleRate: 0.98,
      samplePhrase: "Irish voice profile initialized. Telemetry stream ready for continuous execution."
    },
    {
      id: "en-IN",
      name: "Indian English",
      flag: "🇮🇳",
      lang: "en-IN",
      defaultVoiceHint: "Rishi",
      fallbackVoiceHint: "Lekha",
      samplePitch: 1.05,
      sampleRate: 1.02,
      samplePhrase: "Indian English voice synthesis active. Deterministic USCAR-21 and ISO 10218 barriers enforced."
    },
    {
      id: "en-ZA",
      name: "South African",
      flag: "🇿🇦",
      lang: "en-ZA",
      defaultVoiceHint: "Tessa",
      fallbackVoiceHint: "Daniel",
      samplePitch: 1.0,
      sampleRate: 1.0,
      samplePhrase: "South African voice profile calibrated. Actuator dispatch held pending validation."
    },
    {
      id: "de-DE",
      name: "German (EU)",
      flag: "🇩🇪",
      lang: "de-DE",
      defaultVoiceHint: "Anna",
      fallbackVoiceHint: "Eddy (German (Germany))",
      samplePitch: 0.95,
      sampleRate: 1.0,
      samplePhrase: "German European voice profile selected. Deterministic safety interlocks operational."
    },
    {
      id: "fr-FR",
      name: "French (EU)",
      flag: "🇫🇷",
      lang: "fr-FR",
      defaultVoiceHint: "Jacques",
      fallbackVoiceHint: "Thomas",
      samplePitch: 1.0,
      sampleRate: 1.0,
      samplePhrase: "French European voice profile active. Architecture continuous runtime operational."
    },
    {
      id: "ja-JP",
      name: "Japanese",
      flag: "🇯🇵",
      lang: "ja-JP",
      defaultVoiceHint: "Kyoko",
      fallbackVoiceHint: "Flo (Japanese (Japan))",
      samplePitch: 1.05,
      sampleRate: 1.05,
      samplePhrase: "Japanese synthesis active. Autonomous robotics telemetry linked."
    }
  ],
  voiceTypes: [
    {
      id: "systems_architect",
      name: "Systems Architect",
      icon: "🧠",
      pitch: 1.0,
      rate: 1.02,
      tagline: "Natural, balanced neural prosody for engineering collaboration",
      promptModifier: "Calm, analytical, clear technical cadence."
    },
    {
      id: "flight_director",
      name: "Industrial Flight Director",
      icon: "⚡",
      pitch: 0.95,
      rate: 1.08,
      tagline: "Crisp, authoritative telemetry articulation for factory cells",
      promptModifier: "Crisp, concise, zero pleasantries, high signal-to-noise ratio."
    },
    {
      id: "safety_validator",
      name: "Safety & Admissibility Officer",
      icon: "🛡️",
      pitch: 0.92,
      rate: 0.96,
      tagline: "Deliberate, formal cadence enforcing deterministic barriers",
      promptModifier: "Formal, unambiguous, ISO-10218 safety-critical terminology."
    },
    {
      id: "tactical_teleop",
      name: "Tactical Teleoperation",
      icon: "🎯",
      pitch: 1.04,
      rate: 1.15,
      tagline: "High-cadence, punchy feedback for live physical teleoperation",
      promptModifier: "Ultra-fast, punchy, immediate confirmation pulses."
    }
  ]
};


