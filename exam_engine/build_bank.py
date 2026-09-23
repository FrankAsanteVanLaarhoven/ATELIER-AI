import json, random, pathlib

SCENARIOS = {
 'S1':'Customer Support Resolution Agent',
 'S2':'Code Generation with Claude Code',
 'S3':'Multi-Agent Research System',
 'S4':'Developer Productivity with Claude',
 'S5':'Claude Code for Continuous Integration',
 'S6':'Structured Data Extraction'
}

TASKS = [
('1.1','1','Agentic loops','The agent stops after emitting ordinary text even though a tool call is still required to finish the task.',
 'Drive termination from the response stop reason: execute requested tools on tool_use, append tool results, and continue until an end-turn condition is reached.',
 ['Stop whenever the assistant produces a complete-sounding paragraph.','Use a fixed maximum of two turns and assume the task is complete afterward.','Replace the loop with a keyword classifier that looks for words such as done or complete.'],
 'The loop must follow the model/tool protocol, not natural-language guesses about completion.'),
('1.2','1','Multi-agent orchestration','A coordinator delegates work to several specialists, but their scopes overlap and the final synthesis misses coverage.',
 'Give the coordinator explicit decomposition and aggregation responsibilities, with non-overlapping specialist scopes and a completeness check before synthesis.',
 ['Let every specialist investigate the entire problem independently and concatenate their answers.','Remove the coordinator and allow specialists to call one another freely.','Use one generalist agent with every available tool so no routing is required.'],
 'Coordinator–subagent designs work when ownership, context, and aggregation criteria are explicit.'),
('1.3','1','Subagent context','Subagents receive the entire parent history, causing context bloat and inconsistent focus.',
 'Pass only the task-relevant context, expected output contract, and necessary evidence to each subagent; return compact structured results to the parent.',
 ['Always clone the full parent conversation into every subagent.','Give subagents no context and rely on them to rediscover everything.','Share only the user’s last sentence regardless of the task.'],
 'Bounded context improves focus and avoids unnecessary context-window pressure.'),
('1.4','1','Workflow enforcement and handoff','A regulated workflow occasionally skips a mandatory verification step before a consequential action.',
 'Enforce the prerequisite programmatically and require a structured handoff when the workflow cannot proceed safely.',
 ['Strengthen the prose prompt and trust the model to remember the step.','Add more temperature randomness so the agent explores alternative paths.','Ask the user to repeat the policy at the start of every session.'],
 'Hard invariants belong in deterministic gates; handoffs should preserve the facts needed by the next actor.'),
('1.5','1','Agent SDK hooks','Tool calls need consistent normalization and policy checks before and after execution.',
 'Use hooks to intercept the relevant tool lifecycle events, enforce policy, normalize inputs/outputs, and record the outcome.',
 ['Encode the policy only in the final response template.','Run a second model after the entire session and hope it catches violations.','Duplicate the same policy text inside every tool description.'],
 'Hooks are appropriate for cross-cutting checks around tool execution.'),
('1.6','1','Task decomposition','A complex task is split into dozens of tiny subtasks, increasing overhead and losing the end goal.',
 'Decompose by meaningful deliverables with clear dependencies and acceptance criteria, keeping tightly coupled work together.',
 ['Create one subtask for every sentence in the user request.','Avoid decomposition and keep all work in one unbounded context.','Split work randomly so each agent receives an equal token budget.'],
 'Good decomposition reduces coupling while preserving coherent units of work.'),
('1.7','1','Session state','A long-running task fails midway and the team must continue without replaying every completed step.',
 'Persist resumable session/checkpoint state and distinguish resume from fork so continuation preserves history while experiments branch safely.',
 ['Restart from the initial prompt and rely on the model to recreate prior work.','Copy only the final assistant message into a new session.','Store state only in an informal human note outside the workflow.'],
 'Explicit session state enables reliable continuation and controlled branching.'),
('2.1','2','Tool interface design','Two similar tools are frequently confused because their names and descriptions overlap.',
 'Clarify each tool’s purpose, accepted inputs, boundaries, examples, and when to use it instead of adjacent tools.',
 ['Add more tools so the model has extra alternatives.','Keep the descriptions short and route by keywords in the user message.','Merge unrelated operations into one catch-all tool.'],
 'Tool descriptions are a primary selection signal; clear boundaries reduce misrouting.'),
('2.2','2','Structured errors','A tool returns the same generic error string for timeouts, permission failures, and valid empty results.',
 'Return structured error information that distinguishes retryable failures, non-retryable failures, and valid empty results, with actionable context.',
 ['Convert all failures into an empty successful result.','Throw unstructured stack traces directly into the model context.','Retry every failure indefinitely with no backoff or classification.'],
 'Typed error semantics let the agent choose retry, alternate action, escalation, or normal continuation correctly.'),
('2.3','2','Tool distribution','One agent has dozens of tools and frequently selects the wrong one.',
 'Give each agent the minimum tool set required for its role and use tool-choice controls only when the workflow requires a tool or a specific tool.',
 ['Give every agent every tool to maximize flexibility.','Force the same tool on every turn.','Replace tool descriptions with a list of trigger keywords.'],
 'Least-tool access improves selection reliability and supports least privilege.'),
('2.4','2','MCP integration','A team needs reusable access to an external service across Claude clients and workflows.',
 'Expose the capability through a well-scoped MCP server with typed tools/resources/prompts and configure the client at the appropriate scope.',
 ['Paste credentials and API examples into the system prompt.','Build a separate custom protocol for each Claude surface.','Use browser automation even though a direct structured integration is available.'],
 'MCP standardizes reusable context/tool integration and should be scoped deliberately.'),
('2.5','2','Built-in tools','A coding agent needs to locate all files containing a specific import across a large repository.',
 'Use Grep for content search, optionally constrained by file pattern; then Read only the relevant files.',
 ['Read every file in the repository into context first.','Use Write to create a manifest and inspect it manually.','Use Bash for all searching even when a dedicated search tool is available.'],
 'Use the narrowest built-in tool for the job and grow context incrementally.'),
('3.1','3','CLAUDE.md hierarchy','Shared coding conventions work for one developer but not teammates, and a single instruction file has become bloated.',
 'Move shared instructions to project scope, modularize reusable guidance, and use the hierarchy/rules system so only relevant instructions load.',
 ['Keep the conventions in a user-only file and ask teammates to copy it manually.','Put every rule into one ever-growing root file.','Encode conventions only in chat history.'],
 'Correct scope and modular loading are essential for predictable team behavior.'),
('3.2','3','Commands and skills','A repeatable workflow should be discoverable and reusable across tasks, with instructions loaded only when relevant.',
 'Package the workflow as a well-described skill; use an explicit command when the user should invoke a named action directly.',
 ['Place the entire workflow permanently in the global system prompt.','Create a new MCP server even though no external integration is required.','Duplicate the workflow in every project file.'],
 'Skills provide reusable contextual procedures; commands are appropriate for explicit invocations.'),
('3.3','3','Path-specific rules','Frontend, backend, and infrastructure conventions are all loading for every file edit.',
 'Use path-specific rules/globs so conventions load conditionally for the relevant files.',
 ['Repeat all conventions in every nested directory.','Increase model context so unrelated rules are less noticeable.','Ask the developer to mention the file type in every prompt.'],
 'Conditional rules reduce irrelevant context and keep conventions precise.'),
('3.4','3','Plan vs direct execution','A broad refactor touches architecture, migrations, tests, and multiple services.',
 'Use plan mode to explore dependencies and agree the change strategy before execution; use direct execution for small, well-bounded edits.',
 ['Always execute immediately because planning adds latency.','Always use plan mode even for one-line obvious fixes.','Decide solely from the number of tokens in the request.'],
 'The choice depends on uncertainty, blast radius, and need for exploration—not task length alone.'),
('3.5','3','Iterative refinement','A generated implementation repeatedly violates one interface contract despite increasingly long prose instructions.',
 'Add concrete input/output examples and executable tests, then iterate against failures rather than only lengthening the prompt.',
 ['Keep adding adjectives such as robust and production-grade.','Lower the temperature until every output becomes deterministic.','Switch models without collecting a failing example.'],
 'Examples and tests create observable feedback for progressive improvement.'),
('3.6','3','CI/CD integration','An automated review job must run non-interactively and feed machine-readable results into a pipeline.',
 'Run Claude Code non-interactively, enforce a structured output contract, pin shared review criteria, and validate the result before gating CI.',
 ['Launch an interactive terminal session and scrape the screen output.','Accept free-form prose and parse it with regular expressions.','Reuse the same long interactive session for every pull request.'],
 'CI needs reproducible configuration, machine-readable output, and deterministic validation.'),
('4.1','4','Explicit criteria','A review prompt produces many false positives because it only says to find problems.',
 'Define explicit, testable finding criteria, severity rules, and conditions that should not be reported.',
 ['Tell the model to be more careful without changing the criteria.','Increase the number of reviewer agents before clarifying the task.','Ask for every possible issue so recall is maximized regardless of precision.'],
 'Precise criteria improve calibration and reduce false positives.'),
('4.2','4','Few-shot prompting','Outputs have the right concept but inconsistent format and boundary decisions.',
 'Provide a small set of representative examples showing desired outputs and important edge/boundary cases.',
 ['Add a very long abstract definition with no examples.','Randomize the system prompt between requests.','Force all outputs to the same length regardless of content.'],
 'Few-shot examples are especially useful for format and nuanced decision boundaries.'),
('4.3','4','Structured output','Downstream software requires valid structured records, but the model sometimes returns prose around JSON.',
 'Use tool/schema-constrained structured output and validate the returned fields semantically before acceptance.',
 ['Ask for JSON in plain text and trust it without validation.','Strip non-JSON text with a regular expression and accept the remainder.','Store the whole response as an untyped string.'],
 'Schema enforcement improves syntactic reliability; semantic validation is still required.'),
('4.4','4','Validation and retry','Extraction output is syntactically valid but occasionally violates business rules or contradicts the source.',
 'Run deterministic validation, return specific validation errors to a bounded retry loop, and escalate when the source cannot support a valid answer.',
 ['Retry the same prompt indefinitely with no feedback.','Accept any schema-valid record as correct.','Discard the source after the first extraction attempt.'],
 'Validation must cover semantics as well as shape, and retries need actionable feedback and stopping rules.'),
('4.5','4','Batch processing','Thousands of independent, non-urgent records must be processed cost-efficiently overnight.',
 'Use an asynchronous batch strategy when latency permits, attach stable IDs for reconciliation, and handle item-level failures separately.',
 ['Send every item synchronously at interactive priority.','Combine all records into one giant prompt so there is only one request.','Drop identifiers because output order will always match input order.'],
 'Batching fits high-volume, latency-tolerant workloads and requires reliable result correlation.'),
('4.6','4','Multi-pass review','One-pass generation misses subtle defects, but duplicating the same review produces correlated mistakes.',
 'Use role-separated or independent passes with explicit review criteria, then reconcile disagreements with evidence.',
 ['Ask the same instance to repeat its answer verbatim.','Add more tokens to the original prompt but keep one pass.','Average the reviewers’ text without checking the underlying evidence.'],
 'Independent review passes reduce correlated errors when their roles and reconciliation rules are explicit.'),
('5.1','5','Context preservation','Long conversations are summarized, but exact amounts, dates, commitments, or identifiers disappear.',
 'Maintain critical case facts in structured persistent state and keep summaries for narrative context rather than as the sole source of truth.',
 ['Make the rolling summary longer every turn.','Trust the model to remember exact values from distant turns.','Discard earlier facts once a new topic appears.'],
 'Critical facts should survive compaction in structured state.'),
('5.2','5','Escalation and ambiguity','The system guesses between two plausible customer/account matches and also refuses to hand off when a user explicitly asks for a human.',
 'Ask a clarifying question when identity is ambiguous and honor explicit human escalation or policy-gap triggers.',
 ['Choose the most likely match based on model confidence.','Use negative sentiment as the primary escalation rule.','Never escalate if the model can produce any answer.'],
 'Ambiguity should be resolved, not guessed; escalation needs explicit operational triggers.'),
('5.3','5','Error propagation','A research subagent encounters an access failure but reports “no evidence found,” causing the coordinator to treat missing coverage as negative evidence.',
 'Propagate structured failure context, partial results, and coverage gaps so downstream agents can distinguish failure from a valid empty result.',
 ['Convert every failure into an empty successful result.','Abort the entire workflow on any recoverable subagent error.','Hide the error from the final synthesis to keep the output concise.'],
 'Downstream reasoning depends on preserving the difference between failure, absence, and partial coverage.'),
('5.4','5','Large-codebase context','After exploring a large repository, the agent starts relying on generic patterns instead of the actual codebase.',
 'Use targeted search/read steps, scratch/manifest state, bounded subagents for noisy exploration, and compact/resume techniques as context grows.',
 ['Load the whole repository into context at once.','Restart the investigation whenever context gets large.','Stop reading source files and rely on general framework knowledge.'],
 'Large-codebase work needs progressive discovery and explicit working state.'),
('5.5','5','Human review and calibration','Aggregate accuracy looks high, but one rare high-risk segment performs poorly.',
 'Measure performance by segment and field, calibrate confidence against labeled data, and route high-risk or uncertain cases to human review.',
 ['Use only overall average accuracy to decide automation.','Let the model self-report confidence and treat it as calibrated.','Remove human review once the aggregate score exceeds a threshold.'],
 'Risk-sensitive systems need segmented evaluation and calibrated routing.'),
('5.6','5','Provenance and uncertainty','Multiple credible sources disagree on a value and the final synthesis silently chooses one.',
 'Preserve claim-to-source provenance, include source dates/context, and represent unresolved conflicts or uncertainty explicitly.',
 ['Choose the newest number without checking what period it refers to.','Average conflicting values into one number.','Remove citations so the final answer reads more smoothly.'],
 'Reliable synthesis keeps provenance and makes unresolved disagreement visible.')
]

