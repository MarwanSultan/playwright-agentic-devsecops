import { defineConfig, devices } from '@playwright/test';

import { getRuntimeConfig } from './config/environment';

const runtimeConfig = getRuntimeConfig();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/playwright',
  fullyParallel: true,
  forbidOnly: runtimeConfig.isCi,
  retries: runtimeConfig.retries,
  workers: runtimeConfig.workers ?? (runtimeConfig.isCi ? 4 : 4),
  timeout: runtimeConfig.timeout,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/playwright-junit.xml' }],
  ],
  use: {
    baseURL: runtimeConfig.baseUrl,
    headless: runtimeConfig.headless,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  shard:
    runtimeConfig.shardIndex && runtimeConfig.shardTotal
      ? { current: runtimeConfig.shardIndex, total: runtimeConfig.shardTotal }
      : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
