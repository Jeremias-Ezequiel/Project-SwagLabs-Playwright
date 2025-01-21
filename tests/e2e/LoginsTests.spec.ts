import test, { expect } from "@playwright/test";
import { CommonFlows } from "../../src/utils/CommonFlows";
import { LoginPage } from "../../src/pages/LoginPage"; 
import { UserCredential } from "../../src/models/LoginCredentialModel";
import { ErrorMessagesModel } from "../../src/models/ErrorMessagesModel";
import {validCredential} from "../../src/fixtures/userCredential.json"; 

test.describe('Login page tests', () => {
    let loginPage : LoginPage;
    let commonFlows : CommonFlows; 
    let user : UserCredential; 
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
        
    test('Attempt to log in with invalid credentials', async ({ page }) => {
        user = {
            username : 'asd',
            password : 'asd'
        }
        const {username,password} = user; 
        const {userNotExist} = ErrorMessagesModel;

        await loginPage.fillLoginForm(username,password);
        await loginPage.verifyErrorMessage(userNotExist); 
    })

    test('Attempt to log in with only the password field filled', async ({ page }) => {
        user = {
            username : '',
            password : 'asdfas'
        }
        const {username,password} = user; 
        const {usernameRequired} = ErrorMessagesModel;

        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(usernameRequired); 
    })

    test('Attemps to log in with only the username field filled', async ({ page }) => {
        user = {
            username : 'asdasd',
            password : ''
        }
        const {username,password} = user;  
        const {passwordRequired} = ErrorMessagesModel;

        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(passwordRequired); 
    })
    
})
