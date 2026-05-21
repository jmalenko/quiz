# Governance — Integration

## Purpose

Combine separately implemented containers (from process 07 Implementation) into a working system.

## Integration Approach

- **API contract**: Defined by the OpenAPI spec (process 05 Design Definition). Backend implements it, frontend consumes it.
- **Network routing**: Frontend nginx proxies `/api/*` requests to the backend container.
- **Orchestration**: docker-compose connects containers on a shared network. Defined in process 10 Transition.

## Layers

This process produces governance only (this file). No High Level, Detailed, or Generated artifacts — integration is handled by:
- nginx configuration (process 07 Implementation, frontend container)
- docker-compose (process 10 Transition)
- OpenAPI spec (process 05 Design Definition)
