import test, { expect, Page } from "@playwright/test";
import { deignStudioPage } from "./pages/designStudio.page";



test.describe("Design Studio Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
     
  });

  test("DS Testing", async ({ page }) => {
    const dsPage = new deignStudioPage(page);

    await dsPage.getLicenseValidation(page);
    await dsPage.applicationCreation(page, "Test Application");
    await page.waitForTimeout(5000);
    await dsPage.processFragmentCreation(page);
    await page.waitForTimeout(5000);
  });

  test.afterEach(async ({ page }) => {
    //await page.close();
  });

});
