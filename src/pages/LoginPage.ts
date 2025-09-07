// src/pages/LoginPage.ts

import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly selectors = {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.page.locator(this.selectors.usernameInput).fill(username);
        await this.page.locator(this.selectors.passwordInput).fill(password);
        await this.page.locator(this.selectors.loginButton).click();
    }

    public async getErrorMessage(): Promise<string | null> {
        const errorElement = this.page.locator(this.selectors.errorMessage);
        return await errorElement.textContent();
    }

    public getErrorMessageLocator(): Locator {
        return this.page.locator(this.selectors.errorMessage);
    }
}