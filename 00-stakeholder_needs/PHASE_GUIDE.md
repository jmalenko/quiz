# Phase 00 — Stakeholder Needs and Requirements Definition

> **IEEE/IEC 12207 Process**: 6.4.1 Business or Mission Analysis + 6.4.2 Stakeholder Needs and Requirements Definition

## Purpose
Define the problem space, identify stakeholders, capture their needs, and establish measurable success criteria. This is the foundation upon which the entire system is built.

## IEEE 12207 Alignment
- **Process**: Stakeholder Needs and Requirements Definition Process
- **Objective**: Transform stakeholder needs into a formal set of stakeholder requirements
- **Key activities**:
  - Identify stakeholders
  - Elicit stakeholder needs
  - Define stakeholder requirements
  - Analyze and validate requirements
  - Manage stakeholder requirements

## Inputs (Human Provides)
- `USER_INPUT.md` — Project vision, stakeholders, constraints, success criteria

## Outputs (AI Generates)
- `STAKEHOLDER_NEEDS.md` — Formalized stakeholder needs document
- `STAKEHOLDERS.md` — Stakeholder register (who, role, interest, influence)
- `CONSTRAINTS.md` — Project constraints analysis
- `SUCCESS_CRITERIA.md` — Measurable success criteria
- `CONTEXT_DIAGRAM.md` — System context and boundaries

## AI Generation Rules

1. **Read** the completed `USER_INPUT.md`
2. **Identify** all stakeholders (direct users, indirect users, operators, acquirers, regulators)
3. **Formalize** needs into structured stakeholder requirements (STK-XXX)
4. **Validate** that needs are:
   - Complete (all stakeholder groups represented)
   - Consistent (no conflicts between stakeholders)
   - Feasible (within stated constraints)
   - Verifiable (can be validated at the end)
5. **Define** system boundaries (what's in scope, what's external)
6. **Establish** traceability: each need traces to a stakeholder

## Quality Gate: QG1 (Stakeholder Needs → Requirements)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | All stakeholders identified and classified | ☐ |
| 2 | Each stakeholder has at least one need documented | ☐ |
| 3 | Success criteria are measurable (SMART) | ☐ |
| 4 | Constraints are explicitly stated | ☐ |
| 5 | System boundaries are clear | ☐ |
| 6 | No conflicting needs (or conflicts are resolved) | ☐ |
| 7 | **Human Decision**: Stakeholder needs approved | ☐ |

## Artifact Template

```markdown
# STK-XXX: [Stakeholder Need Title]

**Stakeholder**: [Who has this need]
**Category**: Functional / Quality / Constraint / Interface
**Statement**: [Clear statement of need in stakeholder language]
**Rationale**: [Why this need exists — business value]
**Priority**: ESSENTIAL / DESIRABLE / OPTIONAL
**Success Measure**: [How to verify this need is satisfied]
**Constraints**: [Any limitations that apply]
```
