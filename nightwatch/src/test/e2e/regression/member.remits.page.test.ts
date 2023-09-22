import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import memberListPage from "../../../page-objects/memberListPage";
import memberFormPage from "../../../page-objects/memberFormPage";

const isNumber = (str: any) => typeof str === 'string' && str.length > 0 && !isNaN(Number(str));
describe('edit member page', function () {
  // afterEach(() => {
  //   browser.end();
  // });
  it('opens from member list page', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@cancelBtn"));
  });

  it('contains a Back To Member button', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@cancelBtn"));
  });

  it('contains a Cancel button', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@cancelBtn"));
  });

  it('contains a table of remits', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitsList"));
  });

  it('contains a table of remits showing remit date column', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@dateColumnHeading"));
  });

  it('contains a table of remits showing remit memo column', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@memoColumnHeading"));
  });

  it('contains a table of remits showing remit amount column', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@amountColumnHeading"));
  });

  it('contains a table of remits showing remit date value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowDate"));
  });

  it('contains a table of remits showing remit memo value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowMemo"));
  });

  it('contains a table of remits showing remit amount value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowAmount"));
  });

  // TODO this will fail FM-17
  it('contains a table of remits showing yyyy-mm-dd hh:MM:ss date value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    await browser.page.memberRemitsPage().waitForElementVisible("@remitRowDate");
    const value = await browser.page.memberRemitsPage().element("@remitRowDate").getText();
    expect(value?.length).to.be.equal(19);
  });

  it('contains a table of remits showing remit memo value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowMemo"));
    const value = await browser.page.memberRemitsPage().element("@remitRowMemo").getText();
    console.log(`memo: ${value}`);
    expect(["donation", "dues"].includes(value)).to.be.true;
  });

  // TODO add $ to remit amount
  it('contains a table of remits showing remit amount value with $', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowAmount"));
    const value = await browser.page.memberRemitsPage().element("@remitRowAmount").getText();
    console.log(`amount: ${value}`);

    expect(value.indexOf("$")).to.be.equal(0);
  });


  it('contains a table of remits showing remit $ amount value', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    await browser.assert.visible(browser.page.memberRemitsPage().element("@remitRowAmount"));
    const value = await browser.page.memberRemitsPage().element("@remitRowAmount").getText();
    console.log(`remit row value from getText() ${value}`)
    console.log(`remit row index of $ from getText() ${value.indexOf('$')}`)
    const numberText = value.indexOf("$") >= 0 ? value.substring(value.indexOf("$") + 1) : value;
    console.log(`amount: ${numberText}`);

    expect(isNumber(numberText)).to.be.true;
  });

  it('return to member list on Cancel', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openRemitsMember(1);
    await browser.page.memberRemitsPage().clickCancel();
    await browser.page.memberListPage().assert.visible('@memberList');
  });

  it('return to member edit on Cancel', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openEditMember(1);
    await browser.page.memberFormPage().clickRemits();
    await browser.page.memberRemitsPage().clickCancel();
    await browser.page.memberFormPage().assert.visible('@firstName')
  });

  after(browser => browser.end());
});