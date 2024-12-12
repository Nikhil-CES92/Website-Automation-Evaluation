/**
 * This abstracts clicking on Element
 * @example import {Click} from '../interactions' Click.on('#idOfTheElement')
 */
export default class Click {
    constructor(page) {
        this.page = page
    }

    async onContainText(text) {
        await this.page.getByText(text, { exact: true }).click()
    }

    async on(sel) {
        await this.page.locator(sel).click()
    }

    async forceClickOn(sel) {
        await this.page.locator(sel).click({ force: true })
    }

}