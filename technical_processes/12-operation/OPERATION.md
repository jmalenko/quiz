# Operation — High Level

## Service Level Agreement

| Attribute | Target |
|-----------|--------|
| Availability | Best-effort; no formal uptime SLA (reference/demo deployment) |
| Response time | Page load ≤ 2 s on local network |
| Support hours | On-demand by the operator |
| Planned downtime | Allowed without notice (single-operator environment) |

## Monitoring

The backend container exposes a Docker health check (`/api/questions`) configured in the Docker image. The host Docker daemon monitors it automatically.

No external monitoring infrastructure is required. The operator checks system status manually on demand using `docker compose ps`.

Alerts are raised by the operator observing the system (no automated alerting in this deployment).

## Restart and Recovery Policy

| Condition | Action |
|-----------|--------|
| Container crash | Automatic restart (`restart: unless-stopped` in compose file) |
| Host reboot | Containers restart automatically on Docker daemon startup |
| Backend unhealthy after restart | Operator investigates logs; escalates to process 13 Maintenance if a code or config change is needed |
| Port 8888 unreachable | Operator checks `docker compose ps` and restarts manually |

## Operational Contacts

| Role | Responsible party |
|------|------------------|
| Operator | Developer / repository owner |
| Escalation (Maintenance) | Same as operator |
