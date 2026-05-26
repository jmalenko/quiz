# Verification — High Level

## Scope

All system requirements (SR-nn) derived from process 03 are in scope.

Out of scope:
- Performance load testing (beyond the single-user 200 ms response time requirement)
- Security / penetration testing
- Accessibility testing

## Test Approach

Fully automated. No manual test execution.

| Test Level | Tooling |
|---|---|
| Unit — backend | JUnit 5 + Mockito (Maven Surefire) |
| Unit — frontend | Vitest + React Testing Library |
| Integration | Spring Boot Test + Testcontainers |
| End-to-End | Playwright |

## Environment Constraints

- Tests run inside Docker (same images as production)
- No external services or network dependencies (all dependencies containerized)
- CI pipeline executes all test levels on every push
