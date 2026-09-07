export type AgentEnvironment = 'local' | 'test' | 'staging' | 'production';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ToolRequest {
  tool: 'filesystem' | 'shell' | 'http' | 'playwright';
  operation: string;
  environment: AgentEnvironment;
  authorized: boolean;
  command?: string;
  method?: string;
  url?: string;
}

export interface GuardrailDecision {
  allowed: boolean;
  risk: RiskLevel;
  reason: string;
}

const ALLOWED_COMMANDS = new Set([
  'npm test',
  'npm run lint',
  'npm run typecheck',
  'npm run test:unit',
  'npx playwright test',
  'docker build',
  'docker run',
]);

const ALLOWED_HOSTS = new Set(['www.va.gov', 'api.va.gov', 'localhost', '127.0.0.1']);
const SAFE_HTTP_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function riskFor(request: ToolRequest): RiskLevel {
  if (request.environment === 'production' && request.method !== undefined) return 'critical';
  if (request.tool === 'shell' || request.tool === 'http') return 'medium';
  return request.tool === 'playwright' ? 'low' : 'medium';
}

export function validateToolRequest(request: ToolRequest): GuardrailDecision {
  const risk = riskFor(request);

  if (request.environment === 'production' && !request.authorized) {
    return {
      allowed: false,
      risk: 'critical',
      reason: 'Production requests require explicit authorization.',
    };
  }

  if (request.tool === 'shell') {
    const command = request.command?.trim() ?? '';
    if (!ALLOWED_COMMANDS.has(command)) {
      return {
        allowed: false,
        risk,
        reason: 'Command is not in the approved execution allowlist.',
      };
    }
  }

  if (request.tool === 'http') {
    if (!request.url || !request.method || !SAFE_HTTP_METHODS.has(request.method.toUpperCase())) {
      return {
        allowed: false,
        risk,
        reason: 'Only explicitly safe HTTP methods are allowed by default.',
      };
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(request.url);
    } catch {
      return { allowed: false, risk, reason: 'URL must be absolute and valid.' };
    }

    if (
      !['http:', 'https:'].includes(parsedUrl.protocol) ||
      !ALLOWED_HOSTS.has(parsedUrl.hostname)
    ) {
      return {
        allowed: false,
        risk,
        reason: 'URL host or scheme is outside the network allowlist.',
      };
    }
  }

  if (risk === 'critical' && !request.authorized) {
    return { allowed: false, risk, reason: 'Critical operations require explicit authorization.' };
  }

  return { allowed: true, risk, reason: 'Request satisfies the configured guardrails.' };
}
