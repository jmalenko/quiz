# Traceability Matrix

## Purpose
This document provides end-to-end traceability from principles through to test execution. Every artifact must be traceable to its source, ensuring nothing is lost and nothing is added without justification.

## Traceability Chain

```
Principle (PRI-XXX)
  └── Requirement (REQ-XXX)
        └── Specification (SPEC-XXX)
              └── Design Element (DES-XXX)
                    └── Source Code (file/function)
                          └── Test Case (TC-XXX)
                                └── Test Result (PASS/FAIL)
```

## Forward Traceability (Requirements → Implementation)

| Requirement ID | Specification | Design Element | Source Code | Test Case | Status |
|---------------|---------------|----------------|-------------|-----------|--------|
| REQ-FUNC-001 | SPEC-001 | DES-001 | src/... | TC-001 | ☐ |
| REQ-FUNC-002 | SPEC-002 | DES-002 | src/... | TC-002 | ☐ |
| REQ-FUNC-003 | SPEC-003 | DES-003 | src/... | TC-003 | ☐ |

## Backward Traceability (Test → Requirement)

| Test Case | Tests Requirement | Tests Specification | Verifies Design |
|-----------|-------------------|--------------------|--------------------|
| TC-001 | REQ-FUNC-001 | SPEC-001 | DES-001 |
| TC-002 | REQ-FUNC-002 | SPEC-002 | DES-002 |

## Coverage Analysis

### Requirements Coverage
| Total Requirements | Covered by Spec | Covered by Design | Covered by Code | Covered by Test |
|-------------------|-----------------|-------------------|-----------------|-----------------|
| 0 | 0 (0%) | 0 (0%) | 0 (0%) | 0 (0%) |

### Orphan Detection

**Orphan Specifications** (specs with no requirement):
- None

**Orphan Design Elements** (design with no spec):
- None

**Orphan Tests** (tests with no requirement):
- None

**Untested Requirements** (requirements with no test):
- None

## Traceability Rules

1. **Every requirement** MUST trace to at least one principle
2. **Every specification** MUST trace to at least one requirement
3. **Every design element** MUST trace to at least one specification
4. **Every source file** MUST trace to at least one design element
5. **Every test case** MUST trace to at least one requirement
6. **No orphans allowed** — artifacts without upstream or downstream links must be justified or removed

## Update Protocol

- This matrix is updated by AI at the end of each phase
- Human reviews traceability at each quality gate
- Any gaps must be resolved before the gate is passed
