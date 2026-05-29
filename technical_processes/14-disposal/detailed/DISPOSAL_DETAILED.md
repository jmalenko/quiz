# Disposal Procedure

> *AI-generated — implied from [../GOVERNANCE.md](../GOVERNANCE.md)*

---

## User Notification

> ⚠️ This step is a standard part of the disposal process but is **not performed by the decommissioning automation**. It must be completed by the operator before proceeding.

Inform all users and stakeholders that the system will be permanently taken offline. Allow a reasonable notice period before proceeding.

---

## Prerequisites

- Users have been notified (see above)
- The decision to dispose of the system has been made and communicated
- Process 12 Operation is no longer active (system is either already stopped or will be stopped as part of this procedure)

---

## Steps

### 1. Stop and remove containers and images

```bash
docker compose -f technical_processes/09-verification/generated/docker-compose.yml down --rmi all --volumes
```

This stops all containers, removes them, removes their images, and removes any named volumes.

### 2. Verify no residual Docker data remains

```bash
docker volume ls
docker image ls | grep quiz
```

Remove any remaining quiz-related images or volumes if found. Note: the questions file (`containers/backend/src/main/resources/questions.yml`) is part of the repository and is preserved by archiving — it is not considered operational data to be deleted.

### 3. Archive the repository

Leave the repository on the version control host (GitHub) as a permanent historical record. Optionally, mark it as archived:

- On GitHub: Settings → Archive this repository

### 4. Confirm disposal

Verify the system is no longer reachable:

```bash
curl -o /dev/null -s -w "%{http_code}" http://localhost:8888
# Expected: 000 (connection refused)
```

Disposal is complete when the system is unreachable and all containers and images have been removed.

---

## Generating the Disposal Report

After executing all steps, generate the Disposal Report (`generated/DISPOSAL_REPORT.md`) by running the following commands and capturing their output into the report:

**Step 1 evidence:**
```bash
wsl docker compose -f technical_processes/09-verification/generated/docker-compose.yml down --rmi all --volumes
```

**Step 2 evidence:**
```bash
wsl docker volume ls
wsl docker image ls | grep quiz
```

**Step 4 evidence:**
```bash
curl -o /dev/null -s -w "%{http_code}" http://localhost:8888
```

Paste each command's output into the corresponding Evidence section of the Disposal Report.
