/**
 * @class HomePage consists of different operation functions on homepage
 */
export default class HomePage {
    /**
    * Creates an instance of the HomePage class.
    * @param {import('@playwright/test').Page} page - The Playwright Page object representing the current browser page.
    * @constructor
    */
    constructor(page) {
        this.page = page
    }

    /**
     * Navigates to the specified URL in the browser.
     *
     * @param {string} url - The URL to navigate to.
     * 
     * @example
     * // Example usage
     * await homePage.navigateToHomePage('https://example.com');
     */
    async navigateToHomePage(url) {
        await this.page.goto(url)
    }
}