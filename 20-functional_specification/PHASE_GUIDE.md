# Phase 20 — Functional Specification

## Purpose
Transform structured requirements into detailed functional specifications that describe system behavior precisely enough for design and testing.

## Inputs
- `../10-requirement/REQUIREMENTS.md` — Approved requirements (from Phase 10)
- `../00-principles/PRINCIPLES.md` — Approved principles

## Outputs (AI Generates)
- `FUNCTIONAL_SPEC.md` — Complete functional specification
- `USE_CASES.md` — Detailed use case descriptions
- `DATA_MODEL.md` — Logical data model
- `INTERFACE_SPEC.md` — External interface specifications
- `TRACEABILITY.md` — Spec-to-Requirements traceability

## AI Generation Rules

1. **Read** all approved requirements from Phase 10
2. **Group** related requirements into functional areas
3. **Elaborate** each functional area:
   - Define precise input/output behaviors
   - Define state transitions
   - Define error handling
   - Define boundary conditions
4. **Create use cases** with:
   - Primary flow (happy path)
   - Alternative flows
   - Exception flows
   - Pre/post conditions
5. **Design data model**:
   - Entity definitions
   - Relationships
   - Constraints
   - Validation rules
6. **Assign IDs**: `SPEC-XXX` for each specification item
7. **Trace** each spec item to one or more requirements

## Quality Gate: QG3

Before proceeding to Design (Phase 40), verify:
- [ ] All requirements have corresponding spec items
- [ ] Use cases cover all user stories
- [ ] Data model supports all data requirements
- [ ] Edge cases and error conditions are specified
- [ ] Traceability is complete (no orphan specs)
- [ ] Human has approved

## Artifact Template

```markdown
# SPEC-XXX: [Specification Title]

**Functional Area**: [Area name]
**Description**: [Detailed behavior description]

**Inputs**:
- [Input 1]: [Type, constraints, valid range]

**Outputs**:
- [Output 1]: [Type, format, conditions]

**Business Rules Applied**: BR-XX, BR-YY
**Pre-conditions**: [What must be true before]
**Post-conditions**: [What must be true after]
**Error Conditions**: [What can go wrong and how to handle it]

**Traces To**: REQ-FUNC-XXX, REQ-FUNC-YYY
**Status**: DRAFT / APPROVED
```

## Use Case Template

```markdown
# UC-XXX: [Use Case Name]

**Actor**: [Who initiates]
**Goal**: [What they want to achieve]
**Pre-condition**: [Starting state]

**Primary Flow**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Alternative Flows**:
- 2a. [Alternative at step 2]

**Exception Flows**:
- 1e. [Error at step 1]

**Post-condition**: [End state]
**Traces To**: REQ-FUNC-XXX
```
