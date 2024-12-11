import { test } from '@playwright/test'
import HomePage from '../PageObjects/homePageFns'
import Verify from '../Utils/Assertions/verify'
import Click from '../Utils/Interaction/click'
import Type from '../Utils/Interaction/type'
import pageSels from '../Utils/Selectors/pageSels'
import testData from '../TestData/products.json'
import constant from '../Utils/Constants/homePageConstants'
import orderTypeData from '../TestData/orderTypeDetails.json'


const { menuBtn, menuSearchBar, cartCountIcon, searchResultTitle } = pageSels.homePage
const { item1, item2 } = testData
const { pickUp, delivery } = constant.orderTypes
const { messageAfterItemAddition } = constant.toastMessages

let click, verify, homePage, urlCheck, type
test.describe('Should execute KFC India test scenarios- Home page- Menu', () => {
    test.beforeEach('It should navigate to home page before each test block', async ({ page }) => {
        homePage = new HomePage(page)
        verify = new Verify(page)
        click = new Click(page)
        type = new Type(page)

        //navigating to home page and verifying the URL
        await homePage.navigateToHomePage('/')
        urlCheck = await verify.theUrl()
        await urlCheck.equalsTo('https://online.kfc.co.in/');

    })

    test('[SC-2]: User should be able to search a valid product and add to cart', async ({ page }) => {
        //clicking on menu btn and asserting for success
        click.on(menuBtn)
        urlCheck = await verify.theUrl()
        await urlCheck.contains('menu')

        //enter product name in search  bar
        const cartIcon = await verify.theElement(cartCountIcon)
        await cartIcon.hasText('0')
        await type.theTextInto(menuSearchBar, item1)

        //select the item from search result
        await homePage.selectItemFromSearchResult(item1)
        await homePage.selectOrderTypeDetails(delivery, orderTypeData.dataSet1)

        //verify the toast message
        const toastMessage = await verify.theToastMessage()
        await toastMessage.showsToastMessage(messageAfterItemAddition)

        //verifying card count after adding items
        await cartIcon.hasText('1')

    })

    test('[SC-2.1]: User should see 0 result for an invalid product search', async () => {
        //clicking on menu btn and asserting for success
        click.on(menuBtn)
        urlCheck = await verify.theUrl()
        await urlCheck.contains('menu')

        //enter an invalid product name in search bar
        await type.theTextInto(menuSearchBar, item2)

        //verify for the search result text
        const searchResultCount = await verify.theElement(searchResultTitle)
        await searchResultCount.hasText('0 Results')

    })
})