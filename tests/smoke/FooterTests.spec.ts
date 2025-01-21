import test from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { FooterBarPage } from "../../src/pages/FooterBarPage";

test.describe('Footer Page Tests - Smoke', () => {
    let commonFlows : CommonFlows; 
    let footerPage : FooterBarPage; 

    test.beforeEach(async ({ page }) => {
        commonFlows = new CommonFlows(page);
        footerPage = new FooterBarPage(page);  
        await commonFlows.logInSuccessfully(); 
   })

   test('Verify the footer page are displayed', async ({ page }) => {
        await footerPage.verifyFooterPage(); 
   })
    
})
