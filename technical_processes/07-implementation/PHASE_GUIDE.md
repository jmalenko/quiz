# Implementation

> **IEEE/IEC 12207:2017 — Technical Process 6.4.7**

## Purpose
Produce specified system elements (software units) from the detailed design.

## Key Activities
- Implement software units per design specification
- Perform unit testing
- Update traceability to design elements
- Evaluate code against coding standards

## Inputs
- `../05-design_definition/DETAILED_DESIGN.md`
- `../05-design_definition/API_SPECIFICATION.md`
- `../05-design_definition/DATABASE_DESIGN.md`
- `../06-system_analysis/OPTIMIZATION_RECOMMENDATIONS.md`

## Outputs (AI Generates)
- `src/` — Source code (organized by component)
- `tests/unit/` — Unit tests (≥80% coverage)
- `BUILD.md` — Build instructions and dependencies
- `CODE_STANDARDS.md` — Coding standards applied
- `TRACEABILITY.md` — Code → Design elements
