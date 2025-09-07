// src/utils/PriceCalculator.ts

/**
 * A utility class to handle price calculations.
 * This centralizes the logic for calculating the final price,
 * ensuring consistency and preventing hardcoded values in tests.
 */
export class PriceCalculator {

    /**
     * Calculates the total price by adding the item total and tax.
     * This method handles potential floating-point inaccuracies by rounding
     * the result to two decimal places, which is standard for currency.
     * @param itemTotal The sum of all item prices.
     * @param tax The tax amount.
     * @returns The calculated total price.
     */
    public static calculateTotal(itemTotal: number, tax: number): number {
        const total = itemTotal + tax;
        // Use toFixed to handle floating-point precision issues and then parse back to a number.
        // This is a common and robust practice for currency calculations.
        return parseFloat(total.toFixed(2));
    }
}