# Design Definition — High Level

## Backend Components

| Component | Layer | Responsibility |
|-----------|-------|---------------|
| QuizController | Controller | REST endpoints for quiz flow |
| QuestionService | Service | Loads and serves questions, evaluates answers |
| QuestionRepository | Repository | Reads and parses YAML file |
| Question | Model | Domain object: text, options, correct answer |

## Frontend Components

| Component | Responsibility |
|-----------|---------------|
| App | Root component, manages quiz state (current question, score) |
| QuestionCard | Displays question text and answer options |
| AnswerButton | Individual answer option, handles selection |
| Feedback | Shows correct/wrong indication |
| ScoreSummary | Displays final score |

## API Contract

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | /api/questions | — | List of questions (without correct answers) |
| POST | /api/answers | { questionId, selectedOption } | { correct: boolean, correctOption } |

## Data Model

Questions YAML structure:
```yaml
questions:
  - id: 1
    text: "Question text"
    options:
      - "Option A"
      - "Option B"
      - "Option C"
    correctOption: 0
```
