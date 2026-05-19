# Phase 90 — Test Execution

## Purpose
Execute all test suites, collect evidence, produce test reports, and provide a Go/No-Go recommendation for release.

## Inputs
- `../60-test_implementation/TEST_PLAN.md` — Approved test plan
- `../60-test_implementation/tests/` — Test code
- `../80-deployment/` — Deployed system (in staging/test environment)

## Outputs (AI Generates)
- `TEST_REPORT.md` — Comprehensive test execution report
- `COVERAGE_REPORT.md` — Code coverage analysis
- `DEFECT_LOG.md` — List of defects found
- `RELEASE_RECOMMENDATION.md` — Go/No-Go recommendation with evidence
- `evidence/` — Test execution evidence (logs, screenshots, metrics)

## AI Generation Rules

1. **Execute tests** in the following order:
   - Unit tests (fastest feedback)
   - Integration tests
   - End-to-end tests
   - Performance tests (if applicable)
   - Security tests (if applicable)
2. **Collect metrics**:
   - Pass/fail counts per test level
   - Code coverage percentage
   - Execution time
   - Defects found (severity classification)
3. **Classify defects**:
   - CRITICAL: System unusable, data loss
   - HIGH: Major feature broken, no workaround
   - MEDIUM: Feature partially broken, workaround exists
   - LOW: Cosmetic, minor inconvenience
4. **Generate test report** with:
   - Executive summary
   - Detailed results per test level
   - Coverage analysis
   - Defect summary
   - Risk assessment
5. **Generate release recommendation**:
   - Based on exit criteria from test plan
   - Clear GO / NO-GO / CONDITIONAL recommendation
   - List of open risks if CONDITIONAL

## Quality Gate: QG8 (FINAL)

Before release, verify:
- [ ] All critical tests pass
- [ ] All high-priority tests pass
- [ ] Code coverage ≥ threshold (default: 80%)
- [ ] No open CRITICAL defects
- [ ] No open HIGH defects (or accepted risk)
- [ ] Performance meets acceptance criteria
- [ ] Security scan passes
- [ ] **Human Decision**: GO for release

## Test Report Template

```markdown
# Test Execution Report

**Version**: [Version under test]
**Date**: [Execution date]
**Environment**: [Test environment details]

## Executive Summary
[1-2 paragraph summary of test results and recommendation]

## Results by Level

| Level | Total | Passed | Failed | Skipped | Pass Rate |
|-------|-------|--------|--------|---------|-----------|
| Unit | | | | | % |
| Integration | | | | | % |
| E2E | | | | | % |
| Performance | | | | | % |
| Security | | | | | % |
| **TOTAL** | | | | | **%** |

## Code Coverage

| Component | Line Coverage | Branch Coverage | Target |
|-----------|-------------|----------------|--------|
| | % | % | 80% |
| **TOTAL** | **%** | **%** | **80%** |

## Defects Found

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| DEF-001 | | | OPEN / FIXED / ACCEPTED |

## Risk Assessment
[Identified risks and mitigation]

## Recommendation
**[GO / NO-GO / CONDITIONAL]**

Justification: [Why this recommendation]
```

## Release Decision Record

```markdown
# Release Decision — [Version] — [Date]

**Recommendation from AI**: [GO / NO-GO / CONDITIONAL]
**Human Decision**: [GO / NO-GO]
**Decided by**: [Name/Role]
**Conditions** (if any): [What must be true post-release]
**Accepted Risks**: [Risks acknowledged]
**Next Steps**: [Actions after decision]
```
