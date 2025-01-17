import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../../src/pages/NavBarPage";
import { InventoryPage } from "../../../src/pages/InventoryPage";
import { CommonFlows } from "../../../src/utils/CommonFlows";


test.describe('Inventory Tests', () => {
    let commonFlows : CommonFlows;  
    let inventoryPage : InventoryPage;
    let navBarPage : NavBarPage;
    
    test.beforeEach(async ({ page }) => {
        navBarPage = new NavBarPage(page); 
        inventoryPage = new InventoryPage(page); 
        commonFlows = new CommonFlows(page);
        await page.goto('');
        await commonFlows.logInSuccessfully(); 

    })

    test('Add item at the cart', async ({ page }) => {
        await inventoryPage.verifyInventoryPage(); 
        await inventoryPage.addItemToCart("Sauce Labs Backpack"); 
        await navBarPage.verifyItemsInCartLogo("1"); 
    })

    test('Add and remove an item from the cart', async ({ page }) => {
        await inventoryPage.verifyInventoryPage(); 
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        await inventoryPage.removeItemFromCart("Sauce Labs Backpack"); 
        await navBarPage.verifyShoppingCartLogoIsEmpty(); 
    })
    
    test('Filter the products by Name (Z to A)', async ({ page }) => {
        const filter : string = 'Name (Z to A)';
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productNames : string[] = await inventoryPage.getItemNames(); 
        const result = inventoryPage.isAlphabeticallySortedArray(productNames,false);
        await expect(result).toBe(true);
    })

    test('Check order of the items', async ({ page }) => {
        const productNames : string[] = await inventoryPage.getItemNames();
        const result = inventoryPage.isAlphabeticallySortedArray(productNames,true);
        await expect(result).toBe(true);
    })
        
})
