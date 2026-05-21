# System Analysis — Detailed

> *AI-generated — implied from [../SYSTEM_ANALYSIS.md](../SYSTEM_ANALYSIS.md) and process 03 System Requirements Definition / process 05 Design Definition outputs*

## Requirements Traceability Matrix

| SR | Requirement | Design Element | Status |
|----|-------------|---------------|--------|
| SR-01 | Display question with 2+ answers | QuestionCard + GET /api/questions | ✓ Covered |
| SR-02 | Register player's answer selection | AnswerButton + App.handleSelect | ✓ Covered |
| SR-03 | Indicate correct (green) or wrong (red) | Feedback component + AnswerButton.correct/wrong | ✓ Covered |
| SR-04 | Highlight correct answer on wrong answer | AnswerButton.correct prop | ✓ Covered |
| SR-05 | Advance to next question after feedback | Feedback.onNext → App.handleNext | ✓ Covered |
| SR-06 | Display score summary after last question | ScoreSummary component | ✓ Covered |
| SR-07 | Load questions from static file | QuestionRepository + questions.yml | ✓ Covered |
| SR-08 | Accessible via web browser | React SPA + nginx container | ✓ Covered |
| SR-09 | Respond within 200ms | In-memory question list, no DB | ✓ Feasible |
| SR-10 | No user authentication | No auth components in design | ✓ Covered |
| SR-11 | Questions file: text, options, correct answer | YAML schema (DESIGN_DATA.md) | ✓ Covered |

**Coverage: 11/11 (100%)**

## Risk Details

### R-01: YAML file malformed
- **Cause:** Author edits file with syntax error
- **Effect:** Application fails to start
- **Mitigation:** Validate YAML at startup; log clear error message; fail fast
- **Residual risk:** Low (Author can fix and redeploy)

### R-02: Frontend can't reach backend
- **Cause:** Misconfigured nginx proxy or container networking
- **Effect:** Quiz won't load
- **Mitigation:** nginx proxy_pass to quiz-backend:8080; docker-compose networking; health endpoint
- **Residual risk:** Low (standard docker-compose setup)

### R-03: Correct answer exposed in API
- **Cause:** API returns correctOption with questions
- **Effect:** Player can cheat
- **Mitigation:** QuestionDto record excludes correctOption field; only revealed in POST /api/answers response
- **Residual risk:** Low (by design, verified in code review)

### R-04: No questions in file
- **Cause:** Empty YAML file or missing questions key
- **Effect:** Empty quiz displayed
- **Mitigation:** Validate at startup; minimum 1 question required
- **Residual risk:** Low

### R-05: Browser caching stale questions
- **Cause:** Browser caches GET /api/questions response
- **Effect:** Updated questions not shown
- **Mitigation:** Set Cache-Control: no-cache header on API responses
- **Residual risk:** Low

## Feasibility Confirmation

All design elements are implementable with the chosen technology stack:
- Spring Boot: mature REST API support
- React: standard component patterns
- YAML parsing: SnakeYAML library (included in Spring Boot)
- Docker/docker-compose: standard containerization
- Playwright Java: supported E2E testing

**No technical blockers identified.**
