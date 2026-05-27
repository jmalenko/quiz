# E2E Tests — Playwright

End-to-end tests covering all system requirements (SR-01 – SR-11) as specified in
`technical_processes/09-verification/detailed/VERIFICATION_DETAILED.md`.

## Precondition

The full docker-compose stack must be running on `http://localhost`:

```bash
docker compose up -d
```

## Running the tests

```bash
npm install
npx playwright test
```

## Test cases implemented

| Test | SR |
|------|----|
| TC-01.1 — Question displayed with text and options | SR-01 |
| TC-01.2 — Answer selection disables all buttons | SR-02 |
| TC-02.1 — Correct answer shows "Correct!" | SR-03 |
| TC-02.1b — Wrong answer shows "Wrong" | SR-03 |
| TC-02.2 — Wrong answer reveals correct option in feedback | SR-04 |
| TC-03.1 — Next button advances to next question | SR-05 |
| TC-03.2 — Score summary shown after last question | SR-06 |
| TC-SR-08 — App accessible via browser without installation | SR-08 |
| TC-SR-09 — Response time measurement | SR-09 |
| TC-SR-10 — No authentication required | SR-10 |
| TC-SR-11 — Questions file fields honoured | SR-11 |

## Notes

- TC-05.x tests (add/edit/remove questions from yml) require manual steps (file edit + container restart)
  and are validated manually against the pass criteria in VERIFICATION_DETAILED.md.
- IT-05 (nginx proxy) is validated as part of the docker-compose stack smoke test.
