// src/pages/CartPage.ts

import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly selectors = {
        cartItem: '[data-test="inventory-item"]',
        checkoutButton: '[data-test="checkout"]',
        continueShoppingButton: '[data-test="continue-shopping"]',
        cartItemName: (name: string) => `[data-test="inventory-item-name"]:has-text("${name}")`
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async checkout(): Promise<void> {
        await this.page.locator(this.selectors.checkoutButton).click();
    }

    public getCartItem(productName: string): Locator {
        return this.page.locator(this.selectors.cartItemName(productName));
    }
    
    public getCartItems(): Locator {
        return this.page.locator(this.selectors.cartItem);
    }
    
    public async getItemPrice(productName: string): Promise<number> {
        const itemPriceLocator = this.page.locator(`[data-test="inventory-item"]:has-text("${productName}") [data-test="inventory-item-price"]`);
        const priceText = await itemPriceLocator.textContent();
        if (priceText) {
            return parseFloat(priceText.replace('$', ''));
        }
        return 0;
    }
}