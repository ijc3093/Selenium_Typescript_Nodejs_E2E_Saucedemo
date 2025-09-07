// src/utils/waitHelpers.ts

import { Locator, Page } from '@playwright/test';

/**
 * A utility class containing helper functions for handling waits in tests.
 * This class promotes the use of explicit, condition-based waits over
 * hardcoded, time-based waits (e.g., page.waitForTimeout()).
 */
export class WaitHelpers {
    
    /**
     * Waits for an element to become visible on the page.
     * This is useful for ensuring an element is interactable before performing an action.
     * @param locator The Playwright locator of the element to wait for.
     * @param timeout Optional timeout in milliseconds. Defaults to Playwright's standard timeout.
     */
    public static async waitForElementToBeVisible(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Waits for an element to have a specific text content.
     * This is useful for scenarios where text changes dynamically on the page, such as a counter.
     * @param locator The Playwright locator of the element.
     * @param text The expected text content.
     * @param timeout Optional timeout in milliseconds.
     */
    public static async waitForElementToHaveText(locator: Locator, text: string, timeout?: number): Promise<void> {
        await locator.waitFor({ hasText: text, timeout });
    }

    /**
     * Waits for a page's URL to match a specific URL or pattern.
     * This is a robust way to verify successful navigation after a click or form submission.
     * @param page The Playwright page object.
     * @param url The expected URL string or regular expression.
     * @param timeout Optional timeout in milliseconds.
     */
    public static async waitForURL(page: Page, url: string | RegExp, timeout?: number): Promise<void> {
        await page.waitForURL(url, { timeout });
    }

    /**
     * Waits for a specific network request to complete.
     * This can be used for more advanced scenarios where an action triggers an API call
     * and you need to wait for the response before proceeding.
     * @param page The Playwright page object.
     * @param urlOrPredicate The URL string, RegExp, or a function to match the request URL.
     * @param timeout Optional timeout in milliseconds.
     */
    public static async waitForRequest(page: Page, urlOrPredicate: string | RegExp | ((url: string) => boolean), timeout?: number): Promise<void> {
        await page.waitForRequest(urlOrPredicate, { timeout });
    }

    /**
     * Waits for a specific network response to complete.
     * @param page The Playwright page object.
     * @param urlOrPredicate The URL string, RegExp, or a function to match the response URL.
     * @param timeout Optional timeout in milliseconds.
     */
    public static async waitForResponse(page: Page, urlOrPredicate: string | RegExp | ((url: string) => boolean), timeout?: number): Promise<void> {
        await page.waitForResponse(urlOrPredicate, { timeout });
    }
}