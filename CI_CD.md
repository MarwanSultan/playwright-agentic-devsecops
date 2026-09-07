# CI/CD Design

## Pipeline

The main workflow runs on every push and pull request:

1. install from the lockfile;
2. format, lint, strict type check, and unit test;
3. audit dependencies;
4. run Chromium, Firefox, and WebKit across two Playwright shards;
5. build the Docker image and run a Chromium smoke test;
6. retain test diagnostics and JUnit output.

The CodeQL workflow analyzes JavaScript/TypeScript on pushes, pull requests, and weekly schedule. Dependabot updates npm, GitHub Actions, and Docker manifests. CodeQL runs on GitHub-hosted runners; local `act` requires a valid GitHub token to pre-fetch the public CodeQL action and cannot reproduce GitHub's security-events upload. Do not use a fake token: run CodeQL in GitHub Actions or provide a locally authorized token through `act` without committing it.

## Reliability and speed

Quality gates run before browser jobs. Browser jobs use `fail-fast: false` so one browser failure does not hide diagnostics from another. `concurrency` cancels obsolete pull-request runs. `WORKERS` and the shard matrix are intentionally bounded to avoid overwhelming public services.

## Sharding

The default matrix is `project x shard`, with two shards per browser. To tune it, change the shard list and denominator together in `.github/workflows/playwright.yml`, then measure wall-clock duration and failure/retry rates.

## Artifacts

The Playwright HTML report, JUnit XML, traces, screenshots, and videos are uploaded on success, failure, or cancellation when present. Retention is 14 days by default; adjust it to the repository's storage policy.

## Required repository settings

Before publishing, enable branch protection, required status checks, Dependabot security updates, secret scanning with push protection, and least-privilege GitHub Actions policy. Pin actions to reviewed immutable commit SHAs when the repository's release process is established.
