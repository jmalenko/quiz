import { defineConfig, devices } from '@playwright/test';

// Base URL of the deployed system — defaults to the local deployment address
// Override via environment variable: BASE_URL=http://myhost:8888 npm test
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
