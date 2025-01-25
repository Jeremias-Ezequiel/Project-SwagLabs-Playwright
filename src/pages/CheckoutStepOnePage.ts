import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutCredential } from "../models/CheckoutCredentialModel";

export class CheckoutStepOnePage extends BasePage{
    private checkoutTitle: Locator;
    private firstNameInput: Locator;
    private postalCodeInput: Locator;
    private lastNameInput: Locator;
    private cancelButton: Locator;
    private continueButton: Locator;
    private errorMessageDiv: Locator;
    private URL = 'https://www.saucedemo.com/checkout-step-one.html'; 

    constructor(page : Page){
        super(page);
        this.checkoutTitle = this.page.locator('[data-test="title"]'); 
        this.firstNameInput = this.page.locator('[data-test="firstName"]'); 
        this.lastNameInput = this.page.locator('[data-test="lastName"]'); 
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.cancelButton = this.page.locator('[data-test="cancel"]'); 
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.errorMessageDiv = this.page.locator('[data-test="error"]'); 
    }

    async verifyCheckoutStepOnePage() : Promise<void>{
        await this.expect(this.checkoutTitle).toBeVisible(); 
        await this.expect(this.firstNameInput).toBeVisible(); 
        await this.expect(this.lastNameInput).toBeVisible(); 
        await this.expect(this.postalCodeInput).toBeVisible(); 
        await this.expect(this.cancelButton).toBeVisible(); 
        await this.expect(this.continueButton).toBeVisible(); 
    }

    async fillCheckoutForm(information : CheckoutCredential) : Promise<void>{
        const {firstName, lastName, postalCode} = information;
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async verifyErrorMessage(errorMessageExpected: string): Promise<void> {
        await super.verifyErrorMessage(errorMessageExpected,this.errorMessageDiv);
    }

    getUrl(){
        return this.URL; 
    }
}