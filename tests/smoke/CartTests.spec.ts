import test, { expect } from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { CartPage } from "../../src/pages/CartPage";
import { InventoryPage } from "../../src/pages/InventoryPage";

test.describe('Cart Page Test - Smoke', () => {
    let commonFlows : CommonFlows;  
    let cartPage : CartPage; 
    let inventoryPage : InventoryPage; 

    test.beforeEach(async ({ page }) => {
        commonFlows = new CommonFlows(page);
        cartPage = new CartPage(page);  
        inventoryPage = new InventoryPage(page); 

        await commonFlows.goToCartPage(); 
    })

    test('Verify the cart page is displayed', async ({ page }) => {
        await cartPage.verifyCartPage(); 
    })
    
    test('Verify that there are not products in the cart', async ({ page }) => {
        const result = await cartPage.verifyElementsInCart();
        expect(result).toBe(false); 
    })
    
})
