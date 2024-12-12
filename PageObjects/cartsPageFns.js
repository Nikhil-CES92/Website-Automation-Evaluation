import PageSels from '../Utils/Selectors/pageSels'


const { fullNameInput, emailInputField, phoneNumberInput } = PageSels.homePage
export default class Carts {
    /**
       * Creates an instance of the HomePage class.
       * @param {import('@playwright/test').Page} page - The Playwright Page object representing the current browser page.
       * @constructor
       */
    constructor(page) {
        this.page = page
    }


    /**
     * This function will enter user details i.e name , phone and email
     * @param {object} details - it is the object containing user specific details 
     * @param {string} details.name - user name
     * @param {string} details.phone - user phone no
     * @param {string} details.email - user email address
     */
    async enterUserContactDetails(details) {
        const { name, phone, email } = details

        await this.page.fill(fullNameInput, name)
        await this.page.fill(phoneNumberInput, phone)
        await this.page.fill(emailInputField, email)

    }
}