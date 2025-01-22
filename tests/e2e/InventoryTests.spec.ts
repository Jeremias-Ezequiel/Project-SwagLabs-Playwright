import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../src/pages/NavBarPage";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { filterOptions } from "../../src/models/FilterProductModel"; 

test.describe('Inventory Page Tests', () => {
    let commonFlows : CommonFlows;  
    let inventoryPage : InventoryPage;
    let navBarPage : NavBarPage; 
    
    test.beforeEach(async ({ page }) => {
        navBarPage = new NavBarPage(page); 
        inventoryPage = new InventoryPage(page); 
        commonFlows = new CommonFlows(page);
        
        await commonFlows.logInSuccessfully();
    })

    test('[@smoke@regression]Verify Inventory page test', async ({ page }) => {
        await inventoryPage.verifyInventoryPage();
    })

    test('[@smoke@regression]Add item at the cart', async ({ page }) => {
        await inventoryPage.verifyInventoryPage(); 
        await inventoryPage.addItemToCart("Sauce Labs Backpack"); 
        await navBarPage.verifyItemsInCartLogo("1"); 
    })

    test('[@smoke@regression]Add and remove an item from the cart', async ({ page }) => {
        await inventoryPage.verifyInventoryPage(); 
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        await inventoryPage.removeItemFromCart("Sauce Labs Backpack"); 
        await navBarPage.verifyShoppingCartLogoIsEmpty(); 
    })
    
    test('[@smoke@regression]Filter the products by Name (Z to A)', async ({ page }) => {
        const filter = filterOptions.ZtoA; 
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productNames = await inventoryPage.getItemNames(); 
        const result = inventoryPage.isAlphabeticallySortedArray(productNames,false);
        expect(result).toBe(true);
    })

    test('[@smoke@regression]Filter the products by Name (A to Z)', async ({ page }) => {
        const filter = filterOptions.AtoZ;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productNames = await inventoryPage.getItemNames(); 
        const result = inventoryPage.isAlphabeticallySortedArray(productNames);
        expect(result).toBe(true);
    })

    test('[@smoke@regression]Filter the products by Price low to high', async ({ page }) => {
        const filter = filterOptions.LowToHigh;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productsPrice = await inventoryPage.getItemPrices(); 
        const result = inventoryPage.isPriceSortedArray(productsPrice,true);
        expect(result).toBe(true); 
    })

    test('[@smoke@regression]Filter the products by Price high to low', async ({ page }) => {
        const filter = filterOptions.HighToLow;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productsPrice = await inventoryPage.getItemPrices(); 
        const result = inventoryPage.isPriceSortedArray(productsPrice, false);
        expect(result).toBe(true); 
    })
        
})
