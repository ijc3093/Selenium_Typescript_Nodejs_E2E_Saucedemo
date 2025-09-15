import { By, ThenableWebDriver } from "selenium-webdriver";
import BasePage from "./BasePage";

export default class CheckoutCompletePage extends BasePage {
  private header = By.css(".complete-header");
  private thankYouMsg = By.css(".complete-text");

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  async waitForCompletion() {
    await this.waitUntilVisible(this.header);
  }

  async getHeaderText() {
    return (await this.find(this.header)).getText();
  }
}
