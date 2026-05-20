# Design Definition — Data Model

> *AI-generated — implied from [../DESIGN.md](../DESIGN.md)*

## YAML Schema

```yaml
# questions.yml
questions:
  - id: 1                    # unique identifier (integer)
    text: "Question text"    # the question (string, required)
    options:                 # answer choices (array, min 2)
      - "Option A"
      - "Option B"
      - "Option C"
    correctOption: 0         # 0-based index into options array
```

## Validation Rules

- `id`: unique positive integer
- `text`: non-empty string
- `options`: array with at least 2 items
- `correctOption`: valid index within options array (0 ≤ n < options.length)
