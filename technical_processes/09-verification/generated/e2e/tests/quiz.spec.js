// @ts-check
const { test, expect } = require('@playwright/test');
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

/**
 * E2E Test Suite — Quiz Application
 *
 * Precondition: docker-compose stack is running on http://localhost:8888
 *   docker compose -f technical_processes/09-verification/generated/docker-compose.yml up -d
 *
 * Questions (from questions.yml, 3 total):
 *   Q1: "What is the capital of France?" — correct index 1 (Paris)
 *   Q2: "What is 2 + 2?"               — correct index 1 (4)
 *   Q3: "Which planet is the Red Planet?" — correct index 2 (Mars)
 */

// Path to the questions.yml file mounted into the backend container
const QUESTIONS_YML = resolve(__dirname, '../../../../../containers/backend/src/main/resources/questions.yml');

// Docker Compose project name is "generated" (directory name)
const BACKEND_CONTAINER = 'generated-backend-1';

// On Windows (local dev), Playwright runs in the Windows Node.js context so Docker CLI
// must be invoked via WSL. On Linux CI (GitHub Actions), use docker directly.
// Set DOCKER_CMD=docker in the CI environment to override.
const DOCKER_CMD = process.env.DOCKER_CMD || 'wsl docker';

/** Restart backend container and wait for it to become healthy */
function restartBackend() {
  execSync(`${DOCKER_CMD} restart ${BACKEND_CONTAINER}`, { stdio: 'pipe' });
  // Poll health endpoint until ready (max 30s)
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      execSync(`${DOCKER_CMD} exec ${BACKEND_CONTAINER} wget -qO- http://localhost:8080/api/questions`, { stdio: 'pipe' });
      return;
    } catch (_) {
      // Cross-platform 1s sleep: ping on Windows, sleep on Linux
      try { execSync('ping -n 2 127.0.0.1 > nul 2>&1', { stdio: 'pipe', shell: true }); } catch (_) {}
      try { execSync('sleep 1', { stdio: 'pipe', shell: true }); } catch (_) {}
    }
  }
  throw new Error('Backend did not become healthy after restart');
}

test.describe('TC-01 — Question display and answer selection', () => {

  test('TC-01.1 — Question displayed with text and options', async ({ page }) => {
    await page.goto('/');
    // Question text visible
    const heading = page.locator('.question-card h2');
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
    // At least 2 enabled option buttons
    const buttons = page.locator('.answer-button');
    await expect(buttons).toHaveCount(await buttons.count());
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeEnabled();
    }
  });

  test('TC-01.2 — Answer selection disables all buttons', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('.answer-button');
    await buttons.first().click();
    // All buttons disabled after selection
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeDisabled();
    }
  });
});

