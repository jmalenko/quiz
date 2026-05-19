# Stakeholder Needs and Requirements — Detailed

> *AI-generated — implied from [../STORIES.md](../STORIES.md)*

## US-01: Answer a question

**AC-01.1**\
Given the quiz has started,\
When a question is displayed,\
Then I see the question text and at least 2 answer options.

**AC-01.2**\
Given a question is displayed,\
When I select an answer,\
Then my selection is registered.

## US-02: Get immediate feedback

**AC-02.1**\
Given I have selected an answer,\
When the answer is submitted,\
Then I see a clear indication of correct (green) or wrong (red).

**AC-02.2**\
Given I answered wrong,\
When feedback is shown,\
Then the correct answer is highlighted.

## US-03: Progress through quiz

**AC-03.1**\
Given I have received feedback on my answer,\
When I proceed,\
Then the next question is displayed.

**AC-03.2**\
Given I have answered the last question,\
When I proceed,\
Then the quiz ends and results are shown.

## US-04: See my score

**AC-04.1**\
Given I have completed all questions,\
When the quiz ends,\
Then I see my score as correct answers out of total questions.

## US-05: Manage questions

**AC-05.1**\
Given I have a questions file,\
When I add a new question with text, options, and correct answer,\
Then the new question appears in the quiz.

**AC-05.2**\
Given I have a questions file,\
When I edit an existing question,\
Then the updated question appears in the quiz.

**AC-05.3**\
Given I have a questions file,\
When I remove a question,\
Then it no longer appears in the quiz.
