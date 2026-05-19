# Phase 70 — Validation

> **IEEE/IEC 12207 Process**: 6.4.9 Validation Process

## Purpose
Confirm the system satisfies stakeholder needs and intended use. Answer: "Did we build the right product?"

## IEEE 12207 Alignment
- **Process**: Validation Process
- **Objective**: Confirm system fulfils intended use in intended environment
- **Key activities**:
  - Plan validation (acceptance criteria from stakeholder needs)
  - Execute validation in operational or simulated environment
  - Assess results against stakeholder expectations
  - Report validation outcomes

## Inputs
- `../00-stakeholder_needs/STAKEHOLDER_NEEDS.md` — Original needs to validate against
- `../60-verification/VERIFICATION_REPORT.md` — Verification must pass first
- `USER_INPUT.md` — Business acceptance criteria
- System running in staging/production-like environment

## Outputs (AI Generates)
- `VALIDATION_PLAN.md` — Acceptance test strategy
- `ACCEPTANCE_TESTS.md` — Business-level test scenarios (BDD)
- `tests/acceptance/` — Automated acceptance test code
- `VALIDATION_REPORT.md` — Acceptance test results
- `RELEASE_RECOMMENDATION.md` — GO / NO-GO / CONDITIONAL
- `TRACEABILITY.md` — Acceptance tests-to-Stakeholder Needs traceability

## AI Generation Rules

1. **For each STK-XXX**: generate acceptance test validating the need is met
2. **BDD format**: Given/When/Then in business language
3. **Test in real-world conditions** (production-like environment)
4. **Involve stakeholder scenarios** (not just technical correctness)
5. **Generate release recommendation** with evidence

## Quality Gate: QG8 (Validation → Transition)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | All ESSENTIAL stakeholder needs validated | ☐ |
| 2 | All acceptance criteria pass | ☐ |
| 3 | No open CRITICAL/HIGH defects | ☐ |
| 4 | Stakeholders have reviewed results | ☐ |
| 5 | Release recommendation is GO or CONDITIONAL | ☐ |
| 6 | **Human Decision**: ACCEPT system for deployment | ☐ |
