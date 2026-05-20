# System Analysis — High Level

## Risk Assessment

| ID | Risk | Likelihood | Impact | Treatment |
|----|------|-----------|--------|-----------|
| R-01 | YAML file malformed → app crashes | Low | High | Validate at startup, fail fast with clear error |
| R-02 | Frontend can't reach backend | Low | High | nginx proxy config; health check endpoint |
| R-03 | Correct answer exposed in API response | Medium | Medium | QuestionDto excludes correctOption (by design) |
| R-04 | No questions in file | Low | Medium | Return empty quiz with user-friendly message |
| R-05 | Browser caching stale questions | Low | Low | Cache-control headers |

## Decision

All risks are Low/Medium with straightforward mitigations. No blockers.\
**Proceed to implementation.**
