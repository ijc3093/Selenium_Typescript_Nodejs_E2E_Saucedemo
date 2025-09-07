// tests/authentication.spec.ts

import { test, expect } from '../src/fixtures/baseFixture';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { USERS } from '../src/types/user'; // Import the USERS object

test.describe('Authentication Scenarios', () => {

    test('Successful Login as standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
        
        await inventoryPage.waitForPageToLoad();
        await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    });

    test('Locked-Out User receives correct error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.navigateToLoginPage();
        await loginPage.login(USERS.LOCKED_OUT_USER.username, USERS.LOCKED_OUT_USER.password);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
    });

    // ... other tests
});