# Phase 10 — Requirements

## Purpose
Transform user stories and business needs into formal, structured, traceable requirements.

## Inputs
- `USER_INPUT.md` — User stories, acceptance criteria, business rules
- `../00-principles/PRINCIPLES.md` — Approved principles (from Phase 00)

## Outputs (AI Generates)
- `REQUIREMENTS.md` — Software Requirements Specification (SRS)
- `REQUIREMENTS_MATRIX.md` — Requirements traceability to principles

## AI Generation Rules

1. **Read** the user stories from `USER_INPUT.md`
2. **Decompose** each user story into atomic requirements
3. **Assign IDs** using pattern: `REQ-FUNC-XXX` (functional), `REQ-NFR-XXX` (non-functional)
4. **Classify** requirements:
   - Functional Requirements (REQ-FUNC)
   - Non-Functional Requirements (REQ-NFR)
   - Interface Requirements (REQ-INT)
   - Data Requirements (REQ-DATA)
5. **Trace** each requirement back to a user story and principle
6. **Validate**:
   - No duplicate requirements
   - No contradictions
   - All acceptance criteria are testable
   - Complete coverage of user stories

## Quality Gate: QG2

Before proceeding to Functional Specification (Phase 20), verify:
- [ ] All user stories are decomposed into requirements
- [ ] Each requirement has a unique ID
- [ ] Each requirement is testable
- [ ] Traceability to principles is documented
- [ ] No conflicts between requirements
- [ ] Human has approved

## Artifact Template

```markdown
# REQ-FUNC-XXX: [Requirement Title]

**Description**: [Clear, testable statement of what the system shall do]
**Rationale**: [Why this requirement exists]
**Source**: User Story X, Acceptance Criterion Y
**Priority**: MUST / SHOULD / COULD / WONT (MoSCoW)
**Traces To**: PRI-XXX
**Acceptance Criterion**: [Measurable condition for verification]
**Status**: DRAFT / APPROVED / IMPLEMENTED / VERIFIED
```
