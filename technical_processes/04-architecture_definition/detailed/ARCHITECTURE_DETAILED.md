# Architecture Definition — Detailed

> *AI-generated — implied from [../ARCHITECTURE.md](../ARCHITECTURE.md)*

## C4 Level 2 — Container Interactions

```
┌─────────┐       HTTP        ┌─────────────────┐                 ┌─────────────────┐
│  Player │ ───────────────── │    Frontend     │                 │                 │
│(browser)│                   │  (React SPA)    │                 │                 │
└─────────┘                   └────────┬────────┘                 │                 │
                                       │ REST API                 │  Questions File │
                                       │ (JSON)                   │     (YAML)      │
                                       ▼                          │                 │
                              ┌─────────────────┐      reads      │                 │
                              │    Backend      │ ─────────────── │                 │
                              │ (Spring Boot)   │                 │                 │
                              └─────────────────┘                 └─────────────────┘
```

### Communication

- Frontend → Backend: REST over HTTP (JSON payloads)
- Backend → Questions File: file read at startup (classpath resource)
- Frontend served as separate container (Node.js / nginx)

## ADR Details

### ADR-01: Backend framework — expanded
**Context:** Need a backend to serve questions via REST API. Must be well-documented for AI generation.\
**Options considered:**
- Spring Boot — massive ecosystem, best AI generation support, starter templates
- Quarkus — fast startup, less AI training data available
- Micronaut — compile-time DI, smaller community
- Plain Java (HttpServer) — no framework overhead but more boilerplate

**Decision:** Spring Boot 3.x with Java 21\
**Consequences:** Larger artifact size, slower startup (acceptable for a persistent service)

### ADR-02: Frontend framework — expanded
**Context:** Need a reactive UI for quiz interaction. Must support component-based architecture.\
**Options considered:**
- React — largest ecosystem, plain JSX rendering, AI generates well
- Vue — simpler learning curve, smaller ecosystem
- Angular — full framework, overkill for a quiz
- Vanilla JS — no dependencies but harder to maintain

**Decision:** React 18+ with functional components and hooks\
**Consequences:** Requires Node.js build tooling; output is static HTML/JS/CSS served by nginx in production

### ADR-03: Data format — expanded
**Context:** Author needs to create/edit questions without a UI.\
**Options considered:**
- YAML — human-readable, supports comments, Author-friendly
- JSON — widely supported but no comments, harder to edit manually
- Database — requires infrastructure, overkill for static content

**Decision:** YAML file bundled with the application\
**Consequences:** Questions change requires redeployment (acceptable for v1)

### ADR-04: Deployment — expanded
**Context:** Need reproducible, automated deployment.\
**Options considered:**
- Docker + docker-compose + OpenTofu — containerized, orchestrated locally, IaC for cloud
- Bare metal — manual, not reproducible
- Kubernetes — orchestration overkill for single service
- Cloud PaaS — vendor lock-in

**Decision:** Docker for containerization, docker-compose for local orchestration, OpenTofu for cloud infrastructure\
**Consequences:** Requires Docker installed; OpenTofu manages remote state

### ADR-05: Test technologies — expanded
**Context:** Need automated testing at multiple levels per test pyramid. Prefer unified stack (all Java/Maven).\
**Options considered:**
- JUnit 5 + Mockito — standard Java unit/component testing
- TestNG — alternative to JUnit, less popular
- REST Assured — fluent API testing for Spring Boot
- WireMock — HTTP mocking (complementary, not alternative)
- Playwright (Java) — multi-browser E2E, Java bindings, unified stack
- Cypress — JavaScript only, requires separate Node.js project
- Selenium — older, slower, more brittle

**Decision:** JUnit 5 + Mockito + REST Assured + Playwright (Java)\
**Consequences:** All tests run via Maven; no separate Node.js test project needed; supports Chrome, Firefox, Safari

## Deployment Topology

```
docker-compose.yml
├── quiz-frontend (nginx, port 80)
│   ├── serves React static assets at /*
│   └── proxies /api/* to quiz-backend
└── quiz-backend (Spring Boot, port 8080)
    └── serves REST API at /api/*
```

Production (OpenTofu):
- Cloud VM provisioned by OpenTofu
- Docker installed on VM
- docker-compose deployed
