# AI-Generated Software System — Governance Framework

## Standard: IEEE/IEC 12207:2017

This repository defines the **complete governance system** for building software that is predominantly AI-generated, following the **IEEE/IEC 12207 Software Lifecycle Processes** standard in a waterfall execution model.

## Philosophy

> **Humans decide WHAT and WHY. AI decides HOW.**

The human provides: business intent, constraints, acceptance criteria, technology preferences, and Go/No-Go decisions at quality gates.

The AI produces: formal requirements, architecture, design, source code, integration, verification, validation, deployment, and operational artifacts.

## IEEE 12207 Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    IEEE/IEC 12207 WATERFALL                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  00-stakeholder_needs ──► Stakeholder Needs & Requirements (6.4.2)  │
│         │                                                           │
│         ▼                                                           │
│  10-requirements ──────► System/Software Requirements (6.4.3)       │
│         │                                                           │
│         ▼                                                           │
│  20-architecture ──────► Architecture Definition (6.4.4)            │
│         │                                                           │
│         ▼                                                           │
│  30-design ────────────► Design Definition (6.4.5)                  │
│         │                                                           │
│         ▼                                                           │
│  40-implementation ────► Implementation (6.4.6)                     │
│         │                                                           │
│         ▼                                                           │
│  50-integration ───────► Integration (6.4.7)                        │
│         │                                                           │
│         ▼                                                           │
│  60-verification ──────► Verification (6.4.8)                       │
│         │                                                           │
│         ▼                                                           │
│  70-validation ────────► Validation (6.4.9)                         │
│         │                                                           │
│         ▼                                                           │
│  80-transition ────────► Transition (6.4.10)                        │
│         │                                                           │
│         ▼                                                           │
│  90-operation ─────────► Operation (6.4.11)                         │
│         │                                                           │
│         ▼                                                           │
│  95-maintenance ───────► Maintenance (6.4.12)                       │
│         │                                                           │
│         └──────── (feeds back into Phase 10-80 as needed) ──────►   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Lifecycle Phases

| # | Phase | IEEE 12207 | Folder | Human Input | Quality Gate |
|---|-------|-----------|--------|-------------|--------------|
| 00 | Stakeholder Needs | 6.4.2 | `00-stakeholder_needs/` | Vision, stakeholders, needs | QG1 |
| 10 | Requirements | 6.4.3 | `10-requirements/` | User stories, NFRs | QG2 |
| 20 | Architecture | 6.4.4 | `20-architecture/` | Technology preferences | QG3 |
| 30 | Design | 6.4.5 | `30-design/` | Review & approve | QG4 |
| 40 | Implementation | 6.4.6 | `40-implementation/` | Review & approve | QG5 |
| 50 | Integration | 6.4.7 | `50-integration/` | Review | QG6 |
| 60 | Verification | 6.4.8 | `60-verification/` | Review | QG7 |
| 70 | Validation | 6.4.9 | `70-validation/` | Accept criteria, GO/NO-GO | QG8 |
| 80 | Transition | 6.4.10 | `80-transition/` | Environment details | QG9 |
| 90 | Operation | 6.4.11 | `90-operation/` | Review | QG10 |
| 95 | Maintenance | 6.4.12 | `95-maintenance/` | Change requests | QG-M |

## Quality Gates (11 Gates)

| Gate | Transition | Key Question |
|------|-----------|--------------|
| QG1 | 00 → 10 | Are stakeholder needs clear and complete? |
| QG2 | 10 → 20 | Are requirements testable and traceable? |
| QG3 | 20 → 30 | Is the architecture sound and justified? |
| QG4 | 30 → 40 | Is the design implementable? |
| QG5 | 40 → 50 | Does the code match the design? |
| QG6 | 50 → 60 | Are components successfully integrated? |
| QG7 | 60 → 70 | Does the system meet requirements? (Verification) |
| QG8 | 70 → 80 | Does the system satisfy stakeholder needs? (Validation) |
| QG9 | 80 → 90 | Is the system operational? |
| QG10 | 90 → 95 | Is the system operating within SLA? |
| QG-M | 95 → reentry | Is the maintenance release ready? |

## Key Documents

| Document | Purpose |
|----------|---------|
| [GOVERNANCE.md](GOVERNANCE.md) | Process rules, roles, all quality gates |
| [AI_GUIDELINES.md](AI_GUIDELINES.md) | AI behavior rules and prompt templates |
| [TRACEABILITY.md](TRACEABILITY.md) | Cross-phase traceability matrix |
| [DECISION_LOG.md](DECISION_LOG.md) | Record of all human decisions |
| [QUICKSTART.md](QUICKSTART.md) | Step-by-step guide |

## Getting Started

```bash
# 1. Fill in your stakeholder needs
#    Edit: 00-stakeholder_needs/USER_INPUT.md

# 2. The AI generates all downstream artifacts
#    following GOVERNANCE.md rules

# 3. Review and approve at each quality gate (QG1-QG10)
#    Record decisions in DECISION_LOG.md
```
