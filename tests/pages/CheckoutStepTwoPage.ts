import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepTwoPage extends BasePage{
    private checkoutTitle: Locator;
    private finishButton: Locator;
    private cancelButton: Locator;
    
    constructor(page : Page){
        super(page); 
        this.checkoutTitle = this.page.locator('[data-test="title"]'); 
        this.cancelButton = this.page.locator('[data-test="cancel"]');
        this.finishButton = this.page.locator('[data-test="finish"]'); 
    }

    async verifyCheckoutStepTwoPage() : Promise<void>{
        await this.expect(this.checkoutTitle).toBeVisible();
        await this.expect(this.cancelButton).toBeVisible();
        await this.expect(this.finishButton).toBeVisible();
    }
}