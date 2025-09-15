import { By, ThenableWebDriver, until, WebElement } from "selenium-webdriver";
import BasePage from "./BasePage";

export default class InventoryPage extends BasePage {
  private inventoryContainer = By.css(".inventory_container");
  private productItems = By.css(".inventory_item");
  private sortSelect = By.css(".product_sort_container");
  private cartBadge = By.css(".shopping_cart_badge");
  private cartLink = By.css(".shopping_cart_link");

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  async waitForLoad() {
    await this.waitUntilVisible(this.inventoryContainer);
  }

  async getProductElements(): Promise<WebElement[]> {
    await this.waitFor(async () => (await this.findAll(this.productItems)).length > 0, 5000);
    return await this.findAll(this.productItems);
  }

  async getPrices(): Promise<number[]> {
    const items = await this.getProductElements();
    const prices: number[] = [];
    for (const item of items) {
      const priceEl = await item.findElement(By.css(".inventory_item_price"));
      const text = await priceEl.getText(); // e.g. "$29.99"
      prices.push(parseFloat(text.replace(/\$/g, "")));
    }
    return prices;
  }

  async sortBy(text: string) {
    const select = await this.find(this.sortSelect);
    await select.sendKeys(text); // using visible text: "Price (low to high)" or "Price (high to low)"
    await this.waitForLoad();
  }

  async addToCartByName(productDataTest: string) {
    // productDataTest example: "add-to-cart-sauce-labs-backpack"
    const btn = await this.find(By.css(`[data-test='${productDataTest}']`));
    await this.driver.wait(until.elementIsVisible(btn), 5000);
    await btn.click();
    // wait until badge appears or increments (tolerant)
    try {
      await this.driver.wait(async () => {
        const badges = await this.findAll(this.cartBadge);
        return badges.length > 0;
      }, 3000);
    } catch {}
  }

  async openCart() {
    await (await this.find(this.cartLink)).click();
  }

  async getProductImageSrcs(): Promise<string[]> {
    const items = await this.getProductElements();
    const srcs: string[] = [];
    for (const item of items) {
      const img = await item.findElement(By.css(".inventory_item_img img"));
      const src = await img.getAttribute("src");
      srcs.push(src);
    }
    return srcs;
  }
}
