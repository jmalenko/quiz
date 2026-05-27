# Transition — High Level

## Target Environment

Single-host deployment on a developer or on-premise machine running Docker Engine / Docker Desktop.

The system is composed of two containers orchestrated by Docker Compose:
- A frontend container (nginx serving the React single-page application)
- A backend container (Spring Boot REST API)

No external services, databases, or cloud infrastructure are required.

## CI/CD Pipeline and Image Registry

| Concern | Choice | Rationale |
|---------|--------|-----------|
| CI/CD pipeline | GitHub Actions | Co-located with the repository; no separate infrastructure required |
| Image registry | GitHub Container Registry (GHCR) | Integrated with GitHub Actions; same authentication; free for public repositories |
| Image naming | `ghcr.io/<owner>/quiz-backend` / `ghcr.io/<owner>/quiz-frontend` | GHCR naming convention |
| Trigger | Push to `main` branch | Every merge to main produces a candidate release |

## Deployment Approach

Docker Compose using the file created in process 09 Verification:
`technical_processes/09-verification/generated/docker-compose.yml`

The same images built and verified in process 09 are used for deployment — no rebuild occurs during transition.

## Operational Constraints

| Constraint | Value |
|------------|-------|
| Frontend port | 8888 (host) → 80 (container) |
| Backend port | internal only (not exposed to host) |
| Restart policy | `unless-stopped` |
| Questions file | volume-mounted; editable without image rebuild |

## Smoke Test Checks

| Check | Pass criterion |
|-------|----------------|
| Frontend reachable | HTTP 200 on `http://localhost:8888` |
| Backend reachable via nginx proxy | HTTP 200 on `http://localhost:8888/api/questions` |
| At least one question returned | Response body is a non-empty JSON array |

## Quality Gate

Per [GOVERNANCE.md](GOVERNANCE.md):
1. System deployed and running
2. All three smoke tests pass
3. Transition Report produced and approved
