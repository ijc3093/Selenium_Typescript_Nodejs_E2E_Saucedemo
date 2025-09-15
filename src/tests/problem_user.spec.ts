import { expect } from "chai";
import { createDriver } from "../fixtures/driverFactory";
import { loginAs } from "../fixtures/loginFixtures";
import InventoryPage from "../pages/InventoryPage";

/**
 * Functional detection for problem_user:
 * - The site intentionally returns wrong images for problem_user.
 * - We'll assert that the image src values for problem_user differ from standard_user baseline.
 * - For long-term reliability we recommend image snapshot diffs (see README).
 */
describe("Problem user checks", function () {
  let driver: any;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("Detects wrong product images for problem_user", async () => {
    // baseline with standard_user
    const baselineInventory = await loginAs(driver, "standard_user", "secret_sauce");
    await baselineInventory.waitForLoad();
    const baselineSrcs = await baselineInventory.getProductImageSrcs();

    // logout by opening login page
    await driver.get("https://www.saucedemo.com/"); // go to login
    // now login as problem_user
    const problemInventory = await loginAs(driver, "problem_user", "secret_sauce");
    await problemInventory.waitForLoad();
    const problemSrcs = await problemInventory.getProductImageSrcs();

    // functional check: assert at least one image src differs
    const diffs = baselineSrcs.filter((s, idx) => s !== problemSrcs[idx]);
    expect(diffs.length).to.be.greaterThan(0, "Expected at least one product image src to differ for problem_user");
  });
});
