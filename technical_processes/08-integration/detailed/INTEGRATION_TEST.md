# Integration Tests — Execution Guide

> *Companion to [INTEGRATION_DETAILED.md](INTEGRATION_DETAILED.md)*

Integration tests are defined and first executed in process 08 Integration. They are re-executed formally in process 09 Verification as evidence against system requirements.

---

## Prerequisites

| Tool | Minimum version | Purpose |
|------|----------------|---------|
| Java (JDK) | 17 | Compile and run integration tests |
| Maven | 3.9 | Build and test runner |
| Docker | 24+ | Required for IT-05 (nginx proxy test) only |

> IT-01 to IT-04 do **not** require Docker — the backend is started in-process by `@SpringBootTest`.  
> IT-05 requires the full docker-compose stack.

---

## Backend API Integration Tests (IT-01 – IT-04)

**Framework:** Spring Boot Test + REST-assured  
**Location:** `containers/backend/src/test/java/com/quiz/integration/QuizApiIntegrationTest.java`

| Test | Scenario |
|------|----------|
| IT-01 | `GET /api/questions` returns HTTP 200; JSON array with `id`, `text`, `options`; no `correctOption` |
| IT-02 | `POST /api/answers` with correct option → HTTP 200, `correct: true` |
| IT-03 | `POST /api/answers` with wrong option → HTTP 200, `correct: false` |
| IT-04 | `POST /api/answers` with unknown `questionId` → HTTP 404 |

These tests share the Maven command with unit tests. Integration tests in the same build are distinguished by package (`com.quiz.integration`).

### Run (all backend tests including integration)

```bash
mvn test -f containers/backend/pom.xml
```

### Run integration tests only

```bash
mvn test -Dtest=QuizApiIntegrationTest -f containers/backend/pom.xml
```

### Expected output

```
[INFO] Running com.quiz.integration.QuizApiIntegrationTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

---

## Nginx Proxy Integration Test (IT-05)

**Scope:** Verifies that the frontend nginx container correctly proxies `/api/*` requests to the backend container.

**Precondition:** docker-compose stack is running.

```bash
# Start the stack
docker compose up -d

# Manually verify (curl):
curl -s http://localhost/api/questions | python -m json.tool

# Expected: same JSON array as IT-01, served via nginx on port 80
# HTTP status must be 200

# Tear down
docker compose down
```

This test is currently executed manually. Automated execution via Playwright is covered in process 09 Verification (TC-SR-08).

---

## Combined run (unit + integration, no Docker)

```bash
mvn test -f containers/backend/pom.xml
```

**Total backend tests: 14 (10 unit + 4 integration)**

---

## Quality gate

All integration tests must pass before the system is eligible for process 09 Verification.  
See the quality gate definition in [../GOVERNANCE.md](../GOVERNANCE.md).
