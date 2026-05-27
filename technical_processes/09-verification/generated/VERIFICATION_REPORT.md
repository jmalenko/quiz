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
| Nginx proxy (IT-05) | 1 | 1 | 0 | ✅ PASS |
| End-to-end (Playwright) | 14 | 14 | 0 | ✅ PASS |

**Overall verdict: ✅ PASS — all automated tests pass.**

---

## Environment

| Item | Value |
|------|-------|
| Date | 2026-05-27 |
| Java | OpenJDK 21 (Eclipse Temurin, inside Docker) |
| Maven | 3.9 |
| Node.js | 20 |
| Vitest | 3.2.4 |
| Playwright | 1.52.0 (Chromium 148) |
| OS | Windows 11 + WSL2 Docker |
| Docker | Docker Desktop 28.1.1 (WSL2 backend) |
| Frontend URL | http://localhost:8888 |

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

## Nginx Proxy Test (IT-05)

**Command:** `curl -s http://localhost:8888/api/questions`  
**Date:** 2026-05-27  
**Result:** ✅ PASS — HTTP 200, JSON array of 3 questions returned via nginx reverse proxy

```
curl -s http://localhost:8888/api/questions
→ [{"id":1,"text":"What is the capital of France?",...},{"id":2,...},{"id":3,...}]
```

---

## End-to-End Tests — Playwright

**Command:** `docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d && npm test --prefix technical_processes/09-verification/generated/e2e`  
**Date:** 2026-05-27  
**Duration:** 43.7s  
**Report:** `technical_processes/09-verification/generated/e2e/playwright-report/index.html`

| Test ID | Scenario | SR | Result | Duration |
|---------|----------|----|--------|----------|
| TC-01.1 | Question displayed with text and options | SR-01 | ✅ PASS | 2.5s |
| TC-01.2 | Answer selection disables all buttons | SR-02 | ✅ PASS | 1.0s |
| TC-02.1 | Correct answer shows "Correct!" | SR-03 | ✅ PASS | 1.1s |
| TC-02.1b | Wrong answer shows "Wrong" | SR-03 | ✅ PASS | 1.1s |
| TC-02.2 | Wrong answer reveals correct option | SR-04 | ✅ PASS | 940ms |
| TC-03.1 | Next button advances to next question | SR-05 | ✅ PASS | 1.1s |
| TC-03.2 | Score summary after last question | SR-06 | ✅ PASS | 1.4s |
| TC-05.1 | New question appears after adding to questions file | SR-07 | ✅ PASS | 10.0s |
| TC-05.2 | Edited question shows updated text | SR-07 | ✅ PASS | 10.1s |
| TC-05.3 | Removed question no longer appears | SR-07 | ✅ PASS | 8.5s |
| TC-SR-08 | App accessible without installation | SR-08 | ✅ PASS | 933ms |
| TC-SR-09 | Response time under 200ms (actual: 49ms load / 18ms DOMContentLoaded) | SR-09 | ✅ PASS | 959ms |
| TC-SR-10 | No authentication required | SR-10 | ✅ PASS | 1.1s |
| TC-SR-11 | Questions file fields honoured | SR-11 | ✅ PASS | 1.1s |
| **Total** | | | **✅ 14/14 PASS** | **43.7s** |

> **Note on TC-05.x:** These tests exercise the questions file live-reload path. `questions.yml` is volume-mounted into the backend container; each test modifies the file on the host and restarts `generated-backend-1` to verify the new content is loaded.

---

## Requirements Coverage

| SR | Requirement | Test Cases | Status |
|----|-------------|------------|--------|
| SR-01 | Display question with ≥2 options | TC-01.1 | ✅ PASS |
| SR-02 | Register answer selection | TC-01.2 | ✅ PASS |
| SR-03 | Show correct/wrong feedback | TC-02.1, TC-02.1b | ✅ PASS |
| SR-04 | Highlight correct answer on wrong submission | TC-02.2 | ✅ PASS |
| SR-05 | Advance to next question | TC-03.1 | ✅ PASS |
| SR-06 | Display score summary | TC-03.2 | ✅ PASS |
| SR-07 | Load questions from static file | TC-05.1, TC-05.2, TC-05.3, IT-01 | ✅ PASS |
| SR-08 | Accessible via browser | TC-SR-08, IT-01 | ✅ PASS |
| SR-09 | Respond within 200ms | TC-SR-09 | ✅ PASS (49ms actual) |
| SR-10 | No authentication | TC-SR-10 | ✅ PASS |
| SR-11 | Questions file required fields | TC-SR-11, IT-01 | ✅ PASS |

Coverage: **11/11 SR addressed — 11/11 fully verified by automated tests.**

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Test Lead | | | |
| Development Lead | | | |
