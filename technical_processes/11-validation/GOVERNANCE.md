# Governance — Validation

## Methodology

This process follows two complementary standards:

### IEEE/IEC/ISO 12207:2017 — Validation process (clause 6.4.11)

The ISO/IEC/IEEE 12207:2017 lifecycle standard defines Validation as the process that confirms **the deployed system satisfies stakeholder needs and its intended use** in the operational environment. It is distinct from Verification:

| Concern | Process | Question answered |
|---------|---------|-------------------|
| Verification (09) | Tests against *system requirements* (SR-nn) | "Are we building the system right?" |
| Validation (11) | Tests against *stakeholder needs* (from process 02) | "Are we building the right system?" |

12207 mandates:
- Validation is performed against the **deployed system** in (or representative of) the operational environment — not in a test environment
- Validation inputs are the **stakeholder needs** established in process 02, not the derived system requirements
- A **Validation Report** confirming that stakeholder needs are satisfied

### IEEE 1012:2016 — Standard for System, Software, and Hardware Verification and Validation

IEEE 1012 defines the Validation process within the V&V lifecycle and mandates:
- Traceability between stakeholder needs and validation evidence
- Independence of validation activities from implementation
- Validation executed against the **operational system** (as deployed by process 10)
- A Validation Report as the process exit artifact

> **Relationship to Verification (process 09):** Verification confirmed the system was built correctly against requirements. Validation confirms the built system is the *right* system for its users. A system can pass all verification tests and still fail validation if requirements were incomplete or misunderstood.

> **Relationship to Transition (process 10):** Validation begins after a successful Transition. The system under validation is the same deployed system confirmed operational by the Transition smoke tests.

---

## Entry Criteria

Validation may only begin after:
1. Process 10 Transition quality gate is passed (system deployed and smoke tests passed)
2. Stakeholder needs from process 02 are available and baselined

---

## High Level Format

All stakeholder needs from process 02 (STORIES.md) are in scope for every release. Validation is performed by automated acceptance tests run against the deployed system.

Human provides:
- The base URL of the deployed system

---

## Detailed Format

AI expands into a **Validation Plan** covering:

- Mapping of each user story / stakeholder need (from process 02) to one or more validation scenarios (VS-nn)
- For each validation scenario: precondition, steps, expected observable outcome from the user's perspective
- Pass/fail criteria expressed in terms of *user value*, not internal system behaviour
- Validation environment specification (target host and URL)

Each validation scenario follows the structure:

```
VS-{nn}: [Scenario title]
Source: [Story ID] — [story title from STORIES.md]
Precondition: [system state before validation]
Steps:
  1. [user action]
  2. [user action]
Expected outcome: [what the user observes; expressed as user value, not system state]
Pass criterion: [exact condition that constitutes a pass]
```

---

## Artifacts Format

AI generates from the Validation Plan:

- Executable validation scripts (automated, run against the deployed system at its operational URL)
- A **Validation Matrix** mapping every stakeholder need / user story to one or more VS-nn, showing coverage
- A **Validation Report** summarising execution results and overall pass/fail verdict

---

## Automation and Approval

Validation is executed automatically against the deployed system as part of the automated delivery pipeline, after a successful transition.

**Approval rule:** A passing validation run is the approval. If all validation scenarios pass, the system is considered validated without further human sign-off. The Validation Report is produced automatically.

---

## Quality Gate

The quality gate is passed **automatically** when the validation run succeeds. No human approval is required.

Specifically, the gate closes when:
1. Every stakeholder need in scope is covered by at least one VS-nn in the Validation Matrix
2. All validation scenarios have been executed against the deployed system
3. All validation scenarios pass (zero open failures)
4. The Validation Report is produced automatically
