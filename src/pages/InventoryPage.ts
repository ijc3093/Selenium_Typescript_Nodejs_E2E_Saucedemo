// src/pages/InventoryPage.ts (Refactored)

import { Page, Locator } from '@playwright/test';
import { WaitHelpers } from '../utils/waitHelpers'; // Import the new helper

export class InventoryPage {
    private readonly page: Page;
    private readonly selectors = {
        inventoryContainer: '[data-test="inventory-container"]',
        shoppingCartBadge: '[data-test="shopping-cart-badge"]',
        // ... other selectors
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async waitForPageToLoad(): Promise<void> {
        // Now using our centralized helper for a clear, explicit wait.
        await WaitHelpers.waitForElementToBeVisible(this.page.locator(this.selectors.inventoryContainer));
    }

    public async addToCart(productName: string): Promise<void> {
        const addToCartButton = this.page.locator(this.selectors.addToCartButton(productName));
        // The click() method in Playwright already has an implicit wait,
        // but for scenarios with extreme lag (like performance_glitch_user),
        // explicitly waiting for the element to be enabled is a good practice.
        await WaitHelpers.waitForElementToBeVisible(addToCartButton);
        await addToCartButton.click();
    }
    
    // ... rest of the methods
}