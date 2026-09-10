# Playwright Agentic DevSecOps

A production-oriented Playwright and TypeScript test automation framework for safe, public-facing checks against VA.gov. The project combines browser UI tests, API checks, network routing tests, contract-style fixtures, deterministic configuration, Docker execution, layered GitHub Actions security gates, and an optional agentic investigation layer that can reason over Playwright evidence.

## What this project does

This repository verifies public VA.gov behavior without storing secrets or changing production state. It is designed for:

- deterministic Playwright browser and API smoke checks;
- portable local and CI execution through environment-driven config;
- typed test fixtures and page objects for UI and API flows;
- optional AI and agentic investigation tooling for failure triage and evidence analysis;
- defensive pipeline controls, including audit, Trivy image scanning, and optional Snyk checks.

## Agentic and LLM usage

This repository is intentionally built with an agentic boundary rather than a hardwired AI dependency. The main automated test path remains Playwright-first, deterministic, and fully functional without an LLM. The optional agentic layer lives in `agentic/` and is designed to make AI-assisted reasoning safer:

- classify Playwright failures through structured state and typed artifacts;
- attach optional model-backed investigation to captured evidence;
- keep evidence collection, model calls, and MCP adapter usage clearly separated from the browser test workflow;
- allow local or hosted model integration through configuration without hard-coding credentials.

The repository includes a typed LangGraph-style investigation scaffold under `agentic/`, plus a ready boundary for `Playwright MCP` and model-provider adapters. These services are advisory and never replace the primary test command. In normal execution, `npm test` and the CI browser matrix run without invoking the agentic layer.

The recommended usage pattern is:

1. Run the deterministic Playwright test suite.
2. Capture artifacts such as traces, browser output, and test results.
3. Use the agentic investigation layer only for evidence analysis, triage, and improved debugging guidance.
4. Keep all model and MCP endpoints externalized through environment variables and never committed to the repository.

## Repository layout

```text
.github/workflows/   CI quality, Playwright browser matrix, security, and ZAP
agentic/              Optional evidence-analysis and MCP-adapter scaffolding
api/clients/         Typed API clients
config/              Central runtime configuration parsing
data/                 Typed datasets and fixtures inputs
fixtures/            Playwright test and API fixtures
pages/               Page object model for UI scenarios
tests/               UI, API, and network test suites
unit/                Fast unit tests for config and validation
utils/               Reusable validation helpers
```

## Local development

Requirements:

- Node.js 22.14.0 or compatible Node 22
- npm
- Docker Desktop for containerized execution

Install:

```sh
npm ci
npm run install:browsers
```

Run the fast quality gate:

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
```

Run the browser smoke test:

```sh
HEADLESS=true npm test -- --project=chromium
```

Run the full browser matrix:

```sh
HEADLESS=true npm test
```

Run the optional agentic investigation command:

```sh
npm run test:agent
```

## Configuration

Configuration is centralized in `config/environment.ts`. The runner reads runtime settings from environment variables and fails closed when values are invalid.

Important defaults:

- `BASE_URL=https://www.va.gov`
- `API_BASE_URL=$BASE_URL`
- `CI=false`
- `HEADLESS=true` when CI is enabled
- `RETRIES=0` locally, `2` in CI
- `TIMEOUT=30000`

## Testing model

The repository organizes tests into three public-facing lanes:

```text
ui/      Browser behavior and page-level assertions
api/     HTTP contract and response validation
network/ Request routing, response shaping, and failure simulation
```

Fixtures create isolated Playwright contexts and keep test state local. Network intercepts and API stubs are scoped to the test that creates them.

## GitHub Actions and CI

The repository uses GitHub Actions as the primary automation runtime for quality and security gates. The workflow in `.github/workflows/playwright.yml` runs formatting, linting, TypeScript checks, unit tests, dependency audit, a Playwright browser matrix, and a container smoke test. The browser jobs split the suite across two shards for Chromium, Firefox, and WebKit, while the container job validates that the same test command behaves correctly inside the Docker image.

Security automation is separated into the workflow in `.github/workflows/security.yml`. That workflow keeps the Trivy image scan active and uses an optional Snyk dependency scan only when the repository variable `SNYK_ENABLED` is enabled and the repository secret `SNYK_TOKEN` is configured. The repository also ships a manual authorized baseline ZAP workflow in `.github/workflows/zap.yml` for localhost target validation.

## Security

This project follows security-by-default practices:

- no committed credentials or `.env` files;
- environment validation with fail-closed parsing;
- safe, read-only public checks;
- least-privilege GitHub Actions permissions;
- optional OWASP ZAP baseline workflow restricted to localhost targets.

## Contribution

Use the project commands from the package scripts. Keep tests deterministic, avoid destructive traffic, and prefer evidence-based changes over broad selector churn.
