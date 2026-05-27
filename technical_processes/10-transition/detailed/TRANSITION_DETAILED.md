# Transition — Detailed

> *AI-generated — implied from [../TRANSITION.md](../TRANSITION.md) and [../GOVERNANCE.md](../GOVERNANCE.md)*

---

## Release Artefact Specification

| Artefact | Name | Tag | Source |
|----------|------|-----|--------|
| Backend Docker image | `generated-backend` | `1.0.0` | Built from `containers/backend/` |
| Frontend Docker image | `generated-frontend` | `1.0.0` | Built from `containers/frontend/` |
| Orchestration file | `docker-compose.yml` | — | `technical_processes/09-verification/generated/docker-compose.yml` |
| Questions data | `questions.yml` | — | `containers/backend/src/main/resources/questions.yml` |

> Images are built by Docker Compose from local Dockerfiles. No external registry is required for single-host deployment.

---

## Deployment Runbook

### Prerequisites

| Requirement | Check |
|-------------|-------|
| Docker Engine / Docker Desktop ≥ 24 | `docker --version` |
| Docker Compose plugin ≥ 2.20 | `docker compose version` |
| Port 8888 free on the host | `netstat -ano \| findstr :8888` (Windows) |
| Repository cloned to host | `git status` returns clean or known state |

### Step 1 — Tag images for release

```bash
# Build and tag both images
docker compose -f technical_processes/09-verification/generated/docker-compose.yml build

# Tag as release version
docker tag generated-backend:latest generated-backend:1.0.0
docker tag generated-frontend:latest generated-frontend:1.0.0
```

### Step 2 — Add restart policy to docker-compose.yml

The verification docker-compose.yml does not include a restart policy. For production deployment, add `restart: unless-stopped` to both services before deploying.

The file `technical_processes/09-verification/generated/docker-compose.yml` should have:

```yaml
  backend:
    ...
    restart: unless-stopped

  frontend:
    ...
    restart: unless-stopped
```

### Step 3 — Deploy

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d
```

### Step 4 — Confirm containers are healthy

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml ps
```

Expected: both `generated-backend-1` and `generated-frontend-1` show status `Up` and backend shows `(healthy)`.

---

## Smoke Test Procedure

Run after deployment. All three checks must pass before the quality gate is closed.

```bash
# Check 1 — Frontend reachable
curl -o /dev/null -s -w "%{http_code}" http://localhost:8888
# Expected: 200

# Check 2 — Backend reachable via nginx proxy
curl -o /dev/null -s -w "%{http_code}" http://localhost:8888/api/questions
# Expected: 200

# Check 3 — At least one question returned
curl -s http://localhost:8888/api/questions | python -c "import sys,json; d=json.load(sys.stdin); assert len(d)>0, 'empty'; print(f'{len(d)} question(s) returned')"
# Expected: "3 question(s) returned"
```

---

## Rollback Procedure

### Before starting a deployment — record the current tag

If a previous deployment exists, record its image tags before deploying the new version:

```bash
# Record the currently running image tags
docker inspect generated-backend-1  --format '{{.Config.Image}}'
docker inspect generated-frontend-1 --format '{{.Config.Image}}'
```

Store these values as `PREVIOUS_BACKEND_TAG` and `PREVIOUS_FRONTEND_TAG`.

> **First deployment:** No previous tag exists. If smoke tests fail on first deployment, stop the containers and investigate — there is nothing to roll back to.

### If smoke tests fail after deployment

```bash
# 1. Stop and remove containers
docker compose -f technical_processes/09-verification/generated/docker-compose.yml down

# 2a. If a previous tag was recorded — revert and redeploy
docker tag ghcr.io/<owner>/quiz-backend:$PREVIOUS_BACKEND_TAG   ghcr.io/<owner>/quiz-backend:latest
docker tag ghcr.io/<owner>/quiz-frontend:$PREVIOUS_FRONTEND_TAG ghcr.io/<owner>/quiz-frontend:latest
docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d

# 2b. If this was the first deployment — investigate only; no rollback available
#     Review logs: docker logs generated-backend-1

# 3. Re-run smoke tests after rollback
```

---

## Transition Report

The Transition Report is **auto-generated** by the CI/CD pipeline — no manual template needs to be filled in.

After every successful deployment the `Generate Transition Report` step in the `deploy` job writes a filled-in report to the GitHub Actions Step Summary (`$GITHUB_STEP_SUMMARY`). It is immediately visible on the pipeline run page under the **Summary** tab.

The report contains:
- Release version, deployment timestamp, actor, and commit link
- Image tags for backend and frontend
- Smoke test results (ST-01 / ST-02 / ST-03)
- Quality gate declaration

**Approval rule:** The pipeline completing successfully *is* the approval. No human sign-off is required.

> To view a past Transition Report: go to the GitHub Actions run → select the `Deploy` job → click **Summary**.
