import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class InventoryItemPage extends BasePage{
    addCartButton: Locator;
    imageContainer: Locator;
    detailNameContainer: Locator;
    detailDescriptionContainer: Locator;
    detailPriceContainer: Locator;

    constructor(page : Page){
        super(page); 
        this.addCartButton = this.page.locator('[data-test="add-to-cart"]');
        this.imageContainer = this.page.locator(".inventory_details_img_container"); 
        this.detailNameContainer = this.page.locator(".inventory_details_name large_size"); 
        this.detailDescriptionContainer = this.page.locator(".inventory_details_desc large_size"); 
        this.detailPriceContainer = this.page.locator(".inventory_details_price"); 
    }

    async verifyInventoryItemPage(){
        await this.expect(this.addCartButton).toBeVisible();        
        await this.expect(this.imageContainer).toBeVisible(); 
        await this.expect(this.detailNameContainer).toBeVisible(); 
        await this.expect(this.detailDescriptionContainer).toBeVisible(); 
        await this.expect(this.detailPriceContainer).toBeVisible(); 
    }

}