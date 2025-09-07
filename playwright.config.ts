// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
    // Specifies the global setup file to run once before all tests.
    globalSetup: require.resolve('./tests/globalSetup.ts'),
    
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        // Load the saved authentication state for all tests.
        // This is what makes the setup effective for subsequent tests.
        storageState: path.join(__dirname, 'tests/auth.json'),
        
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});