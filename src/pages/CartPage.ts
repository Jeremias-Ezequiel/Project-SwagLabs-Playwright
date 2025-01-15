import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class CartPage extends BasePage{
    private continueShoppingButton: Locator; 
    private checkoutButton: Locator;

    constructor(page : Page){
        super(page); 
        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]'); 
        this.checkoutButton = this.page.locator('[data-test="continue-shopping"]'); 
    }

    // Verifies that key elements on the cart page are visible
    async verifyCartPage() : Promise<void>{
        await this.expect(this.continueShoppingButton).toBeVisible(); 
        await this.expect(this.checkoutButton).toBeVisible();  
    }
    
    async clickContinueShopping() : Promise<void>{
        await this.clicElement(this.continueShoppingButton);
    }

    async clickCheckout() : Promise<void>{
        await this.clicElement(this.checkoutButton);
    }
}