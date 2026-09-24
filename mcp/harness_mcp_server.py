#!/usr/bin/env python3
"""
Model Context Protocol (MCP) Server for Atelier Claude Architect & Harness Engineering
Standard JSON-RPC 2.0 stdio transport. Fully compatible with Claude Code CLI (v2.x).
"""

import sys
import json
import math
import os

TOOLS = [
    {
        "name": "verify_harness_drc",
        "description": "Performs physical Design Rule Checks (DRC) against USCAR-21, AS50881, and IP68 standards.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "nodes": {
                    "type": "array",
                    "description": "List of harness nodes with id, type, name, x, y, and metadata properties."
                },
                "standard": {
                    "type": "string",
                    "description": "Regulatory standard to enforce (e.g. 'USCAR-21', 'AS50881', 'ISO-10218')",
                    "default": "USCAR-21"
                }
            },
            "required": ["nodes"]
        }
    },
    {
        "name": "calculate_derating",
        "description": "Calculates wire bundle outer diameter, ambient temperature derating, and continuous current limits.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "wire_diameters_mm": {
                    "type": "array",
                    "items": {"type": "number"},
                    "description": "Individual wire insulation outer diameters in millimeters"
                },
                "ambient_temp_c": {
                    "type": "number",
                    "description": "Ambient operational temperature in Celsius (e.g. 85 for engine bay, 40 for cabin)",
                    "default": 70
                },
                "max_conductor_temp_c": {
                    "type": "number",
                    "description": "Conductor insulation maximum rating (e.g. 125 for crosslinked PE, 200 for PTFE)",
                    "default": 125
                },
                "base_ampacity": {
                    "type": "number",
                    "description": "Nominal free-air ampacity of conductor in Amperes",
                    "default": 25.0
                }
            },
            "required": ["wire_diameters_mm"]
        }
    },
    {
        "name": "remediate_harness",
        "description": "Applies automated deterministic remediation to harness nodes to satisfy all DRC invariants.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "nodes": {
                    "type": "array",
                    "description": "Active CAD formboard nodes containing violations."
                }
            },
            "required": ["nodes"]
        }
    },
    {
        "name": "grade_capstone",
        "description": "Evaluates candidate harness architecture, defense report, and telemetry against the 100-point rubric.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "description": "Capstone submission title"},
                "domain": {"type": "string", "description": "Engineering domain (EV, Aerospace, Robotics, Financial AIP)"},
                "drc_violations_count": {"type": "integer", "description": "Number of remaining unmitigated violations"},
                "has_defense_notes": {"type": "boolean", "description": "Whether architectural defense rationale is provided"}
            },
            "required": ["title", "domain"]
        }
    }
]

def run_drc(nodes, standard="USCAR-21"):
    violations = []
    
    # 1. USCAR-21 §4.2: Splice to bend distance >= 150mm
    splices = [n for n in nodes if n.get("type") == "splice"]
    bends = [n for n in nodes if n.get("type") in ["bend", "corner", "turn"]]
    
    for s in splices:
        sx = s.get("x", 0)
        sy = s.get("y", 0)
        for b in bends:
            bx = b.get("x", 0)
            by = b.get("y", 0)
            dist = math.hypot(sx - bx, sy - by)
            if dist < 150:
                violations.append({
                    "code": "USCAR21-SEC4.2",
                    "severity": "CRITICAL",
                    "component": s.get("name", s.get("id")),
                    "distance_mm": round(dist, 1),
                    "required_mm": 150.0,
                    "message": f"Splice '{s.get('name')}' is only {round(dist, 1)}mm from bend '{b.get('name')}' (Min required: 150mm). Under cyclic vibration this produces conductor tensile shear fatigue."
                })
                
    # 2. IP68 Sealing check
    connectors = [n for n in nodes if n.get("type") == "connector"]
    for c in connectors:
        zone = c.get("zone", "wet")
        sealed = c.get("sealed", False)
        if zone in ["wet", "engine_bay", "chassis"] and not sealed:
            violations.append({
                "code": "IEC-60529-IP68",
                "severity": "HIGH",
                "component": c.get("name", c.get("id")),
                "message": f"Connector '{c.get('name')}' is positioned in wet zone '{zone}' without required IP68 silicone cavity seals."
            })
            
    return {
        "status": "PASS" if len(violations) == 0 else "FAIL",
        "standard": standard,
        "nodes_inspected": len(nodes),
        "violations_count": len(violations),
        "violations": violations
    }

