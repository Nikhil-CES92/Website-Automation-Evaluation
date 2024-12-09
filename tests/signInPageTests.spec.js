import { test } from '@playwright/test'
import HomePage from '../PageObjects/homePageFns'
import Verify from '../Utils/Assertions/verify'
import Click from '../Utils/Interaction/click'
import pageSels from '../Utils/Selectors/pageSels'

const { skipBtnText } = pageSels.signInPage
const { signInBtn, signIn } = pageSels.homePage

let click, verify, homePage, urlCheck
test.describe('Should execute KFC India test scenarios- Sign In page', () => {
    test.beforeEach('It should navigate to home page before each test block', async ({ page }) => {
        homePage = new HomePage(page)
        verify = new Verify(page)
        click = new Click(page)

        //navigating to home page and verifying the URL
        await homePage.navigateToHomePage('/')
        urlCheck = await verify.theUrl()
        await urlCheck.equalsTo('https://online.kfc.co.in/');

    })

    test('[SC-1]: User should be able to skip the login', async () => {
        //clicking on signin btn and then skip sign in btn
        await click.on(signInBtn)
        await click.onContainText(skipBtnText)

        //verifying the sign is skipped
        urlCheck = await verify.theUrl()
        await urlCheck.equalsTo('https://online.kfc.co.in/');

        //verifying the default sign in text
        const signInBtnText = await verify.theElement(signInBtn)
        await signInBtnText.hasText(signIn)
    })
})