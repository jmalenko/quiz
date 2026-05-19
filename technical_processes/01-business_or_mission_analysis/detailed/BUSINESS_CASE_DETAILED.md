# Business or Mission Analysis — Detailed

> *AI-generated — implied from [../BUSINESS_CASE.md](../BUSINESS_CASE.md)*

## 1. Problem Statement — Expanded

### Current State
- Quiz platforms (Kahoot, Quizlet, Google Forms) are SaaS-only — no self-hosting
- No existing quiz system demonstrates a fully AI-generated software lifecycle
- Building software manually is slow and expensive; AI can accelerate it but lacks governance

### Gap
There is no reference implementation of an AI-governed, end-to-end generated application that is simple enough to validate the governance framework yet complete enough to be useful.

### Opportunity
A quiz application serves as the ideal proof-of-concept: small domain, well-understood problem, yet requires all lifecycle artifacts (frontend, backend, tests, deployment).

## 2. Stakeholder Analysis — Expanded

### Player
| Attribute | Detail |
|-----------|--------|
| Description | Any person who wants to answer quiz questions |
| Goals | Learn, practice, test knowledge; get instant feedback |
| Pain points | Slow feedback loops, complex registration, cluttered UIs |
| Success criteria | Can complete a quiz from start to finish without friction |
| Volume | Multiple concurrent users (v2+); single user acceptable for v1 |

### Author
| Attribute | Detail |
|-----------|--------|
| Description | Person who creates quiz content (questions + answers) |
| Goals | Easily add/edit/remove questions; define correct answers |
| Pain points | Complex CMS tools, no preview, error-prone manual editing |
| Success criteria | Can manage questions via a static file without a UI |
| Access method | File-based (v1); admin UI (future) |

## 3. Business Need — Detailed Scenarios

### Scenario 1: Player takes a quiz
1. Player opens the web application
2. System presents the first question with multiple-choice answers
3. Player selects one answer
4. System immediately shows correct (green) or wrong (red) feedback
5. System automatically advances to the next question
6. After the last question, system shows a summary (score)

### Scenario 2: Author manages questions
1. Author edits a questions file
2. Author redeploys (or application hot-reloads)
3. New questions are available to Players

## 4. Desired Outcome — Breakdown

The system must be fully automated end-to-end. The engineer enters only high-level information at each process stage; AI generates everything else.

| Concern | Required |
|---------|----------|
| Frontend | Web application for Player interaction |
| Backend | API serving questions and evaluating answers |
| Data | Static question storage (no database in v1) |
| Testing | Unit tests + end-to-end UI tests |
| Containerization | Packaged for deployment |
| Infrastructure | Infrastructure-as-code |
| CI/CD | Automated build/test/deploy pipeline |

Technology choices are deferred to Architecture Definition (Process 04).

## 5. Constraints and Assumptions — Detailed

| ID | Type | Description | Rationale |
|----|------|-------------|-----------|
| C-01 | Technology | Web frontend | Cross-platform accessibility |
| C-02 | Goal | Maximize AI generation | Automate everything; human provides only high-level input |
| A-01 | Assumption | No admin UI in v1 | Questions managed via file |
| A-02 | Assumption | No user management | Anonymous players, no login |
| A-03 | Assumption | Single quiz at a time | No quiz selection in v1 |
| A-04 | Assumption | No persistence of results | Player scores shown but not stored |

## 6. Feasibility Assessment — Detailed

### Technical Feasibility
- The required components (web frontend, backend API, static data, tests, containers, IaC) are all well-understood patterns
- No novel algorithms or complex integrations required
- AI code generation tools are mature enough for this domain

### Economic Feasibility
- Zero licensing cost expected (open-source stack)
- AI generation reduces development time significantly
- Hosting cost: minimal (single container)

### Operational Feasibility
- Containerization ensures consistent environments (dev = prod)
- Infrastructure-as-code enables reproducible deployments
- Automated tests provide confidence in releases
- No 24/7 operations staff needed (simple stateless app)

### Risk Summary
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI generates incorrect code | Medium | Low | Automated tests catch defects; correction flow backtracks |
| Scope creep (user management, analytics) | Medium | Medium | Strict v1 assumptions; defer to future versions |
