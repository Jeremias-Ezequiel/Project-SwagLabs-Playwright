import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOnePage extends BasePage{
    private checkoutTitle: Locator;
    private firstNameInput: Locator;
    private postalCodeInput: Locator;
    private lastNameInput: Locator;
    private cancelButton: Locator;
    private continueButton: Locator;

    constructor(page : Page){
        super(page);
        this.checkoutTitle = this.page.locator('[data-test="title"]'); 
        this.firstNameInput = this.page.locator('[data-test="firstName"]'); 
        this.lastNameInput = this.page.locator('[data-test="lastName"]'); 
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.cancelButton = this.page.locator('[data-test="cancel"]'); 
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    async verifyCheckoutStepOnePage() : Promise<void>{
        await this.expect(this.checkoutTitle).toBeVisible(); 
        await this.expect(this.firstNameInput).toBeVisible(); 
        await this.expect(this.lastNameInput).toBeVisible(); 
        await this.expect(this.postalCodeInput).toBeVisible(); 
        await this.expect(this.cancelButton).toBeVisible(); 
        await this.expect(this.continueButton).toBeVisible(); 
    }
}