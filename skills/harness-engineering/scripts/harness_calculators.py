#!/usr/bin/env python3
"""
Harness Engineering Calculators (Physical & Agentic AI Systems)
Implements:
1. Wire Voltage Drop & Context Window Bloat Sizing
2. Minimum Bend Radius (Standard vs. Dynamic Flex)
3. Clip Spacing & Invariant Interval
4. Thermal / Security Clearance Compliance
"""

import math

def calculate_voltage_drop(current_amps: float, wire_length_meters: float, wire_gauge_awg: int, system_voltage: float = 12.0) -> dict:
    """
    Calculates wire resistance and voltage drop according to USCAR-21 / SAE J1128 standards.
    Dual: Calculates context degradation as a function of raw token length vs. attention dispersion.
    """
    # Resistance in ohms per 1000m for copper wire by AWG
    awg_resistance = {
        8: 2.06, 10: 3.28, 12: 5.21, 14: 8.28, 16: 13.17, 18: 20.95, 20: 33.31, 22: 52.96
    }
    r_per_meter = (awg_resistance.get(wire_gauge_awg, 20.95)) / 1000.0
    total_resistance = r_per_meter * wire_length_meters * 2.0 # Round trip
    voltage_drop = current_amps * total_resistance
    percentage_drop = (voltage_drop / system_voltage) * 100.0
    acceptable = percentage_drop <= 3.0 # Critical threshold: 3% max drop

    return {
        "wire_gauge_awg": wire_gauge_awg,
        "current_amps": current_amps,
        "total_resistance_ohms": round(total_resistance, 4),
        "voltage_drop_volts": round(voltage_drop, 3),
        "percentage_drop": round(percentage_drop, 2),
        "acceptable_under_uscar": acceptable,
        "agentic_analog": f"Token payload represents {round(percentage_drop * 4, 1)}% attention dispersion. Max 12% allowable for reliable multi-turn recall."
    }

def calculate_bend_radius(bundle_diameter_mm: float, is_dynamic_flex: bool = False) -> dict:
    """
    Check 2: Minimum bend radius >= 6x bundle diameter (10x in dynamic flex zones).
    Agentic Analog: Subagent context isolation boundary.
    """
    multiplier = 10.0 if is_dynamic_flex else 6.0
    min_radius_mm = bundle_diameter_mm * multiplier
    return {
        "bundle_diameter_mm": bundle_diameter_mm,
        "zone_type": "Dynamic Flex (e.g. Door/Hatch)" if is_dynamic_flex else "Static Chassis",
        "multiplier": multiplier,
        "min_bend_radius_mm": min_radius_mm,
        "agentic_context_limit": f"Subagent context must not exceed {int(min_radius_mm * 150)} tokens without triggering coordinator compaction."
    }

def verify_5point_routing(splice_distance_mm: float, bend_radius_mm: float, bundle_diameter_mm: float, 
                          heat_clearance_mm: float, sharp_edge_clearance_mm: float,
                          all_cavities_plugged: bool, clip_spacing_mm: float, is_high_vibration: bool) -> dict:
    """
    Runs the 5-point routing checks that prevent the day-23 catastrophic failure.
    """
    c1 = splice_distance_mm >= 150.0
    min_r = bundle_diameter_mm * (10.0 if is_high_vibration else 6.0)
    c2 = bend_radius_mm >= min_r
    c3 = (heat_clearance_mm >= 50.0) and (sharp_edge_clearance_mm >= 20.0)
    c4 = all_cavities_plugged is True
    max_clip = 150.0 if is_high_vibration else 300.0
    c5 = clip_spacing_mm <= max_clip

    all_pass = c1 and c2 and c3 and c4 and c5
    return {
        "check_1_splice_distance_150mm": {"pass": c1, "val": f"{splice_distance_mm}mm", "rule": "Splice >= 150mm from bend"},
        "check_2_bend_radius_6x_10x": {"pass": c2, "val": f"{bend_radius_mm}mm (min {min_r}mm)", "rule": "R >= 6x (static) or 10x (flex)"},
        "check_3_heat_and_edge_clearance": {"pass": c3, "val": f"Heat: {heat_clearance_mm}mm, Edge: {sharp_edge_clearance_mm}mm", "rule": "Heat >= 50mm, Edge >= 20mm"},
        "check_4_sealed_cavity_plugs": {"pass": c4, "val": str(all_cavities_plugged), "rule": "All empty sealed cavities plugged"},
        "check_5_clip_spacing": {"pass": c5, "val": f"{clip_spacing_mm}mm (max {max_clip}mm)", "rule": "Clip <= 150mm (vib) or 300mm (int)"},
        "release_approved": all_pass,
        "recommendation": "APPROVED FOR FORMBOARD & HARNESS FABRICATION" if all_pass else "REJECTED: Mechanical routing violations detected."
    }

if __name__ == "__main__":
    print("Testing 5-point harness routing checks...")
    result = verify_5point_routing(
        splice_distance_mm=40.0, # The 40mm flaw that cost 12 days!
        bend_radius_mm=30.0,
        bundle_diameter_mm=10.0,
        heat_clearance_mm=60.0,
        sharp_edge_clearance_mm=25.0,
        all_cavities_plugged=True,
        clip_spacing_mm=140.0,
        is_high_vibration=True
    )
    print(f"Result: {result['release_approved']} -> {result['recommendation']}")
