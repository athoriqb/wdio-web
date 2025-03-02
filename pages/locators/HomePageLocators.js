class HomePageLocators {
    static searchInput = '#gh-ac';
    static searchButton = '#gh-search-btn';
    static categoryDropdown = '#gh-cat';
    static shopByCategoryMenu = '//button[span[text()="Shop by category"]]';
    static categoryOptions = 'div.gh-flyout.is-active.is-left-aligned';
    static categoryCellPhonesAndAccessories = 'div[class*="dialog"] a[href*="Cell-Phones-Smart-Watches-Accessories"]';

    static getSelectCategoryLocator(categoryName) {
        return `//option[text()='${categoryName}']`;
    }
}

module.exports = HomePageLocators;