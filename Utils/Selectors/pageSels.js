/**
 * This object consists of element selectors across the pages
 */
export default {
    homePage: {
        signInBtn: 'div[data-testid="account"]',
        signIn: 'Sign In',
        menuBtn: 'a[data-testid="navItems-component-Menu"]',
        menuSearchBar: 'input[data-testid="search-our-menu"]',
        searchResultTitle: 'h1[class*="kfc-menu-title"]',
        addToCartText: 'Add to cart',
        itemCard: 'div[data-testid=menu-card-content-pdp-nav]',
        itemNameInCard: 'div[class="medium-menu-product-header"]',
        deliveryTypeBtn: 'button[data-testid="disposition-order-click-handler-Disposition - Delivery"]',
        pickUpTypeBtn: 'button[data-testid="disposition-order-click-handler-Disposition - Pickup]',
        storeAreaStreetSearchBar: 'input[data-testid="store-search-input"]',
        storeAreaStreetSuggestionList: 'div[class="suggestion-list"]',
        listOptions: 'div[class="suggestion-items"]',
        confirmBtn: 'button[data-testid="btn-confirm"]',
        cartCountIcon: 'role = button[name = "cart"]',
        toastMessage: 'div[class="Toastify"]',
        confirmBtnOnHandler: 'button[data-testid="confirm-button-handler"]',
        foodItemNameInCart: 'div[data-testid="global-accordian"]',
        checkOutBtn: 'button[data-testid="navigation-checkout-desktop"]',
        fullNameInput: 'input[data-testid="form-fullname"]',
        phoneNumberInput: 'input[data-testid="form-phone"]',
        emailInputField: 'input[data-testid="form-email"]',
        addPaymentBtn: 'button[data-testid="pay-button"]',
        paymentOptionPopUpText: 'text = Select Your Payment'
    },

    signInPage: {
        skipBtnText: 'Skip, Continue As Guest',
    }
}