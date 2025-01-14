import {Page, Locator, expect, type Expect} from '@playwright/test'

export class BasePage{
    page: Page;
    expect: Expect;

    constructor(page : Page){
        this.page = page; 
        this.expect = expect; 
    }

    async waitForElement(locator : Locator){
        await locator.waitFor({state : 'visible'});  
    }

    async clicElement(locator : Locator){
        await locator.click();  
    }

    async fillInput(locator : Locator, text : string){
        await locator.fill(text); 
    }
}