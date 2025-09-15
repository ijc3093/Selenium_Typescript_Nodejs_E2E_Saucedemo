import { By, ThenableWebDriver } from "selenium-webdriver";
import BasePage from "./BasePage";

export default class CartPage extends BasePage {
  private cartList = By.css(".cart_list");
  private checkoutBtn = By.css("[data-test='checkout']");
  private cartItems = By.css(".cart_item");

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  // async waitForLoad() {
  //   await this.waitUntilVisible(this.cartList);
  // }

  async getItemNames(): Promise<string[]> {
    const items = await this.findAll(this.cartItems);
    const names: string[] = [];
    for (const it of items) {
      const n = await it.findElement(By.css(".inventory_item_name"));
      names.push(await n.getText());
    }
    return names;
  }

  async clickCheckout() {
    await (await this.find(this.checkoutBtn)).click();
  }
}
