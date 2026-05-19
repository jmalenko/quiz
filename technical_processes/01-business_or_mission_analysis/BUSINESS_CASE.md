# Business or Mission Analysis — High Level

## 1. Problem Statement

There is no simple, self-hosted quiz application that can be fully AI-generated and automated end-to-end (from code to deployment).

Current situation: quiz applications exist (Kahoot, Google Forms) but they are SaaS products that cannot be self-hosted, and none demonstrate a fully AI-generated software lifecycle.

## 2. Stakeholder Analysis
| Stakeholder | Role | Interest |
|-------------|------|----------|
| Player | End user | Answer questions, get immediate correct/wrong feedback |
| Author | Content creator | Create and manage quiz questions |

## 3. Business Need
A quiz web application where:
- The user sees a question with multiple-choice answers
- The user picks one answer
- The system immediately indicates correct or wrong
- The system moves to the next question

The Author can create and manage questions.

## 4. Desired Outcome
A fully automated, end-to-end delivered system to which engineer enters only high-level information.

Success = the entire system is generated, tested, and deployed with only high-level human input at each process stage.

## 5. Constraints and Assumptions
| Type | Description                                                              |
|------|--------------------------------------------------------------------------|
| Technology | web frontend |
| Goal | Maximize AI generation — automate everything                             |
| Assumption | Questions are loaded from a static source (no admin UI needed initially) |
| Assumption | No user management |

## 6. Feasibility Assessment
| Dimension | Assessment |
|-----------|-----------|
| Technical | Feasible — all technologies are mature and well-documented |
| Economic | Low cost — AI-generated, no licensing fees for chosen stack |
| Operational | Feasible — Docker + OpenTofu enable fully automated deployment |
| Schedule | Low risk — simple domain, well-understood problem |
