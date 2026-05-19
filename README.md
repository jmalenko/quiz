# AI-Generated Software System — Governance Framework

## Purpose

This repository defines the **complete governance system** for building software that is predominantly AI-generated, with only key human decisions as inputs. It establishes the rules, templates, quality gates, and traceability mechanisms that ensure the AI-produced artifacts are correct, consistent, and auditable.

## Philosophy

> **Humans decide WHAT and WHY. AI decides HOW.**

The human provides:
- Business intent and constraints
- Acceptance criteria
- Go/No-Go decisions at quality gates

The AI produces:
- Requirements formalization
- Functional specifications
- Architecture & detailed design
- Source code
- Tests
- Deployment artifacts

## Lifecycle Phases

| Phase | Folder | Human Input | AI Output |
|-------|--------|-------------|-----------|
| Principles | `00-principles/` | Vision, values, constraints | Formalized principles document |
| Requirements | `10-requirement/` | User stories, acceptance criteria | Structured requirements (SRS) |
| Functional Spec | `20-functional_specification/` | Review & approve | Functional specification document |
| Design | `40-design/` | Technology choices, constraints | Architecture & detailed design |
| Implementation | `50-implementation/` | Review & approve | Source code |
| Test Implementation | `60-test_implementation/` | Critical test scenarios | Test code & test plans |
| Deployment | `80-deployment/` | Target environment info | Deployment scripts & configs |
| Test Execution | `90-test_execution/` | Go/No-Go decision | Test reports & evidence |

## How to Use This System

1. **Start at `00-principles/`** — Fill in the `USER_INPUT.md` template with your vision
2. **Progress through each phase** — The AI generates artifacts; you review at quality gates
3. **Never skip a quality gate** — Each gate in `GOVERNANCE.md` must be passed before proceeding
4. **Maintain traceability** — Every artifact must trace back to a requirement

## Key Documents

| Document | Purpose |
|----------|---------|
| [GOVERNANCE.md](GOVERNANCE.md) | Process rules, roles, quality gates |
| [00-principles/USER_INPUT.md](00-principles/USER_INPUT.md) | Starting point — your vision |
| [TRACEABILITY.md](TRACEABILITY.md) | Cross-phase traceability matrix |
| [DECISION_LOG.md](DECISION_LOG.md) | Record of all human decisions |

## Getting Started

```bash
# 1. Fill in your project vision
#    Edit: 00-principles/USER_INPUT.md

# 2. The AI will generate all downstream artifacts
#    following the governance rules in GOVERNANCE.md

# 3. Review and approve at each quality gate
#    Record decisions in DECISION_LOG.md
```

## Governance Principles

1. **Traceability** — Every artifact traces to a requirement
2. **Minimalism** — Human input is minimal but decisive
3. **Quality Gates** — No phase proceeds without explicit approval
4. **Transparency** — All AI decisions are documented and justified
5. **Reproducibility** — Given the same inputs, the AI produces consistent outputs
