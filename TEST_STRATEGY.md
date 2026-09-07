# Test Strategy

## Objective

Find regressions quickly while preserving safe, repeatable coverage of public VA.gov behavior. The framework favors observable user outcomes and contract checks over implementation details.

## Test layers

| Layer       | Purpose                                                              | Execution policy                                         |
| ----------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Unit        | Validate configuration, parsing, and pure helpers                    | Every change; fastest gate                               |
| API         | Validate safe HTTP status, headers, and body contracts               | Read-only public endpoints; isolated request context     |
| UI          | Validate navigation and user-visible behavior                        | Semantic locators; Chromium feedback plus browser matrix |
| Network     | Validate resilience and dependency failure behavior                  | Scoped `route` handlers; no global mocks                 |
| Integration | Validate multi-step behavior when an authorized safe scenario exists | Small number of high-value workflows                     |

## Fixture policy

Fixtures own setup and teardown. The `homePage` fixture launches the configured homepage; tests must not duplicate that navigation in hooks. Specialized fixtures are opt-in so API and network tests remain fast and independent.

## Coverage model

The eventual inventory target is approximately 200 meaningful tests: about 80 UI, 50 API/contract, 20 network, 20 data-driven, 20 negative/boundary/edge, and 10 integration scenarios. Counts are planning limits, not a reason to duplicate assertions. Accessibility checks are attached to suitable UI flows. Authentication is added only with an approved test identity and secret strategy.

## Determinism rules

- no arbitrary sleeps;
- no test ordering dependencies;
- no shared mutable test data;
- no destructive production requests;
- route interception is scoped to a test or fixture;
- environment, worker, retry, and URL behavior is centralized;
- tests use web-first assertions and bounded timeouts.

## Mocking policy

Use real public read-only behavior for smoke and contract confidence. Use `route.fulfill`, `route.continue`, request modification, and `route.abort` only to simulate unavailable dependencies, deterministic error responses, or conditions that are unsafe or impractical to reproduce against production.

## CI distribution

The workflow runs each browser project in two Playwright shards. Increase shard count only after measuring queue time, test duration, service rate limits, and runner capacity. Every test must remain safe under concurrent execution.

## Expansion gates

Before adding a scenario, identify the user risk, expected behavior, isolation boundary, data source, failure diagnostic, and safe environment. A test is complete only when it can run independently locally and in CI.
