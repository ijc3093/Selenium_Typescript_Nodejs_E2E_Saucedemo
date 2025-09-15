import { ThenableWebDriver } from "selenium-webdriver";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

/**
 * Logs in using the given credentials and returns the InventoryPage instance.
 */
export async function loginAs(driver: ThenableWebDriver, username: string, password: string) {
  const login = new LoginPage(driver);
  await login.open();
  await login.login(username, password);
  // returning InventoryPage for convenience
  return new InventoryPage(driver);
}
