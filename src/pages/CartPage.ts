import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class CartPage extends BasePage{
    private continueShoppingButton: Locator; 
    private checkoutButton: Locator;
    private inventoryItems: Locator;
    private URL = 'https://www.saucedemo.com/cart.html';

    constructor(page : Page){
        super(page); 
        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]'); 
        this.checkoutButton = this.page.locator('[data-test="checkout"]'); 
        this.inventoryItems = this.page.locator('[data-test="inventory-item"]'); 
    }

    // Verifies that key elements on the cart page are visible
    async verifyCartPage() : Promise<void>{
        await this.expect(this.continueShoppingButton).toBeVisible(); 
        await this.expect(this.checkoutButton).toBeVisible();  
    }
    
    async clickContinueShopping() : Promise<void>{
        await this.expect(this.continueShoppingButton).toBeVisible(); 
        await this.clicElement(this.continueShoppingButton);
    }

    async clickCheckout() : Promise<void>{
        await this.expect(this.checkoutButton).toBeVisible(); 
        await this.clicElement(this.checkoutButton);
    }

    async verifyElementsInCart() : Promise<boolean> {
        const itemsInCart = await this.inventoryItems.count(); 
        return itemsInCart > 0; 
    } 

    getUrl(){
        return this.URL; 
    }
}