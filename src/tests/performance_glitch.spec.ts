import { expect } from "chai";
import { createDriver } from "../fixtures/driverFactory";
import { loginAs } from "../fixtures/loginFixtures";
import InventoryPage from "../pages/InventoryPage";
import CartPage from "../pages/CartPage";

/**
 * The performance_glitch_user may introduce artificial lag.
 * We demonstrate robust waiting: wait for element to be clickable/visible rather than static sleeps.
 */
describe("Performance glitch user resilient flows", function () {
  let driver: any;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("Adds an item to cart reliably despite performance issues", async () => {
    const inventory = await loginAs(driver, "performance_glitch_user", "secret_sauce");
    await inventory.waitForLoad();

    // robustly wait for product elements to load then add to cart
    const products = await inventory.getProductElements();
    expect(products.length).to.be.greaterThan(0);

    // choose the first product's add-to-cart button via the data-test on button inside product
    // We'll add backpack (explicit)
    await inventory.addToCartByName("add-to-cart-sauce-labs-backpack");

    // open cart and verify item present
    await inventory.openCart();
    const cart = new CartPage(driver);
    //await cart.waitForLoad();
    const names = await cart.getItemNames();
    expect(names.some(n => n.toLowerCase().includes("backpack"))).to.be.true;
  });
});
