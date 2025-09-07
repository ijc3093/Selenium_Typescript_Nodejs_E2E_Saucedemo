// src/pages/CheckoutCompletePage.ts

import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    private readonly page: Page;
    private readonly selectors = {
        header: '[data-test="checkout-complete-container"] h2',
        thankYouMessage: '[data-test="complete-header"]'
    };

    constructor(page: Page) {
        this.page = page;
    }
    
    public getThankYouMessage(): Locator {
        return this.page.locator(this.selectors.thankYouMessage);
    }
}