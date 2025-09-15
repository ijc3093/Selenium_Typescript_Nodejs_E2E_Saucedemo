import { ThenableWebDriver, By, until } from "selenium-webdriver";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  private username = By.css("[data-test='username']");
  private password = By.css("[data-test='password']");
  private loginButton = By.css("[data-test='login-button']");
  private errorContainer = By.css("[data-test='error']");

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  async open() {
    await super.open("");
    await this.waitUntilVisible(this.username);
  }

  async login(user: string, pass: string) {
    const u = await this.find(this.username);
    const p = await this.find(this.password);
    await u.clear();
    await u.sendKeys(user);
    await p.clear();
    await p.sendKeys(pass);
    await (await this.find(this.loginButton)).click();
  }

  async getErrorText() {
    try {
      const el = await this.driver.wait(until.elementLocated(this.errorContainer), 3000);
      return el.getText();
    } catch {
      return "";
    }
  }
}
