"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = {
    'Google title test': () => {
        browser.url('https://google.com/ncr').assert.titleEquals('Google');
    },
    'Google search test': () => {
        browser
            .setValue('textarea[name=q]', 'nightwatchjs')
            .perform(function () {
            const actions = this.actions({ async: true });
            return actions.keyDown(this.Keys['ENTER']).keyUp(this.Keys['ENTER']);
        })
            .waitForElementVisible('#main')
            .assert.textContains('#main', 'Nightwatch.js');
    }
};
exports.default = home;
