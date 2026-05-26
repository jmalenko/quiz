# Verification — Detailed

> *AI-generated — implied from [../VERIFICATION.md](../VERIFICATION.md) and [../GOVERNANCE.md](../GOVERNANCE.md)*

## Test Plan

### Scope

All 11 system requirements (SR-01 – SR-11) from process 03 are verified.

### Test Levels Executed

| Level | Specifications defined in | Framework |
|---|---|---|
| Unit — backend | 07 Implementation, detailed/IMPLEMENTATION_BACKEND.md | JUnit 5 + Mockito |
| Unit — frontend | 07 Implementation, detailed/IMPLEMENTATION_FRONTEND.md | Vitest + React Testing Library |
| Integration | 08 Integration, detailed/INTEGRATION_DETAILED.md | Spring Boot Test + Testcontainers + REST-assured |
| End-to-End | This document | Playwright |

### Test Environment

- Full system started via docker-compose (defined in process 08 Integration; same images as production)
- Playwright runs against `http://localhost` (frontend container port 80)
- Testcontainers manages backend container lifecycle for integration tests
- No external network dependencies

---

## End-to-End Test Cases

### TC-01.1 — Question displayed with text and options

```
Source: SR-01 / AC-01.1
Precondition: System is running; browser is open
Steps:
  1. Navigate to http://localhost
Expected result: Question text is visible; at least 2 answer option buttons are displayed
Pass criterion: Page contains one question text element and at least 2 enabled option buttons
```

### TC-01.2 — Answer selection is registered

```
Source: SR-02 / AC-01.2
Precondition: A question is displayed
Steps:
  1. Click one of the answer option buttons
Expected result: The clicked button reflects a selected state; all buttons are disabled
Pass criterion: Clicked button has selected visual state; remaining buttons do not accept clicks
```

### TC-02.1 — Correct answer shown in green; feedback "Correct!"

```
Source: SR-03 / AC-02.1
Precondition: A question is displayed; the correct option index is known from questions.yml
Steps:
  1. Click the correct answer option
Expected result: The selected button turns green; "Correct!" feedback text is visible
Pass criterion: Green CSS class on selected button; text "Correct!" present on page
```

### TC-02.1b — Wrong answer shown in red

```
Source: SR-03 / AC-02.1
Precondition: A question is displayed; a wrong option index is known
Steps:
  1. Click a wrong answer option
Expected result: The selected button turns red
Pass criterion: Red CSS class on selected button
```

### TC-02.2 — Correct answer highlighted when player answers wrong

```
Source: SR-04 / AC-02.2
Precondition: A question is displayed; correct and wrong option indices are known
Steps:
  1. Click a wrong answer option
Expected result: The correct answer button turns green regardless of the player's selection
Pass criterion: Green CSS class on the button corresponding to the correct option index
```

### TC-03.1 — Next question displayed after proceeding

```
Source: SR-05 / AC-03.1
Precondition: Feedback is visible after answering question 1 (not the last question)
Steps:
  1. Click the "Next" button
Expected result: A new question text is displayed; answer buttons are enabled
Pass criterion: Question text element content differs from the previous question; all option buttons are enabled
```

### TC-03.2 — Score summary shown after last question

```
Source: SR-06 / AC-03.2, AC-04.1
Precondition: Feedback is visible after answering the last question
Steps:
  1. Click the "Next" button
Expected result: Score summary is displayed showing correct answers out of total
Pass criterion: Page contains text matching "You got N out of M" where M equals total number of questions
```

### TC-05.1 — New question appears after adding to questions file

```
Source: SR-07 / AC-05.1
Precondition: questions.yml contains N questions; backend is running
Steps:
  1. Add a new question entry to questions.yml
  2. Restart the backend container
  3. Navigate to http://localhost and complete all questions
Expected result: The new question is presented during the quiz
Pass criterion: Score summary shows "out of N+1"; new question text is visible during quiz
```

### TC-05.2 — Edited question shows updated text

```
Source: SR-07 / AC-05.2
Precondition: questions.yml contains a question with known text T; backend is running
Steps:
  1. Edit the question text in questions.yml to T'
  2. Restart the backend container
  3. Navigate to http://localhost
Expected result: Question text T' is displayed; T is no longer present
Pass criterion: Page contains text T'; text T is absent
```

### TC-05.3 — Removed question no longer appears

```
Source: SR-07 / AC-05.3
Precondition: questions.yml contains N questions; backend is running
Steps:
  1. Remove one question entry from questions.yml
  2. Restart the backend container
  3. Navigate to http://localhost and complete all questions
Expected result: Quiz presents N-1 questions
Pass criterion: Score summary shows "out of N-1"
```

### TC-SR-08 — App accessible via browser without installation

```
Source: SR-08
Precondition: System running via docker-compose; no browser plugins installed
Steps:
  1. Open a standard web browser
  2. Navigate to http://localhost
Expected result: Quiz app loads and is fully functional
Pass criterion: Quiz page renders without errors; no plugin, extension, or installation prompt is triggered
```

### TC-SR-09 — Response time under 200ms

```
Source: SR-09
Precondition: System running; browser open
Steps:
  1. Navigate to http://localhost; record time from navigation start to first question rendered
  2. Click an answer option; record time from click to feedback rendered
Expected result: Both measured durations are under 200ms
Pass criterion: Playwright performance.timing measurements for both actions are each < 200ms
```

### TC-SR-10 — No authentication required

```
Source: SR-10
Precondition: System running via docker-compose
Steps:
  1. Navigate directly to http://localhost without any prior session or credentials
Expected result: Quiz page is immediately accessible; no login page or prompt is shown
Pass criterion: First rendered page is the quiz itself; HTTP response to http://localhost is 200
```

### TC-SR-11 — Questions file supports required fields

```
Source: SR-11 / AC-05.1
Precondition: questions.yml contains a question with text, ≥2 options, and a correctOption field
Steps:
  1. Navigate to http://localhost
  2. Locate the question from questions.yml
  3. Submit the correct answer (index matching correctOption in yml)
Expected result: Question text matches yml; all options are rendered; correct answer feedback is triggered by the correct index
Pass criterion: Question text visible matches yml text field; option count matches yml options array length; green feedback shown on the correctOption index
```

---

## Verification Matrix

| SR | Requirement summary | Test Cases |
|---|---|---|
| SR-01 | Display question with ≥2 options | TC-01.1 |
| SR-02 | Register answer selection | TC-01.2 |
| SR-03 | Show correct (green) / wrong (red) feedback | TC-02.1, TC-02.1b |
| SR-04 | Highlight correct answer on wrong submission | TC-02.2 |
| SR-05 | Advance to next question after feedback | TC-03.1 |
| SR-06 | Display score summary after last question | TC-03.2 |
| SR-07 | Load questions from static file | TC-05.1, TC-05.2, TC-05.3 |
| SR-08 | Accessible via browser, no installation | TC-SR-08 |
| SR-09 | Respond within 200ms | TC-SR-09 |
| SR-10 | No authentication required | TC-SR-10 |
| SR-11 | Questions file supports required fields | TC-SR-11 |

All SR-nn have at least one TC-nn. Coverage: **11/11 (100%)**.
