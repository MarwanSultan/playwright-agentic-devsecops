# Test Plan

## Scope

This plan covers publicly observable VA.gov homepage behavior, safe HTTP checks, deterministic Playwright routing behavior, configuration, validation helpers, and CI/container execution. It excludes authenticated account workflows and destructive operations until an authorized non-production environment exists.

## Current baseline

- UI: homepage URL/title and navigation landmark through `homePage` fixture.
- API: safe read-only homepage request with status, content type, and body assertions.
- Network: request capture, mocked response fulfillment, and aborted dependency simulation.
- Data-driven/unit: valid, empty, whitespace, and bounded search input cases plus over-limit boundary.
- Cross-browser: Chromium, Firefox, and WebKit projects configured.

## Planned expansion

Prioritize high-traffic navigation, search, content rendering, accessible names/landmarks, safe public JSON contracts, error states, and regression scenarios. Each candidate requires a written purpose and a safe execution path; the target of approximately 200 tests must not be reached with duplicate variations.

## Exit criteria

A release candidate requires green formatting, lint, strict type checking, unit tests, relevant browser projects, Docker smoke execution, dependency audit, and available diagnostics for failures. The final architecture review must assess flakiness, execution time, public-service rate limits, dependency risk, artifact storage, and fixture isolation.

## Assumptions

VA.gov content, redirects, and public endpoints can change without notice. Selectors must remain semantic and maintainers must update expected behavior when the public application changes. CI defaults should remain conservative until duration and service impact are measured.
