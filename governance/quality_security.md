# Quality, Security and Exam Integrity

## Content integrity
- Use public syllabus/task statements and official documentation only.
- Do not ingest exam dumps, recollections, screenshots of live questions or NDA-restricted material.
- Keep original-item authorship evidence and similarity checks.
- Record source URL/title, retrieval date, source tier and affected tasks.

## Technical assurance
- Validate every answer against current official docs before release.
- Run adversarial review: identify a plausible reading under which another option could be correct.
- If ambiguity remains, rewrite the stem or options.
- Version questions when docs change; never silently mutate live items.

## Platform security
- Tenant isolation.
- Least-privilege connectors/tools.
- Encrypted secrets and credential vaulting.
- Audit logs for admin/content changes.
- Rate limiting and abuse controls.
- Sandboxed code execution for practical labs.
- Explicit egress controls for enterprise labs.

## Assessment security
- Large item bank and rotating forms.
- Exposure limits.
- Question watermarking/fingerprinting for leak investigations.
- Disable copy/export in proctored mode where legally/technically appropriate.
- Separate practice explanations from secure assessment pools.
- Detect anomalous completion time and answer-pattern similarity; use as review signals, not automatic guilt determinations.
