# Integration — Detailed

> *AI-generated — implied from [../INTEGRATION.md](../INTEGRATION.md)*

## Integration outputs

This process has minimal High Level and none Generated artifacts. Integration is fully determined by upstream processes:
- process 04 Architecture Definition (container interactions)
- process 05 Design Definition (API contract)
- process 07 Implementation (nginx proxy configuration)

The Detailed layer documents the specific integration mechanisms by referencing these upstream artifacts.


## Integration Mechanisms

- **API contract**: Defined by the OpenAPI spec (process 05 Design Definition). Backend implements it, frontend consumes it.
- **Network routing**: Frontend nginx proxies `/api/*` requests to the backend container (configured in process 07 Implementation, frontend container).
- **Orchestration**: docker-compose connects containers on a shared Docker network (defined in process 10 Transition).
