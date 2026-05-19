# Phase 60 — Verification

> **IEEE/IEC 12207 Process**: 6.4.8 Verification Process

## Purpose
Provide objective evidence that the system/software meets its specified requirements. Answer: "Did we build the product right?"

## IEEE 12207 Alignment
- **Process**: Verification Process
- **Objective**: Confirm work products meet specified requirements
- **Key activities**:
  - Plan verification activities
  - Perform verification (test, inspection, analysis, demonstration)
  - Record verification results
  - Report anomalies

## Inputs
- `../10-requirements/SYSTEM_REQUIREMENTS.md` — Requirements to verify against
- `../50-integration/INTEGRATION_REPORT.md` — Integration must pass first
- System running in test environment

## Outputs (AI Generates)
- `VERIFICATION_PLAN.md` — Test strategy, levels, coverage targets
- `TEST_CASES.md` — System-level test case specifications
- `tests/system/` — System test code (E2E)
- `tests/performance/` — Performance tests
- `tests/security/` — Security tests
- `VERIFICATION_REPORT.md` — Test execution results
- `DEFECT_LOG.md` — Defects found
- `TRACEABILITY.md` — Tests-to-Requirements traceability

## AI Generation Rules

1. **For each requirement** (SYS-XXX): generate ≥1 verification test
2. **Verification methods**:
   - Test: execute and observe results
   - Inspection: examine artifacts against standards
   - Analysis: use models/calculations
   - Demonstration: show capability
3. **Test the integrated system** end-to-end through public interfaces
4. **Performance tests**: load, stress, endurance against NFR targets
5. **Security tests**: OWASP Top 10, auth bypass, injection
6. **Classify defects**: Critical / High / Medium / Low

## Quality Gate: QG7 (Verification → Validation)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | All MUST requirements verified | ☐ |
| 2 | Performance meets NFR targets | ☐ |
| 3 | Security scan passes | ☐ |
| 4 | No open CRITICAL defects | ☐ |
| 5 | No open HIGH defects (or risk accepted) | ☐ |
| 6 | Requirements coverage ≥ 95% | ☐ |
| 7 | **Human Decision**: Verification passed | ☐ |
