# Case Study 3 — Executive Operations, Cowork and Slides

## Real-world brief
A leadership team wants Claude to assemble a weekly operating review from email, calendar, CRM extracts, spreadsheets and project updates, then produce a concise decision memo and an on-brand slide deck.

## Business objective
Reduce manual synthesis time while preserving source provenance, approval control and presentation quality.

## System
- Claude conversation/Cowork workflow.
- Read-only connectors for source collection; separate approval-gated write actions.
- Organization skill/plugin for the weekly operating review.
- Source register and claim-to-source map.
- Claude Slides/Design with imported design system.
- Scheduled task that prepares drafts but does not publish without approval.

## Learner tasks
1. Define the delegation prompt and clarification rules.
2. Build the reusable operating-review skill.
3. Specify connector permissions and human approval points.
4. Reconcile conflicting revenue/pipeline values without hiding disagreement.
5. Generate a 1-page memo and 8-slide deck from the same verified evidence set.
6. Create an eval comparing on-brand, provenance and factual consistency before/after the skill.

## Failure injections
- CRM and finance sheet disagree because of different cutoff dates.
- A source link is inaccessible.
- A slide claims a percentage not present in any source.
- Scheduled run encounters an unanswered ambiguity.
- A team member requests an external email send without final approval.

## Required deliverables
Skill bundle, connector permission matrix, evidence ledger, memo, slide storyboard, final deck specification, 10 eval cases and approval log.

## Acceptance criteria
- Every quantitative slide claim maps to a source.
- Conflicting values remain labeled with date/definition until resolved.
- No external message is sent without the defined human approval.
- Deck conforms to imported design-system rules.
- Scheduled run stops/asks when a decision requires human judgment.
