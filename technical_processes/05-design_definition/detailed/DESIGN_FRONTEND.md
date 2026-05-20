# Design Definition — Frontend

> *AI-generated — implied from [../DESIGN.md](../DESIGN.md)*

## State Management

App component holds all state (no external state library):

```
state = {
  questions: Question[]      // loaded from API
  currentIndex: number       // which question is displayed
  selectedOption: number | null
  feedback: { correct, correctOption } | null
  score: number
  finished: boolean
}
```

## Component Tree

```
App
├── QuestionCard (question text + options)
│   └── AnswerButton[] (one per option)
├── Feedback (correct/wrong + correct answer)
└── ScoreSummary (final score)
```

## Component Props

| Component | Props |
|-----------|-------|
| QuestionCard | question, onSelect, disabled |
| AnswerButton | text, index, selected, correct, wrong, onClick |
| Feedback | correct, correctOption, onNext |
| ScoreSummary | score, total |

## Flow

1. App calls GET /api/questions on mount
2. App renders QuestionCard for current question
3. Player clicks AnswerButton → App calls POST /api/answers
4. App renders Feedback with result
5. Player clicks "Next" → App advances currentIndex
6. After last question → App renders ScoreSummary
