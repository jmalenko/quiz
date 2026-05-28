# Operation — Detailed

> *AI-generated — implied from [../OPERATION.md](../OPERATION.md) and [../GOVERNANCE.md](../GOVERNANCE.md)*

---

## Reference

| Item | Value |
|------|-------|
| Compose file | `technical_processes/09-verification/generated/docker-compose.yml` |
| Application URL | `http://localhost:8888` |
| Backend container | `generated-backend-1` |
| Frontend container | `generated-frontend-1` |

Commands below use `docker compose` (Linux / WSL). On Windows run them inside WSL or prefix with `wsl`.

---

## Normal Operation Procedures

### Start the system

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d
```

Expected: both containers start; backend becomes `(healthy)` within ~30 s.

### Stop the system

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml down
```

### Check status

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml ps
```

Expected output:

```
NAME                   STATUS
generated-backend-1    Up (healthy)
generated-frontend-1   Up
```

### Restart a single container

```bash
# Backend only
docker restart generated-backend-1

# Frontend only
docker restart generated-frontend-1
```

---

## Health Check Procedure

Run the smoke test script to verify the system is responding correctly:

```bash
bash technical_processes/10-transition/generated/smoke-test.sh
```

Expected: all three checks pass (exit code 0).

Alternatively, check each endpoint manually:

```bash
# Frontend
curl -o /dev/null -s -w "%{http_code}" http://localhost:8888
# Expected: 200

# Backend via proxy
curl -s http://localhost:8888/api/questions
# Expected: JSON array with at least one question
```

---

## Incident Response Procedures

### INC-01 — Application unreachable (http://localhost:8888 returns no response)

1. Check containers are running:
   ```bash
   docker compose -f technical_processes/09-verification/generated/docker-compose.yml ps
   ```
2. If containers are stopped, start them:
   ```bash
   docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d
   ```
3. If containers are running but the port is not accessible, check port binding:
   ```bash
   docker port generated-frontend-1
   # Expected: 80/tcp -> 0.0.0.0:8888
   ```
4. Re-run smoke tests to confirm recovery.

---

### INC-02 — Backend unhealthy (frontend loads but API calls fail)

1. Check backend health:
   ```bash
   docker inspect generated-backend-1 --format '{{.State.Health.Status}}'
   # Expected: healthy
   ```
2. View backend logs for errors:
   ```bash
   docker logs generated-backend-1 --tail 50
   ```
3. Restart the backend:
   ```bash
   docker restart generated-backend-1
   ```
4. Wait ~30 s, then re-check health.
5. If still unhealthy after restart → **escalate to process 13 Maintenance** (code or configuration change required).

---

### INC-03 — No questions displayed (frontend loads, quiz is empty)

1. Verify the questions file is accessible and non-empty:
   ```bash
   cat containers/backend/src/main/resources/questions.yml
   ```
2. If the file is empty or missing, restore it from version control:
   ```bash
   git checkout containers/backend/src/main/resources/questions.yml
   ```
3. Restart the backend to reload the file:
   ```bash
   docker restart generated-backend-1
   ```
4. Re-run smoke test check 3 (questions returned).

---

### INC-04 — Container does not restart after host reboot

1. Confirm Docker daemon is running:
   ```bash
   docker info
   ```
2. Start containers manually:
   ```bash
   docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d
   ```
3. If containers still fail to start, review logs:
   ```bash
   docker compose -f technical_processes/09-verification/generated/docker-compose.yml logs
   ```

---

## Log Access

### Application logs

```bash
# Backend (Spring Boot)
docker logs generated-backend-1

# Frontend (nginx access + error)
docker logs generated-frontend-1

# Follow logs in real time
docker logs -f generated-backend-1
```

### Key log patterns

| Pattern | Meaning |
|---------|---------|
| `Started QuizApplication` | Backend started successfully |
| `Loaded N questions` | Questions file read on startup |
| `ERROR` in backend log | Application error — review stack trace |
| `connect() failed` in nginx log | Backend not reachable from frontend container |

---

## Escalation Path

Escalate to **process 13 Maintenance** when:

- An incident cannot be resolved by the procedures above
- The root cause requires a code change, dependency update, or configuration change to the image
- A recurring incident has been identified (Problem Management — root cause elimination)

When escalating, record:
- Incident description and timeline
- Steps already taken
- Relevant log excerpts
- Impact on users

---

## Operations Log

Record all significant operational events:

| Date | Event | Action taken | Outcome | Escalated? |
|------|-------|-------------|---------|-----------|
| | | | | |
