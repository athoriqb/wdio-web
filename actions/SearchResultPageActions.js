const SearchResultPageLocators = require('../locators/SearchResultPageLocators');
const BasePage = require('../BasePage');
const { expect } = require('chai');

class SearchResultPageActions extends BasePage {
    async waitForResultsToLoad() {
        await $(SearchResultPageLocators.resultsContainer).waitForExist({ timeout: 10000 });
        await $(SearchResultPageLocators.firstResultTitle).waitForDisplayed({ timeout: 10000 });
    }

    async verifyFirstResult(productName) {
        expect(await $(SearchResultPageLocators.getFirstSearchResultLocator(productName)).isDisplayed()).to.be.true;
    }
}

module.exports = new SearchResultPageActions();