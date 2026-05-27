# Testing — Master Execution Guide

> *Process 09 Verification — how to run all test layers and produce the verification report*

This document is the single entry point for executing the full test suite.  
Each test layer is defined and documented in the process that owns it.

---

## Test layers

| Layer | Defined in | Execution guide |
|-------|-----------|-----------------|
| Unit — backend (JUnit 5 + Mockito) | Process 07 | [../../07-implementation/detailed/UNIT_TEST.md](../../07-implementation/detailed/UNIT_TEST.md) |
| Unit — frontend (Vitest + RTL) | Process 07 | [../../07-implementation/detailed/UNIT_TEST.md](../../07-implementation/detailed/UNIT_TEST.md) |
| Integration — API (REST-assured) | Process 08 | [../../08-integration/detailed/INTEGRATION_TEST.md](../../08-integration/detailed/INTEGRATION_TEST.md) |
| Integration — nginx proxy (manual) | Process 08 | [../../08-integration/detailed/INTEGRATION_TEST.md](../../08-integration/detailed/INTEGRATION_TEST.md) |
| End-to-End (Playwright) | Process 09 | [detailed/E2E_TEST.md](detailed/E2E_TEST.md) |

Traceability of test cases to system requirements is in [detailed/VERIFICATION_DETAILED.md — Verification Matrix](detailed/VERIFICATION_DETAILED.md#verification-matrix).

---

## Prerequisites

| Tool | Version | Required for |
|------|---------|-------------|
| Java (JDK) | 17 | Backend tests |
| Maven | 3.9 | Backend tests |
| Node.js | 18 | Frontend + E2E tests |
| npm | 9 | Frontend + E2E tests |
| Docker + Compose | 24 | E2E tests only |

---

## Step 1 — Unit tests (no Docker required)

```bash
# Backend (10 unit tests)
mvn test -f containers/backend/pom.xml

# Frontend (15 unit tests)
npm install --prefix containers/frontend   # first time only
npm test --prefix containers/frontend
```

Full guide → [../../07-implementation/detailed/UNIT_TEST.md](../../07-implementation/detailed/UNIT_TEST.md)

---

## Step 2 — Integration tests (no Docker required for IT-01..IT-04)

```bash
# Backend API integration (4 tests, included in the same Maven run)
mvn test -f containers/backend/pom.xml
```

IT-05 (nginx proxy) requires Docker — see the guide below.

Full guide → [../../08-integration/detailed/INTEGRATION_TEST.md](../../08-integration/detailed/INTEGRATION_TEST.md)

---

## Step 3 — End-to-end tests (Docker required)

```bash
docker compose up -d
npm test --prefix technical_processes/09-verification/generated/e2e
docker compose down
```

Full guide → [detailed/E2E_TEST.md](detailed/E2E_TEST.md)

---

## Run everything in sequence

```bash
# Steps 1 + 2 (unit + integration, no Docker)
mvn test -f containers/backend/pom.xml && npm test --prefix containers/frontend

# Step 3 (E2E, requires Docker)
docker compose up -d && npm test --prefix technical_processes/09-verification/generated/e2e && docker compose down
```

---

## Test counts summary

| Layer | Framework | Tests | Docker? |
|-------|-----------|-------|---------|
| Backend unit | JUnit 5 + Mockito | 10 | No |
| Frontend unit | Vitest + RTL | 15 | No |
| Backend integration | REST-assured | 4 | No |
| Nginx proxy | Manual / curl | 1 | Yes |
| End-to-end | Playwright | 11 | Yes |
| **Total automated** | | **40** | |

---

## Producing the verification report

The verification report is evidence that all system requirements (SR-01 – SR-11) have been tested and passed. It is produced by collecting the test outputs from each layer.

### Backend report (Surefire XML + HTML)

Maven Surefire generates reports automatically on every `mvn test` run:

```
containers/backend/target/surefire-reports/
  ├── *.xml       ← machine-readable (CI integration)
  └── *.txt       ← human-readable summary
```

To generate an HTML report:

```bash
mvn surefire-report:report -f containers/backend/pom.xml
# Output: containers/backend/target/site/surefire-report.html
open containers/backend/target/site/surefire-report.html
```

### Frontend report (Vitest JSON)

```bash
npm test --prefix containers/frontend -- --reporter=json --outputFile=containers/frontend/test-results.json
```

### E2E report (Playwright HTML)

See [detailed/E2E_TEST.md — Generating the HTML report](detailed/E2E_TEST.md#generating-the-html-report).

### Consolidating evidence

Collect the following artefacts as verification evidence:

| Artefact | Location |
|----------|----------|
| Backend Surefire HTML | `containers/backend/target/site/surefire-report.html` |
| Frontend JSON results | `containers/frontend/test-results.json` |
| Playwright HTML report | `technical_processes/09-verification/generated/e2e/playwright-report/index.html` |

These artefacts, together with the traceability matrix in [detailed/VERIFICATION_DETAILED.md](detailed/VERIFICATION_DETAILED.md), constitute the **Verification Report** for process 09.

---

## Quality gate

The system passes the process 09 Verification quality gate when:

1. All automated tests pass (0 failures, 0 errors).
2. All 11 system requirements (SR-01 – SR-11) have at least one passing test case.
3. Manual tests (IT-05, TC-05.x) are executed and their pass criteria are met.

See [GOVERNANCE.md](GOVERNANCE.md) for the full quality gate definition.
