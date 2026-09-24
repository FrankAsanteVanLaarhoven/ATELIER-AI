/**
 * @file tool-policy.ts
 * Deterministic authorization and idempotency policies for agentic tool use.
 * Implements KPI 5: 100% of consequential agent tools covered by explicit authorization and retry rules.
 */

export type ToolConsequenceLevel =
  | 'read_only'
  | 'idempotent_write'
  | 'consequential_side_effect'
  | 'critical_financial';

export interface ToolPolicyRule {
  toolName: string;
  consequenceLevel: ToolConsequenceLevel;
  requiresHumanApproval: boolean;
  isRetryable: boolean;
  maxRetries: number;
  backoffSeconds: number;
  requiresIdempotencyKey: boolean;
  allowedRoles?: string[];
  description: string;
}

export interface ToolAuthorizationDecision {
  allowed: boolean;
  requiresHumanApproval: boolean;
  reason?: string;
  idempotencyKey?: string;
  maxRetries: number;
}

export class ToolPolicyRegistry {
  private rules: Map<string, ToolPolicyRule> = new Map();

  constructor() {
    this.registerDefaultPolicies();
  }

  private registerDefaultPolicies(): void {
    // 1. Read-only tools
    this.register({
      toolName: 'read_file',
      consequenceLevel: 'read_only',
      requiresHumanApproval: false,
      isRetryable: true,
      maxRetries: 3,
      backoffSeconds: 1,
      requiresIdempotencyKey: false,
      description: 'Reads local filesystem content with path boundary restrictions.',
    });

    this.register({
      toolName: 'verify_harness_drc',
      consequenceLevel: 'read_only',
      requiresHumanApproval: false,
      isRetryable: true,
      maxRetries: 3,
      backoffSeconds: 1,
      requiresIdempotencyKey: false,
      description: 'Executes educational DRC verification calculations.',
    });

    // 2. Idempotent write tools
    this.register({
      toolName: 'write_file',
      consequenceLevel: 'idempotent_write',
      requiresHumanApproval: false,
      isRetryable: true,
      maxRetries: 2,
      backoffSeconds: 2,
      requiresIdempotencyKey: false,
      description: 'Deterministic file writes within authorized workspace directories.',
    });

    // 3. Consequential side-effect tools
    this.register({
      toolName: 'execute_command',
      consequenceLevel: 'consequential_side_effect',
      requiresHumanApproval: true,
      isRetryable: false,
      maxRetries: 0,
      backoffSeconds: 0,
      requiresIdempotencyKey: true,
      description: 'Arbitrary shell execution requires explicit operator authorization.',
    });

    // 4. Critical financial tools
    this.register({
      toolName: 'process_refund',
      consequenceLevel: 'critical_financial',
      requiresHumanApproval: true,
      isRetryable: false, // Non-retryable without explicit idempotency confirmation
      maxRetries: 0,
      backoffSeconds: 0,
      requiresIdempotencyKey: true,
      description: 'Dispatches customer refunds; governed by monetary threshold locks.',
    });
  }

  public register(rule: ToolPolicyRule): void {
    this.rules.set(rule.toolName, rule);
  }

  public getRule(toolName: string): ToolPolicyRule | undefined {
    return this.rules.get(toolName);
  }

  /**
   * Evaluates whether a proposed tool call satisfies deterministic invariants.
   */
  public evaluateToolCall(
    toolName: string,
    params: Record<string, unknown>,
    options: {
      userRole?: string;
      hasHumanApproval?: boolean;
      idempotencyKey?: string;
    } = {}
  ): ToolAuthorizationDecision {
    const rule = this.rules.get(toolName);

    // Default deny for unregistered tools
    if (!rule) {
      return {
        allowed: false,
        requiresHumanApproval: true,
        reason: `Tool '${toolName}' is not registered in the deterministic policy registry. Default deny invoked.`,
        maxRetries: 0,
      };
    }

    // Role check
    if (rule.allowedRoles && options.userRole && !rule.allowedRoles.includes(options.userRole)) {
      return {
        allowed: false,
        requiresHumanApproval: false,
        reason: `Role '${options.userRole}' lacks permission to invoke tool '${toolName}'.`,
        maxRetries: 0,
      };
    }

    // Idempotency requirement
    if (rule.requiresIdempotencyKey && !options.idempotencyKey) {
      return {
        allowed: false,
        requiresHumanApproval: rule.requiresHumanApproval,
        reason: `Tool '${toolName}' requires a valid idempotency key to prevent double execution.`,
        maxRetries: 0,
      };
    }

    // Human-in-the-loop approval requirement
    if (rule.requiresHumanApproval && !options.hasHumanApproval) {
      return {
        allowed: false,
        requiresHumanApproval: true,
        reason: `Tool '${toolName}' triggers side effects and requires explicit operator confirmation before execution.`,
        idempotencyKey: options.idempotencyKey,
        maxRetries: 0,
      };
    }

    return {
      allowed: true,
      requiresHumanApproval: false,
      idempotencyKey: options.idempotencyKey,
      maxRetries: rule.maxRetries,
    };
  }
}
