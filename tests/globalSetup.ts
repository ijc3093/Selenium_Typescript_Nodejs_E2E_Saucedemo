// tests/globalSetup.ts

import { chromium, FullConfig, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { USERS } from '../src/types/user';
import path from 'path';

// Define the path where the authentication state will be saved.
const authFile = path.join(__dirname, 'auth.json');

/**
 * This function runs once before all tests.
 * It's used to set up a shared state, specifically a logged-in user session,
 * to be used by all subsequent tests.
 */
async function globalSetup(config: FullConfig) {
    console.log('Starting global setup...');
    
    // Create a new browser instance. We use chromium as it's a good default.
    const browser: Browser = await chromium.launch();
    
    // Create a new browser context.
    const page: Page = await browser.newPage();
    
    // Initialize our Page Object Models for login and inventory pages.
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    try {
        // Step 1: Navigate to the login page.
        await loginPage.navigateToLoginPage();

        // Step 2: Log in as the standard_user.
        await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);

        // Step 3: Wait for successful login by checking for the inventory container.
        await inventoryPage.waitForPageToLoad();
        
        console.log('Login successful. Saving authentication state...');

        // Step 4: Save the authentication state (cookies, local storage, etc.)
        // This file will be automatically loaded for all tests in playwright.config.ts.
        await page.context().storageState({ path: authFile });
        
        console.log('Authentication state saved successfully.');
    } catch (error) {
        console.error('Global setup failed during authentication:', error);
        throw error;
    } finally {
        // Close the browser. The session state has been saved.
        await browser.close();
        console.log('Global setup finished.');
    }
}

export default globalSetup;