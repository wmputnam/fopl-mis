import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import memberListPage from "../../../page-objects/memberListPage";
import commonPageHeader from "../../../page-objects/commonPageHeader";

describe('common page header', function () {
  // console.log(`commonPageHeader: ${JSON.stringify(browser.page.commonPageHeader().elements)}`);

  it('displays application title "Membership"', async function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate();
    browser.page.commonPageHeader().assert.visible("@appName")
  });

  it('displays org logo', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible("[ data-testid='org-name']")
  });

  it('displays app messages', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible(".app-header--messages")
  });

});
