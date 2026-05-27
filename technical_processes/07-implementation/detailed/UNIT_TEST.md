# Unit Tests — Execution Guide

> *Companion to [IMPLEMENTATION_BACKEND.md](IMPLEMENTATION_BACKEND.md) and [IMPLEMENTATION_FRONTEND.md](IMPLEMENTATION_FRONTEND.md)*

Unit tests are defined in process 07 Implementation and executed locally by the developer as the first quality gate before integration.

---

## Prerequisites

| Tool | Minimum version | Purpose |
|------|----------------|---------|
| Java (JDK) | 17 | Compile and run backend tests |
| Maven | 3.9 | Backend build tool |
| Node.js | 18 | Frontend test runner |
| npm | 9 | Frontend package manager |

---

## Backend Unit Tests

**Framework:** JUnit 5 + Mockito + `@WebMvcTest`  
**Location:** `containers/backend/src/test/java/com/quiz/`

### Test classes

| Class | Type | Tests |
|-------|------|-------|
| `QuestionRepositoryTest` | Plain unit | 3 |
| `QuestionServiceTest` | Plain unit (Mockito) | 4 |
| `QuizControllerTest` | Spring MVC slice (`@WebMvcTest`) | 3 |

### Run

```bash
mvn test -f containers/backend/pom.xml
```

Checkstyle is also enforced during the `validate` phase — the build fails on any style violation before tests are run.

### Expected output

```
[INFO] Tests run: 10, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

### Run a single test class

```bash
mvn test -Dtest=QuestionServiceTest -f containers/backend/pom.xml
```

---

## Frontend Unit Tests

**Framework:** Vitest 3 + React Testing Library + jsdom  
**Location:** `containers/frontend/src/test/`

### Test files

| File | Component under test | Tests |
|------|---------------------|-------|
| `AnswerButton.test.jsx` | `AnswerButton` | 4 |
| `QuestionCard.test.jsx` | `QuestionCard` | 4 |
| `Feedback.test.jsx` | `Feedback` | 4 |
| `ScoreSummary.test.jsx` | `ScoreSummary` | 3 |

### First-time setup

```bash
npm install --prefix containers/frontend
```

### Run

```bash
npm test --prefix containers/frontend
```

### Expected output

```
Test Files  4 passed (4)
     Tests  15 passed (15)
```

### Watch mode (development)

```bash
npm run test:watch --prefix containers/frontend
```

---

## Combined backend + frontend

Run both suites in sequence from the repository root:

```bash
mvn test -f containers/backend/pom.xml && npm test --prefix containers/frontend
```

**Total: 25 unit tests (10 backend + 15 frontend)**

---

## Quality gate

Unit tests must pass before the artifact is eligible for process 08 Integration.  
See the quality gate definition in [../GOVERNANCE.md](../GOVERNANCE.md).
