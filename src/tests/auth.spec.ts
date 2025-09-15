import { expect } from "chai";
import { createDriver } from "../fixtures/driverFactory";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

describe("Authentication scenarios", function () {
  let driver: any;
  this.retries(0);

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("Successful login: standard_user", async () => {
    const login = new LoginPage(driver);
    await login.open();
    await login.login("standard_user", "secret_sauce");
    const inventory = new InventoryPage(driver);
    await inventory.waitForLoad();
    // verify we are on inventory by ensuring product list present
    const products = await inventory.getProductElements();
    expect(products.length).to.be.greaterThan(0);
  });

  it("Locked out user shows correct error", async () => {
    const login = new LoginPage(driver);
    await login.open();
    await login.login("locked_out_user", "secret_sauce");
    const err = await login.getErrorText();
    expect(err.toLowerCase()).to.contain("locked out");
  });

  it("Invalid password shows error", async () => {
    const login = new LoginPage(driver);
    await login.open();
    await login.login("standard_user", "incorrect_password");
    const err = await login.getErrorText();
    expect(err.toLowerCase()).to.contain("username and password do not match");
  });
});
