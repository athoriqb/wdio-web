const { Given, When, Then } = require('@wdio/cucumber-framework');

const homePage = require('../../pages/actions/HomePageActions');
const categoryPage = require('../../pages/actions/CategoryPageActions');
const searchResultsPage = require('../../pages/actions/SearchResultPageActions');

Given('I open the eBay homepage', async function () {
    await homePage.open();
});

When('I go to the Cell Phones & Smartphones listing', async function () {
    await homePage.navigateToCategoryCellPhonesAndAccessories();
});

When('I apply the following filters:', async function (dataTable) {
    const filters = dataTable.rowsHash();
    if (filters.filter) {
        delete filters.filter;
    }
    await categoryPage.goToSmartphonesListing();
    await categoryPage.applyFilter(filters);
});

Then('I should see the applied filter tags as:', async function (dataTable) {
    const tags = dataTable.rowsHash();
    if (tags.filter) {
        delete tags.filter;
    }
    const numApplied = Object.keys(tags).length;
    await categoryPage.verifyFilterApplied(numApplied, tags);
});

When(/^I search for "([^"]*)" in the "([^"]*)" category$/, async function (searchTerm, categoryName) {
    await homePage.searchForProduct(searchTerm, categoryName);
});

Then(/^I should see the first result title containing "([^"]*)"$/, async function (expectedText) {
    await searchResultsPage.waitForResultsToLoad();
    await searchResultsPage.verifyFirstResult(expectedText);
});