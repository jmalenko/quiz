# Incident Response Playbook — Quiz Application

> *AI-generated — Process 12 Operation*
> *Implied from [../detailed/OPERATION_DETAILED.md](../detailed/OPERATION_DETAILED.md)*

---

## How to use this playbook

1. Run the health check: `bash technical_processes/12-operation/generated/health-check.sh`
2. Identify the failing check
3. Follow the matching incident procedure below
4. Record the event in `operations-log.md`
5. If unresolved → escalate to process 13 Maintenance

---

## Decision Tree

```
Is the application reachable at http://localhost:8888?
│
├── NO → Go to INC-01 (Application unreachable)
│
└── YES
    │
    Is the quiz loading questions?
    │
    ├── NO → Go to INC-03 (No questions displayed)
    │
    └── YES
        │
        Is the backend health check healthy?
        │
        ├── NO → Go to INC-02 (Backend unhealthy)
        │
        └── YES → System is healthy ✅
```

---

## INC-01 — Application Unreachable

**Symptom:** `http://localhost:8888` does not respond or returns a connection error.

| Step | Action | Command |
|------|--------|---------|
| 1 | Check container status | `docker compose -f technical_processes/09-verification/generated/docker-compose.yml ps` |
| 2a | Containers stopped → start them | `docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d` |
| 2b | Containers running → check port binding | `docker port generated-frontend-1` |
| 3 | Confirm recovery | `bash technical_processes/12-operation/generated/health-check.sh` |
| 4 | If still failing | → INC-02 or escalate to process 13 |

---

## INC-02 — Backend Unhealthy

**Symptom:** Frontend loads but API calls fail; health check shows backend not healthy.

| Step | Action | Command |
|------|--------|---------|
| 1 | Check health status | `docker inspect generated-backend-1 --format '{{.State.Health.Status}}'` |
| 2 | View recent logs | `docker logs generated-backend-1 --tail 50` |
| 3 | Restart backend | `docker restart generated-backend-1` |
| 4 | Wait 30 s, re-check | `docker inspect generated-backend-1 --format '{{.State.Health.Status}}'` |
| 5 | Confirm recovery | `bash technical_processes/12-operation/generated/health-check.sh` |
| 6 | If still unhealthy | → **Escalate to process 13 Maintenance** |

---

## INC-03 — No Questions Displayed

**Symptom:** Frontend loads and API responds with HTTP 200, but the quiz shows no questions.

| Step | Action | Command |
|------|--------|---------|
| 1 | Check questions file | `cat containers/backend/src/main/resources/questions.yml` |
| 2a | File missing or empty → restore | `git checkout containers/backend/src/main/resources/questions.yml` |
| 2b | File corrupt → check format | Inspect YAML structure manually |
| 3 | Restart backend to reload | `docker restart generated-backend-1` |
| 4 | Confirm recovery | `curl -s http://localhost:8888/api/questions` |

---

## INC-04 — Containers Did Not Restart After Host Reboot

**Symptom:** System unavailable after the host machine restarted.

| Step | Action | Command |
|------|--------|---------|
| 1 | Confirm Docker is running | `docker info` |
| 2 | Start containers | `docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d` |
| 3 | If Docker not running | Start Docker Desktop / Docker daemon manually |
| 4 | Confirm recovery | `bash technical_processes/12-operation/generated/health-check.sh` |

---

## Escalation to Process 13 Maintenance

Escalate when an incident cannot be resolved by operational procedures. Provide:

- **Incident ID** (date + short description)
- **Symptom** observed
- **Steps already taken** and their outcomes
- **Relevant log excerpts** (`docker logs generated-backend-1 --tail 100`)
- **Impact** (users affected, duration)
