# Design Definition — API Specification

> *AI-generated — implied from [../DESIGN.md](../DESIGN.md)*

## GET /api/questions

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "text": "What is 2 + 2?",
    "options": ["3", "4", "5"]
  }
]
```

## POST /api/answers

**Request:**
```json
{
  "questionId": 1,
  "selectedOption": 1
}
```

**Response:** 200 OK
```json
{
  "correct": true,
  "correctOption": 1
}
```

**Error:** 404 Not Found (question not found)
