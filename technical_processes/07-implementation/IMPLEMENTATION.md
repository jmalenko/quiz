# Implementation — High Level

## Containers

### Backend — `/containers/backend`

- **Build tool:** Maven
- **Framework:** Spring Boot 3, Java 21
- **Libraries:**
  - OpenAPI generator Maven plugin (controller interfaces + DTOs from openapi.yml)
  - SnakeYAML (questions file parsing)
- **Test frameworks:** JUnit 5, Mockito (via spring-boot-starter-test)
- **Coding standard:** Google Java Style Guide (Checkstyle plugin)
- **Dockerfile:** multi-stage build (Maven build → JRE runtime)

### Frontend — `/containers/frontend`

- **Build tool:** npm + Vite
- **Framework:** React 18, functional components + hooks
- **Libraries:**
  - OpenAPI generator CLI (DTOs/type definitions from openapi.yml)
- **Test frameworks:** Vitest, React Testing Library
- **Coding standard:** Airbnb JavaScript Style Guide (ESLint)
- **Dockerfile:** multi-stage build (npm build → nginx serving static assets)
