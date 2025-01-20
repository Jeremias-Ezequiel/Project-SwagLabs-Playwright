import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class FooterBarPage extends BasePage{
    private twitterLink: Locator;
    private facebookLink: Locator;
    private linkedinLink: Locator;
    
    constructor(page : Page){
        super(page); 
        this.twitterLink = this.page.locator('[data-test="social-twitter"]');
        this.facebookLink = this.page.locator('[data-test="social-facebook"]'); 
        this.linkedinLink = this.page.locator('[data-test="social-linkedin"]'); 
    }

    async verifyFooterPage(){
        // Verify that these are visible
        await this.expect(this.twitterLink).toBeVisible(); 
        await this.expect(this.facebookLink).toBeVisible(); 
        await this.expect(this.linkedinLink).toBeVisible(); 
    
        // Verify that these are enabled
        await this.expect(this.twitterLink).toBeEnabled();
        await this.expect(this.facebookLink).toBeEnabled();
        await this.expect(this.linkedinLink).toBeEnabled();

        // Verify that these containt the correct href value.
        const hrefTwitter = this.twitterLink.getAttribute('href');
        const hrefFacebook = this.facebookLink.getAttribute('href');
        const hrefLinkedin = this.linkedinLink.getAttribute('href');
        
        await this.expect(hrefTwitter).toBe('https://x.com/saucelabs');
        await this.expect(hrefFacebook).toBe('https://www.facebook.com/saucelabs');
        await this.expect(hrefLinkedin).toBe('https://www.linkedin.com/company/sauce-labs/');
    }
}