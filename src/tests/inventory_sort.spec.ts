import { expect } from "chai";
import { createDriver } from "../fixtures/driverFactory";
import { loginAs } from "../fixtures/loginFixtures";
import InventoryPage from "../pages/InventoryPage";

describe("Inventory & Sorting", function () {
  let driver: any;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("Sort by Price low to high and high to low", async () => {
    const inventory = await loginAs(driver, "standard_user", "secret_sauce");
    await inventory.waitForLoad();

    // Low -> High
    await inventory.sortBy("Price (low to high)");
    const lowPrices = await inventory.getPrices();
    // assert it's sorted ascending
    for (let i = 1; i < lowPrices.length; i++) {
      expect(lowPrices[i]).to.be.at.least(lowPrices[i - 1]);
    }

    // High -> Low
    await inventory.sortBy("Price (high to low)");
    const highPrices = await inventory.getPrices();
    for (let i = 1; i < highPrices.length; i++) {
      expect(highPrices[i]).to.be.at.most(highPrices[i - 1]);
    }
  });
});
