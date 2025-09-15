import { expect } from "chai";
import { createDriver } from "../fixtures/driverFactory";
import { loginAs } from "../fixtures/loginFixtures";
import InventoryPage from "../pages/InventoryPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";

describe("Full end-to-end purchase flow (happy path)", function () {
  let driver: any;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("Buy two items and validate total (item total + tax = total displayed)", async () => {
    const inventory = await loginAs(driver, "standard_user", "secret_sauce");
    await inventory.waitForLoad();

    // Add two known items by data-test add-to-cart name
    await inventory.addToCartByName("add-to-cart-sauce-labs-backpack");
    await inventory.addToCartByName("add-to-cart-sauce-labs-bike-light");

    await inventory.openCart();

    const cart = new CartPage(driver);
    //await cart.waitForLoad();
    // checkout
    await cart.clickCheckout();

    const checkout = new CheckoutPage(driver);
    // fill info and continue
    await checkout.fillInformation("John", "Doe", "12345");

    // read item total and tax from page
    const itemTotal = await checkout.getItemTotal();
    const tax = await checkout.getTax();
    const totalPage = await checkout.getTotal();

    // compute expected total programmatically
    const expectedTotal = Math.round((itemTotal + tax) * 100) / 100;

    expect(expectedTotal).to.equal(totalPage);

    // finish
    await checkout.finish();

    const complete = new CheckoutCompletePage(driver);
    await complete.waitForCompletion();
    const header = await complete.getHeaderText();
    expect(header.toLowerCase()).to.contain("thank you");
  });
});
