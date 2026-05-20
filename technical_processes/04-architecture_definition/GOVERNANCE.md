# Governance — Architecture Definition

## Methodology

This process follows the **C4 Model** (Simon Brown) for architecture description and **ADRs** (Architecture Decision Records) for technology choices.

## High Level Format

Human provides:
- System context (actors, external systems)
- Container-level architecture (major building blocks and their responsibilities)
- Technology decisions (ADRs)

## Detailed Format

AI expands into:
- C4 Container interactions (diagram + communication description)
- ADR details (context, options considered, decision, consequences)
- Deployment topology

## C4 Levels

| Level | Scope | Defined in |
|-------|-------|-----------|
| 1 — Context | System boundary + actors | High Level |
| 2 — Container | Major building blocks | High Level + Detailed |
| 3 — Component | Internal structure per container | Process 05 (Design) |
| 4 — Code | Classes, interfaces | Process 05 (Design) |

## ADR Format

```
ADR-{nn}: [decision title]
Context: [why this decision is needed]
Decision: [what was decided]
Alternatives: [what was considered]
Rationale: [why this option was chosen]
```
