const CategoryPageLocators = require('../locators/CategoryPageLocators');
const BasePage = require('../BasePage');
const { expect } = require('chai');

class CategoryPageActions extends BasePage {
    async goToSmartphonesListing() {
        await $(CategoryPageLocators.subCategorySmartphones).click();
    }

    async applyFilter(filters = {}){
        for (const key in filters) {
            const value = filters[key];
            switch (key.toLocaleLowerCase()) {
                case 'condition':
                    await $(CategoryPageLocators.conditionFilter).click();
                    break;
                case 'price':
                    await $(CategoryPageLocators.priceFilter).click();
                    break;
                case 'network':
                    await $(CategoryPageLocators.networkFilter).click();
                    break;
                default:
                    console.log(`Filter ${key} tidak dikenali.`);
            }
            await $(CategoryPageLocators.getFilterByLocator(value)).click();
        }
    }

    async verifyFilterApplied(numApplied,tags = {}) {
        await $(CategoryPageLocators.getFilterAppliedLocator(numApplied)).click();
        for (const key in tags) {
            const value = tags[key];
            expect(await $(CategoryPageLocators.getFilterByLocator(value)).isDisplayed()).to.be.true;
        }
    }
}

module.exports = new CategoryPageActions();