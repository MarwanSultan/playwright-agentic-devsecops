# Test Automation Architecture

## Purpose and scope

This repository will provide a production-oriented Playwright and TypeScript automation platform for publicly testable VA.gov behavior. It is an independent portfolio project and is not affiliated with VA.gov, the U.S. Department of Veterans Affairs, or any other government organization.

The initial implementation will remain fully functional without LangGraph, LangChain, Deep Agents, or MCP. Those systems may consume stable test capabilities later; they will not be required to install, configure, or execute the core suite.

## Architectural principles

- **Configuration over hard-coding:** environment-specific URLs, execution controls, and optional credentials are validated in one configuration module.
- **Explicit setup:** tests request the fixtures they need; unrelated tests do not incur browser navigation or authentication.
- **Isolation by default:** each Playwright test receives an isolated browser context and must not depend on test order or shared mutable state.
- **Realistic coverage:** real public services are used for safe read-only checks; routing is reserved for deterministic failure paths, unavailable dependencies, and request/response contract checks.
- **Fast feedback:** formatting, linting, type checking, unit tests, API checks, and UI checks are independently runnable and represented as CI quality gates.
- **Diagnostics first:** traces, screenshots, video policy, console errors, JUnit output, and HTML reports are retained for failed or retried tests.
- **Future integration without coupling:** execution, reporting, and test-data contracts will be exposed through TypeScript interfaces so an agent or MCP adapter can invoke them later without owning test logic.

## Target structure

```text
config/
  environment.ts          # validated environment-driven runtime settings
fixtures/
  test.ts                  # custom Playwright test object and shared fixtures
  homepage.fixture.ts      # homepage navigation fixture / page object wiring
  api.fixture.ts           # API request context and clients
pages/
  home.page.ts             # meaningful homepage interactions only
  ...
api/
  clients/                 # safe, typed API clients
  schemas/                 # JSON schema contracts where useful
  ...
tests/
  ui/                      # user-facing browser workflows
  api/                     # safe API and contract checks
  network/                 # interception, routing, and resilience behavior
  integration/             # multi-step workflows spanning boundaries
  accessibility/           # focused accessibility-oriented checks
data/
  ui/                      # typed non-secret datasets
  api/                     # typed request/response data
utils/
  validation/              # pure, unit-testable helpers
  observability/           # console/network diagnostic helpers
  ...
types/
  ...
unit/
  ...
.github/
  workflows/               # CI, security, and optional container jobs
Dockerfile
.dockerignore
ARCHITECTURE.md
TEST_STRATEGY.md
CI_CD.md
SECURITY.md
TEST_PLAN.md
```

The exact folder set may be introduced incrementally. A new abstraction must remove meaningful duplication or improve test isolation; page objects will not become a second application layer.

## Fixture strategy

Fixtures are a core framework capability, not an optional convenience.

### Base test object

`fixtures/test.ts` will export the project test object and `expect` so test files do not import the raw Playwright test object directly. The base fixture layer will provide:

- validated runtime configuration;
- standard browser context behavior inherited from Playwright;
- optional diagnostic listeners for console errors and relevant network failures;
- typed extension points for API clients and future authenticated contexts.

### Homepage fixture

`fixtures/homepage.fixture.ts` will expose a typed `homePage` fixture. When a UI test requests `{ homePage }`, the fixture will:

1. use the test's isolated Playwright `page`;
2. navigate to the configured base URL using `page.goto('/')`;
3. wait for the navigation response to meet the agreed success policy;
4. construct and return the homepage interaction object;
5. allow Playwright to close the page/context through normal fixture teardown.

This makes launching the homepage part of the fixture lifecycle while keeping the behavior opt-in. A test that does not request `homePage`—for example, a pure API or route-unit test—will not launch a browser page unnecessarily. Tests will not call the homepage URL directly or duplicate homepage setup in `beforeEach` hooks.

Representative usage after Phase 3:

```ts
import { expect, test } from '../../fixtures/test';

test('homepage exposes primary navigation', async ({ homePage }) => {
  await expect(homePage.primaryNavigation).toBeVisible();
});
```

The fixture will not silently authenticate users or mutate server-side data. Separate authenticated fixtures will be added only when a safe, supported test identity and secret-management strategy exists.

### API and specialized fixtures

API tests will request an API request context or typed client fixture. Network tests will continue to use the isolated `page` fixture and define route handlers locally or through narrowly scoped helper fixtures. This avoids global route interception leaking between tests.

## Configuration boundaries

The runtime configuration will support local, CI, and future test environments through variables such as `BASE_URL`, `API_BASE_URL`, `ENVIRONMENT`, `HEADLESS`, `WORKERS`, and `RETRIES`. Defaults will be safe for local read-only execution; CI will explicitly control retries, workers, reporters, and artifact behavior. Secrets, if ever required, will be injected by the environment and never stored in test data, source, Docker layers, or workflow YAML.

The Playwright config will consume the validated configuration module rather than reading environment variables throughout test files. Browser projects, sharding, timeout policy, and reporting will remain centralized in the config.

## Test portfolio model

The eventual approximately 200-test portfolio will be tracked by behavior and risk, not by duplicated parameter variations. The working allocation is:

- 80 UI behavior and navigation tests;
- 50 safe API and response-contract tests;
- 20 network routing and resilience tests;
- 20 meaningful data-driven scenarios;
- 20 negative, boundary, and edge cases;
- 10 integration workflows.

Accessibility checks will be applied to suitable UI flows rather than counted as artificial duplicates. The final count may change when the public application surface or safe API availability makes a scenario unsuitable.

## CI and container direction

GitHub Actions will run on pushes and pull requests with least-privilege permissions, pinned action major versions or immutable references where practical, dependency caching, concurrency cancellation, and retained diagnostics. The suite will support Playwright sharding through a configurable shard matrix. Quality gates will fail fast for formatting, linting, type errors, unit failures, and security findings before the broad browser matrix where practical.

A multi-stage Playwright Docker image will install from the lockfile, include only required browser dependencies, run as a non-root user, and execute the same npm scripts as local and CI runs. Container execution will be validated separately from host execution.

## Future agent and MCP boundary

Future adapters may invoke commands or typed services such as test discovery, execution, report collection, and failure summarization. These adapters will live outside the test domain and will not modify fixtures, page objects, or test data at runtime. Any LangGraph or MCP integration must remain an optional orchestration layer over deterministic test capabilities.

The optional `agentic/guardrails.ts` module provides a fail-closed starting point for that boundary. It validates environment, command, HTTP method, host allowlist, risk, and authorization before a future adapter can invoke an approved operation. It does not grant tools or access by itself; deployment-specific adapters must still enforce filesystem, secret, and process isolation.

## Key assumptions and risks

- VA.gov public pages and endpoints may change independently of this repository; selectors and contracts must be maintained from observed user-facing behavior.
- Production requests must remain read-only and non-destructive unless an explicitly approved non-production environment is configured.
- Public endpoints may impose rate limits or bot protections; CI volume and worker counts must be tuned conservatively.
- Authentication coverage is intentionally deferred until a secure, authorized test-account model is available.
- Browser matrix expansion increases execution time; Chromium will provide the fastest default feedback, with Firefox/WebKit and sharded suites configurable in CI.

## Phase validation

Phase 1 is complete when this architecture is reviewed against the repository and the fixture contract is unambiguous. Later phases must validate the design with:

- strict TypeScript compilation;
- unit tests for configuration and pure helpers;
- a fixture smoke test proving `homePage` navigates to the configured `/` route;
- isolated API and network tests proving they do not depend on homepage setup;
- local, Docker, and GitHub Actions execution using the same scripts.
