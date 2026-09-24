# Claims and Evidence Policy

**Version:** 1.0.0  
**Effective Date:** 2026-09-24  
**Applies to:** All documentation, UI strings, marketing assets, exam metadata, and sales collateral across ATELIER-AI (Atelier Learn, Atelier Assess, Atelier Labs).

---

## 1. Purpose and Guiding Principle

ATELIER-AI provides an applied competency, diagnostic, and laboratory platform for Claude architecture and agentic engineering. 

**Core Principle:** No public claim or system output may exceed the level of empirical evidence or authorized jurisdiction currently established within the platform. If a capability, rule, calculation, or credential is simulated, experimental, or illustrative, it must be explicitly designated as such.

---

## 2. Evidence Classification Hierarchy

Every technical, educational, and evaluative claim made in documentation or software outputs must be classified into one of the following three tiers:

| Tier | Category | Definition | Permitted Terminology | Prohibited Terminology |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Verified Production Evidence** | Backed by passing automated CI tests, deterministic server-side policy, version-pinned public documentation, or verified pilot telemetry. | *"Simulated exam scored by Atelier"*, *"Source-verified against Anthropic docs [date]"*, *"Passing automated test suite"* | *"Officially certified"*, *"Guaranteed exam score"*, *"Validated by Anthropic"* |
| **Tier 2** | **Simulated / Lab Experiment** | Demonstrates architectural concepts, failure injection, synthetic DRC rules, or behavioral models in a sandboxed environment. | *"Interactive simulation"*, *"Illustrative design rule check"*, *"Experimental failure mode"*, *"Sandbox lab"* | *"Production safety-critical certified"*, *"Complies with AS50881 standard"*, *"Physical fail-safe guarantee"* |
| **Tier 3** | **Roadmap / Aspiration** | Architectural goals, upcoming integrations, or scheduled research milestones. | *"Planned architecture"*, *"Targeted pilot"*, *"Design goal"*, *"Under development"* | *"Integrated"*, *"Enforced"*, *"Live feature"* |

---

## 3. Brand, Authority, and Affiliation Boundaries

### 3.1 Third-Party Trademarks and Certification Bodies
1. **Anthropic Affiliation:** ATELIER-AI is an independent training, diagnostic, and laboratory system. It is **not** endorsed, sponsored, affiliated with, or certified by Anthropic, PBC.
2. **Delivery Providers:** ATELIER-AI has no partnership with or authorization from Pearson VUE or any official certification delivery agency.
3. **Prohibited Phrasing:**
   - ❌ *"Official Claude Architect Certification"*
   - ❌ *"Officially ready for the exam"*
   - ❌ *"Clearance voucher authorized"*
   - ❌ *"Anthropic authorized curriculum"*
4. **Mandatory Disclaimer:** All assessment interfaces, diagnostic reports, and credential displays must present this notice:
   > *"ATELIER-AI is an independent competency platform and is not affiliated with or endorsed by Anthropic, PBC. Diagnostics, mocks, and badges represent internal Atelier competency frameworks and do not guarantee official certification or licensing."*

---

## 4. Cyber-Physical, Robotics, and Safety Demarcation

### 4.1 Non-Safety-Critical Demarcation
- **Strict Prohibition:** Large Language Models (LLMs), agentic orchestration loops, and client-side scripts **must never** be represented as primary safety functions, safety interlocks, emergency stop systems, or certified controllers for physical machinery, high-voltage (HV) systems, or robotics.
- Any automation in ATELIER-AI is educational, exploratory, and advisory.

### 4.2 Engineering Standards Traceability
When referencing engineering standards (e.g., **AS50881, USCAR-21, IPC-WHMA-A-620, ISO 10218, ISO 13849**):
1. **Exact Attribution:** State the exact standard edition, section, and publication date (e.g., *USCAR-21 Rev 4 §5.3*).
2. **Scope of Implementation:** Explicitly state the boundaries of what is evaluated (e.g., *"Checks wire gauge against continuous ampacity limits per AS50881 Rev G Table 1; does not calculate dynamic thermal derating in packed conduits"*).
3. **Illustrative Values:** Any mock tolerance, pull-force threshold, or crimp parameter that has not been empirically validated against an accredited test method must be labelled:
   `[ILLUSTRATIVE VALUE - FOR EDUCATIONAL SIMULATION ONLY]`.

---

## 5. Proctoring, Biometrics, and Integrity Telemetry

### 5.1 Telemetry vs. Legal Integrity
- Features such as window blur detection, tab-switch monitoring, copy/paste interception, webcam presence checks, and screen capture are **deterrence and telemetry controls**, not forensic proof of identity or legally binding exam integrity.
- **Prohibited Claims:**
  - ❌ *"Fraud-proof biometric verification"*
  - ❌ *"Automated cheating detection with 100% certainty"*
  - ❌ *"Certified secure proctoring environment"*
- **Accurate Claims:**
  - ✔️ *"Client-side focus loss telemetry"*
  - ✔️ *"Candidate presence monitoring (deterrence baseline)"*
  - ✔️ *"Session anomaly review flags"*

### 5.2 Privacy and Legal Safeguards
1. **Explicit Informed Consent:** Learners must be informed of telemetry capture before starting an assessment.
2. **Data Retention & Purge:** Telemetry logs and video frames must have a deterministic retention schedule (e.g., 30-day auto-purge).
3. **Human Review & Appeal:** Automated flags may not trigger automatic disqualification; they must route to human review with a clear learner appeal channel.
4. **Accessibility:** Accommodations (screen readers, multi-monitor medical setups, cognitive breaks) must be supported without penalty flags.

---

## 6. Credentials and Cryptographic Auditing

### 6.1 Certificate Terminology
- Credentials issued by the platform are **Atelier Certificates of Practical Competence** or **Atelier Capstone Defense Records**.
- They are not state licenses, professional degrees, or vendor-backed certifications.

### 6.2 Audit Hashes and Ledgers
- Cryptographic hash references (e.g., SHA-256 digests of artifact bundles, rubrics, and evaluator signatures) must be described as **tamper-evident artifact digests** or **verifiable digital signatures**.
- Do not claim "decentralized on-chain audit" or "blockchain immutability" unless backed by a live, specified, and actively maintained distributed ledger network.

---

## 7. Compliance and Review Process

1. **Pre-Merge Audit:** Every PR introducing user-facing text, documentation, or marketing copy must pass a Claims & Evidence review.
2. **Quarterly Audit:** The governance lead reviews all published materials against this policy and logs findings in `governance/`.
3. **Immediate Remediation:** Any copy identified as exceeding Tier 1 evidence must be updated or removed within 48 hours.
