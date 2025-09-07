// tests/inventory.spec.ts

import { test, expect } from '../src/fixtures/baseFixture'; // Notice the new import path
import { InventoryPage } from '../src/pages/InventoryPage';

test.describe('Inventory and Sorting Scenarios', () => {

    // The 'loggedInPage' fixture is automatically provided to this test.
    test('Verify product sorting from "Price (low to high)"', async ({ loggedInPage }) => {
        const inventoryPage = loggedInPage; // The fixture value is an instance of InventoryPage
        
        await inventoryPage.sortByPriceLowToHigh();

        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        
        expect(prices).toEqual(sortedPrices);
    });

    test('Verify product sorting from "Price (high to low)"', async ({ loggedInPage }) => {
        const inventoryPage = loggedInPage;
        
        await inventoryPage.sortByPriceHighToLow();

        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sortedPrices);
    });
    
});