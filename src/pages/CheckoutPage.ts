import { By, ThenableWebDriver } from "selenium-webdriver";
import BasePage from "./BasePage";

export default class CheckoutPage extends BasePage {
  private first = By.css("[data-test='firstName']");
  private last = By.css("[data-test='lastName']");
  private postal = By.css("[data-test='postalCode']");
  private continueBtn = By.css("[data-test='continue']");
  private finishBtn = By.css("[data-test='finish']");
  private summarySubtotal = By.css(".summary_subtotal_label");
  private summaryTax = By.css(".summary_tax_label");
  private summaryTotal = By.css(".summary_total_label");

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await (await this.find(this.first)).sendKeys(firstName);
    await (await this.find(this.last)).sendKeys(lastName);
    await (await this.find(this.postal)).sendKeys(postalCode);
    await (await this.find(this.continueBtn)).click();
  }

  async getItemTotal(): Promise<number> {
    const t = await (await this.find(this.summarySubtotal)).getText(); // "Item total: $xx.xx"
    const match = t.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTax(): Promise<number> {
    const t = await (await this.find(this.summaryTax)).getText(); // "Tax: $x.xx"
    const match = t.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTotal(): Promise<number> {
    const t = await (await this.find(this.summaryTotal)).getText(); // "Total: $xx.xx"
    const match = t.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async finish() {
    await (await this.find(this.finishBtn)).click();
  }
}
