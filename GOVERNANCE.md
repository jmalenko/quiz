# Governance Rules & Quality Gates — IEEE/IEC 12207 Waterfall

## 1. Standard Alignment

This governance framework implements **IEEE/IEC 12207:2017 — Systems and software engineering — Software life cycle processes** in a sequential (waterfall) execution model with 11 phases and 11 quality gates.

## 2. Roles

| Role | Responsibility |
|------|---------------|
| **Acquirer/Product Owner** (Human) | Defines needs, approves gates, final GO/NO-GO |
| **AI Engineer** (AI) | Generates all technical artifacts per phase |
| **Reviewer** (Human) | Reviews AI output at quality gates |

## 3. Process Flow

```
00 Stakeholder Needs ──QG1──► 10 Requirements ──QG2──► 20 Architecture
──QG3──► 30 Design ──QG4──► 40 Implementation ──QG5──► 50 Integration
──QG6──► 60 Verification ──QG7──► 70 Validation ──QG8──► 80 Transition
──QG9──► 90 Operation ──QG10──► 95 Maintenance ──QG-M──► (reentry)
```

## 4. Quality Gates

### QG1: Stakeholder Needs → Requirements
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All stakeholders identified | ☐ |
| 2 | Each stakeholder has documented needs | ☐ |
| 3 | Success criteria are measurable | ☐ |
| 4 | System boundaries clear | ☐ |
| 5 | Constraints stated | ☐ |
| 6 | **Human Decision**: Needs approved | ☐ |

### QG2: Requirements → Architecture
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All needs traceable to requirements | ☐ |
| 2 | Requirements uniquely identified | ☐ |
| 3 | Each requirement testable | ☐ |
| 4 | No conflicts | ☐ |
| 5 | Priority assigned (MoSCoW) | ☐ |
| 6 | Requirements baselined | ☐ |
| 7 | **Human Decision**: Requirements approved | ☐ |

### QG3: Architecture → Design
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All requirements allocated to components | ☐ |
| 2 | Components have single responsibilities | ☐ |
| 3 | All interfaces defined | ☐ |
| 4 | Technology decisions justified (ADRs) | ☐ |
| 5 | Quality attributes addressed | ☐ |
| 6 | Deployment view feasible | ☐ |
| 7 | **Human Decision**: Architecture approved | ☐ |

### QG4: Design → Implementation
| # | Criterion | Check |
|---|-----------|-------|
| 1 | Every component has internal design | ☐ |
| 2 | API contracts complete | ☐ |
| 3 | Database schema complete | ☐ |
| 4 | Error handling defined | ☐ |
| 5 | Security design complete | ☐ |
| 6 | **Human Decision**: Design approved | ☐ |

### QG5: Implementation → Integration
| # | Criterion | Check |
|---|-----------|-------|
| 1 | Code compiles/builds | ☐ |
| 2 | All components implemented | ☐ |
| 3 | APIs match design | ☐ |
| 4 | No critical lint errors | ☐ |
| 5 | No hardcoded secrets | ☐ |
| 6 | Unit tests pass (≥80% coverage) | ☐ |
| 7 | **Human Decision**: Code approved | ☐ |

### QG6: Integration → Verification
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All components integrated | ☐ |
| 2 | All interfaces tested | ☐ |
| 3 | Data flows correctly | ☐ |
| 4 | Integration tests PASS | ☐ |
| 5 | **Human Decision**: Integration approved | ☐ |

### QG7: Verification → Validation
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All MUST requirements verified | ☐ |
| 2 | Performance meets NFR targets | ☐ |
| 3 | Security scan passes | ☐ |
| 4 | No CRITICAL defects open | ☐ |
| 5 | Requirement coverage ≥ 95% | ☐ |
| 6 | **Human Decision**: Verification passed | ☐ |

### QG8: Validation → Transition
| # | Criterion | Check |
|---|-----------|-------|
| 1 | All ESSENTIAL stakeholder needs validated | ☐ |
| 2 | Acceptance criteria pass | ☐ |
| 3 | No CRITICAL/HIGH defects | ☐ |
| 4 | Release recommendation is GO/CONDITIONAL | ☐ |
| 5 | **Human Decision**: ACCEPT for deployment | ☐ |

### QG9: Transition → Operation
| # | Criterion | Check |
|---|-----------|-------|
| 1 | Deployed successfully | ☐ |
| 2 | Smoke tests pass in production | ☐ |
| 3 | Monitoring active | ☐ |
| 4 | Rollback tested | ☐ |
| 5 | Runbook available | ☐ |
| 6 | **Human Decision**: System operational | ☐ |

### QG10: Operation → Maintenance
| # | Criterion | Check |
|---|-----------|-------|
| 1 | Operating within SLA | ☐ |
| 2 | Monitoring complete | ☐ |
| 3 | Incident response tested | ☐ |
| 4 | Feedback collection active | ☐ |
| 5 | **Human Decision**: Operational readiness confirmed | ☐ |

### QG-M: Maintenance Release
| # | Criterion | Check |
|---|-----------|-------|
| 1 | Change request classified | ☐ |
| 2 | Impact analysis done | ☐ |
| 3 | Lifecycle phases re-executed | ☐ |
| 4 | Regression tests pass | ☐ |
| 5 | Traceability updated | ☐ |
| 6 | **Human Decision**: Release approved | ☐ |

## 5. Human Input Points

| Phase | Input Required | Effort |
|-------|---------------|--------|
| 00 | Vision, stakeholders, needs | 10 min |
| 10 | User stories, NFRs | 15 min |
| 20 | Technology preferences | 5 min |
| 70 | Acceptance criteria | 5 min |
| 80 | Environment details | 5 min |
| Gates | Review + approve (×11) | 5 min each |

**Total: ~2 hours** for a complete IEEE 12207-compliant system.

## 6. ID Conventions

| Phase | Pattern | Example |
|-------|---------|---------|
| 00 | STK-XXX | STK-001 |
| 10 | SYS-FUNC-XXX, SYS-PERF-XXX | SYS-FUNC-001 |
| 20 | ARCH-XXX, ADR-XXX, IF-XXX | ARCH-001 |
| 30 | DES-XXX | DES-001 |
| 40 | (source files) | — |
| 50 | IT-XXX | IT-001 |
| 60 | VT-XXX | VT-001 |
| 70 | AT-XXX | AT-001 |
| 95 | CR-XXX | CR-001 |

## 7. Traceability Chain

```
STK-XXX → SYS-XXX → ARCH-XXX → DES-XXX → src/ → IT-XXX → VT-XXX → AT-XXX
```

Every artifact traces forward and backward through this chain.
