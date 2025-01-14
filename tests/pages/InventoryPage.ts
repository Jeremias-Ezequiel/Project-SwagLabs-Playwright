import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage{
    private filterDropdown: Locator;
    private containerItems: Locator;
    private productsLabel: Locator;
    private options: Set<string>;

    constructor(page : Page){
        super(page);
        this.filterDropdown = this.page.locator('[data-test="product-sort-container"]');
        this.containerItems = this.page.locator('[data-test="inventory-list"]'); 
        this.productsLabel = this.page.locator('[data-test="title"]');
        this.options = new Set([
            'Name (A to Z)',
            'Name (Z to A)',
            'Price (low to high)',
            'Price (high to low)'
        ])
    }

    // Verifies that key elements on the inventory page are visible
    async verifyInventoryPage() : Promise<void>{
        await this.expect(this.filterDropdown,'The filter dropdown is not visible').toBeVisible(); 
        await this.expect(this.containerItems,'The items is not visible').toBeVisible(); 
        await this.expect(this.productsLabel,'The message label in the page inventory is not visible').toBeVisible();  
    }

    // Opens the filter dropdown menu
    async openFilterDropdown() : Promise<void>{
        await this.clicElement(this.filterDropdown); 
    }

    // Finds the button associated with a specific product and button text
    private async findButton(productName : string, buttonText : string) : Promise<Locator | null> {
        const itemDescriptions = await this.containerItems.locator('[data-test="inventory-item-description"]')
        const count = await itemDescriptions.count(); 

        for(let i = 0; i < count; i++){
            const currentItem = itemDescriptions.nth(i);
            
            const producExists = await currentItem.locator('text=' + productName).isVisible(); 

            if(producExists){
                return currentItem.locator('button',{hasText : buttonText});
            }
        }
        return null; 
    }

    // Adds a produc to the cart
    async addItemToCart(productName : string) : Promise<void>{
        const addButton = await this.findButton(productName,'Add to cart'); 
        if(addButton){
            await addButton.click(); 
        }else{
            throw new Error(`Product "${productName}" not found`)
        }
    }

    // Removes a product from the cart
    async removeItemFromCart(productName : string) : Promise<void>{
        const removeButton = await this.findButton(productName,'Remove');
        if(removeButton){
            await removeButton.click(); 
        }else{
            throw new Error(`Product "${productName}" not found`)
        }
    }
    
    // Applies a filter from the dropdown menu
    async filterByOption(option : string) : Promise<void>{
        if(!this.options.has(option)){
            throw new Error(`Invalid option: "${option}"`); 
        }
        await this.filterDropdown.selectOption(option);
    }
}