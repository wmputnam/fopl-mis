import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import memberListPage from "../../page-objects/memberListPage";

describe('member list page', function () {

  it.only('displays has columns for "Name", "Address", "Phone", "Email", "MMB", and row context menu', function (browser: NightwatchBrowser) {
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

  it('displays up to 15 rows', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .expect(browser.element.findAll("@memberRow").count()).to.be.lessThanOrEqual(15);
  });

  it('displays includes page navigation for more pages of the list', function (browser: NightwatchBrowser) {
    browser.page.memberListPage().navigate()
      .assert.visible('@pageCount');
  });

});
// }

// export { memberListPageTests };