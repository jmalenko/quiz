# Governance Rules & Quality Gates

## 1. Roles

| Role | Responsibility | Actions |
|------|---------------|---------|
| **Product Owner** (Human) | Defines WHAT the system does | Provides user stories, acceptance criteria, approves gates |
| **AI Engineer** (AI) | Defines HOW the system is built | Generates all technical artifacts |
| **Reviewer** (Human) | Validates AI output | Reviews at quality gates, records decisions |

## 2. Process Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────┐     ┌──────────┐
│  PRINCIPLES │────▶│ REQUIREMENTS│────▶│ FUNCTIONAL SPEC     │────▶│  DESIGN  │
│  (00)       │ QG1 │  (10)       │ QG2 │  (20)               │ QG3 │  (40)    │
└─────────────┘     └─────────────┘     └─────────────────────┘     └──────────┘
                                                                          │
                                                                         QG4
                                                                          │
┌─────────────┐     ┌─────────────┐     ┌─────────────────────┐     ┌──────────┐
│  TEST EXEC  │◀────│  DEPLOYMENT │◀────│ TEST IMPLEMENTATION │◀────│  IMPL    │
│  (90)       │ QG7 │  (80)       │ QG6 │  (60)               │ QG5 │  (50)    │
└─────────────┘     └─────────────┘     └─────────────────────┘     └──────────┘
```

## 3. Quality Gates

### QG1: Principles → Requirements
| Criterion | Check |
|-----------|-------|
| Vision statement is clear and unambiguous | ☐ |
| Constraints are explicitly stated | ☐ |
| Success criteria are measurable | ☐ |
| Stakeholders are identified | ☐ |
| **Human Decision**: Approve principles | ☐ |

### QG2: Requirements → Functional Specification
| Criterion | Check |
|-----------|-------|
| All user stories have acceptance criteria | ☐ |
| Requirements are uniquely identified (REQ-XXX) | ☐ |
| No conflicting requirements | ☐ |
| Priority is assigned to each requirement | ☐ |
| **Human Decision**: Requirements complete | ☐ |

### QG3: Functional Specification → Design
| Criterion | Check |
|-----------|-------|
| All requirements are covered in the spec | ☐ |
| Functional behaviors are testable | ☐ |
| Edge cases are identified | ☐ |
| Traceability to requirements is documented | ☐ |
| **Human Decision**: Spec approved | ☐ |

### QG4: Design → Implementation
| Criterion | Check |
|-----------|-------|
| Architecture covers all functional specifications | ☐ |
| Technology choices are justified | ☐ |
| Interfaces are clearly defined | ☐ |
| Non-functional requirements are addressed | ☐ |
| **Human Decision**: Design approved | ☐ |

### QG5: Implementation → Test Implementation
| Criterion | Check |
|-----------|-------|
| Code compiles/builds without errors | ☐ |
| Code follows design patterns from design phase | ☐ |
| All interfaces are implemented | ☐ |
| No critical static analysis findings | ☐ |
| **Human Decision**: Code review passed | ☐ |

### QG6: Test Implementation → Deployment
| Criterion | Check |
|-----------|-------|
| Test cases cover all acceptance criteria | ☐ |
| Test cases are traceable to requirements | ☐ |
| Test infrastructure is defined | ☐ |
| **Human Decision**: Test plan approved | ☐ |

### QG7: Deployment → Test Execution
| Criterion | Check |
|-----------|-------|
| Deployment scripts execute successfully | ☐ |
| Environment is provisioned correctly | ☐ |
| Rollback procedure is defined | ☐ |
| **Human Decision**: Ready for test execution | ☐ |

### QG8: Test Execution → Release (Final)
| Criterion | Check |
|-----------|-------|
| All critical tests pass | ☐ |
| Test coverage meets threshold (≥80%) | ☐ |
| No open critical/high defects | ☐ |
| Performance meets acceptance criteria | ☐ |
| **Human Decision**: GO for release | ☐ |

## 4. Rules for AI Generation

### 4.1 General Rules
1. **Never generate without context** — AI must have the previous phase's approved output as input
2. **Always justify decisions** — Every technical decision must include a rationale
3. **Follow established patterns** — Consistency over novelty
4. **Fail safe** — When uncertain, ask the human rather than assume
5. **Document assumptions** — All assumptions must be explicitly stated

### 4.2 Artifact Naming Convention
```
<phase-number>-<artifact-type>-<name>.<extension>
```
Examples:
- `10-REQ-user-authentication.md`
- `40-DES-system-architecture.md`
- `50-SRC-auth-service.py`

### 4.3 Change Management
- Any change to an approved artifact requires re-approval
- Changes must be documented in the DECISION_LOG.md
- Downstream artifacts must be assessed for impact
- Traceability matrix must be updated

## 5. Human Input Points (Minimal but Critical)

| Phase | Required Human Input | Format |
|-------|---------------------|--------|
| Principles | Vision, values, constraints | `USER_INPUT.md` |
| Requirements | User stories + acceptance criteria | `USER_INPUT.md` |
| Functional Spec | Review & approve/reject | Quality Gate checklist |
| Design | Technology preferences, constraints | `USER_INPUT.md` |
| Implementation | Review & approve/reject | Quality Gate checklist |
| Test Implementation | Critical scenarios to cover | `USER_INPUT.md` |
| Deployment | Target environment details | `USER_INPUT.md` |
| Test Execution | Go/No-Go decision | Quality Gate checklist |

## 6. Escalation & Exception Handling

| Situation | Action |
|-----------|--------|
| AI cannot resolve ambiguity | Escalate to human with options |
| Quality gate fails | Document findings, iterate until pass |
| Requirement conflict detected | Stop and present conflict to human |
| Technology constraint prevents implementation | Propose alternatives to human |
| Test failure in critical path | Block release, escalate to human |

## 7. Metrics & KPIs

| Metric | Target | Measured At |
|--------|--------|-------------|
| Requirements coverage | 100% | QG3 |
| Test coverage | ≥ 80% | QG8 |
| Defect density | < 5 per KLOC | QG8 |
| Human interventions per phase | ≤ 3 | All phases |
| Gate pass rate (first attempt) | ≥ 70% | All gates |
| Traceability completeness | 100% | All phases |
