# Architecture Definition — High Level

## C4 Level 1 — Context

Actors:
- **Player** — uses the web application to take quizzes
- **Author** — edits the YAML questions file

The system has no external dependencies or integrations.

## Technology Decisions

### ADR-01: Backend framework
Decision: Java + Spring Boot\
Alternatives: Quarkus, Micronaut, plain Java\
Rationale: Mature ecosystem, extensive documentation, AI generates Spring Boot well

### ADR-02: Frontend framework
Decision: React (plain HTML rendering), served by nginx\
Alternatives: Vue, Angular, vanilla JS\
Rationale: Component-based, widely supported, simple for a single-page quiz

### ADR-03: Data format
Decision: YAML\
Alternatives: JSON, database\
Rationale: Human-readable, easy for Author to edit, no infrastructure needed

### ADR-04: Deployment
Decision: Docker (packaging) + OpenTofu (infrastructure) + docker-compose (orchestration) \
Alternatives: bare metal, Kubernetes, cloud PaaS\
Rationale: Portable, reproducible, infrastructure-as-code

### ADR-05: Test technologies
Decision: JUnit + Mockito (unit/component), REST Assured (integration), Playwright Java (E2E)\
Alternatives: TestNG, WireMock, Cypress, Selenium\
Rationale: Unified Java test stack — all tests run via Maven; Playwright supports multi-browser including Safari
