import { ThenableWebDriver, until, By, WebElement } from "selenium-webdriver";

export default abstract class BasePage {
  protected driver: ThenableWebDriver;
  protected baseUrl = "https://www.saucedemo.com";

  constructor(driver: ThenableWebDriver) {
    this.driver = driver;
  }

  async open(path = "") {
    await this.driver.get(`${this.baseUrl}/${path}`);
  }

  async find(by: By): Promise<WebElement> {
    return this.driver.findElement(by);
  }

  async findAll(by: By) {
    return this.driver.findElements(by);
  }

  async waitUntilVisible(by: By, timeout = 10000) {
    return this.driver.wait(until.elementLocated(by), timeout);
  }

  async waitFor(condition: any, timeout = 10000) {
    return this.driver.wait(condition, timeout);
  }
}
