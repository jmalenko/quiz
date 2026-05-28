// @ts-check
const { test, expect } = require('@playwright/test');
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

/**
 * Validation Suite — Quiz Application
 * Process 11 Validation
 *
 * Each test corresponds to one validation scenario (VS-nn) from
 * technical_processes/11-validation/detailed/VALIDATION_DETAILED.md
 *
 * Precondition: the Quiz application is deployed and reachable at BASE_URL
 *   (default: http://localhost:8888)
 *
 * Questions assumed in the deployed system (from questions.yml):
 *   Q1: "What is the capital of France?" — correct index 1 (Paris)
 *   Q2: "What is 2 + 2?"               — correct index 1 (4)
 *   Q3: "Which planet is the Red Planet?" — correct index 2 (Mars)
 */

// Path to the questions file (volume-mounted into the backend container)
const QUESTIONS_YML = resolve(__dirname, '../../../../../containers/backend/src/main/resources/questions.yml');

// Docker command — use 'docker' on Linux CI, 'wsl docker' on Windows
const DOCKER_CMD = process.env.DOCKER_CMD || 'wsl docker';
const BACKEND_CONTAINER = 'generated-backend-1';

/** Restart the backend and wait until it responds */
function restartBackend() {
  execSync(`${DOCKER_CMD} restart ${BACKEND_CONTAINER}`, { stdio: 'pipe' });
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      execSync(`${DOCKER_CMD} exec ${BACKEND_CONTAINER} wget -qO- http://localhost:8080/api/questions`, { stdio: 'pipe' });
      return;
    } catch (_) {
      try { execSync('ping -n 2 127.0.0.1 > nul 2>&1', { stdio: 'pipe', shell: true }); } catch (_) {}
      try { execSync('sleep 1', { stdio: 'pipe', shell: true }); } catch (_) {}
    }
  }
  throw new Error('Backend did not become healthy after restart');
}

// ─────────────────────────────────────────────────────────────────────────────
// VS-01 — Player sees a question with multiple-choice answers
// Source: US-01 — Answer a question
// ─────────────────────────────────────────────────────────────────────────────
test.describe('VS-01 — Player sees question with answer options (US-01)', () => {

  test('VS-01 — Question text and selectable options are visible on load', async ({ page }) => {
    await page.goto('/');

    // Question text is present
    const question = page.locator('.question-card h2');
    await expect(question).toBeVisible();
    await expect(question).not.toBeEmpty();

    // At least two answer options are available for selection
    const options = page.locator('.answer-button');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      await expect(options.nth(i)).toBeEnabled();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// VS-02 — Player receives immediate feedback after answering
// Source: US-02 — Get immediate feedback
// ─────────────────────────────────────────────────────────────────────────────
test.describe('VS-02 — Immediate feedback on answer (US-02)', () => {

  test('VS-02a — Correct answer shows "Correct!" immediately', async ({ page }) => {
    await page.goto('/');
    // Q1 correct option is index 1 (Paris)
    await page.locator('.answer-button').nth(1).click();
    const feedback = page.locator('.feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText('Correct!');
  });

  test('VS-02b — Wrong answer shows "Wrong" feedback immediately', async ({ page }) => {
    await page.goto('/');
    // Q1 wrong option is index 0 (London)
    await page.locator('.answer-button').nth(0).click();
    const feedback = page.locator('.feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText('Wrong');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// VS-03 — Player can progress through all questions
// Source: US-03 — Progress through quiz
// ─────────────────────────────────────────────────────────────────────────────
test.describe('VS-03 — Player progresses through entire quiz (US-03)', () => {

  test('VS-03 — Each question is reachable and answerable in sequence', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('.question-card h2');
    const firstText = await heading.textContent();

    // Answer first question, advance to second
    await page.locator('.answer-button').first().click();
    await page.locator('.feedback button', { hasText: 'Next' }).click();

    // Second question is different from the first
    const secondText = await heading.textContent();
    expect(secondText).not.toBe(firstText);

    // Options are re-enabled for the next question
    const options = page.locator('.answer-button');
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      await expect(options.nth(i)).toBeEnabled();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// VS-04 — Player sees their score at the end of the quiz
// Source: US-04 — See my score
// ─────────────────────────────────────────────────────────────────────────────
test.describe('VS-04 — Score shown after completing quiz (US-04)', () => {

  test('VS-04 — Score summary is visible after answering all questions', async ({ page }) => {
    await page.goto('/');

    // Answer all 3 questions
    for (let q = 0; q < 3; q++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.feedback button', { hasText: 'Next' }).click();
    }

    // Score summary appears with total
    const summary = page.locator('.score-summary');
    await expect(summary).toBeVisible();
    await expect(summary).toContainText('Quiz Complete!');
    await expect(summary).toContainText('out of 3');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// VS-05 — Author can manage questions via the questions file
// Source: US-05 — Manage questions
// ─────────────────────────────────────────────────────────────────────────────
test.describe('VS-05 — Author manages questions via file (US-05)', () => {

  const ORIGINAL = readFileSync(QUESTIONS_YML, 'utf8');

  test.afterEach(() => {
    // Restore original questions file and restart backend
    writeFileSync(QUESTIONS_YML, ORIGINAL, 'utf8');
    restartBackend();
  });

  test('VS-05 — New question appears after adding to questions file (no rebuild)', async ({ page }) => {
    // Add a fourth question to the file
    const modified = ORIGINAL + `  - id: 4
    text: "What colour is the sky?"
    options: ["Red", "Blue", "Green"]
    correctOption: 1
`;
    writeFileSync(QUESTIONS_YML, modified, 'utf8');

    // Restart backend only — no image rebuild
    restartBackend();

    await page.goto('/');

    // Complete all 4 questions
    for (let q = 0; q < 4; q++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.feedback button', { hasText: 'Next' }).click();
    }

    // Score reflects 4 questions — new question was picked up from file
    await expect(page.locator('.score-summary')).toContainText('out of 4');
  });
});
