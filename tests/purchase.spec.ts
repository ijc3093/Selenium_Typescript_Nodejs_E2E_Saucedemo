// tests/purchase.spec.ts

import { test, expect } from '../src/fixtures/baseFixture';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { PriceCalculator } from '../src/utils/PriceCalculator'; // Import the PriceCalculator

test.describe('Full End-to-End Purchase Flow', () => {

    test('Successfully complete a purchase as standard_user', async ({ page }) => {
        // ... (previous steps to add items and navigate to checkout step two) ...

        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

        // Get the values directly from the page
        const itemTotal = await checkoutStepTwoPage.getItemTotal();
        const tax = await checkoutStepTwoPage.getTax();
        const displayedTotal = await checkoutStepTwoPage.getTotal();

        // Use the utility function to calculate the expected total
        const expectedTotal = PriceCalculator.calculateTotal(itemTotal, tax);

        // Assert that the displayed total matches the calculated total
        expect(displayedTotal).toBe(expectedTotal);

        // ... (rest of the test) ...
    });

});