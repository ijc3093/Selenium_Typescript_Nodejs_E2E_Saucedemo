import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export async function createDriver(): Promise<ThenableWebDriver> {
  const headless = (process.env.HEADLESS || "false").toLowerCase() === "true";
  const options = new chrome.Options();
  if (headless) {
    options.addArguments("--headless=new");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
  }
  // Optional: configure window size for consistent screenshots
  options.addArguments("--window-size=1280,1024");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  return driver;
}
