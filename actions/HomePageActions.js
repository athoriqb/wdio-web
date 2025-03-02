const HomePageLocators = require('../locators/HomePageLocators');
const BasePage = require('../BasePage');
const { expect } = require('chai');

class HomePageActions extends BasePage {
    async open() {
        await super.open('/');
    }

    async navigateToCategoryCellPhonesAndAccessories(){
        await $(HomePageLocators.shopByCategoryMenu).click();
        expect(await $(HomePageLocators.categoryOptions).isDisplayed()).to.be.true;
        await $(HomePageLocators.categoryCellPhonesAndAccessories).click();
    }

    async searchForProduct(searchTerm, categoryName) {
        await $(HomePageLocators.searchInput).setValue(searchTerm);
        await $(HomePageLocators.categoryDropdown).selectByVisibleText(categoryName);
        await $(HomePageLocators.searchButton).click();
    }
}

module.exports = new HomePageActions();