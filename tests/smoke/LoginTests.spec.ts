import test, { expect } from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { LoginPage } from "../../src/pages/LoginPage"; 
import { UserCredential } from "../../src/models/LoginCredentialModel";
import { ErrorMessagesModel } from "../../src/models/ErrorMessagesModel";
import credential from "../../src/fixtures/userCredential.json";

test.describe('Login Page Tests - Smoke', () => {
    let loginPage : LoginPage;
    let commonFlows : CommonFlows; 
    const {validCredential, invalidUsersCredentials, validUsersCredentials} = credential; 
    const inventoryURL : string = 'https://www.saucedemo.com/inventory.html';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        commonFlows = new CommonFlows(page);  
        await commonFlows.goToLoginPage();
    })

    test('Log in with valid credentials', async ({ page }) => {
        const {username, password} = validCredential;
        await loginPage.fillLoginForm(username,password);
        await expect(page).toHaveURL(inventoryURL);
    })
        
    test('Verify Login page', async ({ page }) => {
        await loginPage.verifyLoginPage(); 
    })
    
    test('Attempt to log in with invalid credentials', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.invalidUser;  
        const {userNotExist} = ErrorMessagesModel;
        await loginPage.fillLoginForm(username,password);
        await loginPage.verifyErrorMessage(userNotExist); 
    })

    test('Attempt to log in with only the password field filled', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.missingUsername; 
        const {usernameRequired} = ErrorMessagesModel;

        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(usernameRequired); 
    })

    test('Attemps to log in with only the username field filled', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.missingPassword;  
        const {passwordRequired} = ErrorMessagesModel;
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(passwordRequired); 
    })
    
})
