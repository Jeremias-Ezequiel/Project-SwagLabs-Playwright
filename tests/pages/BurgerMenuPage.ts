import { Page, Locator} from "@playwright/test";
import { BasePage } from "./BasePage";


export class BurgerMenuPage extends BasePage{
    private allItemsLink: Locator;
    private aboutLink: Locator;
    private logoutLink: Locator;
    private resetAppStateLink: Locator;
    
    constructor(page : Page){
        super(page); 
        this.allItemsLink = this.page.locator('[data-test="inventory-sidebar-link"]'); 
        this.aboutLink = this.page.locator('[data-test="about-sidebar-link"]');
        this.logoutLink = this.page.locator('[data-test="logout-sidebar-link"]');
        this.resetAppStateLink = this.page.locator('[data-test="reset-sidebar-link"]');
    }

    // Verifies that key elements on the page are visible
    async verifyBurgerMenuPage() : Promise<void>{
        await this.expect(this.allItemsLink).toBeVisible();
        await this.expect(this.aboutLink).toBeVisible();
        await this.expect(this.logoutLink).toBeVisible();
        await this.expect(this.resetAppStateLink).toBeVisible();
    }

    // Navigates through the burguer menu links

    async goToAllItems() : Promise<void>{
        await this.expect(this.allItemsLink).toBeVisible();
        await this.clicElement(this.allItemsLink); 
    }

    async goToAbout() : Promise<void>{
        await this.expect(this.aboutLink).toBeVisible();
        await this.clicElement(this.aboutLink);
    }

    async logOut() : Promise<void>{
        await this.expect(this.logoutLink).toBeVisible();
        await this.clicElement(this.logoutLink);
    }

    async goToResetAppState() : Promise<void>{
        await this.expect(this.resetAppStateLink).toBeVisible();
        await this.clicElement(this.resetAppStateLink); 
    }
}