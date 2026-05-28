# Governance — Operation

## Methodology

This process follows two complementary standards:

### IEEE/IEC/ISO 12207:2017 — Operation process (clause 6.4.12)

The ISO/IEC/IEEE 12207:2017 lifecycle standard defines Operation as the process that runs the system in its operational environment and maintains it within agreed service levels. It mandates:

- **Operational procedures** for normal use, startup, shutdown, and recovery
- **Operational monitoring** — detecting deviations from expected behaviour before users are impacted
- **Incident response** — restoring service when failures occur
- **Operational records** — evidence that the system is performing within its defined SLA

> **Relationship to Transition (process 10):** Operation begins after Transition hands over the deployed system. The operational baseline is the system as delivered by process 10.

> **Relationship to Maintenance (process 13):** When an operational issue cannot be resolved by a procedure (e.g. requires a code change or configuration update), it is escalated to process 13 Maintenance.

### ITIL 4 — Service Management practices

ITIL 4 provides the operational discipline for day-to-day service management:

- **Monitoring and Event Management** — continuously checking the system's health and acting on events before they become incidents
- **Incident Management** — restoring normal service operation as quickly as possible when disruption occurs; minimising impact on users
- **Problem Management** — identifying and eliminating the root causes of recurring incidents to prevent recurrence

---

## Entry Criteria

Operation begins after:
1. Process 10 Transition quality gate is passed (system deployed and smoke tests passed)
2. Process 11 Validation quality gate is passed (system satisfies stakeholder needs)

---

## High Level Format

Human provides:
- Service Level Agreement (SLA): availability target, acceptable response time, support hours
- Monitoring approach: what is monitored and how alerts are raised
- Restart and recovery policy: automatic restart, manual intervention triggers
- Operational contacts: who is responsible for responding to incidents

---

## Detailed Format

AI expands into an **Operations Runbook** covering:

- Normal operation procedures (start, stop, status check)
- Health check procedure — verifying the system is operating correctly
- Incident response procedures — step-by-step actions for known failure scenarios
- Log access — how to retrieve and interpret operational logs
- Escalation path — when to escalate to process 13 Maintenance

---

## Artifacts Format

AI generates from the Operations Runbook:

- A **Health Check Script** — automated check that the running system responds correctly; can be scheduled or run on demand
- An **Incident Response Playbook** — structured decision tree for first responders
- An **Operations Log Template** — for recording operational events, incidents, and resolutions

---

## Quality Gate

The quality gate is met on an ongoing basis while the system is in operation. It is considered passed for a given period when:
1. The system availability meets the agreed SLA target
2. All incidents have been recorded and resolved (or escalated) within agreed timeframes
3. No unresolved critical incidents are open
