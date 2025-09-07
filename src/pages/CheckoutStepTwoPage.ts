// src/pages/CheckoutStepTwoPage.ts

import { Page } from '@playwright/test';

export class CheckoutStepTwoPage {
    private readonly page: Page;
    private readonly selectors = {
        itemTotal: '[data-test="item-total"]',
        taxTotal: '[data-test="tax-total"]',
        grandTotal: '[data-test="total-total"]',
        finishButton: '[data-test="finish"]',
        cancelButton: '[data-test="cancel"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    private async getPriceFromText(locator: string): Promise<number> {
        const text = await this.page.locator(locator).textContent();
        if (text) {
            const price = text.split('$')[1];
            return parseFloat(price);
        }
        return 0;
    }

    public async getItemTotal(): Promise<number> {
        return this.getPriceFromText(this.selectors.itemTotal);
    }

    public async getTax(): Promise<number> {
        return this.getPriceFromText(this.selectors.taxTotal);
    }

    public async getTotal(): Promise<number> {
        return this.getPriceFromText(this.selectors.grandTotal);
    }

    public async finishPurchase(): Promise<void> {
        await this.page.locator(this.selectors.finishButton).click();
    }
}