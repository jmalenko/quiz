# Governance — Transition

## Methodology

This process follows two complementary standards:

### IEEE/IEC/ISO 12207:2017 — Transition process (clause 6.4.10)

The ISO/IEC/IEEE 12207:2017 lifecycle standard defines Transition as the process that installs, commissions, and hands over the system to the operational environment. It mandates:

- A **Transition Strategy** agreed between the development team and the operator
- Confirmed passage of the Verification quality gate (process 09) before transition begins
- A **Deployment Package** — everything needed to install and run the system in the target environment
- Execution of **deployment smoke tests** in the target environment after deployment
- A **Transition Report** confirming the system is operational

### ITIL 4 — Release Management and Deployment Management practices

ITIL 4 provides the operational discipline for how software is packaged and moved to production:

- **Release Management** — ensures a release is built, tested, and documented before deployment; aligns with the concept of a versioned, immutable artefact (Docker image tag)
- **Deployment Management** — governs the actual movement of the release into the target environment; distinguishes deployment (putting the artefact in place) from release (making it available to users)

> **Relationship to Validation (process 11):** Transition ends when the system is deployed and smoke-tested. Validation (process 11) subsequently confirms the deployed system satisfies stakeholder needs in the live environment.

---

## Entry Criteria

Transition may only begin after:
1. Process 09 Verification quality gate is passed (Verification Report signed off)
2. All Docker images are built and tagged with a release version

---

## High Level Format

Human provides:
- Target environment description (where the system will run)
- Deployment approach (docker compose, Kubernetes, bare metal, etc.)
- CI/CD pipeline tooling choice (e.g., GitHub Actions, GitLab CI, Jenkins)
- Image registry choice (e.g., GHCR, Docker Hub, Nexus, Artifactory)
- Any operational constraints (port allocations, secrets management, restart policy)

---

## Detailed Format

AI expands into a **Transition Plan** covering:

- CI/CD pipeline definition (tool, trigger, stages)
- Image registry configuration (registry, image naming convention, authentication)
- Release artefact specification (image names, tags, checksums)
- Step-by-step deployment runbook (mirrors the pipeline for manual use)
- Smoke test procedure to confirm the system is operational after deployment
- Rollback procedure — including explicit handling of first deployment (no previous tag available)

---

## Artifacts Format

AI generates from the Transition Plan:

- A **CI/CD Pipeline** — automates the full transition workflow: build → test → tag → push to image registry → deploy → smoke test; triggered on every merge to the main branch
- An **Image Registry** — all release images are pushed to a versioned image registry before deployment; the deployment always pulls from the registry, never builds locally on the target host
- A **Deployment Runbook** — human-readable step-by-step instructions that mirror the pipeline, used for manual deployments and incident recovery
- A **Smoke Test Script** — lightweight automated check that the deployed system responds correctly (not a full re-run of verification); executed by the pipeline and referenced in the runbook
- A **Transition Report** — confirms the system was deployed, smoke tests passed, and the system is handed over to operations

---

## Quality Gate

The quality gate is passed **automatically** when all pipeline stages succeed. No human approval is required.

Specifically, the gate closes when:
1. The system is deployed in the target environment
2. All smoke tests pass
3. The Transition Report is auto-generated as a GitHub Actions Step Summary

> **Approval rule:** A passing pipeline run is the approval. If all tests and smoke checks succeed, the transition is considered approved without further human sign-off.
