import test, { expect } from "@playwright/test";
import { CommonFlows } from "../helper/CommonFlows";
import { CartPage } from "../pages/CartPage";

test.describe('Cart Page Test', () => {
    let commonFlows : CommonFlows;  
    let cartPage : CartPage; 

    test.beforeEach(async ({ page }) => {
        commonFlows = new CommonFlows(page);
        cartPage = new CartPage(page);  

        await commonFlows.loginWithCookies(page);
        await commonFlows.goToCartPage(); 
    })

    test('[@smoke]Verify the cart page is displayed', async ({ page }) => {
        await cartPage.verifyCartPage(); 
    })
    
    test('[@smoke@regression]Verify that there are not products in the cart', async ({ page }) => {
        const result = await cartPage.verifyElementsInCart();
        expect(result).toBe(false); 
    })
    
})
