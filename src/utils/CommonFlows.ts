import { Page } from '@playwright/test'
import { BasePage } from '../pages/BasePage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';
import { LoginPage } from '../pages/LoginPage';
import { validCredential } from '../models/LoginCredentialModel';
import { NavBarPage } from '../pages/NavBarPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

export class CommonFlows extends BasePage{
    private loginPage : LoginPage;
    private burguerMenu: BurgerMenuPage;
    private navBarPage: NavBarPage;
    private inventoryPage: InventoryPage;
    private inventoryURL : string; 
    private cartPage : CartPage; 

    constructor(page : Page){
        super(page);
        this.loginPage = new LoginPage(page);
        this.burguerMenu = new BurgerMenuPage(page);
        this.navBarPage = new NavBarPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page); 
        this.inventoryURL = 'https://www.saucedemo.com/inventory.html';
    }

    async goToLoginPage() : Promise<void>{
        await this.page.goto('');
        await this.loginPage.verifyLoginPage();
    }

    private async goToInventoryPage() : Promise<void>{
        await this.page.goto(this.inventoryURL);
        await this.inventoryPage.verifyInventoryPage(); 
    }

    async logInSuccessfully() : Promise<void>{
        await this.goToLoginPage(); 
        const {username,password} = validCredential; 
        await this.loginPage.fillLoginForm(username,password); 
    }
    
    async logOutSuccessfully() : Promise<void> {
        await this.goToInventoryPage(); 
        await this.navBarPage.openBurgerMenu();
        await this.burguerMenu.logOut();
        await this.loginPage.verifyLoginPage();
    }

    async goToCartPage(){
        await this.logInSuccessfully(); 
        await this.navBarPage.verifyNavBarPage(); 
        await this.navBarPage.goToShoopingCartPage();
    }
}