# Phase 40 — Implementation

> **IEEE/IEC 12207 Process**: 6.4.6 Implementation Process

## Purpose
Generate production-quality source code that realizes the detailed design.

## IEEE 12207 Alignment
- **Process**: Implementation Process
- **Objective**: Produce specified system elements (software units)
- **Key activities**:
  - Implement software units per design
  - Establish unit test procedures
  - Update traceability to design
  - Evaluate code against standards

## Inputs
- `../30-design/DETAILED_DESIGN.md` — Approved detailed design
- `../30-design/API_SPECIFICATION.md` — API contracts
- `../30-design/DATABASE_DESIGN.md` — Database schema

## Outputs (AI Generates)
- `src/` — Source code (organized by component)
- `BUILD.md` — Build instructions and dependencies
- `CODE_STANDARDS.md` — Coding standards applied
- `TRACEABILITY.md` — Code-to-Design traceability

## AI Generation Rules

1. **One component = one module/package**
2. **SOLID principles** throughout
3. **Complete documentation** (docstrings/JSDoc on all public items)
4. **APIs exactly match** API_SPECIFICATION.md
5. **Database exactly matches** DATABASE_DESIGN.md
6. **No**: hardcoded secrets, dead code, TODO without requirement link
7. **Coding standards**: max 30-line functions, max 300-line files, complexity ≤10

## Quality Gate: QG5 (Implementation → Integration)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | Code compiles/builds without errors | ☐ |
| 2 | All design components implemented | ☐ |
| 3 | API contracts match design | ☐ |
| 4 | Database schema matches design | ☐ |
| 5 | No critical linting errors | ☐ |
| 6 | No hardcoded secrets | ☐ |
| 7 | Documentation complete | ☐ |
| 8 | **Human Decision**: Code approved | ☐ |