SCENARIO_ROTATION = {
 '1.1':['S1','S3','S4'],'1.2':['S3','S1','S4'],'1.3':['S3','S2','S1'],'1.4':['S1','S5','S6'],'1.5':['S1','S5','S4'],'1.6':['S3','S2','S4'],'1.7':['S2','S3','S4'],
 '2.1':['S1','S3','S6'],'2.2':['S1','S3','S6'],'2.3':['S3','S1','S4'],'2.4':['S4','S3','S1'],'2.5':['S2','S4','S5'],
 '3.1':['S2','S4','S5'],'3.2':['S2','S4','S5'],'3.3':['S2','S4','S5'],'3.4':['S2','S4','S5'],'3.5':['S2','S5','S6'],'3.6':['S5','S2','S4'],
 '4.1':['S5','S6','S1'],'4.2':['S6','S1','S5'],'4.3':['S6','S1','S5'],'4.4':['S6','S1','S3'],'4.5':['S6','S3','S5'],'4.6':['S5','S3','S6'],
 '5.1':['S1','S3','S2'],'5.2':['S1','S3','S6'],'5.3':['S3','S1','S5'],'5.4':['S2','S4','S5'],'5.5':['S6','S1','S5'],'5.6':['S3','S6','S1']
}

MULTI_TASKS={'1.4','1.5','2.2','2.3','3.1','3.6','4.3','4.4','5.3','5.6'}

