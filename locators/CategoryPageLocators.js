class CategoryPageLocators {
    static subCategorySmartphones = 'a[href*="Cell-Phones-Smartphones"]';
    static conditionFilter = '//button[.//span[text()=\'Condition\']]';
    static priceFilter = '//button[.//span[text()=\'Price\']]';
    static networkFilter = '//button[.//span[text()=\'Network\']]';

    /**
     * @param {string} filterText - Teks filter yang diinginkan, misalnya "New", "Used", dsb.
     */
    static getFilterByLocator(filterText) {
        return `//*[contains(text(),'${filterText}') and ancestor::div[@class='filter-menu-button__content show']]`;
    }

    /**
     * @param {string} numApplied - jumlah filter yang diapply, contoh "1","3"
     */
    static getFilterAppliedLocator(numApplied) {
        return `//button[.//span[text()='${numApplied} filters applied']]`;
    }
}

module.exports = CategoryPageLocators;