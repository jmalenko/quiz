# Validation

> **IEEE/IEC 12207:2017 — Technical Process 6.4.11**

## Purpose
Provide objective evidence that the system, when in use, fulfils its business or mission objectives and stakeholder requirements. Answer: "Did we build the right product?"

## Key Activities
- Plan validation (acceptance criteria from stakeholder needs)
- Execute validation in operational or simulated environment
- Assess results against stakeholder expectations
- Report validation outcomes and recommendation

## Inputs
- `../02-stakeholder_needs_and_requirements_definition/STAKEHOLDER_REQUIREMENTS.md`
- `../10-transition/` — System deployed in operational environment
- `USER_INPUT.md` — Business acceptance criteria

## Outputs (AI Generates)
- `VALIDATION_PLAN.md` — Acceptance test strategy
- `ACCEPTANCE_TESTS.md` — Business-level test scenarios (BDD)
- `tests/acceptance/` — Automated acceptance test code
- `VALIDATION_REPORT.md` — Results
- `RELEASE_RECOMMENDATION.md` — GO / NO-GO / CONDITIONAL
- `TRACEABILITY.md` — Acceptance tests → Stakeholder Needs
