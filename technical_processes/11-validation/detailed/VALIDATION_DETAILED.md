# Validation — Detailed

> *AI-generated — implied from [../VALIDATION.md](../VALIDATION.md) and [../GOVERNANCE.md](../GOVERNANCE.md)*

---

## Validation Environment

| Property | Value |
|----------|-------|
| System | Quiz application (deployed by process 10) |
| Base URL | `http://localhost:8888` |
| Interface | Web browser (automated) |
| Backend access | Via frontend reverse proxy only — identical to real user access |

---

## Validation Scenarios

### VS-01: Player can see a question with multiple-choice answers

```
VS-01: Player sees question with multiple-choice answers
Source: US-01 — Answer a question
Precondition: System is deployed and reachable at the base URL
Steps:
  1. Open the application in a browser
  2. Observe the initial screen
Expected outcome: At least one question is displayed with its answer options visible
Pass criterion: The page contains question text and two or more selectable answer options
```

### VS-02: Player receives immediate feedback after answering

```
VS-02: Player receives immediate feedback
Source: US-02 — Get immediate feedback
Precondition: A question with answer options is displayed (VS-01 passed)
Steps:
  1. Select one of the displayed answer options
Expected outcome: Feedback is shown immediately indicating whether the answer was correct or wrong
Pass criterion: A correct/wrong indication is visible within the same interaction, before any navigation occurs
```

### VS-03: Player can progress through the entire quiz

```
VS-03: Player progresses through all questions
Source: US-03 — Progress through quiz
Precondition: At least two questions exist; first question displayed (VS-01 passed)
Steps:
  1. Answer the first question
  2. Navigate to the next question
  3. Repeat until the last question has been answered
Expected outcome: Each question is presented in sequence; the player is not stuck on one question
Pass criterion: All questions are reachable and answerable in a single session without reloading the page
```

### VS-04: Player sees their total score at the end of the quiz

```
VS-04: Player sees total score
Source: US-04 — See my score
Precondition: The player has answered all questions (VS-03 passed)
Steps:
  1. Answer all questions in the quiz
  2. Observe the screen after the final question
Expected outcome: A score is displayed showing how well the player did
Pass criterion: After the last question is answered, a score or result summary is visible on screen
```

### VS-05: Author can change quiz content without touching the application

```
VS-05: Author manages questions via the questions file
Source: US-05 — Manage questions
Precondition: System is running; questions file is accessible on the host
Steps:
  1. Note the number of questions currently shown in the application
  2. Edit the questions file: add a new question
  3. Restart the backend service (without rebuilding the image)
  4. Reload the application in a browser
Expected outcome: The new question appears in the quiz without any code change or image rebuild
Pass criterion: The question count increased by one and the new question is displayed during the quiz
```

---

## Validation Matrix

| Story | Title | Validation Scenario(s) | Coverage |
|-------|-------|------------------------|---------|
| US-01 | Answer a question | VS-01 | ✅ |
| US-02 | Get immediate feedback | VS-02 | ✅ |
| US-03 | Progress through quiz | VS-03 | ✅ |
| US-04 | See my score | VS-04 | ✅ |
| US-05 | Manage questions | VS-05 | ✅ |

All 5 stakeholder needs are covered.

---

## Pass/Fail Criteria Summary

All five validation scenarios must pass. A single failure means the quality gate is not cleared and the system does not satisfy stakeholder needs for this release.

---

## Validation Report

The Validation Report is produced automatically at the end of each validation run. It records:
- The base URL validated against
- Each VS-nn result (PASS / FAIL)
- Overall verdict
- Timestamp and pipeline run reference

No human sign-off is required. A fully passing run constitutes approval.
