# Human & AI-Generated Software System — Governance Framework

This repository defines the **complete governance system** for building software that is predominantly AI-generated.

## Philosophy

> **Humans decide WHAT and WHY. AI decides HOW.**

All rules governing this project are defined in [GOVERNANCE.md](GOVERNANCE.md).

---

## Lifecycle

### Technical Processes

| Process                                     | Location                                                                                                                                                  | Quality Gate                                            |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| Business or Mission Analysis                | 01-business_or_mission_analysis/[BUSINESS_CASE.md](technical_processes/01-business_or_mission_analysis/BUSINESS_CASE.md)                                  | Is the business case justified?                         |
| Stakeholder Needs & Requirements Definition | 02-stakeholder_needs_and_requirements_definition/[STORIES.md](technical_processes/02-stakeholder_needs_and_requirements_definition/STORIES.md)            | Are stakeholder needs clear and complete?               |
| Systems/Software Requirements Definition    | 03-system_software_requirements_definition/[SYSTEM_REQUIREMENTS.md](technical_processes/03-system_software_requirements_definition/SYSTEM_REQUIREMENTS.md) | Are requirements testable and traceable?                |
| Architecture Definition                     | 04-architecture_definition/[ARCHITECTURE.md](technical_processes/04-architecture_definition/ARCHITECTURE.md)                                              | Is the architecture sound and justified?                |
| Design Definition                           | 05-design_definition/[DESIGN.md](technical_processes/05-design_definition/DESIGN.md)                                                                      | Is the design implementable?                            |
| System Analysis                             | 06-system_analysis/[SYSTEM_ANALYSIS.md](technical_processes/06-system_analysis/SYSTEM_ANALYSIS.md)                                                        | Is the system analysis satisfactory (risks acceptable)? |
| Implementation                              | 07-implementation/[IMPLEMENTATION.md](technical_processes/07-implementation/IMPLEMENTATION.md)                                                            | Does the code match the design?                         |
| Integration                                 | 08-integration/[INTEGRATION.md](technical_processes/08-integration/INTEGRATION.md)                                                                        | Are components successfully integrated?                 |
| Verification                                | 09-verification/[VERIFICATION.md](technical_processes/09-verification/VERIFICATION.md), [TESTING.md](technical_processes/09-verification/TESTING.md)      | Does the system meet requirements?                      |
| Transition                                  | 10-transition/[TRANSITION.md](technical_processes/10-transition/TRANSITION.md)                                                                            | Is the system deployed and operational?                 |
| Validation                                  | `technical_processes/11-validation/`                                                                                                                      | Does the system satisfy stakeholder needs?              |
| Operation                                   | `technical_processes/12-operation/`                                                                                                                       | Is the system operating within SLA?                     |
| Maintenance                                 | `technical_processes/13-maintenance/`                                                                                                                     | Is the maintenance release ready?                       |
| Disposal                                    | `technical_processes/14-disposal/`                                                                                                                        | —                                                       |

### Technical Management Processes

| Process | Location                                                            |
|---------|---------------------------------------------------------------------|
| Project Planning | `technical_management_processes/01-project_planning/`               |
| Project Assessment and Control | `technical_management_processes/02-project_assessment_and_control/` |
| Decision Management | `technical_management_processes/03-decision_management/`            |
| Risk Management | `technical_management_processes/04-risk_management/`                |
| Configuration Management | `technical_management_processes/05-configuration_management/`       |
| Information Management | `technical_management_processes/06-information_management/`         |
| Measurement | `technical_management_processes/07-measurement/`                    |
| Quality Assurance | `technical_management_processes/08-quality_assurance/`              |

