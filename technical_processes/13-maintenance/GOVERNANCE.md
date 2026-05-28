# Governance — Maintenance

## Methodology

This process follows three complementary standards:

### ISO/IEC/IEEE 12207:2017 — Maintenance process (clause 6.4.13)

Defines Maintenance as the process that modifies the system after delivery. Every maintenance action backtraces to the earliest affected process and re-propagates forward through all downstream processes, following the Correction Flow and Propagation Rule in the root [GOVERNANCE.md](../../GOVERNANCE.md).

> **Relationship to Operation (process 12):** Maintenance is triggered when an operational incident cannot be resolved by procedure. After a maintenance release, the system re-enters Operation.

### ISO/IEC 14764:2006 — Software Maintenance

The dedicated software maintenance standard. Defines four maintenance types: Corrective, Adaptive, Perfective, and Preventive.

### ITIL 4 — Change Enablement practice

Provides change classification: Standard (pre-approved, low-risk), Normal (requires analysis), and Emergency (urgent, documented retrospectively).

---

A **Modification Request** is fulfilled by a **Change Request** — see root [GOVERNANCE.md § 4](../../GOVERNANCE.md).

This process has no High Level, Detailed, or Artifacts layer of its own. The change is expressed entirely by updating the relevant content in the affected processes.
