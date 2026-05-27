# End-to-End Tests — Execution Guide

> *Companion to [VERIFICATION_DETAILED.md](VERIFICATION_DETAILED.md)*

End-to-end tests are defined in process 09 Verification and executed against the full system running via docker-compose.

---

## Prerequisites

| Tool | Minimum version | Purpose |
|------|----------------|---------|
| Docker + Compose | 24 | Run the full application stack |
| Node.js | 18 | Playwright test runner |
| npm | 9 | Package manager |

---

## Test cases

| Test ID | Scenario | SR |
|---------|----------|----|
| TC-01.1 | Question displayed with text and options | SR-01 |
| TC-01.2 | Answer selection disables all buttons | SR-02 |
| TC-02.1 | Correct answer shows "Correct!" feedback | SR-03 |
| TC-02.1b | Wrong answer shows "Wrong" feedback | SR-03 |
| TC-02.2 | Wrong answer reveals correct option number | SR-04 |
| TC-03.1 | Next button advances to next question | SR-05 |
| TC-03.2 | Score summary shown after last question | SR-06 |
| TC-SR-08 | App accessible via browser without installation | SR-08 |
| TC-SR-09 | Response time measurement | SR-09 |
| TC-SR-10 | No authentication required | SR-10 |
| TC-SR-11 | Questions file fields honoured | SR-11 |

Full test case specifications (steps, expected results, pass criteria) → [VERIFICATION_DETAILED.md](VERIFICATION_DETAILED.md)

---

## First-time setup

```bash
npm install --prefix technical_processes/09-verification/generated/e2e
```

Playwright downloads the Chromium browser binary on first install. To install it explicitly:

```bash
technical_processes/09-verification/generated/e2e/node_modules/.bin/playwright install chromium
```

---

## Run

```bash
# 1. Start the full stack
docker compose up -d

# 2. Run all E2E tests
npm test --prefix technical_processes/09-verification/generated/e2e

# 3. Tear down
docker compose down
```

### Expected output

```
Running 11 tests using 1 worker

  ✓ TC-01.1 — Question displayed with text and options
  ✓ TC-01.2 — Answer selection disables all buttons
  ✓ TC-02.1 — Correct answer shows "Correct!" feedback
  ✓ TC-02.1b — Wrong answer shows "Wrong" feedback
  ✓ TC-02.2 — Wrong answer reveals correct option number in feedback
  ✓ TC-03.1 — Next button advances to next question
  ✓ TC-03.2 — Score summary shown after last question
  ✓ TC-SR-08 — App accessible via browser without installation
  ✓ TC-SR-09 — Response time under 200ms for initial load
  ✓ TC-SR-10 — No authentication required
  ✓ TC-SR-11 — Questions file fields are honoured

  11 passed (30s)
```

---

## Run a single test

```bash
npm test --prefix technical_processes/09-verification/generated/e2e -- --grep "TC-02.1"
```

---

## Generating the HTML report

The HTML reporter runs automatically. To open it after a test run:

```bash
# Windows
start technical_processes/09-verification/generated/e2e/playwright-report/index.html
```

To force a dedicated report run:

```bash
npm run test:report --prefix technical_processes/09-verification/generated/e2e
```

---

## Notes on manual test cases

The following test cases from [VERIFICATION_DETAILED.md](VERIFICATION_DETAILED.md) require manual execution (file editing + container restart) and cannot be automated:

| Test ID | Scenario |
|---------|----------|
| TC-05.1 | New question appears after adding to questions file |
| TC-05.2 | Edited question shows updated text |
| TC-05.3 | Removed question no longer appears |

Execute these against the pass criteria defined in VERIFICATION_DETAILED.md and record the result manually.

---

## Quality gate

All automated E2E tests (11) must pass. Manual tests (TC-05.x) must be signed off before the process 09 Verification quality gate is closed.  
See [../GOVERNANCE.md](../GOVERNANCE.md) for the full quality gate definition.
