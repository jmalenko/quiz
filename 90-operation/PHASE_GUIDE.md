# Phase 90 — Operation

> **IEEE/IEC 12207 Process**: 6.4.11 Operation Process

## Purpose
Operate the system in its intended environment, monitor performance, and provide support to users.

## IEEE 12207 Alignment
- **Process**: Operation Process
- **Objective**: Use system to deliver its services
- **Key activities**:
  - Operate system per runbook
  - Monitor system performance and health
  - Manage incidents and problems
  - Provide user support
  - Collect operational feedback

## Inputs
- `../80-transition/RUNBOOK.md` — Operational procedures
- System in production
- Monitoring dashboards active

## Outputs (AI Generates)
- `OPERATIONS_GUIDE.md` — Day-to-day operations procedures
- `INCIDENT_RESPONSE.md` — Incident classification and response procedures
- `SLA_MONITORING.md` — SLA definitions and monitoring approach
- `FEEDBACK_LOG.md` — Template for collecting user/operational feedback
- `monitoring/dashboards/` — Dashboard configurations
- `monitoring/alerts/` — Alert rule configurations

## AI Generation Rules

1. **Operations guide**: startup, shutdown, scaling, backup, restore
2. **Incident response**: severity levels, escalation paths, communication templates
3. **SLA monitoring**: define SLIs, SLOs, error budgets
4. **Feedback collection**: structured template for operational issues and user requests
5. **Automation**: scripts for common operational tasks

## Quality Gate: QG10 (Operation → Maintenance, ongoing)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | System operating within SLA | ☐ |
| 2 | Monitoring covers all critical paths | ☐ |
| 3 | Incident response tested | ☐ |
| 4 | Backup/restore verified | ☐ |
| 5 | Operational feedback collected | ☐ |
| 6 | **Human Decision**: Operational readiness confirmed | ☐ |

## Note
This phase is **ongoing** — it does not "complete" like development phases. It feeds into Maintenance (Phase 95) when changes are needed.
