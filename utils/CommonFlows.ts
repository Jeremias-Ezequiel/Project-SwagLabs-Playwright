import {Page, Locator} from '@playwright/test'
import { BasePage } from '../tests/pages/BasePage';
import { LoginPage } from '../tests/pages/LoginPage';
import {credentials} from './config'
import { BurgerMenuPage } from '../tests/pages/BurgerMenuPage';
import { NavBarPage } from '../tests/pages/NavBarPage';
import { InventoryPage } from '../tests/pages/InventoryPage';

export class CommonFlows extends BasePage{
    private loginPage : LoginPage;
    private burguerMenu: BurgerMenuPage;
    private navBarPage: NavBarPage;
    private inventoryPage: InventoryPage;
    private inventoryURL : string; 

    constructor(page : Page){
        super(page);
        this.loginPage = new LoginPage(page);
        this.burguerMenu = new BurgerMenuPage(page);
        this.navBarPage = new NavBarPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.inventoryURL = 'https://www.saucedemo.com/inventory.html';
    }

    async goToLoginPage() : Promise<void>{
        await this.page.goto('');
        await this.loginPage.verifyLoginPage();
    }

    async goToInventoryPage() : Promise<void>{
        await this.page.goto(this.inventoryURL);
        await this.inventoryPage.verifyInventoryPage(); 
    }

    async logInSuccessfully() : Promise<void>{
        const {username,password} = credentials.validCredentials; 
        await this.loginPage.fillLoginForm(username,password); 
    }
    
    async logOutSuccessfully() : Promise<void> {
        await this.goToInventoryPage(); 
        await this.navBarPage.openBurgerMenu();
        await this.burguerMenu.logOut();
        await this.loginPage.verifyLoginPage();
    }
}