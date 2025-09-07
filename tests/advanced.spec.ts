// tests/advanced.spec.ts (Refactored)

import { test, expect } from '../src/fixtures/baseFixture';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { WaitHelpers } from '../src/utils/waitHelpers'; // Import the new helper

test.describe('Advanced Scenarios', () => {

    test('Performance glitch user can add an item to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.navigateToLoginPageAndLogin('performance_glitch_user', 'secret_sauce');

        await inventoryPage.addToCart('Sauce Labs Backpack');
        
        // Use the explicit wait helper to wait for the badge to update.
        const shoppingCartBadge = inventoryPage.getShoppingCartBadge();
        await WaitHelpers.waitForElementToHaveText(shoppingCartBadge, '1');

        await inventoryPage.goToCart();
        await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
    });
    
    // ... other advanced tests
});