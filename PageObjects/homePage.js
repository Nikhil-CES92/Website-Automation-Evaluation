import PageSels from '../Utils/Selectors/pageSels'
import Constant from '../Utils/Constants/homePageConstants'

const { searchResultTitle, addToCartText, itemCard, itemNameInCard, deliveryTypeBtn, storeAreaStreetSearchBar, pickUpTypeBtn, listOptions, storeAreaStreetSuggestionList, confirmBtn, confirmBtnOnHandler } = PageSels.homePage
const { delivery, pickUp } = Constant.orderTypes
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

    /**
     * Select the respective item from search result cards
     * @param {string} item -The item that has to be selected
     */
    async selectItemFromSearchResult(item) {
        const totalSearchResult = await this.page.locator(searchResultTitle).textContent()

        //if only 1 search result found directly clicking on add to cart btn
        if (totalSearchResult === '1 Results') {
            await this.page.getByText(addToCartText, { exact: true }).click()
        }
        //else checking for item name and then clicking
        else {
            const totalItemCount = await this.page.locator(itemCard).count()

            for (let i = 0; i < totalItemCount; i++) {
                const currentItemCard = this.page.locator(itemCard).nth(i)
                const itemName = await currentItemCard.locator(itemNameInCard).textContent()

                if (itemName === item) {
                    // If found, click on "Add to Cart"
                    await currentItemCard.getByText(addToCartText, { exact: true }).click()
                    break
                }
            }

        }


    }

    /**
     * This function will select the respective order type and details
     * @param {string} orderType - It is the type of order i.e Delivery, Pick up
     * @param {object} orderDetails - It is the object contains of order details like zip, area, time etc
     * @param {string} orderDetails.zip - zip code if order type is delivery
     * @param {string} orderDetails.area - area if order type is pickup
     */
    async selectOrderTypeDetails(orderType, orderDetails) {
        const { store = null, area = null, zip = null } = orderDetails

        //selecting different order types according to input type
        if (orderType === delivery) {
            await this.page.locator(deliveryTypeBtn).click()
        } else if (orderType === pickUp) {
            await this.page.locator(pickUpTypeBtn).click()
        }

        await this.page.fill(storeAreaStreetSearchBar, store || area || zip)
        await this.page.locator(storeAreaStreetSuggestionList).waitFor()

        //selecting address from the list options
        await this.page.locator(listOptions).first().click()
        await this.page.waitForLoadState('networkidle')
        await this.page.locator(confirmBtn).click()

        await this.page.locator(confirmBtnOnHandler).click()
    }
}