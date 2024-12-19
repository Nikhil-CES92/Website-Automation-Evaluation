import { expect } from '@playwright/test'
import pageSels from '../Selectors/pageSels';

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
            },
            contains: async (text) => {
                const textPattern = new RegExp(text)
                await expect(this.page).toHaveURL(textPattern);  // Perform URL assertion(partial)
            }

        };
    }

    async theElement(sel) {
        return {
            hasText: async (text) => {
                await expect(this.page.locator(sel)).toHaveText(text)  //perform text assertion
            },
            haveValue: async (value) => {
                await expect(this.page.locator(sel)).toHaveValue(value)
            },

            isVisible: async () => {
                await expect(this.page.locator(sel)).toBeVisible()
            }
        }
    }

    async theToastMessage(sel = pageSels.homePage.toastMessage) {     //all toast messages are having same selector so adding a default selector value
        return {
            showsToastMessage: async (text) => {
                await expect(this.page.locator(sel)).toHaveText(text)
            }
        }
    }
}
