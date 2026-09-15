# 🚀 Playwright Agentic AI DevSecOps Framework

[![Playwright](https://img.shields.io/badge/Playwright-TypeScript-45ba4b?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions)](https://github.com/features/actions)
[![DevSecOps](https://img.shields.io/badge/DevSecOps-Security%20Gates-red)](https://github.com/MarwanSultan/Playwright-Agentic-AI-DevSecOps)
[![AI](https://img.shields.io/badge/AI-Agentic%20Architecture-purple)](https://github.com/MarwanSultan/Playwright-Agentic-AI-DevSecOps)

> **An enterprise-oriented Playwright quality engineering framework for government and regulated web applications, combining UI automation, API validation, security testing, performance instrumentation, CI/CD quality gates, and an extensible agentic AI architecture.**

---

## 📌 Overview

**Playwright-Agentic-AI-DevSecOps** is a TypeScript-based test automation and quality engineering framework designed to demonstrate how modern software testing can be integrated directly into a **CI/CD and DevSecOps lifecycle**.

The framework uses [Playwright](https://playwright.dev/) as the browser automation engine and is designed around several complementary quality disciplines:

- UI end-to-end automation
- Cross-browser testing
- API validation
- Functional and regression testing
- Accessibility testing
- Performance instrumentation
- Static application security testing
- Dependency and software composition analysis
- CI/CD automation
- Test reporting and diagnostic artifacts
- AI-assisted quality engineering
- Agentic orchestration
- MCP-based tool integration
- Failure analysis and test optimization

The project uses **IRS.gov** as a public-facing government application test target for demonstrating realistic testing scenarios without requiring access to private systems or sensitive user information.

The framework is intentionally designed so that AI capabilities can be introduced without making the core test execution dependent on an LLM. **Playwright remains the deterministic execution engine; AI is an orchestration and analysis layer.**

---

# 🎯 Project Goals

The primary goals of this project are to demonstrate how a modern QA/SDET organization can combine:

```text
Test Automation
      +
API Validation
      +
Security Engineering
      +
Performance Engineering
      +
CI/CD
      +
AI-Assisted Quality Engineering
      +
Agentic Orchestration
```

into a unified quality engineering workflow.

The project emphasizes:

- Shift-left testing
- Shift-left security
- Automation-first testing
- Deterministic test execution
- Cross-browser validation
- Evidence-driven failure analysis
- CI/CD quality gates
- Risk-based testing
- Traceability
- Secure handling of test data
- AI-assisted engineering rather than AI replacing deterministic tests

---

# 🏗️ Architecture

The target architecture is based on a deterministic Playwright execution layer surrounded by automation, security, performance, and AI capabilities.

```text
                         ┌───────────────────────┐
                         │        Developer      │
                         │       / CI Trigger    │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    GitHub Actions     │
                         │      CI/CD Pipeline   │
                         └───────────┬───────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
      ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
      │ Security      │      │ Playwright    │      │ Performance   │
      │ Gates         │      │ Test Engine   │      │ Validation    │
      │               │      │               │      │               │
      │ CodeQL        │      │ UI            │      │ Navigation    │
      │ Semgrep       │      │ API           │      │ Timing        │
      │ Dependency    │      │ Cross-browser │      │ Metrics       │
      │ Audit         │      │ Accessibility │      │ Regression    │
      └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
              │                       │                      │
              └───────────────────────┼──────────────────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   Test Evidence      │
                           │                      │
                           │ HTML Reports         │
                           │ Screenshots          │
                           │ Traces               │
                           │ Videos               │
                           │ Logs                 │
                           │ Performance Data     │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │    AI / Agent Layer  │
                           │                      │
                           │ Orchestrator         │
                           │ Planner              │
                           │ Test Generator       │
                           │ Failure Analyzer     │
                           │ Healer               │
                           │ Security Auditor     │
                           │ Optimizer             │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │   Quality Gate       │
                           │                      │
                           │ PASS → Continue      │
                           │ FAIL → Block         │
                           └──────────────────────┘
```

---

# 🤖 Agentic AI Architecture

The AI layer is designed as a **pluggable orchestration layer** rather than replacing deterministic test automation.

The intended workflow is:

```text
Requirement
     │
     ▼
┌───────────────┐
│ Orchestrator  │
└───────┬───────┘
        │
        ├──────────────► Planner
        │
        ├──────────────► Test Generator
        │
        ├──────────────► Failure Analyzer
        │
        ├──────────────► Healer
        │
        ├──────────────► Security Auditor
        │
        └──────────────► Optimizer
```

### Planner

Converts requirements or test objectives into structured test scenarios.

### Test Generator

Produces candidate Playwright test implementations from structured test cases.

### Failure Analyzer

Analyzes:

- Playwright failures
- error messages
- traces
- screenshots
- DOM information
- network failures
- timing information

and classifies likely root causes.

### Healer

Identifies potentially recoverable automation failures and proposes safer locator or test changes.

AI-generated changes should remain subject to deterministic validation and human review.

### Security Auditor

Analyzes security-related findings and helps classify risk.

### Optimizer

Identifies opportunities to:

- remove redundant tests
- improve execution time
- identify flaky tests
- prioritize high-value tests
- improve coverage

---

# 🔌 MCP Integration

The architecture is designed to support **Model Context Protocol (MCP)** tools for controlled interaction with the testing environment.

Potential tool categories include:

```text
Playwright Tools
├── Navigate
├── Locate
├── Click
├── Fill
├── Screenshot
└── Inspect

Filesystem Tools
├── Read
├── Write
└── Search

Git Tools
├── Status
├── Diff
└── History

Testing Tools
├── Run Tests
├── Inspect Failures
└── Collect Results

Security Tools
├── Scan
└── Analyze Findings

Performance Tools
├── Collect Metrics
└── Compare Baselines
```

The goal is to keep agent interactions **tool-driven, observable, constrained, and auditable**.

---

# 🧪 Test Automation

The framework is configured for multi-browser Playwright execution.

Current browser projects include:

- Chromium
- Firefox
- WebKit

The Playwright configuration uses:

- Full parallel execution
- CI retries
- `forbidOnly` on CI
- HTML reporting
- 30-second action timeout
- 60-second navigation timeout
- Screenshots on failure
- Video on first retry
- Trace on first retry
- Headless execution

These settings are defined in `playwright.config.ts`.

---

# 🧩 Testing Scope

The framework is designed to support multiple testing disciplines.

## Functional Testing

Validates expected application behavior.

Examples:

- Page navigation
- Search
- Forms and publications
- Payment information
- Contact/help functionality
- Language switching

## Regression Testing

Protects previously validated functionality against unintended changes.

## Cross-Browser Testing

Tests supported workflows across:

- Chromium
- Firefox
- WebKit

## API Testing

The framework is structured to support REST/API validation alongside browser-based testing.

API testing should include:

- HTTP status validation
- Response validation
- Schema validation
- Headers
- Business rules
- Negative scenarios

## Accessibility Testing

The test strategy includes:

- Keyboard navigation
- Focus order
- Landmarks
- Form labels
- Alternative text
- Accessible controls

## Performance Testing

Performance instrumentation is designed to collect and aggregate timing information for analysis and regression detection.

Potential metrics include:

- Navigation timing
- Page load duration
- DOM content loaded
- Response timing
- Baseline comparison
- Regression thresholds

## Security Testing

Security validation is integrated into the CI/CD lifecycle.

Current security-oriented capabilities include:

- CodeQL
- Semgrep
- Dependency auditing
- Security-focused CI workflows

The architecture is designed to support additional controls such as:

- OWASP ZAP
- Gitleaks
- OSV scanning
- Dependabot

---

# 🔐 DevSecOps Strategy

Security is treated as part of the software delivery lifecycle rather than a separate activity.

```text
Developer Commit
      │
      ▼
Dependency Audit
      │
      ▼
SAST
 ├── CodeQL
 └── Semgrep
      │
      ▼
Automated Tests
      │
      ├── UI
      ├── API
      ├── Accessibility
      └── Performance
      │
      ▼
Quality Gate
      │
 ┌────┴────┐
 ▼         ▼
PASS      FAIL
 │         │
 ▼         ▼
Continue  Block
```

The objective is to identify defects and security risks as early as possible.

---

# 🔄 CI/CD

GitHub Actions provides automated execution of the quality engineering pipeline.

The pipeline is designed to perform:

1. Repository checkout
2. Dependency installation
3. Dependency security validation
4. Static analysis
5. Playwright installation
6. Automated test execution
7. Performance processing
8. Report generation
9. Artifact retention
10. Quality evaluation

Test execution produces diagnostic artifacts such as:

- HTML reports
- screenshots
- traces
- videos
- logs
- performance summaries

---

# 📊 Observability and Test Evidence

A failed test should provide enough information for an engineer to diagnose the problem without simply reproducing the failure manually.

The framework therefore uses Playwright's diagnostic capabilities:

```text
Test Failure
     │
     ├── Screenshot
     │
     ├── Trace
     │
     ├── Video
     │
     ├── Console / Logs
     │
     └── Performance Data
```

These artifacts can subsequently be consumed by an AI failure-analysis workflow.

---

# 📋 Government Application Test Strategy

The repository includes an IRS-focused test plan covering ten core public-facing scenarios.

The test plan covers:

1. Homepage functionality
2. Site search
3. Forms and publications
4. Payment information
5. Refund-status navigation
6. IRS Online Account login navigation
7. Contact and help resources
8. Form-number lookup
9. Accessibility and keyboard navigation
10. Spanish-language content

Sensitive workflows are intentionally **non-destructive**.

The framework does not require real taxpayer credentials, Social Security numbers, tax records, or other personal information.

---

# 📁 Project Structure

```text
Playwright-Agentic-AI-DevSecOps/
│
├── .github/
│   └── workflows/
│       ├── playwright.yml
│       └── semgrep.yml
│
├── .vscode/
│
├── scripts/
│   └── aggregate_perf.js
│
├── spec/
│
├── tests/
│   ├── ui/
│   ├── api/
│   ├── accessibility/
│   ├── security/
│   └── performance/
│
├── .gitignore
├── .super-linter.yml
├── irs_core_test_plan.md
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

As the agentic layer expands, the recommended architecture is:

```text
agents/
├── orchestrator/
├── planner/
├── test-generator/
├── failure-analyzer/
├── healer/
├── security-auditor/
└── optimizer/

chatbot/
├── agents/
├── chat/
├── model/
├── prompts/
└── tools/
```

---

# ⚙️ Prerequisites

Recommended environment:

- Node.js 20+
- npm
- Git
- VS Code or another TypeScript-compatible IDE
- Playwright-supported browsers

For AI functionality, the selected model provider and required API credentials will depend on the configured AI integration.

**Never commit API keys or other secrets to the repository.**

Use environment variables or a secure secrets-management solution.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/MarwanSultan/Playwright-Agentic-AI-DevSecOps.git
cd Playwright-Agentic-AI-DevSecOps
```

## 2. Install dependencies

```bash
npm ci
```

For local development where the lockfile is intentionally being changed:

```bash
npm install
```

## 3. Install Playwright browsers

```bash
npx playwright install
```

On Linux CI environments:

```bash
npx playwright install --with-deps
```

---

# ▶️ Running Tests

## Run the complete Playwright suite

```bash
npx playwright test
```

## Run Chromium

```bash
npx playwright test --project=chromium
```

## Run Firefox

```bash
npx playwright test --project=firefox
```

## Run WebKit

```bash
npx playwright test --project=webkit
```

## Run in headed mode

```bash
npx playwright test --headed
```

## Debug a test

```bash
npx playwright test --debug
```

## Run a specific test

```bash
npx playwright test tests/example.spec.ts
```

## Open the HTML report

```bash
npx playwright show-report
```

---

# 🔐 Security Scanning

Security scanning should be performed locally and in CI.

## Semgrep

```bash
semgrep scan
```

## Dependency audit

```bash
npm audit --audit-level=high
```

The CI pipeline is intended to prevent high-severity dependency issues from silently moving through the delivery process.

---

# 📈 Performance Analysis

Performance artifacts can be aggregated using:

```bash
node scripts/aggregate_perf.js
```

The performance layer is designed to evolve toward:

- Baseline comparison
- p50 metrics
- p95 metrics
- p99 metrics
- Regression thresholds
- CI quality gates

---

# 🧠 AI-Assisted Quality Engineering

The AI layer is intended to augment, not replace, deterministic automation.

A representative workflow is:

```text
Requirement
    ↓
AI Planning
    ↓
Structured Test Case
    ↓
Playwright Test
    ↓
Deterministic Execution
    ↓
Evidence
    ↓
AI Analysis
    ↓
Recommendation
    ↓
Human / Quality Gate Decision
```

This design helps prevent a common failure mode in AI-based testing systems where an LLM is allowed to make uncontrolled changes to the test suite or application.

---

# 🛡️ Security Principles

This project follows several security principles:

### No secrets in source control

API keys, credentials, tokens, and private certificates must never be committed.

### No real taxpayer information

The IRS test scenarios are designed around publicly accessible functionality.

### No destructive authentication testing

Authentication workflows should validate navigation and UI behavior without submitting real credentials.

### Least privilege

CI workflows should use the minimum GitHub permissions necessary.

### Shift-left security

Security analysis occurs during development and CI rather than being postponed until release.

### Auditable automation

AI-generated recommendations should be traceable to the evidence used to generate them.

---

# 🎯 Quality Gates

The long-term quality gate is:

```text
                 QUALITY GATE
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
 Functional        Security      Performance
   Tests             Scan           Tests
       │              │              │
       └──────────────┼──────────────┘
                      │
                Accessibility
                      │
                      ▼
               Release Decision
```

A release candidate should not proceed when critical quality or security conditions fail.

---

# 🧪 Risk-Based Testing

Not every test carries the same business risk.

Tests should therefore be prioritized according to:

```text
Business Impact
      ×
Failure Probability
      ×
Security Exposure
      ×
User Impact
```

High-risk workflows receive stronger automation, broader browser coverage, and more extensive diagnostic evidence.

---

# 📚 Documentation

Primary documentation includes:

- `README.md` — framework overview and usage
- `irs_core_test_plan.md` — functional test strategy
- `playwright.config.ts` — Playwright execution configuration
- `.github/workflows/` — CI/CD and security automation
- `scripts/` — supporting automation utilities

Additional architecture documentation should be added as the AI orchestration layer expands.

---

# 🔭 Roadmap

## Phase 1 — Core Automation

- [x] Playwright TypeScript foundation
- [x] Cross-browser execution
- [x] Parallel execution
- [x] Retry strategy
- [x] Screenshots
- [x] Traces
- [x] Video capture
- [x] HTML reporting

## Phase 2 — DevSecOps

- [x] GitHub Actions
- [x] Dependency auditing
- [x] CodeQL integration
- [x] Semgrep integration
- [ ] Secret scanning
- [ ] OSV scanning
- [ ] DAST integration
- [ ] Unified security quality gate

## Phase 3 — Quality Engineering

- [ ] Expanded API testing
- [ ] Automated accessibility testing
- [ ] Performance baselines
- [ ] p95/p99 metrics
- [ ] Regression thresholds
- [ ] Test tagging and selective execution
- [ ] Requirement-to-test traceability

## Phase 4 — Agentic AI

- [ ] Orchestrator
- [ ] Planner agent
- [ ] Test generation agent
- [ ] Failure-analysis agent
- [ ] Healing workflow
- [ ] Security auditor agent
- [ ] Test optimization agent
- [ ] Structured AI outputs
- [ ] Human approval workflow

## Phase 5 — MCP

- [ ] Playwright MCP tools
- [ ] Filesystem tools
- [ ] Git tools
- [ ] Test execution tools
- [ ] Security analysis tools
- [ ] Performance analysis tools

## Phase 6 — Enterprise Quality Gates

- [ ] Unified quality-gate engine
- [ ] Risk scoring
- [ ] Automated release recommendation
- [ ] AI-generated test summaries
- [ ] Historical test analytics
- [ ] Flaky-test detection
- [ ] Coverage trend analysis

---

# 💡 Design Philosophy

The central design principle is:

> **AI should enhance quality engineering, not replace engineering discipline.**

The framework therefore separates:

```text
AI Reasoning
      │
      ▼
Decision / Recommendation
      │
      ▼
Deterministic Tool
      │
      ▼
Playwright / Security / Performance
      │
      ▼
Evidence
      │
      ▼
Quality Gate
```

This provides a balance between the flexibility of AI and the predictability required for enterprise software testing.

---

# 🎓 What This Project Demonstrates

This project demonstrates practical experience with:

- Playwright
- TypeScript
- End-to-end testing
- Cross-browser automation
- CI/CD
- GitHub Actions
- DevSecOps
- SAST
- Dependency security
- Test diagnostics
- Performance engineering
- Accessibility testing
- API testing architecture
- Government application testing
- AI-assisted quality engineering
- Agentic architecture
- MCP-based tool orchestration
- Risk-based testing
- Quality gates

---

# 👤 Author

**Marwan Sultan**

Senior QA Automation Engineer | SDET | Test Automation Lead | AI Quality Engineering

GitHub:
https://github.com/MarwanSultan

Project:
https://github.com/MarwanSultan/Playwright-Agentic-AI-DevSecOps

---

# 📜 License

MIT License

---

## ⭐ Final Note

This repository is intended to demonstrate how modern **Quality Engineering, DevSecOps, Playwright automation, security engineering, performance validation, and agentic AI** can work together within a CI/CD lifecycle.

The long-term objective is not simply to generate automated tests.

The objective is to build a system that can:

```text
Understand
    ↓
Plan
    ↓
Generate
    ↓
Execute
    ↓
Analyze
    ↓
Secure
    ↓
Optimize
    ↓
Validate
```

while maintaining deterministic execution, auditable evidence, and explicit quality gates.
