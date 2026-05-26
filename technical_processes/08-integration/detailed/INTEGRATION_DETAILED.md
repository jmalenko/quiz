# Integration — Detailed

> *AI-generated — implied from [../INTEGRATION.md](../INTEGRATION.md) and [../GOVERNANCE.md](../GOVERNANCE.md)*

## Integration Mechanisms

Integration is fully determined by upstream processes:
- process 04 Architecture Definition (container interactions)
- process 05 Design Definition (API contract)
- process 07 Implementation (nginx proxy configuration)

| Mechanism | Detail |
|---|---|
| API contract | Defined by the OpenAPI spec (process 05). Backend implements it; frontend consumes it. |
| Network routing | Frontend nginx proxies `/api/*` requests to the backend container (nginx.conf, process 07 Implementation). |
| Orchestration | docker-compose connects containers on a shared Docker network. `docker-compose.yml` is defined in this process (process 08); process 10 Transition references it for production deployment. |

## Integration Test Specifications

**Framework:** Spring Boot Test + Testcontainers + REST-assured

Tests are executed against the real backend container (started via Testcontainers) and call the REST API through REST-assured.

### IT-01 — Questions endpoint returns data

- **Scenario:** Backend is running with questions loaded from `questions.yml`
- **Action:** `GET /api/questions`
- **Expected:** HTTP 200; response body is a JSON array with at least one question object; each object contains `id`, `text`, `options`; `correctOption` is absent

### IT-02 — Correct answer is accepted

- **Scenario:** Backend is running; question with known `id` and `correctOption` exists
- **Action:** `POST /api/answers` with `{ "questionId": <id>, "selectedOption": <correctOption> }`
- **Expected:** HTTP 200; `correct: true` in response body

### IT-03 — Wrong answer is rejected gracefully

- **Scenario:** Backend is running; question with known `id` exists
- **Action:** `POST /api/answers` with `{ "questionId": <id>, "selectedOption": <wrong index> }`
- **Expected:** HTTP 200; `correct: false` in response body

### IT-04 — Unknown question returns 404

- **Scenario:** Backend is running
- **Action:** `POST /api/answers` with `{ "questionId": 99999, "selectedOption": 0 }`
- **Expected:** HTTP 404

### IT-05 — Frontend nginx proxies API requests to backend

- **Scenario:** Both containers running via docker-compose
- **Action:** `GET http://frontend/api/questions` (request to frontend container on port 80)
- **Expected:** HTTP 200; same response body as IT-01 (nginx proxy is transparent)
