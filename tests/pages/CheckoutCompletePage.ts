import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage{
    private checkoutTitle: Locator;
    private orderCompleteTitle: Locator;
    private backHomeButton: Locator;

    constructor(page : Page){
        super(page); 
        this.checkoutTitle = this.page.locator('[data-test="title"]'); 
        this.orderCompleteTitle = this.page.locator('[data-test="complete-header"]'); 
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]'); 
    }

    async verifyCheckoutCompletePage() : Promise<void>{
        await this.expect(this.checkoutTitle).toBeVisible(); 
        await this.expect(this.orderCompleteTitle).toBeVisible(); 
        await this.expect(this.backHomeButton).toBeVisible(); 
    }
}