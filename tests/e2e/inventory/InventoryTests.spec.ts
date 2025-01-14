import test from "@playwright/test";
import { CommonFlows } from "../../../utils/CommonFlows";
import { InventoryPage } from "../../pages/InventoryPage";
import { NavBarPage } from "../../pages/NavBarPage";


test.describe('Inventory Tests', () => {
    let commonFlows : CommonFlows;  
    let inventoryPage : InventoryPage;
    let navBarPage : NavBarPage;
    
    test.beforeEach(async ({ page }) => {
        navBarPage = new NavBarPage(page); 
        inventoryPage = new InventoryPage(page); 
        commonFlows = new CommonFlows(page);
        await commonFlows.logInSuccessful(); 
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
    
    test('Filter by Name (Z to A)', async ({ page }) => {
        const filter : string = 'Name (Z to A)';
        
    })
    
        
})
