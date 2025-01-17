import test, { expect } from "@playwright/test";
import { CommonFlows } from "../../../src/utils/CommonFlows";
import { LoginPage } from "../../../src/pages/LoginPage"; 

test.describe('Login page tests', () => {
    let loginPage : LoginPage;
    let commonFlows : CommonFlows; 
    const inventoryURL : string = 'https://www.saucedemo.com/inventory.html';

    const errorMessages = {
        'usernameRequired' : 'Epic sadface: Username is required',
        'passwordRequired' : 'Epic sadface: Password is required',
        'userNotExist' : 'Epic sadface: Username and password do not match any user in this service'
    } 

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        commonFlows = new CommonFlows(page);  
        await page.goto('');
    })

    test('Log in with valid credentials', async ({ page }) => {
        const username : string = 'standard_user'; 
        const password : string = 'secret_sauce'; 
        await loginPage.fillLoginForm(username,password);
        await expect(page).toHaveURL(inventoryURL);
    })
        
    test('Attempt to log in with invalid credentials', async ({ page }) => {
        const username : string = 'asd'; 
        const password :string = 'asd'; 
        await loginPage.fillLoginForm(username,password);
        await loginPage.verifyErrorMessage(errorMessages.userNotExist); 
    })

    test('Attempt to log in with only the password field filled', async ({ page }) => {
        const username : string = ''; 
        const password : string = 'asdfas'; 
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(errorMessages.usernameRequired); 
    })

    test('Attemps to log in with only the username field filled', async ({ page }) => {
        const username : string = 'asdasd'; 
        const password : string = ''; 
        await loginPage.fillLoginForm(username,password); 
        await loginPage.verifyErrorMessage(errorMessages.passwordRequired); 
    })
    
})