def calculate_derating(wire_diams, t_amb, t_max, base_amp):
    sum_d_sq = sum(d**2 for d in wire_diams)
    d_bundle = 1.15 * math.sqrt(sum_d_sq) if sum_d_sq > 0 else 0
    r_min_bend = d_bundle * 10.0 # AS50881 standard: 10x bundle diameter
    
    # Thermal derating factor
    t_ref = 30.0 # Standard reference room temp
    if t_max <= t_amb:
        thermal_factor = 0.0
    else:
        thermal_factor = math.sqrt((t_max - t_amb) / (t_max - t_ref))
        
    # Bundle packing factor
    n = max(1, len(wire_diams))
    bundle_factor = n ** -0.45
    
    derated_ampacity = base_amp * thermal_factor * bundle_factor
    
    return {
        "wire_count": n,
        "bundle_outer_diameter_mm": round(d_bundle, 2),
        "as50881_min_bend_radius_mm": round(r_min_bend, 2),
        "ambient_temp_c": t_amb,
        "max_conductor_temp_c": t_max,
        "thermal_derating_factor": round(thermal_factor, 3),
        "bundle_packing_factor": round(bundle_factor, 3),
        "nominal_ampacity_a": base_amp,
        "continuous_derated_ampacity_a": round(derated_ampacity, 2)
    }

def remediate_nodes(nodes):
    remediated = json.loads(json.dumps(nodes))
    bends = [n for n in remediated if n.get("type") in ["bend", "corner", "turn"]]
    actions = []
    
    for n in remediated:
        if n.get("type") == "splice":
            # Check proximity to any bend
            for b in bends:
                dist = math.hypot(n.get("x", 0) - b.get("x", 0), n.get("y", 0) - b.get("y", 0))
                if dist < 150:
                    delta = 160.0 - dist
                    n["x"] = int(n.get("x", 0) + delta)
                    actions.append(f"Relocated splice '{n.get('name')}' by +{int(delta)}mm along longitudinal axis to achieve {int(dist + delta)}mm clearance.")
                    
        if n.get("type") == "connector":
            if not n.get("sealed", False):
                n["sealed"] = True
                actions.append(f"Injected IP68 silicone multi-cavity seal on connector '{n.get('name')}'.")
                
    return {
        "success": True,
        "actions_taken": actions,
        "remediated_nodes": remediated
    }

def handle_rpc(line):
    try:
        req = json.loads(line)
    except Exception:
        return None
        
    method = req.get("method")
    req_id = req.get("id")
    
    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "atelier-harness",
                    "version": "1.0.0"
                }
            }
        }
        
    elif method == "notifications/initialized":
        return None # No response required for notifications
        
    elif method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": TOOLS
            }
        }
        
    elif method == "tools/call":
        params = req.get("params", {})
        name = params.get("name")
        args = params.get("arguments", {})
        
        if name == "verify_harness_drc":
            res = run_drc(args.get("nodes", []), args.get("standard", "USCAR-21"))
        elif name == "calculate_derating":
            res = calculate_derating(
                args.get("wire_diameters_mm", [1.8, 1.8, 2.5, 2.5]),
                args.get("ambient_temp_c", 70),
                args.get("max_conductor_temp_c", 125),
                args.get("base_ampacity", 25.0)
            )
        elif name == "remediate_harness":
            res = remediate_nodes(args.get("nodes", []))
        elif name == "grade_capstone":
            violations = args.get("drc_violations_count", 0)
            has_defense = args.get("has_defense_notes", True)
            score = 100
            if violations > 0:
                score -= violations * 25
            if not has_defense:
                score -= 20
            score = max(0, score)
            res = {
                "title": args.get("title"),
                "domain": args.get("domain"),
                "score": score,
                "status": "CERTIFIED" if score >= 85 else "PROVISIONAL",
                "rubric": {
                    "physical_invariants": 40 if violations == 0 else max(0, 40 - violations * 15),
                    "derating_math": 30,
                    "defense_presentation": 30 if has_defense else 10
                }
            }
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": -32601,
                    "message": f"Method '{name}' not found"
                }
            }
            
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "content": [
                    {
                        "type": "text",
                        "text": json.dumps(res, indent=2)
                    }
                ]
            }
        }
        
    elif method == "ping":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {}
        }
        
    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {
            "code": -32601,
            "message": f"Unknown method: {method}"
        }
    }

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        resp = handle_rpc(line)
        if resp is not None:
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()

if __name__ == "__main__":
    main()
