import test, { expect } from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { LoginPage } from "../../src/pages/LoginPage"; 
import { ErrorMessagesModel } from "../../src/models/ErrorMessagesModel";
import {validCredential,invalidUsersCredentials,validUsersCredentials} from "../../src/fixtures/userCredential.json"; 
import { InventoryPage } from "../../src/pages/InventoryPage";

test.describe('Login Page Tests', () => {
    let loginPage : LoginPage;
    let commonFlows : CommonFlows;  
    let inventoryPage : InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        commonFlows = new CommonFlows(page);
        inventoryPage = new InventoryPage(page);
        
        await commonFlows.goToLoginPage();
    })
    
    test('[@smoke@regression]Verify Login page', async ({ page }) => {
        await loginPage.verifyLoginPage(); 
    })

    test('[@smoke@regression]Log in with valid credentials', async ({ page }) => {
        const {username, password} = validCredential;
        await loginPage.fillLoginForm(username,password);
        await expect(page).toHaveURL(inventoryPage.getUrl());
    })    
    
    // DEJAR PARA REGRESSION
    test('[@smoke@regression]Attempt to log in with invalid credentials', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.invalidUser;  
        const {userNotExist} = ErrorMessagesModel; 
        await loginPage.fillLoginForm(username,password);
        await loginPage.verifyErrorMessage(userNotExist); 
    })

    test('[@regression]Attempt to log in with only the password field filled', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.missingUsername; 
        const {usernameRequired} = ErrorMessagesModel;
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(usernameRequired); 
    })

    test('[@regression]Attempt to log in with only the username field filled', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.missingPassword;  
        const {passwordRequired} = ErrorMessagesModel;
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(passwordRequired); 
    })

    test('[@regression]Attempt to log in with special characters in the username field filled', async ({ page }) => {
        const {username,password} = invalidUsersCredentials.specialCharactersUsername; 
        const {userNotExist} = ErrorMessagesModel;
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(userNotExist); 
    })
    
    // Grouping for tests with multiple valid credentials
    test.describe('Valid Users Credentials Tests', () => {
        validUsersCredentials.forEach((credential) => {
            const {username, password} = credential;
            if(username === 'locked_out_user'){
                return; 
            }
            test(`[@regression]Login test for user: ${username}`, async ({ page }) => {
                await loginPage.fillLoginForm(username,password);
                await expect(page).toHaveURL(inventoryPage.getUrl());
            }); 
            
        });
    })
    

})