items=[]
for task,domain,title,symptom,correct,distractors,rationale in TASKS:
    scenarios=SCENARIO_ROTATION[task]
    for vi,sc in enumerate(scenarios,1):
        qid=f'Q-{task.replace(".","")}-{vi}'
        scenario_name=SCENARIOS[sc]
        stem=f'In the {scenario_name} scenario, {symptom} What is the best architectural response?'
        opts=[correct]+distractors[:]
        random.Random(qid).shuffle(opts)
        correct_letters=[]
        letters=['A','B','C','D']
        for i,o in enumerate(opts):
            if o==correct: correct_letters.append(letters[i])
        item={
            'id':qid,'version':1,'status':'seed','domain':int(domain),'task':task,'task_title':title,
            'scenario':sc,'scenario_title':scenario_name,'type':'single','select_n':1,'stem':stem,
            'options':{letters[i]:opts[i] for i in range(4)},'correct':correct_letters,
            'rationale':rationale,'why_others_fail':'The distractors rely on prompt-only enforcement, excessive scope, hidden failure semantics, or other mechanisms that do not directly address the stated architectural defect.',
            'difficulty_target':['foundational','applied','advanced'][vi-1],
            'source_refs':['public-ccar-f-task-map','official-claude-docs'],
            'last_verified':'2026-09-23'
        }
        # Make the third variant for selected tasks a 2-answer multiple-response item by adding a complementary correct practice.
        if vi==3 and task in MULTI_TASKS:
            complements={
             '1.4':'Include the verified facts and unresolved reason in a structured handoff payload.',
             '1.5':'Emit audit telemetry for the hook decision so policy behavior can be replayed and tested.',
             '2.2':'Include a machine-readable retryability/category field rather than forcing the model to infer it from prose.',
             '2.3':'Keep high-impact write tools unavailable to agents that only need read access.',
             '3.1':'Use conditional/path-specific rules so unrelated conventions are not loaded for every task.',
             '3.6':'Use a fresh, reproducible CI context rather than depending on an interactive developer session.',
             '4.3':'Validate required business semantics after schema validation succeeds.',
             '4.4':'Set a bounded retry/stop policy so impossible extractions do not loop indefinitely.',
             '5.3':'Mark downstream synthesis with the resulting coverage gap when a source could not be accessed.',
             '5.6':'Keep conflicting credible values separately labeled instead of silently collapsing them.'
            }
            comp=complements[task]
            # Replace one distractor with complement and reshuffle
            opts=[correct, comp, distractors[0], distractors[1]]
            random.Random(qid+'m').shuffle(opts)
            correct_letters=[letters[i] for i,o in enumerate(opts) if o in (correct,comp)]
            item['type']='multiple'; item['select_n']=2; item['stem']=stem.replace('What is the best architectural response?','Select TWO actions that best address the problem.')
            item['options']={letters[i]:opts[i] for i in range(4)}; item['correct']=correct_letters
            item['rationale']=rationale+' The complementary action adds deterministic assurance, least privilege, reproducibility, bounded recovery, or explicit provenance as appropriate to the task.'
        items.append(item)

out=pathlib.Path('/mnt/data/claude_architect_digital_service/exam_engine/question_bank.json')
out.write_text(json.dumps({'meta':{'title':'CCAR-F aligned original practice bank','items':len(items),'created':'2026-09-23','copyright':'Original practice content; not official exam questions.'},'items':items},indent=2))
print('wrote',len(items),out)
