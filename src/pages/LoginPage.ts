import { Page , Locator, expect} from '@playwright/test'
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginInput: Locator;
    private errorMessage: Locator;
    private usernameRequired: string;
    private passwordRequired: string;
    private userNotExist: string;
    

    constructor(page : Page){
        super(page); 
        this.usernameInput = this.page.locator('[data-test="username"]'); 
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginInput = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');   
    }
    
    async verifyLoginPage() : Promise<void>{
        await expect(this.usernameInput,"The username input is not visible").toBeVisible();
        await expect(this.passwordInput,"The password input is not visible").toBeVisible();
        await expect(this.loginInput,"The login input is not visible").toBeVisible();
    }

    async fillLoginForm(username : string, password : string) : Promise<void>{
        await this.verifyLoginPage(); 

        await this.fillInput(this.usernameInput, username);
        
        await this.fillInput(this.passwordInput, password);

        await this.loginInput.click();
    }

    async verifyErrorMessage(errorMessageExpected : string) : Promise<void>{
        await this.errorMessage.isVisible(); 
        
        const message = await this.errorMessage.textContent(); 

        await this.expect(message).toEqual(errorMessageExpected); 
    }
    
}