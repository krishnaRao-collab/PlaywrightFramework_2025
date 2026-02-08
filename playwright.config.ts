import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
    ['html'],
    ['list'],
    ['allure-playwright'],
    ['playwright-html-reporter', { 
      open: 'always',
      testFolder: 'tests',
      title: 'OPEN CART HTML Report',
      project: 'Open Cart',
      release: '9.87.6',
      testEnvironment: 'PROD',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report',
      minifyAssets: true,
      startServer: false,
    }]
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless:true
  },

  /* Configure projects for major browsers */
  projects: [

    /* -------- Google Chrome -------- */
    {
      name: 'Google Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: null, // 🔥 required
        launchOptions: {
          args: ['--start-maximized'], // 🔥 maximize
        },
      },
    },

    // /* -------- Microsoft Edge -------- */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'msedge',
    //     viewport: null, // 🔥 required
    //     launchOptions: {
    //       args: ['--start-maximized'], // 🔥 maximize
    //     },
    //   },
    // },

  //   /* -------- Firefox -------- */
  //   {
  //     name: 'Firefox',
  //     use: {
  //       browserName: 'firefox',
  //       // Firefox does NOT support --start-maximized
  //       viewport: { width: 1920, height: 1080 },
  //     },
  //   },

  //   /* -------- WebKit -------- */
  //   {
  //     name: 'WebKit',
  //     use: {
  //       browserName: 'webkit',
  //       viewport: { width: 1920, height: 1080 },
  //     },
  //   },
   ],

});


