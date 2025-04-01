import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Disable parallel execution for now
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Run one worker at a time
  reporter: 'html',
  timeout: 60000, // Increase timeout to 60 seconds
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Add navigation timeout
    navigationTimeout: 30000,
    // Add action timeout
    actionTimeout: 15000,
    // Add debugging options
    launchOptions: {
      slowMo: 100, // Slow down operations for debugging
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Comment out other browsers for initial testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
}); 