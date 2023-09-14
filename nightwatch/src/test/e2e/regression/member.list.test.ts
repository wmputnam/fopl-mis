import { NightwatchTests, NightwatchBrowser, assert, Element, Elements, ScopedElement } from "nightwatch";
import memberListPage from "../../../page-objects/memberListPage";

describe('member list page', function () {

  it('displays has columns for "Name", "Address", "Phone", "Email", "MMB", and row context menu', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible("@memberList")
      .assert.visible("@nameColumnHeading")
      .assert.visible("@addressColumnHeading")
      .assert.visible("@phoneColumnHeading")
      .assert.visible("@emailColumnHeading")
      .assert.visible("@mmbColumnHeading")
      .assert.visible("@toolsColumnHeading");
  });

  it('displays has an Add member button', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible("@addMemberBtn");
  });

  // pending test -- feature not supported yet
  it.skip('displays up to 15 rows', async function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRowsCount = browser.element.findAll(by.xpath('//*[@data-testid="member-row"]')).count();
    expect(memberRowsCount).to.be.lessThanOrEqual(15);
  });

  // pending test -- feature not supported yet
  it.skip('displays includes page navigation for more pages of the list', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible('@pageCount');
  });

});
// }

// export { memberListPageTests };