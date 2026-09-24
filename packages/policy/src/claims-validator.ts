/**
 * @file claims-validator.ts
 * Automated validator for technical and marketing copy against governance/claims_evidence_policy.md.
 * Prevents claim inflation and ensures Tier 1 evidence compliance in CI.
 */

export interface ClaimAuditFinding {
  prohibitedPhrase: string;
  matchedText: string;
  recommendedAlternative: string;
  severity: 'error' | 'warning';
  policyReference: string;
}

export class ClaimsValidator {
  private static readonly PROHIBITED_RULES: Array<{
    pattern: RegExp;
    prohibitedPhrase: string;
    alternative: string;
    severity: 'error' | 'warning';
    policyRef: string;
  }> = [
    {
      pattern: /official(?:ly)?\s+ready/i,
      prohibitedPhrase: 'officially ready',
      alternative: 'demonstrated diagnostic readiness against CCAR-F blueprint',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §3.1',
    },
    {
      pattern: /clearance\s+voucher\s+authoriz(?:ation|ed)/i,
      prohibitedPhrase: 'clearance voucher authorized',
      alternative: 'Atelier diagnostic verification token issued',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §3.1',
    },
    {
      pattern: /official\s+claude(?:\s+certified)?\s+architect/i,
      prohibitedPhrase: 'official Claude Architect certification',
      alternative: 'Atelier CCAR-F Blueprint Aligned Diagnostic',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §3.1',
    },
    {
      pattern: /on-chain\s+audit\s+hash/i,
      prohibitedPhrase: 'on-chain audit hash',
      alternative: 'cryptographic SHA-256 artifact digest',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §6.2',
    },
    {
      pattern: /(?:llm|agent)\s+(?:acts\s+as\s+the|is\s+the)\s+(?:primary\s+)?safety\s+interlock/i,
      prohibitedPhrase: 'LLM as safety interlock',
      alternative: 'deterministic hardware interlock (LLMs are advisory only)',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §4.1',
    },
    {
      pattern: /fraud-proof\s+biometric/i,
      prohibitedPhrase: 'fraud-proof biometric',
      alternative: 'candidate presence telemetry (deterrence baseline)',
      severity: 'error',
      policyRef: 'governance/claims_evidence_policy.md §5.1',
    },
  ];

  /**
   * Scans markdown, UI strings, or documentation for prohibited overclaims.
   */
  public static auditContent(content: string): ClaimAuditFinding[] {
    const findings: ClaimAuditFinding[] = [];

    for (const rule of ClaimsValidator.PROHIBITED_RULES) {
      const match = content.match(rule.pattern);
      if (match) {
        findings.push({
          prohibitedPhrase: rule.prohibitedPhrase,
          matchedText: match[0],
          recommendedAlternative: rule.alternative,
          severity: rule.severity,
          policyReference: rule.policyRef,
        });
      }
    }

    return findings;
  }
}
