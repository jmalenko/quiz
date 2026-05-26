# Governance — Integration

## Purpose

Combine separately implemented containers (from process 07 Implementation) into a working system.

## Integration Tests

Integration tests are **created** in this process, when integration scenarios (API contracts, network routing, container wiring) are defined.

They are **executed** during this process (smoke and connectivity checks) as part of the integration quality gate, and re-executed formally in process 09 Verification as evidence.

## Docker Compose

The `docker-compose.yml` file is **created in this process** — it is the first process that requires all containers to run together. Process 10 Transition references it for production deployment without duplication.

## High Level Format

Human provides:
- Integration approach (how containers connect)

## Detailed Format

AI expands into:
- Specific integration mechanisms (API contracts, network routing, orchestration)
- References to upstream artifacts that enable integration

## Generated Artifacts

The generated layer produces the integration test code.
