---
name: harness-engineering
description: Master discipline of Agentic AI Harness Engineering and physical-to-agentic system architecture. Covers the 5-part machine (Tools, State, Perms, Sandbox, Obs), the 7-step design process, failure-layer attribution, and the 5-point routing checks (splices, bend radius, thermal clearance, cavity plugs, clip spacing). Use when building, validating, or debugging Claude Code harnesses, subagent topologies, or cyber-physical integration systems.
---

# Harness Engineering Explained: Components, Design Process, Applications, and Best Practices

> **"The model writes words. The harness does the work."**
> 
> *The counterintuitive principle senior harness engineers follow:*
> **Mechanical first. Electrical second. Test third.**  
> In agentic systems: **Harness first. Model second. Eval third.**

---

## 1. The Core Duality: Why Systems Fail

A wire can handle 15A on paper; it will still burn if it is 10mm from the exhaust or clipped every 400mm in a high-vibration zone. In 1979, US automakers suffered massive warranty claims not because engineers were careless, but because **harnessing is a mechanical system disguised as an electrical one**. This forced the creation of standards like **USCAR-21 Rev 4**, **SAE AS50881 Rev G**, **IPC/WHMA-A-620D**, and robotics **ISO 10218-1:2011**.

> [!CAUTION]
> **Safety Demarcation & Non-Certification Notice:**  
> All physical DRC checks, routing calculations, and harness formulas in Atelier are **educational simulations** designed to teach AI systems architects how to structure deterministic invariants. LLMs, Claude Code scripts, and agent loops **must never** be deployed as primary safety functions, safety interlocks, or emergency stops for physical robotics, autonomous vehicles, or high-voltage (HV) systems. Certified physical safety requires dedicated deterministic safety PLCs, interlock switches, and hardwired E-stops complying with **ISO 13849-1 (PL d/e)** or **IEC 61508**.

In Agentic AI, modern teams make the exact same error:
- They assume the model’s parameter count and reasoning benchmarks guarantee production success.
- Yet the system crashes on Day 23: not because Claude lacked intelligence, but because **state leaked across turns, a tool timed out without an idempotent retry rule, or a monetary ceiling was placed in prompt text rather than a deterministic code hook**.

**When it fails: blame the layer, not the model.**

---

## 2. The 5-Part Agentic Machine Around the Model

An enterprise agentic system consists of five distinct components orbiting a central reasoning core:

```
                  ┌──────────────┐
                  │    Tools     │
                  │  (Contract)  │
                  └──────┬───────┘
                         │
     ┌──────────────┐    │    ┌──────────────┐
     │ Observability├────┼────┤  State Store │
     │  (Telemetry) │    │    │ (Compaction) │
     └──────┬───────┘    │    └──────┬───────┘
            │      ┌─────┴─────┐     │
            │      │   Model   │     │
            │      │  (Core)   │     │
            │      └─────┬─────┘     │
            │            │           │
     ┌──────┴───────┐    │    ┌──────┴───────┐
     │   Sandbox    ├────┴────┤ Permissions  │
     │ (Boundaries) │         │ (Hard Hooks) │
     └──────────────┘         └──────────────┘
```

### The 5 Jobs: Each Part Does Exactly One Thing

1. **TOOLS (`prompt -> api -> result`)**:
   - Typed JSON schemas with explicit boundary validations.
   - Structured error taxonomies (`is_retryable: boolean`, `suggested_action: string`).
   - Separation of read-only exploratory tools from high-consequence write tools.

2. **STATE (`write -> store -> recall`)**:
   - Persistent session facts vs. ephemeral scratchpads.
   - Invariant-preserving context compaction (retaining exact UUIDs, timestamps, and currency amounts across window compactions).

3. **PERMS (`request -> ? -> allow`)**:
   - Deterministic policy gates executed in code hooks (`PreToolUse`, `PostToolUse`).
   - Hard ceilings (e.g. `$250.00 refund limit`, read-only monorepo access) that cannot be bypassed by prompt injection or probabilistic drift.

