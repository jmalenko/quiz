# Stakeholder Needs and Requirements — Detailed

> *AI-generated — implied from [../STORIES.md](../STORIES.md)*

## US-01: Answer a question

As a Player,\
I want to see a question with multiple-choice answers,\
so that I can test my knowledge.

### Acceptance Criteria

Given the quiz has started,\
When a question is displayed,\
Then I see the question text and at least 2 answer options.

Given a question is displayed,\
When I select an answer,\
Then my selection is registered.

## US-02: Get immediate feedback

As a Player,\
I want to know immediately if my answer is correct or wrong,\
so that I can learn from my mistakes.

### Acceptance Criteria

Given I have selected an answer,\
When the answer is submitted,\
Then I see a clear indication of correct (green) or wrong (red).

Given I answered wrong,\
When feedback is shown,\
Then the correct answer is highlighted.

## US-03: Progress through quiz

As a Player,\
I want to move to the next question after answering,\
so that I can complete the entire quiz.

### Acceptance Criteria

Given I have received feedback on my answer,\
When I proceed,\
Then the next question is displayed.

Given I have answered the last question,\
When I proceed,\
Then the quiz ends and results are shown.

## US-04: See my score

As a Player,\
I want to see my total score at the end,\
so that I know how well I did.

### Acceptance Criteria

Given I have completed all questions,\
When the quiz ends,\
Then I see my score as correct answers out of total questions.

## US-05: Manage questions

As an Author,\
I want to add, edit, and remove quiz questions from a file,\
so that I can maintain the quiz content without a UI.

### Acceptance Criteria

Given I have a questions file,\
When I add a new question with text, options, and correct answer,\
Then the new question appears in the quiz.

Given I have a questions file,\
When I edit an existing question,\
Then the updated question appears in the quiz.

Given I have a questions file,\
When I remove a question,\
Then it no longer appears in the quiz.
