# Governance — Architecture Definition

## Methodology

This process follows the **C4 Model** (Simon Brown) for architecture description and **ADRs** (Architecture Decision Records) for technology choices.

## High Level Format

Human provides:
- System context (C4 Level 1 — actors, external systems)
- Technology decisions (ADRs)

## Detailed Format

AI expands into:
- C4 Level 2 — Container definitions (building blocks, technologies, responsibilities)
- C4 Container interactions (diagram + communication description)
- ADR details (context, options considered, decision, consequences)
- Deployment topology

## C4 Levels

| Level | Scope | Defined in |
|-------|-------|-----------|
| 1 — Context | System boundary + actors | [process 04 Architecture Definition — High Level](../04-architecture_definition/ARCHITECTURE.md) |
| 2 — Container | Major building blocks | [process 04 Architecture Definition — Detailed](../04-architecture_definition/detailed/ARCHITECTURE_DETAILED.md) |
| 3 — Component | Internal structure per container | [process 05 Design Definition](../05-design_definition/DESIGN.md) |
| 4 — Code | Classes, interfaces, source code | [process 07 Implementation](../07-implementation/) |

## ADR Format

```
ADR-{nn}: [decision title]
Context: [why this decision is needed]
Decision: [what was decided]
Alternatives: [what was considered]
Rationale: [why this option was chosen]
```
