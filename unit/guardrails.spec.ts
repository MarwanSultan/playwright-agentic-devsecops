import { describe, expect, it } from 'vitest';

import { validateToolRequest } from '../agentic/guardrails';

describe('validateToolRequest', () => {
  it('allows an approved local test command', () => {
    expect(
      validateToolRequest({
        tool: 'shell',
        operation: 'run-tests',
        environment: 'local',
        authorized: false,
        command: 'npm test',
      }).allowed,
    ).toBe(true);
  });

  it('rejects commands outside the allowlist', () => {
    const decision = validateToolRequest({
      tool: 'shell',
      operation: 'shell',
      environment: 'local',
      authorized: true,
      command: 'rm -rf .',
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toMatch(/allowlist/);
  });

  it('rejects non-read-only production HTTP operations', () => {
    const decision = validateToolRequest({
      tool: 'http',
      operation: 'update',
      environment: 'production',
      authorized: false,
      method: 'POST',
      url: 'https://api.va.gov/example',
    });

    expect(decision.allowed).toBe(false);
    expect(decision.risk).toBe('critical');
  });

  it('rejects hosts outside the allowlist', () => {
    const decision = validateToolRequest({
      tool: 'http',
      operation: 'read',
      environment: 'test',
      authorized: true,
      method: 'GET',
      url: 'http://169.254.169.254/latest/meta-data',
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toMatch(/allowlist/);
  });
});
