# Playwright Agentic AI DevSecOps

Production-oriented Playwright test automation framework combining browser/API automation, agentic AI, MCP tooling, CI/CD, and security engineering practices.

The project demonstrates how modern QA automation can evolve from traditional test execution into an AI-assisted engineering workflow capable of supporting test development, failure analysis, remediation, and security-focused automation.

---

## Overview

This repository combines:

- Playwright browser and API automation
- TypeScript-based test engineering
- Agentic AI architecture
- LangChain and LangGraph integration
- OpenAI-powered LLM workflows
- Model Context Protocol (MCP)
- Git and GitHub tooling
- Filesystem-based tooling
- CI/CD automation with GitHub Actions
- Docker-based execution
- Automated code quality gates
- Application and dependency security scanning
- Secret detection
- Container vulnerability scanning
- Dependency monitoring

The goal is to provide an enterprise-style reference architecture for building scalable, maintainable, and security-conscious automated testing systems.

---

## Architecture

The project separates deterministic test automation from AI-assisted engineering capabilities.

```text
                         ┌──────────────────────────┐
                         │          User            │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │      AI Chat / CLI       │
                         │      chatbot/            │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │    Agentic AI Layer      │
                         │                          │
                         │  LangChain / LangGraph   │
                         │  OpenAI                  │
                         └────────────┬─────────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
        ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
        │ Playwright     │   │ Filesystem     │   │ Git / GitHub   │
        │ Tooling        │   │ Tooling        │   │ Tooling        │
        └───────┬────────┘   └────────────────┘   └────────────────┘
                │
                ▼
        ┌──────────────────────────────┐
        │ Model Context Protocol (MCP) │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Playwright Test Framework    │
        │                              │
        │ UI / API / Network / Unit    │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ CI/CD + DevSecOps            │
        │                              │
        │ GitHub Actions               │
        │ Docker                       │
        │ CodeQL                       │
        │ Semgrep                      │
        │ Gitleaks                     │
        │ Trivy                        │
        │ Dependency Review            │
        │ npm audit                    │
        │ Snyk                         │
        │ OWASP ZAP                    │
        └──────────────────────────────┘
```
