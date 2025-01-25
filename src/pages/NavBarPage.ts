import { Page , Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class NavBarPage extends BasePage{
    private burgerMenu: Locator;
    private shoppingCartLink: Locator;
    private itemsInCartLink: Locator;

    constructor(page : Page){
        super(page); 
        this.burgerMenu = this.page.getByRole('button', { name: 'Open Menu' }); 
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
        this.itemsInCartLink = this.shoppingCartLink.locator("//span[@data-test='shopping-cart-badge']"); 
    }

    // Verifies that key elements on the Navigation Bar are visible
    async verifyNavBarPage() : Promise<void>{
        await this.expect(this.burgerMenu).toBeVisible(); 
        await this.expect(this.shoppingCartLink).toBeVisible(); 
    }

    async openBurgerMenu() : Promise<void>{
        await this.expect(this.burgerMenu).toBeVisible(); 
        await this.clicElement(this.burgerMenu); 
    }

    async goToShoopingCartPage() : Promise<void>{
        await this.expect(this.shoppingCartLink).toBeVisible(); 
        await this.clicElement(this.shoppingCartLink); 
    }

    // Verifies if items exist in the cart
    async verifyItemsInCartLogo(quantityItems : string) : Promise<void>{
        if(parseInt(quantityItems) <= 0) {
            throw new Error('The numbers of items added to the cart must be greather than 1');
        } 
        const quantity = await this.itemsInCartLink.textContent();
        this.expect(quantity, "The number of items added does not match the expected quantity").toEqual(quantityItems); 
    }

    async verifyShoppingCartLogoIsEmpty() : Promise<void>{
        await this.expect(this.itemsInCartLink).toBeHidden();
    }
}
