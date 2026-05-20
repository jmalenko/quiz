# System/Software Requirements — Detailed

> *AI-generated — implied from [../SYSTEM_REQUIREMENTS.md](../SYSTEM_REQUIREMENTS.md) and [../../02-stakeholder_needs_and_requirements_definition/detailed/ACCEPTANCE_CRITERIA.md](../../02-stakeholder_needs_and_requirements_definition/detailed/ACCEPTANCE_CRITERIA.md)*

## Functional Requirements

SR-01: The system shall display a question with at least 2 multiple-choice answers.\
Source: AC-01.1

SR-02: The system shall register the player's answer selection.\
Source: AC-01.2

SR-03: The system shall indicate correct (green) or wrong (red) immediately after answer submission.\
Source: AC-02.1

SR-04: The system shall highlight the correct answer when the player answers wrong.\
Source: AC-02.2

SR-05: The system shall advance to the next question after feedback is shown.\
Source: AC-03.1

SR-06: The system shall display a score summary after the last question.\
Source: AC-03.2, AC-04.1

SR-07: The system shall load questions from a static file.\
Source: AC-05.1, AC-05.2, AC-05.3

## Non-Functional Requirements

SR-08: The system shall be accessible via a web browser without installation.\
Source: C-01

SR-09: The system shall respond to user actions within 200ms (excluding network latency).\
Source: SYSTEM_REQUIREMENTS.md #Non-Functional Requirements

SR-10: The system shall work without user authentication.\
Source: A-02

## Data Requirements

SR-11: The questions file shall support: question text, answer options (2+), and correct answer indicator.\
Source: AC-05.1
