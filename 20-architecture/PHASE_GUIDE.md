# Phase 20 — Architecture Definition

> **IEEE/IEC 12207 Process**: 6.4.4 Architecture Definition Process

## Purpose
Define the system architecture: decompose the system into components, define their interfaces, allocate requirements to components, and select technologies.

## IEEE 12207 Alignment
- **Process**: Architecture Definition Process
- **Objective**: Generate system architecture alternatives, select one, express via views
- **Key activities**:
  - Define architecture viewpoints and views
  - Develop candidate architectures
  - Assess candidate architectures (trade-off analysis)
  - Select architecture
  - Document architecture and rationale

## Inputs
- `../10-requirements/SYSTEM_REQUIREMENTS.md` — Approved requirements
- `USER_INPUT.md` — Technology preferences and constraints

## Outputs (AI Generates)
- `ARCHITECTURE.md` — System architecture description (multiple views)
- `COMPONENT_CATALOG.md` — Components and their responsibilities
- `INTERFACE_DEFINITIONS.md` — Inter-component interfaces
- `TECHNOLOGY_DECISIONS.md` — ADRs (Architecture Decision Records)
- `DEPLOYMENT_VIEW.md` — Physical deployment topology
- `TRACEABILITY.md` — Architecture-to-Requirements allocation

## AI Generation Rules

1. **Develop architecture views** (IEEE 42010):
   - Logical view (components, responsibilities)
   - Process view (concurrency, data flow)
   - Development view (modules, packages)
   - Physical view (deployment topology)
2. **Allocate requirements** to components
3. **Define interfaces** (protocol, data format, error handling)
4. **Document decisions** with rationale (ADR format)
5. **Assess quality attributes** against architecture

## Quality Gate: QG3 (Architecture → Design)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | All requirements allocated to ≥1 component | ☐ |
| 2 | Components have single, clear responsibilities | ☐ |
| 3 | All interfaces defined | ☐ |
| 4 | Technology decisions justified (ADRs) | ☐ |
| 5 | Quality attributes addressed | ☐ |
| 6 | Deployment view is feasible | ☐ |
| 7 | **Human Decision**: Architecture approved | ☐ |
