# Phase 10 — System/Software Requirements Definition

> **IEEE/IEC 12207 Process**: 6.4.3 System/Software Requirements Definition Process

## Purpose
Transform stakeholder needs into precise, testable, traceable system and software requirements that define what the system shall do.

## IEEE 12207 Alignment
- **Process**: System/Software Requirements Definition Process
- **Objective**: Transform stakeholder requirements into a set of system/software requirements
- **Key activities**:
  - Define system requirements (functional and non-functional)
  - Define software requirements
  - Analyze requirements for completeness and consistency
  - Verify requirements are feasible and testable
  - Establish requirements baseline

## Inputs
- `../00-stakeholder_needs/STAKEHOLDER_NEEDS.md` — Approved stakeholder needs
- `USER_INPUT.md` — User stories and acceptance criteria

## Outputs (AI Generates)
- `SYSTEM_REQUIREMENTS.md` — System-level requirements (SyRS)
- `SOFTWARE_REQUIREMENTS.md` — Software requirements specification (SRS)
- `INTERFACE_REQUIREMENTS.md` — External interface requirements
- `TRACEABILITY.md` — Requirements-to-Stakeholder-Needs traceability

## AI Generation Rules

1. **Decompose** each stakeholder need (STK-XXX) into system requirements
2. **Classify** requirements:
   - Functional (SYS-FUNC-XXX): what the system shall do
   - Performance (SYS-PERF-XXX): how well it shall perform
   - Interface (SYS-IF-XXX): how it connects to external entities
   - Security (SYS-SEC-XXX): protection requirements
   - Data (SYS-DATA-XXX): data handling requirements
3. **Ensure each requirement is**:
   - Atomic (one requirement, one concept)
   - Testable (can be verified by test or inspection)
   - Unambiguous (one interpretation only)
   - Traceable (links to at least one STK-XXX)
4. **Use "shall"** for mandatory, "should" for desirable, "may" for optional
5. **Assign priority**: MoSCoW (Must, Should, Could, Won't)
6. **Identify derived requirements** (technical necessities not from stakeholders)

## Quality Gate: QG2 (Requirements → Architecture)

| # | Criterion | Check |
|---|-----------|-------|
| 1 | All stakeholder needs covered by ≥1 requirement | ☐ |
| 2 | Each requirement uniquely identified | ☐ |
| 3 | Each requirement is testable | ☐ |
| 4 | No conflicting requirements | ☐ |
| 5 | Priority assigned (MoSCoW) | ☐ |
| 6 | Traceability to STK-XXX complete | ☐ |
| 7 | Requirements baseline established | ☐ |
| 8 | **Human Decision**: Requirements approved | ☐ |

## Artifact Template

```markdown
# SYS-FUNC-XXX: [Requirement Title]

**Statement**: The system shall [precise, testable statement]
**Rationale**: [Why — traces to business value]
**Source**: STK-XXX
**Priority**: MUST / SHOULD / COULD / WONT
**Verification Method**: Test / Inspection / Analysis / Demonstration
**Acceptance Criterion**: [Measurable condition]
**Status**: DRAFT / BASELINED / IMPLEMENTED / VERIFIED
```
