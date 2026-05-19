# Traceability Matrix — IEEE/IEC 12207

## Traceability Chain

```
STK-XXX → SYS-XXX → ARCH-XXX → DES-XXX → src/ → IT-XXX → VT-XXX → AT-XXX
(Needs)   (Reqs)    (Arch)     (Design)  (Code)  (Integ)  (Verif)  (Valid)
```

## Forward Traceability

| Stakeholder Need | Requirement | Architecture | Design | Code | Integration Test | Verification Test | Validation Test |
|-----------------|-------------|--------------|--------|------|-----------------|-------------------|-----------------|
| STK-001 | SYS-FUNC-001 | ARCH-001 | DES-001 | src/... | IT-001 | VT-001 | AT-001 |
| STK-001 | SYS-FUNC-002 | ARCH-001 | DES-002 | src/... | IT-001 | VT-002 | AT-001 |
| STK-002 | SYS-PERF-001 | ARCH-002 | DES-003 | src/... | IT-002 | VT-003 | AT-002 |

## Backward Traceability

| Validation Test | Verifies Need | Via Verification | Via Requirement |
|----------------|---------------|------------------|-----------------|
| AT-001 | STK-001 | VT-001, VT-002 | SYS-FUNC-001, SYS-FUNC-002 |
| AT-002 | STK-002 | VT-003 | SYS-PERF-001 |

## Coverage Analysis

| Phase | Total Items | Traced Forward | Traced Backward | Coverage |
|-------|-------------|----------------|-----------------|----------|
| 00 Stakeholder Needs (STK) | 0 | — | — | — |
| 10 Requirements (SYS) | 0 | 0 | 0 | 0% |
| 20 Architecture (ARCH) | 0 | 0 | 0 | 0% |
| 30 Design (DES) | 0 | 0 | 0 | 0% |
| 40 Implementation | 0 | 0 | 0 | 0% |
| 50 Integration (IT) | 0 | — | 0 | 0% |
| 60 Verification (VT) | 0 | — | 0 | 0% |
| 70 Validation (AT) | 0 | — | 0 | 0% |

## Traceability Rules

1. **Every STK-XXX** must have ≥1 SYS-XXX requirement
2. **Every SYS-XXX** must be allocated to ≥1 ARCH-XXX component
3. **Every ARCH-XXX** must have ≥1 DES-XXX design element
4. **Every DES-XXX** must be implemented in source code
5. **Every interface (IF-XXX)** must have ≥1 IT-XXX integration test
6. **Every SYS-XXX** must have ≥1 VT-XXX verification test
7. **Every STK-XXX** must have ≥1 AT-XXX validation test
8. **No orphans** — every artifact must trace both upstream and downstream

## Update Protocol

- AI updates this matrix at the end of each phase
- Human reviews traceability completeness at each quality gate
- Gaps block the quality gate
