# Digital Service Blueprint

## 1. Product proposition
A “driving theory test” style service for Claude architecture: users learn from source-grounded modules, drill concepts, sit timed mocks, complete realistic scenario labs, and finish with a practical capstone. Organizations receive cohort analytics, competency evidence and skill-gap maps.

## 2. User journeys
### Individual
Onboard → diagnostic → personalized study plan → drills → case labs → mock exams → capstone → certificate of completion → renewal/retest plan.

### Enterprise
Create tenant → assign role pathway → import organization policies/design system → cohort diagnostic → governed labs → team capstone → manager dashboard → export evidence pack.

## 3. System architecture
- Web client: responsive exam UI, lab workspace, analytics, admin console.
- API gateway: auth, rate limits, tenant isolation.
- Assessment service: timers, attempt state, randomization, scoring, review.
- Content service: versioned lessons, items, scenarios, source lineage.
- Agent service: coaching, explanations, lab simulation, capstone evaluation.
- Retrieval layer: current official docs with source snapshots and version pins.
- Execution sandbox: isolated practical labs for Claude Code/Agent SDK exercises.
- Analytics: event stream, item metrics, learning progression and cohort reporting.
- Audit store: immutable attempt and rubric records.

## 4. Data entities
User, Organization, RolePathway, Course, Lesson, Source, Question, QuestionVersion, Scenario, ExamForm, Attempt, Response, SkillMap, CaseStudy, CapstoneSubmission, RubricScore, AgentRun, ToolCall, Evaluation, Certificate.

## 5. API surface (minimum)
- `POST /diagnostics`
- `POST /exam-sessions`
- `PATCH /exam-sessions/{id}/responses/{itemId}`
- `POST /exam-sessions/{id}/submit`
- `GET /attempts/{id}/review`
- `POST /labs/{id}/runs`
- `POST /capstones/{id}/submit`
- `GET /analytics/readiness`
- `GET /content/versions/current`
- `POST /admin/content/releases`

## 6. Driving-theory style UX
- Persistent timer and progress indicator.
- Flag question / return later.
- Keyboard navigation.
- Clear single-select vs “select N” multi-response UI.
- Mock completion screen with domain heatmap and task-level weakness map.
- Revision queue automatically populated from wrong answers.
- Explanations hidden until the attempt closes.
- “Show source” opens the supporting official documentation in review mode.

## 7. Adaptive engine
Readiness state is a vector across 30 task statements. After each attempt, update mastery using recency-weighted accuracy, difficulty, confidence and repeated exposure. The adaptive planner selects the next lesson/drill to maximize coverage of weak high-weight tasks while preventing overfitting to repeated questions.

## 8. Enterprise controls
- SSO/SAML/OIDC.
- RBAC: learner, instructor, content reviewer, tenant admin, platform admin.
- Tenant-specific skills, plugins, prompts and design systems.
- Read/write connector permissions.
- Audit logs and content version history.
- Regional storage options where required.
- Human approval on external side effects in labs.

## 9. Commercial packaging
- Individual: monthly prep subscription.
- Professional: exam + labs + capstone.
- Team: seats + manager analytics + private cohorts.
- Enterprise: SSO/RBAC, custom skills/harnesses, private source packs, branded capstone and reports.

## 10. SOTA differentiators
- Source-versioned “living syllabus” with change detection.
- Every explanation has provenance and last-verified date.
- Evals-first skill/harness factory embedded into the course.
- Practical agent telemetry: tool calls, retries, escalation, provenance loss and context growth.
- Capstone requires both working system evidence and executive presentation.
- Psychometric content lifecycle rather than a static question dump.