4. **SANDBOX (`limits: network · files`)**:
   - Containerized execution bounds.
   - Filesystem path allowlists and exclusion masks (preventing subagents from ingesting `/node_modules`, `/dist`, or `/infra`).

5. **OBS (Observability: `step -> trace -> metric`)**:
   - Real-time token velocity, latency tracing, and tool invocation audits.
   - Immutable provenance ledger connecting every output claim to source tokens.

---

## 3. Raw vs. Ready Comparison

| Capability | Bare Model | Harnessed Agent |
| :--- | :--- | :--- |
| **State** | None (wipes between sessions) | Session memory + compaction + provenance |
| **Permissions** | None (probabilistic prompt reliance) | Hard deterministic code gates (`PreToolUse`) |
| **Tools** | None (hallucinates text answers) | Typed JSON-RPC schema contracts |
| **Retries** | None (fails turn on 504) | Idempotent backoff with compensation logic |
| **Logs** | None (black-box generation) | Step-level audit trail with hash verification |

> *Bare model: zero state, zero tools, zero retries.*

---

## 4. The 5-Point Routing Invariant Checklist

Run this 5-point routing inspection on every Claude Code harness or agent workflow before release:

### Check 1: Invariant Distance (Splice $\ge 150\text{mm}$ from Bend/Clip)
- **Physical**: Never place a wire splice within 150mm of a bend or mounting clip where vibration creates mechanical fatigue.
- **Agentic**: Never place a security or monetary ceiling in prompt instructions. All hard invariants must reside in deterministic code hooks (`PreToolUse`), insulated from prompt drift.

### Check 2: Context Bend Radius ($\ge 6\times$ Bundle Diameter, $10\times$ in Flex)
- **Physical**: Minimum bend radius must be $\ge 6\times$ bundle diameter (10x in dynamic flex zones) to prevent copper strand fracture.
- **Agentic**: Subagent context containment must keep prompt payload $\le 20\%$ of total context window, preventing attention degradation and "needle-in-a-haystack" loss.

### Check 3: Thermal & Secret Clearance ($50\text{mm}+$ from Exhaust, $20\text{mm}+$ from Sharp Edges)
- **Physical**: Route wiring bundles $\ge 50\text{mm}$ away from heat sources and $\ge 20\text{mm}$ from unhemmed sheet metal edges.
- **Agentic**: Restrict path access (`.claude/rules/`) with hard exclusions around `/secrets`, `.env`, and production infrastructure configs. Redact PII before tool dispatch.

### Check 4: Empty Cavity Plugs (All Sealed Cavities Filled)
- **Physical**: Any unpopulated pin cavity in an IP67/IP68 sealed automotive connector must be plugged with a silicone dummy plug to prevent capillary water intrusion.
- **Agentic**: All tool schemas must explicitly define handling for valid-empty results (`[]` or `null`) versus upstream network failures. Never allow an empty tool response to be silently treated as a successful completion.

### Check 5: Clip Spacing & Idempotency ($150\text{mm}$ High Vib, $300\text{mm}$ Interior)
- **Physical**: Fasten harness with clips every 150mm in high-vibration engine bays and 300mm in passenger cabins.
- **Agentic**: Fasten agentic loops with idempotent transaction tokens and deterministic retry intervals (maximum 3 turns before escalating to human review).

---

## 6. 7-Step Design Workflow

1. **Define Requirements**: Function, environmental constraints, latency budgets, and security classification.
2. **Create Schematics & Topology**: Map coordinator to subagent boundaries and tool permission sets.
3. **Select Components & MCP Servers**: Match typed tools to least-privilege connectors with structured error schemas.
4. **Build & Assemble**: Configure `CLAUDE.md`, `.claude/rules/`, and Agent SDK deterministic hooks.
5. **Fault Injection & Testing**: Inject 3 failure modes (timeouts, conflicting data, unverified users) into eval suite.
6. **Telemetry & Audit Instrumentation**: Validate provenance hashing, token velocity, and error recovery.
7. **Release & Documentation**: Formboard inspection against the 5-point checklist before production deployment.
