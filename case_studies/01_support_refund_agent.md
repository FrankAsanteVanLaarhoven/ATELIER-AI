# Case Study 1 — Regulated Customer Support Resolution Agent

## Real-world brief
A subscription business wants an agent that resolves common customer requests while preventing incorrect refunds, protecting account data and escalating policy gaps.

## Business objective
Increase first-contact resolution without allowing the agent to bypass identity verification, refund limits or human escalation rules.

## System
- Claude Agent SDK orchestration.
- MCP tools: `get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`.
- Persistent case-facts store.
- Pre-tool policy gate and post-tool audit hook.
- Human review queue.

## Learner tasks
1. Define tool contracts and error taxonomy.
2. Implement the agentic loop and termination logic.
3. Enforce `get_customer` verification before order/refund actions.
4. Design ambiguity and escalation behavior.
5. Preserve exact case facts during long conversations.
6. Add replayable telemetry and an eval suite.

## Failure injections
- Two customers share a similar name.
- Refund tool times out after payment authorization.
- User explicitly asks for a human.
- Policy contains no rule for a disputed edge case.
- Tool returns valid empty order history.

## Required deliverables
Architecture diagram, tool schemas, policy/hook design, 10 eval cases, three failure replays, risk register, 5-slide executive readout.

## Acceptance criteria
- 0 unverified refund attempts in the test suite.
- 100% explicit human requests honored.
- Failure vs valid-empty differentiated in all injected cases.
- Exact amount/date/identity facts retained across context compaction.
- Every consequential tool action has an audit record.
