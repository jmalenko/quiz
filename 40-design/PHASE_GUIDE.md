# Phase 40 — Design

## Purpose
Create the system architecture and detailed design that will guide implementation. Translate functional specifications into technical solutions.

## Inputs
- `USER_INPUT.md` — Technology preferences and constraints
- `../20-functional_specification/FUNCTIONAL_SPEC.md` — Approved functional spec
- `../20-functional_specification/DATA_MODEL.md` — Logical data model
- `../00-principles/PRINCIPLES.md` — Guiding principles

## Outputs (AI Generates)
- `ARCHITECTURE.md` — High-level system architecture
- `DETAILED_DESIGN.md` — Component-level detailed design
- `DATA_DESIGN.md` — Physical data model / database schema
- `API_DESIGN.md` — API contracts (OpenAPI/AsyncAPI)
- `SECURITY_DESIGN.md` — Security architecture
- `DEPLOYMENT_DESIGN.md` — Deployment topology
- `TRACEABILITY.md` — Design-to-Spec traceability

## AI Generation Rules

1. **Read** functional specifications and user technology preferences
2. **Select architecture style** based on:
   - User preferences (if stated)
   - System characteristics (scale, complexity, team size)
   - Quality attributes priority
3. **Decompose** into components:
   - Each component has a single responsibility
   - Interfaces are clearly defined
   - Dependencies are minimized
4. **Design data layer**:
   - Transform logical model to physical schema
   - Define indexes, constraints, migrations
5. **Design APIs**:
   - RESTful conventions (or chosen protocol)
   - Request/response schemas
   - Error codes and handling
6. **Document decisions** using Architecture Decision Records (ADR)
7. **Assign IDs**: `DES-XXX` for design elements, `ADR-XXX` for decisions

## Quality Gate: QG4

Before proceeding to Implementation (Phase 50), verify:
- [ ] Architecture covers all functional specifications
- [ ] Component boundaries are clear
- [ ] API contracts are complete and consistent
- [ ] Data model supports all data requirements
- [ ] Security architecture addresses all security requirements
- [ ] Technology choices are justified (ADRs)
- [ ] Human has approved

## Architecture Decision Record Template

```markdown
# ADR-XXX: [Decision Title]

**Status**: PROPOSED / ACCEPTED / DEPRECATED
**Date**: YYYY-MM-DD
**Context**: [Why this decision is needed]
**Decision**: [What was decided]
**Alternatives Considered**:
1. [Alternative 1] — Rejected because [reason]
2. [Alternative 2] — Rejected because [reason]
**Consequences**:
- Positive: [Benefits]
- Negative: [Trade-offs]
- Risks: [Potential issues]
**Traces To**: SPEC-XXX, REQ-XXX
```

## Component Design Template

```markdown
# DES-XXX: [Component Name]

**Responsibility**: [Single responsibility statement]
**Type**: Service / Library / Module / Database / Queue
**Technology**: [Specific technology used]

**Interfaces**:
- Provided: [What this component offers]
- Required: [What this component needs]

**Internal Structure**:
- [Sub-component 1]: [Purpose]
- [Sub-component 2]: [Purpose]

**Data Owned**: [Entities managed by this component]
**Deployment Unit**: [How it's deployed]
**Traces To**: SPEC-XXX, SPEC-YYY
```
