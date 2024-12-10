/**
 * This abstracts Typing on Element
 * @example import {Type} from '../interactions' Type.theTextInto('#idOfTheElement',Text)
 */
export default class Type {
    constructor(page) {
        this.page = page
    }

    async theTextInto(sel, text) {
        await this.page.locator(sel).clear()
        await this.page.fill(sel, text)
        await this.page.keyboard.press('Enter')
    }


}