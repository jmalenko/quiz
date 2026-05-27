# Verification Report

> *Process 09 Verification — evidence that the system meets all system requirements*  
> *Generated from test execution results. Update after each test campaign.*

---

## Summary

| Layer | Tests | Passed | Failed | Status |
|-------|-------|--------|--------|--------|
| Backend unit | 10 | 10 | 0 | ✅ PASS |
| Frontend unit | 15 | 15 | 0 | ✅ PASS |
| Backend integration | 4 | 4 | 0 | ✅ PASS |
| Nginx proxy (IT-05) | 1 | — | — | ⏳ PENDING (Docker required) |
| End-to-end (Playwright) | 11 | — | — | ⏳ PENDING (Docker required) |
| Manual (TC-05.x) | 3 | — | — | ⏳ PENDING |

**Overall verdict: PARTIAL — automated tests on local stack pass; E2E and manual tests pending Docker environment.**

---

## Environment

| Item | Value |
|------|-------|
| Date | 2026-05-27 |
| Java | OpenJDK 17.0.15 (Corretto) |
| Maven | 3.9 |
| Node.js | — |
| Vitest | 3.2.4 |
| Playwright | 1.52.0 (Chromium 148) |
| OS | Windows 11 |
| Docker | not available in this environment |

---

## Backend Unit Tests — JUnit 5

**Command:** `mvn test -f containers/backend/pom.xml`  
**Report:** `containers/backend/target/surefire-reports/`

| Class | Tests | Result |
|-------|-------|--------|
| `QuestionRepositoryTest` | 3 | ✅ PASS |
| `QuestionServiceTest` | 4 | ✅ PASS |
| `QuizControllerTest` | 3 | ✅ PASS |
| **Total** | **10** | **✅ PASS** |

Checkstyle: **0 violations**.

---

## Frontend Unit Tests — Vitest

**Command:** `npm test --prefix containers/frontend`

| File | Tests | Result |
|------|-------|--------|
| `AnswerButton.test.jsx` | 4 | ✅ PASS |
| `QuestionCard.test.jsx` | 4 | ✅ PASS |
| `Feedback.test.jsx` | 4 | ✅ PASS |
| `ScoreSummary.test.jsx` | 3 | ✅ PASS |
| **Total** | **15** | **✅ PASS** |

---

## Backend Integration Tests — REST-assured

**Command:** `mvn test -Dtest=QuizApiIntegrationTest -f containers/backend/pom.xml`

| Test ID | Scenario | Result |
|---------|----------|--------|
| IT-01 | GET /api/questions → 200, JSON array, no correctOption | ✅ PASS |
| IT-02 | POST /api/answers correct option → correct: true | ✅ PASS |
| IT-03 | POST /api/answers wrong option → correct: false | ✅ PASS |
| IT-04 | POST /api/answers unknown ID → 404 | ✅ PASS |
| **Total** | | **✅ PASS** |

---

## Nginx Proxy Test (IT-05) — Manual

**Precondition:** docker-compose stack running  
**Status:** ⏳ PENDING — Docker not available in current environment

```
Result: [ ] PASS  [ ] FAIL  [ ] N/A
Tester: _______________  Date: _______________
Notes: _______________________________________________
```

---

## End-to-End Tests — Playwright

**Command:** `docker compose up -d && npm test --prefix technical_processes/09-verification/generated/e2e`  
**Report:** `technical_processes/09-verification/generated/e2e/playwright-report/index.html`  
**Status:** ⏳ PENDING — Docker not available in current environment

| Test ID | Scenario | SR | Result |
|---------|----------|----|--------|
| TC-01.1 | Question displayed with text and options | SR-01 | ⏳ |
| TC-01.2 | Answer selection disables all buttons | SR-02 | ⏳ |
| TC-02.1 | Correct answer shows "Correct!" | SR-03 | ⏳ |
| TC-02.1b | Wrong answer shows "Wrong" | SR-03 | ⏳ |
| TC-02.2 | Wrong answer reveals correct option | SR-04 | ⏳ |
| TC-03.1 | Next button advances to next question | SR-05 | ⏳ |
| TC-03.2 | Score summary after last question | SR-06 | ⏳ |
| TC-SR-08 | App accessible without installation | SR-08 | ⏳ |
| TC-SR-09 | Response time measurement | SR-09 | ⏳ |
| TC-SR-10 | No authentication required | SR-10 | ⏳ |
| TC-SR-11 | Questions file fields honoured | SR-11 | ⏳ |

---

## Manual Test Cases

| Test ID | Scenario | SR | Result |
|---------|----------|----|--------|
| TC-05.1 | New question after adding to questions.yml | SR-07 | ⏳ |
| TC-05.2 | Edited question shows updated text | SR-07 | ⏳ |
| TC-05.3 | Removed question no longer appears | SR-07 | ⏳ |

```
Tester: _______________  Date: _______________
Notes: _______________________________________________
```

---

## Requirements Coverage

| SR | Requirement | Test Cases | Status |
|----|-------------|------------|--------|
| SR-01 | Display question with ≥2 options | TC-01.1 | ⏳ E2E pending |
| SR-02 | Register answer selection | TC-01.2 | ⏳ E2E pending |
| SR-03 | Show correct/wrong feedback | TC-02.1, TC-02.1b | ⏳ E2E pending |
| SR-04 | Highlight correct answer on wrong submission | TC-02.2 | ⏳ E2E pending |
| SR-05 | Advance to next question | TC-03.1 | ⏳ E2E pending |
| SR-06 | Display score summary | TC-03.2 | ⏳ E2E pending |
| SR-07 | Load questions from static file | TC-05.1..3, IT-01 | ✅ IT-01 PASS / manual pending |
| SR-08 | Accessible via browser | TC-SR-08, IT-01 | ✅ IT-01 PASS / E2E pending |
| SR-09 | Respond within 200ms | TC-SR-09 | ⏳ E2E pending |
| SR-10 | No authentication | TC-SR-10 | ⏳ E2E pending |
| SR-11 | Questions file required fields | TC-SR-11, IT-01 | ✅ IT-01 PASS / E2E pending |

Coverage: **11/11 SR addressed** — E2E and manual campaigns required to close.

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Test Lead | | | |
| Development Lead | | | |
