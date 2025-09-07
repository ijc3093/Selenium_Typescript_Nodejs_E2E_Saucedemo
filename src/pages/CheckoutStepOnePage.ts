// src/pages/CheckoutStepOnePage.ts

import { Page } from '@playwright/test';

export class CheckoutStepOnePage {
    private readonly page: Page;
    private readonly selectors = {
        firstNameInput: '[data-test="firstName"]',
        lastNameInput: '[data-test="lastName"]',
        postalCodeInput: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        cancelButton: '[data-test="cancel"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async fillInShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.page.locator(this.selectors.firstNameInput).fill(firstName);
        await this.page.locator(this.selectors.lastNameInput).fill(lastName);
        await this.page.locator(this.selectors.postalCodeInput).fill(postalCode);
    }

    public async continueCheckout(): Promise<void> {
        await this.page.locator(this.selectors.continueButton).click();
    }
}