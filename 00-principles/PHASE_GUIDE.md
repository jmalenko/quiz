# Phase 00 — Principles

## Purpose
Establish the foundational vision, values, and constraints that govern the entire project.

## Inputs (Human Provides)
- `USER_INPUT.md` — Completed vision template

## Outputs (AI Generates)
- `PRINCIPLES.md` — Formalized principles document
- `STAKEHOLDERS.md` — Stakeholder register
- `CONSTRAINTS.md` — Detailed constraints analysis

## AI Generation Rules

1. **Read** the completed `USER_INPUT.md`
2. **Formalize** the vision into SMART principles (Specific, Measurable, Achievable, Relevant, Time-bound)
3. **Identify gaps** — If any section is marked "TBD" or is ambiguous, ask the human for clarification
4. **Generate** the principles document with:
   - Numbered principles (PRI-001, PRI-002, ...)
   - Each principle has: Statement, Rationale, Implications
5. **Validate** — Check for internal consistency

## Quality Gate: QG1

Before proceeding to Requirements (Phase 10), verify:
- [ ] All principles are clearly stated
- [ ] No contradictions between principles
- [ ] Success criteria are measurable
- [ ] Human has approved this phase

## Artifact Template

```markdown
# PRI-XXX: [Principle Title]

**Statement**: [Clear, unambiguous statement]
**Rationale**: [Why this principle exists]
**Implications**: [What this means for the system]
**Priority**: [MUST / SHOULD / COULD]
**Source**: USER_INPUT.md, Section X
```
