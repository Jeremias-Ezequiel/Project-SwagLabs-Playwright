import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../src/pages/NavBarPage";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { FilterOptions } from "../../src/models/FilterProductModel";

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

    test('Verify Inventory page test', async ({ page }) => {
        await inventoryPage.verifyInventoryPage();
    })
    

    test('Add and remove an item from the cart', async ({ page }) => {
        await inventoryPage.verifyInventoryPage(); 
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        await inventoryPage.removeItemFromCart("Sauce Labs Backpack"); 
        await navBarPage.verifyShoppingCartLogoIsEmpty(); 
    })
    
    test('Filter the products by Name (Z to A)', async ({ page }) => {
        const filter = FilterOptions.ZtoA;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productNames = await inventoryPage.getItemNames(); 
        const result = inventoryPage.isAlphabeticallySortedArray(productNames,false);
        expect(result).toBe(true);
    })

    test('Filter the products by Name (A to Z)', async ({ page }) => {
        const filter = FilterOptions.AtoZ;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productNames = await inventoryPage.getItemNames(); 
        const result = inventoryPage.isAlphabeticallySortedArray(productNames);
        expect(result).toBe(true);
    })

    test('Filter the products by Price low to high', async ({ page }) => {
        const filter = FilterOptions.LowToHigh;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productsPrice = await inventoryPage.getItemPrices(); 
        const result = inventoryPage.isPriceSortedArray(productsPrice,true);
        expect(result).toBe(true); 
    })
    
    test('Filter the products by Price high to low', async ({ page }) => {
        const filter = FilterOptions.HighToLow;
        await inventoryPage.openFilterDropdown(); 
        await inventoryPage.filterByOption(filter); 
        const productsPrice = await inventoryPage.getItemPrices(); 
        const result = inventoryPage.isPriceSortedArray(productsPrice, false);
        expect(result).toBe(true); 
    })

    test('Check order of the items', async ({ page }) => {
        const productNames : string[] = await inventoryPage.getItemNames();
        const result = inventoryPage.isAlphabeticallySortedArray(productNames,true);
        expect(result).toBe(true);
    })
        
})
