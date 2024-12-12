import { test } from '@playwright/test'
import HomePage from '../PageObjects/homePageFns'
import Verify from '../Utils/Assertions/verify'
import Click from '../Utils/Interaction/click'
import Type from '../Utils/Interaction/type'
import PageSels from '../Utils/Selectors/pageSels'
import TestData from '../TestData/products.json'
import Constant from '../Utils/Constants/homePageConstants'
import OrderTypeData from '../TestData/orderTypeDetails.json'
import Carts from '../PageObjects/cartsPageFns'


const { menuBtn, menuSearchBar, cartCountIcon, foodItemNameInCart, checkOutBtn, emailInputField, fullNameInput, phoneNumberInput, addPaymentBtn, paymentOptionPopUpText } = PageSels.homePage
const { item1 } = TestData
const { pickUp, delivery } = Constant.orderTypes
const { messageAfterItemAddition } = Constant.toastMessages
const { name, email, phone } = OrderTypeData.dataSet1

let click, verify, homePage, urlCheck, type, baseURL, cartsPage
test.describe('Should execute KFC India test scenarios- Carts page', () => {
    test.beforeEach('It should navigate to home page before each test block', async ({ page }) => {
        homePage = new HomePage(page)
        verify = new Verify(page)
        click = new Click(page)
        type = new Type(page)
        cartsPage = new Carts(page)
        baseURL = page.context()._options.baseURL

        //navigating to home page and verifying the URL
        await homePage.navigateToHomePage('/')
        urlCheck = await verify.theUrl()
        await urlCheck.equalsTo(baseURL)

    })

    test('[SC-4]: User should be able to add a product to cart and check out', async () => {
        //clicking on menu btn and asserting for success
        await click.on(menuBtn)
        urlCheck = await verify.theUrl()
        await urlCheck.contains('menu')

        //enter product name in search  bar
        const cartIcon = await verify.theElement(cartCountIcon)
        await cartIcon.hasText('0')
        await type.theTextInto(menuSearchBar, item1)

        //select the item from search result
        await homePage.selectItemFromSearchResult(item1)
        await homePage.selectOrderTypeDetails(delivery, OrderTypeData.dataSet1)

        //verify the toast message
        const toastMessage = await verify.theToastMessage()
        await toastMessage.showsToastMessage(messageAfterItemAddition)

        //verifying card count after adding items
        await cartIcon.hasText('1')

        //navigate to cart and verify for success
        await click.forceClickOn(cartCountIcon)
        urlCheck = await verify.theUrl()
        await urlCheck.contains('cart')

        //verify that correct item has added
        const foodItemName = await verify.theElement(foodItemNameInCart)
        await foodItemName.hasText(item1)

        //navigate to checkout
        await click.on(checkOutBtn)

        //fill the contact info and verify it
        await cartsPage.enterUserContactDetails(OrderTypeData.dataSet1)
        const nameInput = await verify.theElement(fullNameInput)
        const emailInput = await verify.theElement(emailInputField)
        const phoneInput = await verify.theElement(phoneNumberInput)

        await nameInput.haveValue(name)
        await phoneInput.haveValue(phone)
        await emailInput.haveValue(email)


        //navigate to add payment method window
        await click.on(addPaymentBtn)
        const paymentOptionText = await verify.theElement(paymentOptionPopUpText)
        await paymentOptionText.isVisible()

    })
})