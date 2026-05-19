# Verification

> **IEEE/IEC 12207:2017 — Technical Process 6.4.9**

## Purpose
Provide objective evidence that a system or element fulfils its specified requirements and characteristics. Answer: "Did we build the product right?"

## Key Activities
- Plan verification activities
- Perform verification (test, inspection, analysis, demonstration)
- Record verification results
- Identify and report anomalies/defects

## Inputs
- `../03-system_software_requirements_definition/SYSTEM_REQUIREMENTS.md`
- `../08-integration/INTEGRATION_REPORT.md`
- Integrated system running in test environment

## Outputs (AI Generates)
- `VERIFICATION_PLAN.md` — Strategy, coverage targets
- `TEST_CASES.md` — System-level test specifications
- `tests/system/` — End-to-end tests
- `tests/performance/` — Performance tests
- `tests/security/` — Security tests
- `VERIFICATION_REPORT.md` — Results
- `DEFECT_LOG.md` — Defects found and classified
- `TRACEABILITY.md` — Tests → Requirements
