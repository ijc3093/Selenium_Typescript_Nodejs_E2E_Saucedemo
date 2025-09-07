// src/fixtures/baseFixture.ts

import { test as baseTest, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../types/user';

// Define the types for our custom fixtures.
// This ensures type safety and autocompletion in our tests.
type MyFixtures = {
    loggedInPage: InventoryPage;
};

// Extend the base test object with our custom fixtures.
export const test = baseTest.extend<MyFixtures>({
    // The 'loggedInPage' fixture will be available in any test that declares it.
    // It automatically handles logging in the user and provides a clean, pre-authenticated state.
    loggedInPage: [
        // The first parameter is the fixture value itself.
        // The second parameter is an object containing other fixtures needed for setup.
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);

            // Step 1: Navigate and log in as standard_user
            await loginPage.navigateToLoginPage();
            await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
            
            // Step 2: Wait for the inventory page to be ready
            await inventoryPage.waitForPageToLoad();
            
            // Step 3: Use the fixture. This is where the test code will run.
            // We pass an instance of the InventoryPage object, which the test can then use.
            await use(inventoryPage);

            // Step 4: (Optional) Clean up after the test is done.
            // This ensures a clean state for subsequent tests.
            // For example, you might clear a session or log out.
            // In this case, Playwright's context isolation already handles this.
        },
        // The 'auto' option ensures this fixture is always run, even if it's not explicitly requested
        // in a test function's parameters, although it's good practice to declare it.
        { auto: true }
    ],
});

// Re-export the expect function from the base test object.
// This allows tests to import `test` and `expect` from a single file.
export { expect } from '@playwright/test';