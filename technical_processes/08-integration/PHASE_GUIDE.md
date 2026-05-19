# Integration

> **IEEE/IEC 12207:2017 — Technical Process 6.4.8**

## Purpose
Combine system elements into assemblies, verify that the integrated elements satisfy architectural design, and produce the integrated system.

## Key Activities
- Develop integration strategy (order, approach)
- Integrate software units into components
- Integrate components into the system
- Test interfaces between integrated elements
- Document integration results

## Inputs
- `../07-implementation/src/` — Software units
- `../04-architecture_definition/INTERFACE_DEFINITIONS.md`
- `../05-design_definition/API_SPECIFICATION.md`

## Outputs (AI Generates)
- `INTEGRATION_STRATEGY.md` — Integration order and approach
- `tests/integration/` — Integration test code
- `INTEGRATION_REPORT.md` — Results of integration testing
- `TRACEABILITY.md` — Integration tests → Interfaces
