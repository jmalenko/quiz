# Governance — Detailed Layer

## Identifier Convention

All traceable items use a prefixed ID with hierarchical numbering.

| Prefix | Meaning | Format | Example |
|--------|---------|--------|---------|
| A | Assumption | A-{nn} | A-01 |
| AC | Acceptance Criterion | AC-{story}.{n} | AC-01.1 |
| C | Constraint | C-{nn} | C-01 |
| TC | Test Case | TC-{AC ref} | TC-01.1 |
| US | User Story | US-{nn} | US-01 |

### Rules

- IDs are immutable once assigned. Deleted items leave a gap; IDs are never reused.
- Hierarchical IDs (AC-01.1) reference their parent by prefix (US-01).
- Cross-references use the full ID (e.g., "verifies AC-01.1").
