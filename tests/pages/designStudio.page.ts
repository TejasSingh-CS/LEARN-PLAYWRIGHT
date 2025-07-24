import { expect, Page } from "@playwright/test";

export class deignStudioPage{
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }

     async getLicenseValidation(page: Page) {
        // Peregrine GetInstanceConfiguration API Validation
        const getInstanceDetails = await page.request.get("/configure-server/GetInstancewiseServerConfiguration/false");
        const licenseModal = page.locator(".modal-title");
        const licenseServerValidation = await page.request.get("/license/load-and-validate-license");
    
        if (getInstanceDetails.status() === 200) {
          console.log("Get Instance Details Response: ", await getInstanceDetails.json());
          console.log("License Server Validation Response: ", await licenseServerValidation.json());
    
          if (licenseServerValidation.status() === 200) {
            if (await licenseModal.isVisible()) {
              await page.waitForTimeout(5000);
              await page.getByRole("button", { name: "Ok" }).click();
              await page.waitForTimeout(5000);
            }
          }
        }
      }

      async applicationCreation(page:Page, appName: string){
            await page.getByRole('textbox', { name: 'Create New Application' }).click();
            await expect(page.getByRole('textbox', { name: 'Create New Application' })).toBeVisible();
            await page.getByRole('textbox', { name: 'Application Name' }).fill(appName);
            await page.getByRole('button', { name: 'Create' }).click();
      }

      async processFragmentCreation(page: Page) {
            await page.getByRole('button', { name: 'Create a Process Fragment' }).click();
            await page.getByRole('button', { name: 'Finish' }).click();
            await page.locator('#tab-0').click();
            await expect(page.locator('#tab-0')).toBeVisible();
      }
    
}