# VA.gov Test Automation Platform

A TypeScript and Playwright test automation framework for safe, publicly observable VA.gov behavior. This is an independent portfolio project and is not affiliated with VA.gov, the U.S. Department of Veterans Affairs, Google, AWS, or any government organization.

## What is included

- strict TypeScript and pinned npm dependencies;
- environment-driven Playwright configuration;
- reusable `homePage` fixture that launches `/` before a UI test;
- isolated API request fixture honoring `API_BASE_URL`;
- UI, API, network-routing, data-driven, boundary, and unit-test examples;
- HTML, JUnit, trace, screenshot, and video diagnostics;
- GitHub Actions quality gates with browser sharding;
- CodeQL, Dependabot, npm audit, secret-safe configuration, and Docker execution.

The suite intentionally uses safe read-only public behavior. It does not submit claims, alter accounts, or issue destructive production requests.

## Install

Requirements: Node.js 22.14.0 and npm.

1. Copy `.env.example` to `.env` if local overrides are needed.
2. Install dependencies with `npm ci`.
3. Install browsers with `npm run install:browsers`.

No credentials are needed for the included public checks.

## Run locally

- `npm test` — all Playwright projects.
- `npm run test:ui` — UI tests.
- `npm run test:api` — API tests.
- `npm run test:network` — routing tests.
- `npm run test:unit` — pure TypeScript unit tests.
- `npm run typecheck` — strict compilation.
- `npm run lint` — ESLint.
- `npm run format:check` — formatting gate.
- `npm run report` — open the last HTML report.

Use `--project=chromium` for quick local feedback. Set `HEADLESS=true`, `WORKERS=2`, or `RETRIES=1` through the environment rather than editing tests.

## Fixture model

Tests import `test` and `expect` from `fixtures/test`. Requesting `{ homePage }` navigates the isolated page to the configured `BASE_URL` root and returns a typed `HomePage`. API tests use `apiTest` and `{ publicSite }`, which owns and disposes an isolated `APIRequestContext` configured with `API_BASE_URL`. API and network tests do not pay for homepage setup unless they explicitly request it.

## Architecture and coverage

See `ARCHITECTURE.md` for boundaries and future agent/MCP integration. `TEST_STRATEGY.md` explains risk-based coverage and the path toward broader inventory. `TEST_PLAN.md` records safe scope and exit criteria.

## Docker

Build and run the same Chromium smoke suite in the non-root Playwright image:

```text
docker build --tag va-automation:test .
docker run --rm --env CI=true --env HEADLESS=true va-automation:test
```

The image installs from `package-lock.json`, uses the official matching Playwright browser image, and excludes local secrets and reports through `.dockerignore`.

For a repeatable local Compose run, use `docker compose run --rm tests`. Compose defaults to safe Chromium execution and accepts URL and worker overrides from the environment.

## CI/CD

Every push and pull request runs static quality/unit gates, a six-job browser matrix (three browser projects x two shards), and a container smoke test. Failed jobs upload JUnit, HTML, trace, screenshot, and video artifacts when available. See `CI_CD.md` for tuning guidance.

## Security

Security controls are documented in `SECURITY.md`. Never commit `.env`, credentials, tokens, auth state, or secrets in test data. Dependabot and CodeQL workflows are included; repository administrators must enable GitHub secret scanning/push protection and configure branch protection before publishing.

## Contributions

Keep tests deterministic, isolated, semantic, and safe for public environments. Add or update typed fixtures and documentation when introducing a new test category. Run formatting, lint, type checking, unit tests, and the relevant Playwright project before opening a pull request. Do not add arbitrary waits or destructive production calls.
