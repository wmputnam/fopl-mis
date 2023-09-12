"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// callback passed to `describe` should be a regular function (not an arrow function).
describe('duckduckgo example', function () {
    this.duckDuckGoUrl = 'https://duckduckgo.com';
    this.searchBox = 'input[name=q]';
    this.submitButton = '*[type=submit]';
    // callback can be a regular function as well as an arrow function.
    beforeEach(function (browser) {
        browser.navigateTo(this.duckDuckGoUrl);
    });
    // no need to specify `this` parameter when passing an arrow function
    // as callback to `it`.
    it('Search Nightwatch.js and check results', (browser) => {
        browser
            .waitForElementVisible(this.searchBox)
            .sendKeys(this.searchBox, ['Nightwatch.js'])
            .click(this.submitButton)
            .assert.visible('.react-results--main')
            .assert.textContains('.react-results--main', 'Nightwatch.js');
    });
});
