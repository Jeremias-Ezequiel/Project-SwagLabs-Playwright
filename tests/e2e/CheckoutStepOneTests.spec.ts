import test from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { CartPage } from "../../src/pages/CartPage";
import { CheckoutStepOnePage } from "../../src/pages/CheckoutStepOnePage";
import {validCheckoutCredential,checkoutCredentials} from "../../src/fixtures/checkoutCredential.json"; 
import {errorMessagesCheckoutOne} from "../../src/models/ErrorCheckoutStepOneModel"; 
import { CheckoutStepTwoPage } from "../../src/pages/CheckoutStepTwoPage";

test.describe('Checkout Step One Test', () => {
    let commonFlows : CommonFlows; 
    let cartPage : CartPage; 
    let checkoutStepOne : CheckoutStepOnePage; 
    let checkoutStepTwo : CheckoutStepTwoPage; 
    const {errorAllInput,errorFirstName,errorLastName,errorPostalCode} = errorMessagesCheckoutOne; 
    const {missingFirstName,missingLastName,missingPostalCode,allMissingInput,specialCharacterFirstName,
        specialCharacterLastName,specialCharacterPostalCode} = checkoutCredentials; 

    test.beforeEach(async ({ page }) => {
        commonFlows = new CommonFlows(page);
        cartPage = new CartPage(page); 
        checkoutStepOne = new CheckoutStepOnePage(page); 
        checkoutStepTwo = new CheckoutStepTwoPage(page); 

        await commonFlows.loginWithCookies(page);
        await commonFlows.goToCartPage(); 
        await cartPage.clickCheckout(); 
    })

    test('[@smoke@regression]Verify the checkout step one page are displayed', async ({ page }) => {
        await checkoutStepOne.verifyCheckoutStepOnePage();
    })       

    test('[@smoke@regression]Checkout the form with valid credentials', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(validCheckoutCredential);  
        await checkoutStepTwo.verifyCheckoutStepTwoPage();
    })

    test('[@regression]Checkout the form with only last name and postal code input field filled', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(missingFirstName);
        await checkoutStepOne.verifyErrorMessage(errorFirstName);
    })

    test('[@regression]Checkout the form with only first name and postal code input field filled', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(missingLastName);
        await checkoutStepOne.verifyErrorMessage(errorLastName);
    })

    test('[@regression]Checkout the form with only first name and last name input field filled', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(missingPostalCode);
        await checkoutStepOne.verifyErrorMessage(errorPostalCode);
    })

    test('[@regression]Checkout the form missing all input field', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(allMissingInput);
        await checkoutStepOne.verifyErrorMessage(errorAllInput);
    })

    test('[@regression]Checkout the form with first name input field filled with special characters', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(specialCharacterFirstName);
        await checkoutStepTwo.verifyCheckoutStepTwoPage();
    })

    test('[@regression]Checkout the form with last name input field filled with special characters', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(specialCharacterLastName);
        await checkoutStepTwo.verifyCheckoutStepTwoPage();
    })
    test('[@regression]Checkout the form with postal code input field filled with special characters', async ({ page }) => {
        await checkoutStepOne.fillCheckoutForm(specialCharacterFirstName);
        await checkoutStepTwo.verifyCheckoutStepTwoPage();
    })
    
    
})
