import { test } from '@playwright/test'
import HomePage from '../PageObjects/homePage'
import Verify from '../Utils/Assertions/verify'
import Click from '../Utils/Interaction/click'
import Type from '../Utils/Interaction/type'
import PageSels from '../Utils/Selectors/pageSels'
import TestData from '../TestData/products.json'
import Constant from '../Utils/Constants/homePageConstants'
import OrderTypeData from '../TestData/orderTypeDetails.json'


const { menuBtn, menuSearchBar, cartCountIcon, searchResultTitle } = PageSels.homePage
const { item1, item2 } = TestData
const { pickUp, delivery } = Constant.orderTypes
const { messageAfterItemAddition } = Constant.toastMessages

let click, verify, homePage, type, baseURL
test.describe('Should execute KFC India test scenarios- Home page- Menu', () => {
    homePage = new HomePage()
    verify = new Verify()
    click = new Click()
    type = new Type()

    test.beforeEach('navigate to home page', async ({ page }) => {
        homePage.page = page
        verify.page = page
        click.page = page
        type.page = page
        baseURL = page.context()._options.baseURL

        //navigating to home page and verifying the URL
        homePage.navigateToHomePage('/')
            .then(() => verify.theUrl())
            .then((urlCheck) => urlCheck.equalsTo(baseURL))

    })

    test('[SC-2]: User should be able to search a valid product and add to cart', async () => {
        //clicking on menu btn and asserting for success
        await click.on(menuBtn)
        verify.theUrl()
            .then((urlCheck) => urlCheck.contains('menu'))


        //enter product name in search  bar
        verify.theElement(cartCountIcon)
            .then((cartIcon) => cartIcon.hasText('0'))

        await type.theTextInto(menuSearchBar, item1)

        //select the item from search result
        await homePage.selectItemFromSearchResult(item1)
        await homePage.selectOrderTypeDetails(delivery, OrderTypeData.dataSet1[0])

        //verify the toast message
        verify.theToastMessage()
            .then((toastMessage) => toastMessage.showsToastMessage(messageAfterItemAddition))


        //verifying card count after adding items
        verify.theElement(cartCountIcon)
            .then((cartIcon) => cartIcon.hasText('1'))

    })

    test('[SC-2.1]: User should see 0 result for an invalid product search', async () => {
        //clicking on menu btn and asserting for success
        await click.on(menuBtn)
        verify.theUrl()
            .then((urlCheck) => urlCheck.contains('menu'))

        //enter an invalid product name in search bar
        await type.theTextInto(menuSearchBar, item2)

        //verify for the search result text
        verify.theElement(searchResultTitle)
            .then((searchResultCount) => searchResultCount.hasText('0 Results'))

    })
})