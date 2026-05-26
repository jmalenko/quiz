# Implementation Detailed — Backend

> *AI-generated — expanded from [../IMPLEMENTATION.md](../IMPLEMENTATION.md) and [../../05-design_definition/detailed/DESIGN_BACKEND.md](../../05-design_definition/detailed/DESIGN_BACKEND.md)*

## File Structure

```
containers/backend/
├── pom.xml
├── Dockerfile
├── src/
│   ├── main/
│   │   ├── java/com/quiz/
│   │   │   ├── QuizApplication.java
│   │   │   ├── controller/
│   │   │   │   └── QuizController.java
│   │   │   ├── service/
│   │   │   │   └── QuestionService.java
│   │   │   ├── repository/
│   │   │   │   └── QuestionRepository.java
│   │   │   └── model/
│   │   │       └── Question.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── questions.yml
│   └── test/
│       └── java/com/quiz/
│           ├── controller/
│           │   └── QuizControllerTest.java
│           ├── service/
│           │   └── QuestionServiceTest.java
│           └── repository/
│               └── QuestionRepositoryTest.java
└── checkstyle.xml
```

## Build Configuration — pom.xml

### Parent
- `spring-boot-starter-parent` 3.4

### Dependencies
- `spring-boot-starter-web` — REST API
- `snakeyaml` — YAML parsing
- `spring-boot-starter-test` — JUnit 5 + Mockito + Spring test context
- `spring-boot-devtools` — dev convenience (optional)

### Plugins
- `openapi-generator-maven-plugin` — generates controller interfaces + DTOs from `../../technical_processes/05-design_definition/generated/openapi.yml`
  - Generator: `spring`
  - Config: interface only, no implementation generated
  - Output DTOs: `QuestionDto`, `AnswerRequest`, `AnswerResponse`
  - Output interface: `QuestionsApi`, `AnswersApi`
- `maven-checkstyle-plugin` — Google Java Style enforcement
- `spring-boot-maven-plugin` — packaging

### OpenAPI Generator Config
- `interfaceOnly: true` — generates interfaces, not implementations
- `useTags: true` — organizes by tags
- `dateLibrary: java8`
- `sourceFolder: src/main/java`
- Generated sources go to `target/generated-sources/openapi`

## Component Specifications

### QuizApplication.java
- Standard Spring Boot application entry point
- `@SpringBootApplication` annotation
- No custom configuration needed

### QuizController.java
- Implements the generated `QuestionsApi` and `AnswersApi` interfaces
- `@RestController`
- Injects `QuestionService`
- `getQuestions()` → delegates to service, returns `List<QuestionDto>`
- `checkAnswer(AnswerRequest)` → delegates to service, returns `AnswerResponse`

### QuestionService.java
- `@Service`
- Injects `QuestionRepository`
- `getAllQuestions()` → maps `Question` → `QuestionDto` (strips correctOption)
- `checkAnswer(AnswerRequest)` → finds question by ID, compares selectedOption with correctOption, returns `AnswerResponse`
- Throws `ResponseStatusException(404)` if question not found

### QuestionRepository.java
- `@Repository`
- `@PostConstruct` loads `questions.yml` from classpath using SnakeYAML
- Stores `List<Question>` in memory
- `findAll()` → returns all questions
- `findById(Long id)` → returns Optional<Question>

### Question.java
- Plain Java class (not a JPA entity)
- Fields: `Long id`, `String text`, `List<String> options`, `int correctOption`
- Getters/setters (or record)

### application.yml
- `server.port: 8080`
- No database configuration needed

### questions.yml
- Sample questions per data model spec (minimum 3 questions for demo)

## Dockerfile

```dockerfile
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Unit Test Specifications

### QuizControllerTest.java
- Framework: JUnit 5 + `@WebMvcTest` (Spring MVC slice, no full context)
- Mocks: `QuestionService` via `@MockBean`
- Tests:
  - `GET /api/questions` returns 200 with a list of `QuestionDto`
  - `POST /api/answers` with valid payload returns 200 with `AnswerResponse`
  - `POST /api/answers` with unknown question ID returns 404

### QuestionServiceTest.java
- Framework: JUnit 5, plain unit test (no Spring context)
- Mocks: `QuestionRepository` via Mockito `@Mock`
- Tests:
  - `getAllQuestions()` maps `Question` to `QuestionDto` and strips `correctOption`
  - `checkAnswer()` returns correct=true when `selectedOption` matches `correctOption`
  - `checkAnswer()` returns correct=false when `selectedOption` does not match
  - `checkAnswer()` throws `ResponseStatusException(404)` for unknown question ID

### QuestionRepositoryTest.java
- Framework: JUnit 5, plain unit test (no Spring context)
- Tests:
  - `findAll()` returns all questions loaded from `questions.yml`
  - `findById(id)` returns the correct question when ID exists
  - `findById(id)` returns empty Optional when ID does not exist

## Checkstyle Configuration
- Google Java Style Guide XML (standard, unmodified)
- Configured as build failure on violation
