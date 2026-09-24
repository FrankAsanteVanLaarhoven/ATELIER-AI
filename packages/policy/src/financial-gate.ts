/**
 * @file financial-gate.ts
 * Deterministic Financial Invariant Gate.
 * Enforces the core rule: Never ask the model to enforce what code can enforce reliably.
 * Hard-caps autonomous monetary actions at $500.00; transactions exceeding this require CFO authorization.
 */

export interface FinancialActionRequest {
  actionId: string;
  amount: number;
  currency: string;
  recipientId: string;
  idempotencyKey: string;
  reason: string;
}

export interface FinancialAuthorizationResult {
  approved: boolean;
  requiresDualSignature: boolean;
  idempotencyKey: string;
  transactionStatus: 'authorized' | 'escalated_for_approval' | 'rejected_invariant_violation';
  rejectionReason?: string;
}

export class FinancialGate {
  private static readonly AUTONOMOUS_CEILING = 500.0;
  private processedKeys: Set<string> = new Set();

  /**
   * Deterministically validates financial invariants.
   */
  public evaluateTransaction(
    request: FinancialActionRequest,
    signatures: { agentAuthorized: boolean; cfoApproved?: boolean }
  ): FinancialAuthorizationResult {
    // 1. Invariant: Amount must be strictly positive and finite
    if (typeof request.amount !== 'number' || isNaN(request.amount) || request.amount <= 0) {
      return {
        approved: false,
        requiresDualSignature: false,
        idempotencyKey: request.idempotencyKey,
        transactionStatus: 'rejected_invariant_violation',
        rejectionReason: `Invalid transaction amount: ${request.amount}. Must be a positive finite number.`,
      };
    }

    // 2. Invariant: Idempotency deduplication check
    if (this.processedKeys.has(request.idempotencyKey)) {
      return {
        approved: false,
        requiresDualSignature: false,
        idempotencyKey: request.idempotencyKey,
        transactionStatus: 'rejected_invariant_violation',
        rejectionReason: `Duplicate transaction detected for idempotency key: ${request.idempotencyKey}.`,
      };
    }

    // 3. Invariant: Monetary ceiling check ($500.00)
    if (request.amount > FinancialGate.AUTONOMOUS_CEILING) {
      if (!signatures.cfoApproved) {
        return {
          approved: false,
          requiresDualSignature: true,
          idempotencyKey: request.idempotencyKey,
          transactionStatus: 'escalated_for_approval',
          rejectionReason: `Amount $${request.amount.toFixed(2)} exceeds autonomous ceiling of $${FinancialGate.AUTONOMOUS_CEILING.toFixed(2)}. CFO dual signature required.`,
        };
      }
    }

    // Transaction approved; record idempotency key
    this.processedKeys.add(request.idempotencyKey);

    return {
      approved: true,
      requiresDualSignature: request.amount > FinancialGate.AUTONOMOUS_CEILING,
      idempotencyKey: request.idempotencyKey,
      transactionStatus: 'authorized',
    };
  }

  public resetKeys(): void {
    this.processedKeys.clear();
  }
}
