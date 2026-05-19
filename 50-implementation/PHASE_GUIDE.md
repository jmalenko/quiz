# Phase 50 — Implementation

## Purpose
Generate production-quality source code that faithfully implements the approved design.

## Inputs
- `../40-design/ARCHITECTURE.md` — System architecture
- `../40-design/DETAILED_DESIGN.md` — Component designs
- `../40-design/API_DESIGN.md` — API contracts
- `../40-design/DATA_DESIGN.md` — Database schema

## Outputs (AI Generates)
- Source code organized by component
- `BUILD.md` — Build instructions
- `CODE_STANDARDS.md` — Coding standards applied
- `TRACEABILITY.md` — Code-to-Design traceability

## Directory Structure

```
50-implementation/
├── PHASE_GUIDE.md          (this file)
├── BUILD.md                (build instructions)
├── CODE_STANDARDS.md       (coding standards)
├── TRACEABILITY.md         (code-to-design mapping)
└── src/                    (source code root)
    ├── [component-1]/
    ├── [component-2]/
    └── ...
```

## AI Generation Rules

1. **Read** all approved design documents
2. **Generate code** following these principles:
   - One component = one module/package
   - Follow SOLID principles
   - Implement defensive programming (input validation, error handling)
   - Include inline documentation (docstrings, JSDoc, etc.)
   - No hardcoded secrets or configuration
3. **Apply coding standards**:
   - Consistent naming conventions
   - Maximum function length: 30 lines
   - Maximum file length: 300 lines
   - Cyclomatic complexity ≤ 10
4. **Generate build configuration**:
   - Dependency management (package.json, pom.xml, requirements.txt, etc.)
   - Build scripts
   - Linting configuration
5. **Implement APIs** exactly as specified in API_DESIGN.md
6. **Implement data access** matching DATA_DESIGN.md schema
7. **Never generate**:
   - Dead code
   - Commented-out code
   - TODO/FIXME without a linked requirement
   - Placeholder implementations without clear marking

## Quality Gate: QG5

Before proceeding to Test Implementation (Phase 60), verify:
- [ ] Code compiles/builds without errors
- [ ] All components from design are implemented
- [ ] API contracts match design exactly
- [ ] Database schema matches data design
- [ ] No critical linting errors
- [ ] No hardcoded secrets
- [ ] Code documentation is complete
- [ ] Human has reviewed and approved

## Code Documentation Standard

```
Every public function/method must have:
- Brief description (1 line)
- Parameter descriptions with types
- Return value description
- Exceptions/errors that can be thrown
- Example usage (for complex functions)
```

## Traceability Entry Template

```markdown
| Source File | Component | Design Element | Requirements |
|-------------|-----------|----------------|--------------|
| src/auth/login.py | Auth Service | DES-003 | REQ-FUNC-001, REQ-FUNC-002 |
```
