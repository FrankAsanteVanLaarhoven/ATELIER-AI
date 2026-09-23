# Exam Engine Blueprint

## Certification-faithful mock mode
- 60 items.
- 120 minutes.
- Multiple-choice and multiple-response.
- Four scenarios selected for each mock session from the six public scenario families.
- Domain allocation per 60-question form:
  - D1: 16 items
  - D2: 11 items
  - D3: 12 items
  - D4: 12 items
  - D5: 9 items
- Display one question at a time or allow review/navigation.
- No explanations in Exam Mode until submission.
- Flag-for-review supported.
- Autosave after every response.

## Scoring
For training, report both:
1. Raw score and domain percentages.
2. A clearly labelled **practice scaled score** for readiness trending.

Do not claim the training platform can reproduce Anthropic's private equating/scaling algorithm. A configurable practice transform may map performance onto 100–1000 for familiarity, but the UI must label it “practice estimate,” not an official score.

## Modes
- Learn: answer immediately, show rationale and source.
- Drill: 10–30 questions by task/domain.
- Timed Mock: full 60 / 120 minutes.
- Weakness Retest: weighted to missed task statements.
- Scenario Sprint: 15 questions attached to one scenario.
- Practical Lab: executable deliverable plus rubric.

## Item schema
Each item stores:
- `id`, `version`, `status`
- `domain`, `task`, `scenario`
- `type`: single or multiple
- `stem`, `options`, `correct`
- `rationale`
- `why_others_fail`
- `difficulty_target`
- `source_refs`
- `author`, `reviewers`, `last_verified`
- psychometric fields: attempts, p_value, discrimination, distractor_efficiency

## Production psychometrics
After enough real learner data:
- Calibrate classical difficulty (p-value) and point-biserial discrimination.
- Retire items with weak discrimination or broken distractors.
- Add IRT only after adequate sample size and stable item bank.
- Separate training, validation and live item pools.
- Detect memorization/leakage via item exposure and semantic similarity monitoring.

## Release gates
1. Source-grounded.
2. No proprietary-question copying.
3. One unambiguously best answer unless explicitly multi-response.
4. Distractors plausible but wrong for a stated reason.
5. Technical reviewer approval.
6. Psychometric reviewer approval.
7. Accessibility and plain-language check.
8. Version pin to current syllabus/docs.
