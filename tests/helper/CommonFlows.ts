import { Page } from '@playwright/test'
import { BasePage } from '../pages/BasePage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';
import { LoginPage } from '../pages/LoginPage';
import credentials from '../data/userCredential.json'
import { NavBarPage } from '../pages/NavBarPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

export class CommonFlows extends BasePage{
    private loginPage : LoginPage;
    private burguerMenu: BurgerMenuPage;
    private navBarPage: NavBarPage;
    private inventoryPage: InventoryPage;
    private cartPage : CartPage; 
    
    constructor(page : Page){
        super(page);
        this.loginPage = new LoginPage(page);
        this.burguerMenu = new BurgerMenuPage(page);
        this.navBarPage = new NavBarPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page); 
    }

    // Flows  for e2e tests
    async flowInventoryPage(){
        await this.logInSuccessfully(); 
    } 

    async flowCartPage(){
        await this.flowInventoryPage(); 
        await this.navBarPage.goToShoopingCartPage();
    }

    // Go to singles pages
    async goToLoginPage() : Promise<void>{
        await this.page.goto('');
        await this.loginPage.verifyLoginPage();
    }

    async goToInventoryPage() : Promise<void>{
        await this.page.goto(this.inventoryPage.getUrl());
    }

    async logInSuccessfully() : Promise<void>{
        await this.goToLoginPage(); 
        const {username,password} = credentials.validCredential; 
        await this.loginPage.fillLoginForm(username,password); 
    }
    
    async logOutSuccessfully() : Promise<void> {
        await this.goToInventoryPage(); 
        await this.navBarPage.openBurgerMenu();
        await this.burguerMenu.logOut();
    }

    async goToCartPage(){
        await this.page.goto(this.cartPage.getUrl());
    }

    async loginWithCookies(page : Page){
        const cookieName = process.env.COOKIE_NAME;  
        const cookieValue = process.env.COOKIE_VALUE; 
        const cookieDomain = process.env.COOKIE_DOMAIN;

        if(!cookieName || !cookieDomain || !cookieValue){
            throw new Error('Environment variables for cookies are missing.');
        }

        await page.context().addCookies([{
            name : cookieName,
            value : cookieValue,
            domain : cookieDomain,
            path : "/"
        }])
    }
}