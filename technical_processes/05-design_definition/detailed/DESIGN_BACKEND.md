# Design Definition — Backend

> *AI-generated — implied from [../DESIGN.md](../DESIGN.md)*

## Package Structure

```
com.quiz
├── controller/
│   └── QuizController.java
├── service/
│   └── QuestionService.java
├── repository/
│   └── QuestionRepository.java
├── model/
│   ├── Question.java
│   └── dto/
│       ├── QuestionDto.java
│       ├── AnswerRequest.java
│       └── AnswerResponse.java
└── QuizApplication.java
```

## Class Definitions

### QuizController

```java
@RestController
@RequestMapping("/api")
public class QuizController {

    GET /api/questions → List<QuestionDto>
    POST /api/answers → AnswerResponse
}
```

**Dependencies:** QuestionService

### QuestionService

```java
@Service
public class QuestionService {

    List<QuestionDto> getAllQuestions()
    AnswerResponse checkAnswer(AnswerRequest request)
}
```

**Dependencies:** QuestionRepository

### QuestionRepository

```java
@Repository
public class QuestionRepository {

    List<Question> loadQuestions()  // reads YAML at startup
}
```

**Dependencies:** YAML file (classpath resource)

### Question (model)

```java
public class Question {
    Long id;
    String text;
    List<String> options;
    int correctOption;  // 0-based index
}
```

## DTOs

### QuestionDto (response — hides correct answer)

```java
public class QuestionDto {
    Long id;
    String text;
    List<String> options;
    // NO correctOption field
}
```

### AnswerRequest

```java
public class AnswerRequest {
    Long questionId;
    int selectedOption;  // 0-based index
}
```

### AnswerResponse

```java
public class AnswerResponse {
    boolean correct;
    int correctOption;  // revealed after answering
}
```
