# Security and DevSecOps

## Controls

- npm dependencies are installed with `npm ci` from the committed lockfile;
- `npm audit --audit-level=high` runs in CI;
- CodeQL scans TypeScript;
- Dependabot monitors npm and GitHub Actions;
- `.env` and environment variants are ignored, with only `.env.example` committed;
- workflows use read-only repository permissions by default;
- no credentials or auth state are stored in source, test data, Dockerfiles, or workflow YAML;
- the Docker runner uses the non-root `pwuser` account;
- reports and test artifacts are retained for limited diagnostic periods.

The optional `agentic/guardrails.ts` module is the enforcement boundary for future agent or MCP adapters. It uses explicit command and host allowlists, safe HTTP methods, environment classification, authorization checks, and fail-closed decisions. LLM instructions are not treated as a security boundary.

## Secret handling

The included tests require no credentials. If an authorized non-production integration later requires a token, provide it through GitHub Actions secrets or a local uncommitted `.env`; validate presence at runtime and redact it from logs. Never place tokens in URLs, snapshots, test data, traces, or screenshots.

## Public-environment safety

Only safe, read-only public requests are included. No test submits claims, changes profile data, deletes resources, or attempts authorization bypasses against VA.gov. Security testing of authenticated or destructive behavior requires written authorization and an isolated environment.

## Agent and MCP readiness

Future agents must call deterministic guardrails before shell, filesystem, browser, or network tools. High-risk operations require explicit authorization and human review. Agents must have bounded iterations, tool calls, retries, and execution time; raw model output must be schema-validated before it can become a tool request. Core Playwright execution remains usable if every AI or MCP service is unavailable.

## Supply-chain review

Review dependency and action updates before merging. Prefer exact package versions and reviewed action references. Rebuild the container from a clean lockfile and scan the resulting image with the hosting platform's approved scanner before release.

## Reporting a vulnerability

Do not open a public issue containing exploit details or secrets. Use the repository's configured private security advisory process after publishing, and include reproducible evidence without personal or sensitive information.
