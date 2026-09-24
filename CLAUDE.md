# CLAUDE.md — Claude Architect & Harness Engineering Intelligence

Welcome to the **Claude Architect Enterprise Digital Service & Harness Engineering Platform (ATELIER-AI)**.
This repository is an enterprise-grade operating system, curriculum, and interactive CAD formboard platform designed for training and certifying AI Systems Architects and Harness Reliability Engineers.

---

## 🚀 Repository Architecture & Layout

```
.
├── CLAUDE.md                       # Canonical instructions & domain invariants for Claude Code CLI
├── .mcp.json                       # MCP server registration for Claude Code
├── agents/                         # Agent definitions & enterprise orchestrator catalogs
│   └── agent_catalog.yaml          # Multi-agent topology (Harness DRC, Telemetry, Reviewers)
├── capstone/                       # Capstone project rubric, scenarios & defense challenges
├── case_studies/                   # Real-world industrial case studies:
│   ├── ev_800v_powertrain/         # High-voltage EV wiring & USCAR-21 splice invariants
│   ├── aerospace_fly_by_wire/      # Boeing/Airbus AS50881 EWIS triple-redundancy
│   └── robotic_automation_cell/    # KUKA/Fanuc continuous-flex torsion harness
├── content/                        # Master curriculum content (5 Domains, 24 sub-modules)
├── demo/                           # Palantir Foundry / Gotham tactical web platform
│   ├── index.html                  # Master entrypoint with side-by-side Claude CLI docking
│   ├── app.js                      # Tactical CAD Formboard, DRC Engine, Waveform Oscilloscope
│   ├── style.css                   # Obsidian Linear & Palantir Foundry dark mode design system
│   ├── data.js                     # Curriculum, exam banks, case studies, and mission presets
│   └── server.py                   # High-performance server with Claude CLI bridge & API
├── exam_engine/                    # 60-question psychometric exam bank & live proctoring
├── harness/                        # Harness domain schemas, DRC rule definitions, and manifests
├── mcp/                            # Model Context Protocol servers
│   └── harness_mcp_server.py       # JSON-RPC MCP server exposing DRC & calculation tools
└── skills/                         # Claude Code skills & mathematical calculator scripts
    └── harness-engineering/        # Production harness engineering calculators (bundle, derate, bend)
```

---

## ⚡ Core Domain Invariants (Harness Engineering & AI Architecture)

When generating code, analyzing harnesses, or grading capstones, you MUST enforce the following physical and mechanical invariants:

### 1. The USCAR-21 Splice-to-Bend Invariant (§4.2)
- **Rule**: Any ultrasonic or resistance crimp splice MUST maintain a minimum clearance of **$\ge 150\text{mm}$** from any cable bend, breakout collar, or sharp chassis bulkhead.
- **Physics Rationale**: Cable bending induces differential tensile and compressive shear stresses across wire bundles. Placing a stiff splice within the bending moment arm concentrates strain on individual copper strands, causing microscopic fatigue, wire shear, and intermittent electrical faults under vehicle vibration (SAE J2380).
- **AI/Agentic Counterpart**: Placing an unvalidated LLM generation directly at a high-leverage branch point without a deterministic guardrail or mediation filter.

### 2. The AS50881 Aerospace Bend Radius Invariant
- **Rule**: The minimum bend radius of any wire bundle MUST satisfy $R_{\text{min}} \ge 10 \times D_{\text{bundle}}$ (and $\ge 12 \times$ for RF/coaxial or shielded twisted pairs).
- **Formula**: $D_{\text{bundle}} = 1.15 \times \sqrt{\sum d_i^2}$.
- **Physics Rationale**: Exceeding bend limits breaches insulation dielectric breakdown limits, induces micro-fractures in copper tinning, and degrades shield attenuation.

### 3. IP68 Wet-Zone Environmental Sealing
- **Rule**: Connectors and breakouts located in wheel arches, engine compartments, or battery bays must utilize silicone cavity plugs on all unused pin positions and triple-rib radial perimeter seals.

### 4. Thermal & Continuous Ampacity Derating
- **Rule**: Wire current rating must be derated by bundle count factor $F_{\text{bundle}}$ (Mil-W-5088L) and ambient thermal rise factor $F_{\text{temp}}$.
- **Formula**: $I_{\text{derated}} = I_{\text{free\_air}} \times \sqrt{\frac{T_{\text{max}} - T_{\text{ambient}}}{T_{\text{max}} - T_{\text{ref}}}} \times N^{-0.45}$.

---

## 🛠️ Claude Code CLI Commands & Workflows

When working in the Claude CLI side-by-side with the web application, the following commands are available:

| Command | Action |
|---|---|
| `claude harness verify` | Runs automated Design Rule Checks (DRC) on the active formboard nodes |
| `claude harness remediate` | Auto-relocates splices to $>150\text{mm}$ and applies IP68 cavity seals |
| `claude harness preset <name>` | Loads mission preset: `ev-800v`, `aerospace-fly-by-wire`, `robotic-cell`, or `citadel-aip` |
| `claude harness calc --help` | Invokes `skills/harness-engineering/scripts/harness_calculators.py` |
| `claude mcp list` | Lists registered MCP tools (`verify_harness_drc`, `calculate_derating`, etc.) |
| `claude capstone grade` | Evaluates capstone defense against the 100-point rubric |

---

## 🔌 Running Side-by-Side with the Atelier Web App

1. **Start the Local Server**:
   ```bash
   python3 demo/server.py 8000
   ```
2. **Open in Browser**:
   Navigate to [http://localhost:8000/index.html](http://localhost:8000/index.html).
3. **Open Claude CLI Side-by-Side**:
   - In the top navigation bar, click **"CLAUDE CLI SIDE-BY-SIDE"** or press `⌥C` / `Alt+C`.
   - In Harness Studio, the interactive Formboard CAD displays on the left while the live Claude Code CLI with MCP bus operates on the right.
   - Click **"Launch in macOS Terminal"** to pop out an external native terminal window running Claude Code in the exact project directory.
