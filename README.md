# SauceDemo Selenium Test Suite (TypeScript)

## Summary
This project is a maintainable Selenium test-suite for https://www.saucedemo.com written in TypeScript. It implements the Page Object Model and uses fixtures to avoid repetition.

## How to run
1. `npm install`
2. Start (optional) a Selenium standalone server or rely on local ChromeDriver. This project uses the local ChromeDriver installed by `chromedriver`.
3. `npm test`



## Architecture & Design (Five-Year Philosophy)
- POM: All pages live in src/pages. Tests import pages, so test files read like user stories.

- Fixtures: src/fixtures/driverFactory.ts centralizes driver creation (capabilities, headless toggle). loginFixtures.ts exposes helper flows like loginAs.

- Utils: Price calculators and robust waiting helpers are in src/utils.

- Selectors: All key selectors use data-test attributes (per requirement).

- Resiliency: Tests avoid hard-coded sleeps. We rely on explicit waits for conditions and visible states. The performance_glitch_user spec demonstrates robust wait usage.

## Advanced considerations
- problem_user: The site intentionally returns wrong images for problem_user. Automated functional detection implemented: we verify src attributes of product images match canonical expectations. For true long-term stability, a visual-regression approach (image snapshot comparisons using pixel diffs, e.g., Needle/Resemble/Playwright snapshots) is recommended — described below.

- Visual regression (recommended): Capture baseline images in CI for canonical standard_user rendering. For problem_user, do image diff with thresholds. This avoids brittle DOM-only checks when site UI changes slightly.

## Test list
- auth.spec.ts — login happy path, locked_out_user, invalid password.

- inventory_sort.spec.ts — verifies low->high and high->low sorting.

- full_e2e.spec.ts — end-to-end purchase, calculates expected total (item total + tax) and asserts equals page total.

- problem_user.spec.ts — checks product images for problem_user.

- performance_glitch.spec.ts — demonstrates robust operations for performance_glitch_user.

## Notes
- Update the ChromeDriver or configure remote Selenium/BrowserStack/Sauce labs by adapting driverFactory.

- Keep selectors stable: use data-test attributes. If website changes, only page objects need updates.

## Notes & Rationale (short)

- All key selectors use data-test attributes (login, add-to-cart, checkout inputs, etc.). DOM-derived selectors like .summary_total_label are used for labels because no data-test exists for those labels on the site.

- No hard-coded sleeps. Use driver.wait, until.elementLocated, and helper methods to handle lag (important for performance_glitch_user).

- For visual regression (recommended long-term approach for problem_user), integrate a snapshot/diff tool and store canonical images for standard_user and run diffs in CI.

## ✅ Prerequisites
- Node.js (v18+ recommended) → Download
- Google Chrome installed (the project uses chromedriver which matches your Chrome version)
- Internet access (the tests run against the live saucedemo.com)

## ▶️ Setup
- Clone or extract the project files into a folder, e.g. saucedemo-selenium.
- Open a terminal inside that folder.
- Install dependencies:
    npm install
    npm test
    npx mocha -r ts-node/register src/tests/auth.spec.ts
    HEADLESS=true npm test

## 🧪 Test Files Overview

- auth.spec.ts → login success, locked_out_user, wrong password
- inventory_sort.spec.ts → verify sorting low→high and high→low
- full_e2e.spec.ts → end-to-end checkout with price/tax validation
- problem_user.spec.ts → detects broken product images for problem_user
- performance_glitch.spec.ts → robust add-to-cart for performance_glitch_user

## ⚙️ Troubleshooting
- If Chrome doesn’t open, make sure Chrome is installed and matches chromedriver (you can update chromedriver with: npm install chromedriver@latest).
- If you’re running in CI or on a server with no GUI, always use HEADLESS=true.
-  For debugging, use:
    npm run test:debug

To run headlessly (CI), set `HEADLESS=true` in environment before running tests:
```bash
HEADLESS=true npm test