import { expect } from '@playwright/test'

/**
 * This abstracts the actions relating to test assertions
 * @example Verify.theElement('Login_Selector).hasText('Login')
 */
export default class Verify {
    constructor(page) {
        this.page = page;
    }

    async theUrl() {
        return {
            equalsTo: async (url) => {
                await expect(this.page).toHaveURL(url);  // Perform URL assertion
            }

        };
    }

    async theElement(sel) {
        return {
            hasText: async (text) => {
                await expect(this.page.locator(sel)).toHaveText(text)  //perform text assertion
            }
        }
    }
}
