/**
 * @file security-interceptors.ts
 * PreToolUse security interceptors.
 * Intercepts tool parameters before execution to enforce least-privilege scoping,
 * prevent path traversal, and block unsafe flags (e.g. --dangerously-skip-permissions).
 */

import path from 'node:path';

export interface InterceptionResult {
  allowed: boolean;
  sanitizedValue?: string;
  violationReason?: string;
}

export class SecurityInterceptors {
  /**
   * Enforces directory containment.
   * Ensures target path resides strictly inside authorized base directory.
   */
  public static validatePathContainment(targetPath: string, allowedBaseDir: string): InterceptionResult {
    const resolvedBase = path.resolve(allowedBaseDir);
    const resolvedTarget = path.resolve(resolvedBase, targetPath);

    // Check for directory traversal escape
    if (!resolvedTarget.startsWith(resolvedBase)) {
      return {
        allowed: false,
        violationReason: `Path containment violation: Target path '${targetPath}' resolves outside allowed directory '${allowedBaseDir}'.`,
      };
    }

    // Check for forbidden directories (.git, .env)
    const relative = path.relative(resolvedBase, resolvedTarget);
    const segments = relative.split(path.sep);

    if (segments.includes('.git') || segments.includes('.env')) {
      return {
        allowed: false,
        violationReason: `Access denied to sensitive system path segment: '${relative}'.`,
      };
    }

    return {
      allowed: true,
      sanitizedValue: resolvedTarget,
    };
  }

  /**
   * Validates CLI command arguments against forbidden security antipatterns.
   */
  public static validateCommandSecurity(command: string): InterceptionResult {
    const trimmed = command.trim();

    // Block dangerous permission bypass flag
    if (trimmed.includes('--dangerously-skip-permissions')) {
      return {
        allowed: false,
        violationReason: 'Forbidden flag: --dangerously-skip-permissions is prohibited by Atelier security policy.',
      };
    }

    // Block destructive commands without sandbox protection
    const forbiddenPatterns = [
      /rm\s+-rf\s+\//,
      /mkfs/,
      /:(){ :\|:& };:/, // Fork bomb
      />\s*\/dev\/sda/,
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(trimmed)) {
        return {
          allowed: false,
          violationReason: `Command pattern '${trimmed}' blocked by safety invariant.`,
        };
      }
    }

    return {
      allowed: true,
      sanitizedValue: trimmed,
    };
  }
}
