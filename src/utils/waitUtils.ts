import { ThenableWebDriver, until, By } from "selenium-webdriver";

export async function waitForText(driver: ThenableWebDriver, by: By, expected: string, timeout = 10000) {
  await driver.wait(async () => {
    try {
      const el = await driver.findElement(by);
      const t = await el.getText();
      return t.includes(expected);
    } catch {
      return false;
    }
  }, timeout);
}
