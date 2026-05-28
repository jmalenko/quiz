# Validation Scripts — Quiz Application

> *AI-generated — Process 11 Validation*
> *Implied from [../../detailed/VALIDATION_DETAILED.md](../../detailed/VALIDATION_DETAILED.md)*

Automated acceptance tests that validate the deployed Quiz application satisfies stakeholder needs (US-01 – US-05).

Each test corresponds to a validation scenario (VS-nn) from the Validation Plan.

---

## Prerequisites

- Node.js ≥ 20
- The Quiz application is deployed and reachable (default: `http://localhost:8888`)
- Docker is available on the host (required for VS-05 backend restart)

---

## Setup

```bash
npm ci
npx playwright install chromium --with-deps
```

---

## Run

```bash
# Against the default deployed URL (http://localhost:8888)
npm test

# Against a different deployment
BASE_URL=http://myhost:8888 npm test

# On Linux CI (Docker available directly)
DOCKER_CMD=docker npm test
```

---

## Coverage

| Scenario | Story | Description |
|----------|-------|-------------|
| VS-01 | US-01 | Player sees question text and selectable options |
| VS-02 | US-02 | Correct/wrong feedback shown immediately after answering |
| VS-03 | US-03 | Player can progress through all questions in sequence |
| VS-04 | US-04 | Score summary visible after completing the quiz |
| VS-05 | US-05 | New question added to file appears without image rebuild |

---

## Validation Report

Test results are written to `playwright-report/`. The CI/CD pipeline publishes a Validation Report as a pipeline step summary after each run.
