class SearchResultPageLocators {
    static resultsContainer = '#srp-river-results';
    static firstResultTitle = 'div.s-item__title';

    static getFirstSearchResultLocator(productName) {
        return `(//ul[contains(@class,'results')]//span[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${productName.toLowerCase()}')])[1]`;
    }
}

module.exports = SearchResultPageLocators;