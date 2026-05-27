# Transition Report — Quiz Application

> *Template — fill in after each successful deployment*

---

## Release Identification

| Field | Value |
|-------|-------|
| Release version | `1.0.0-<git-short-sha>` |
| Deployment date | |
| Deployed by | |
| Target host | |
| Repository commit | |

---

## Artefacts Deployed

| Artefact | Image / Tag | Digest |
|----------|-------------|--------|
| Backend image | `ghcr.io/<owner>/quiz-backend:<version>` | `docker inspect --format '{{.Id}}' ghcr.io/<owner>/quiz-backend:<version>` |
| Frontend image | `ghcr.io/<owner>/quiz-frontend:<version>` | `docker inspect --format '{{.Id}}' ghcr.io/<owner>/quiz-frontend:<version>` |
| Orchestration file | `technical_processes/09-verification/generated/docker-compose.yml` | — |

---

## Deployment Summary

| Step | Result | Notes |
|------|--------|-------|
| Previous image tags recorded | ☐ PASS / ☐ N/A (first deployment) | |
| Images pulled from GHCR | ☐ PASS | |
| `docker compose up -d` completed | ☐ PASS | |
| Both containers show status `Up` | ☐ PASS | |
| Backend container shows `(healthy)` | ☐ PASS | |

---

## Smoke Test Results

> Run by `technical_processes/10-transition/generated/smoke-test.sh` against `http://localhost:8888`

| Check | Expected | Result |
|-------|----------|--------|
| ST-01 — Frontend reachable | HTTP 200 | ☐ PASS / ☐ FAIL |
| ST-02 — Backend reachable via nginx proxy | HTTP 200 on `/api/questions` | ☐ PASS / ☐ FAIL |
| ST-03 — At least one question returned | Non-empty JSON array | ☐ PASS / ☐ FAIL |

**Overall smoke test verdict:** ☐ ALL PASS / ☐ FAILED (see notes)

Notes:

---

## Rollback (if applicable)

| Field | Value |
|-------|-------|
| Rollback required | ☐ Yes / ☐ No |
| Previous backend tag restored | |
| Previous frontend tag restored | |
| Reason | |

---

## Quality Gate Declaration

Per [GOVERNANCE.md](../GOVERNANCE.md), the Transition quality gate is passed when:

| Criterion | Status |
|-----------|--------|
| System is deployed in the target environment | ☐ |
| All three smoke tests pass | ☐ |
| This Transition Report is produced and approved | ☐ |

**Overall verdict:** ☐ PASSED / ☐ FAILED

---

## Approval

| Role | Name | Signature / Date |
|------|------|-----------------|
| Deployer | | |
| Approver (Human) | | |