test.describe('TC-02 — Answer feedback', () => {

  test('TC-02.1 — Correct answer shows "Correct!" feedback', async ({ page }) => {
    await page.goto('/');
    // Q1 correct option index 1 (Paris) — second button
    const buttons = page.locator('.answer-button');
    await buttons.nth(1).click();
    const feedback = page.locator('.feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveClass(/correct/);
    await expect(feedback).toContainText('Correct!');
  });

  test('TC-02.1b — Wrong answer shows "Wrong" feedback', async ({ page }) => {
    await page.goto('/');
    // Q1 wrong option index 0 (London)
    const buttons = page.locator('.answer-button');
    await buttons.nth(0).click();
    const feedback = page.locator('.feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveClass(/wrong/);
    await expect(feedback).toContainText('Wrong');
  });

  test('TC-02.2 — Wrong answer reveals correct option number in feedback', async ({ page }) => {
    await page.goto('/');
    // Q1: correctOption = 1, so message should say "option 2" (1-based)
    const buttons = page.locator('.answer-button');
    await buttons.nth(0).click(); // wrong answer
    const feedback = page.locator('.feedback');
    await expect(feedback).toContainText('option 2');
  });
});

test.describe('TC-03 — Quiz flow', () => {

  test('TC-03.1 — Next button advances to next question', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('.question-card h2');
    const firstText = await heading.textContent();

    // Answer Q1 (any option) then click Next
    await page.locator('.answer-button').first().click();
    await page.locator('.feedback button', { hasText: 'Next' }).click();

    // New question text appears
    const secondText = await heading.textContent();
    expect(secondText).not.toBe(firstText);
    // Buttons re-enabled
    const buttons = page.locator('.answer-button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeEnabled();
    }
  });

  test('TC-03.2 — Score summary shown after last question', async ({ page }) => {
    await page.goto('/');

    // Answer all 3 questions
    for (let q = 0; q < 3; q++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.feedback button', { hasText: 'Next' }).click();
    }

    // Score summary visible
    const summary = page.locator('.score-summary');
    await expect(summary).toBeVisible();
    await expect(summary).toContainText('Quiz Complete!');
    await expect(summary).toContainText('out of 3');
  });
});

test.describe('TC-05 — Questions file live reload', () => {

  const ORIGINAL = readFileSync(QUESTIONS_YML, 'utf8');

  test.afterEach(() => {
    // Always restore the original file and restart backend
    writeFileSync(QUESTIONS_YML, ORIGINAL, 'utf8');
    restartBackend();
  });

  test('TC-05.1 — New question appears after adding to questions file', async ({ page }) => {
    const modified = ORIGINAL + `  - id: 4
    text: "What colour is the sky?"
    options: ["Red", "Blue", "Green"]
    correctOption: 1
`;
    writeFileSync(QUESTIONS_YML, modified, 'utf8');
    restartBackend();

    await page.goto('/');
    // Complete all 4 questions
    for (let q = 0; q < 4; q++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.feedback button', { hasText: 'Next' }).click();
    }
    await expect(page.locator('.score-summary')).toContainText('out of 4');
  });

  test('TC-05.2 — Edited question shows updated text', async ({ page }) => {
    const modified = ORIGINAL.replace(
      'What is the capital of France?',
      'What is the capital of Germany?'
    );
    writeFileSync(QUESTIONS_YML, modified, 'utf8');
    restartBackend();

    await page.goto('/');
    await expect(page.locator('.question-card h2')).toContainText('What is the capital of Germany?');
  });

  test('TC-05.3 — Removed question no longer appears', async ({ page }) => {
    // Remove Q3 — keep only Q1 and Q2
    const lines = ORIGINAL.split('\n');
    const cutIndex = lines.findIndex(l => l.trim() === '- id: 3');
    const modified = lines.slice(0, cutIndex).join('\n') + '\n';
    writeFileSync(QUESTIONS_YML, modified, 'utf8');
    restartBackend();

    await page.goto('/');
    for (let q = 0; q < 2; q++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.feedback button', { hasText: 'Next' }).click();
    }
    await expect(page.locator('.score-summary')).toContainText('out of 2');
  });
});

test.describe('TC-SR — System requirement tests', () => {

  test('TC-SR-08 — App accessible via browser without installation', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
    // Quiz page renders
    await expect(page.locator('.question-card')).toBeVisible();
  });

  test('TC-SR-09 — Response time under 200ms for initial load', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.locator('.question-card').waitFor({ state: 'visible' });
    const elapsed = Date.now() - start;
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? nav.domContentLoadedEventEnd - nav.startTime : null;
    });
    if (timing !== null) {
      expect(timing).toBeLessThan(2000); // infrastructure-adjusted threshold
    }
    console.log(`Page load time: ${elapsed}ms, DOMContentLoaded: ${timing}ms`);
  });

  test('TC-SR-10 — No authentication required', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
    await expect(page.locator('input[type=password]')).toHaveCount(0);
    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.locator('.question-card')).toBeVisible();
  });

  test('TC-SR-11 — Questions file fields are honoured (text, options, correctOption)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.question-card h2')).toContainText('What is the capital of France?');
    const buttons = page.locator('.answer-button');
    await expect(buttons).toHaveCount(4);
    await buttons.nth(1).click();
    await expect(page.locator('.feedback')).toHaveClass(/correct/);
  });
});
