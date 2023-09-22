import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import memberListPage from "../../../page-objects/memberListPage";
import memberFormPage from "../../../page-objects/memberFormPage";

const fields: any[] = [
  { shortName: "firstName", visible: true, placeHolder: "First name" },
  { shortName: "lastName", visible: true, placeHolder: "Last name" },
  { shortName: "address", visible: true, placeHolder: "Address" },
  { shortName: "unit", visible: true, placeHolder: "Unit" },
  { shortName: "city", visible: true, placeHolder: "City" },
  { shortName: "state", visible: true, placeHolder: "State" },
  { shortName: "postalCode", visible: true, placeHolder: "ZIP code" },
  { shortName: "phone", visible: true, placeHolder: "Phone" },
  { shortName: "email", visible: true, placeHolder: "Email" },
  { shortName: "remitDate", visible: false, placeHolder: "", id: "money-date" },
  { shortName: "remitDues", visible: false, placeHolder: "Dues amount", id: "money-dues-amount" },
  { shortName: "remitDonation", visible: false, placeHolder: "Donation amount", id: "money-donation-amount" },
  { shortName: "volBookSale", visible: false, placeHolder: "", id: "volunteer-preference--book-sale" },
  { shortName: "volBookStore", visible: false, placeHolder: "", id: "volunteer-preference--book-store" },
  { shortName: "volHospitality", visible: false, placeHolder: "", id: "volunteer-preference--hospitality" },
  { shortName: "volNewsletter", visible: false, placeHolder: "", id: "volunteer-preference--newsletter" },
  { shortName: "volPublicity", visible: false, placeHolder: "", id: "volunteer-preference--publicity" },
  { shortName: "volScheduleVolunteers", visible: false, placeHolder: "", id: "volunteer-preference--schedule-volunteers" },
  { shortName: "volSortBooks", visible: false, placeHolder: "", id: "volunteer-preference--sort-books" },
  { shortName: "volFundRaising", visible: false, placeHolder: "", id: "volunteer-preference--fund-raising" },
  { shortName: "volLumacon", visible: false, placeHolder: "", id: "volunteer-preference--lumacon" },
  { shortName: "volMendBooks", visible: false, placeHolder: "", id: "volunteer-preference--mend-books" },
  { shortName: "volPickupDonations", visible: false, placeHolder: "", id: "volunteer-preference--pick-up-donations" },
  { shortName: "volPriceDonations", visible: false, placeHolder: "", id: "volunteer-preference--price-books" },
  { shortName: "volSetupForSales", visible: false, placeHolder: "", id: "volunteer-preference--set-up-for-sales" },
  { shortName: "volSalesSignage", visible: false, placeHolder: "", id: "volunteer-preference--sales-signage" },
  { shortName: "volStockBookStore", visible: false, placeHolder: "", id: "volunteer-preference--stock-book-store" },
  { shortName: "volOther", visible: false, placeHolder: "", id: "volunteer-preference--other" },
  { shortName: "mmb", visible: true, placeHolder: "" },
  { shortName: "paidThrough", visible: false, placeHolder: "", id: "paidThrough" },
  { shortName: "joined", visible: true, placeHolder: "" },
  { shortName: "lastUpdated", visible: true, placeHolder: "" },
  { shortName: "saveBtn", visible: true, placeHolder: "" },
  { shortName: "cancelBtn", visible: true, placeHolder: "" },
]
describe('edit member page', function () {
  const visibleFields = fields.filter((data) => data.visible);
  const notVisibleFields = fields.filter((data) => !data.visible);
  const visibleFieldsHavingPlaceholder = fields.filter((data) => (data.visible && data.placeHolder !== ""));

  // afterEach(() => {
  //   browser.end();
  // });
  it('opens from member list page', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openEditMember(1);
    // browser.pause(10000);
    await browser.assert.visible(browser.page.memberFormPage().element("@firstName"));
  });

  visibleFields.forEach((data) => {
    it(`opens with ${data.shortName} visible`, async function (browser: NightwatchBrowser) {
      await browser.page.memberListPage().navigate().openEditMember(1);
      await browser.assert
        .visible(browser.page.memberFormPage().element(`@${data.shortName}`));
    });
  });

  // TODO -- figure out how to does these not present tests
  // notVisibleFields.forEach((data) => {
  //   it.skip(`opens with ${data.shortName} not present`, async function (browser: NightwatchBrowser) {
  //     await browser.page.memberListPage().navigate().openEditMember(1);
  //     await browser.page.memberFormPage().waitForElementVisible(`@firstName`);
  //     let result;
  //     if (data.id) {
  //       const jsScript = `const val = document.getElementById("${data.id}"); return val ? val : [];`
  //       console.log(`js script "${jsScript}"`)

  //       result = await browser.executeAsyncScript(jsScript);
  //     }
  //     if (result && result instanceof Array) {
  //       console.log(`js search found ${(result as any[]).length} ${data.shortName}'s`)
  //     } else {
  //       console.log(`js search ${data.shortName}'s returned ${result}`);
  //     }
  //     //   await browser.assert.not
  //     //     .elementPresent(browser.page.memberFormPage().element(`@${data.shortName}`));
  //     // 
  //   });
  // });

  visibleFieldsHavingPlaceholder.forEach((data) => {
    it(`can change value in ${data.shortName}`, async function (browser: NightwatchBrowser) {
      await browser.refresh();
      await browser.page.memberListPage().navigate().openEditMember(1);
      await browser.page.memberFormPage()
        .waitForElementPresent(`@${data.shortName}`);
      await browser.page.memberFormPage()
        .waitForElementVisible(`@${data.shortName}`);
      let fieldText: string | null = await browser.page.memberFormPage()
        .element(`@${data.shortName}`).getAttribute(`value`);
      fieldText = fieldText === null ? "NULLISH" : fieldText;
      console.log(`got text ${fieldText} from ${data.shortName}`);
      expect(fieldText).not.to.be.equal("");
      await browser.page.memberFormPage().clickCancel();
      console.log(`cancel clicked`)
      await browser.pause(5000);
    });
  });

  it('return to member list on Cancel', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openEditMember(1);
    // await browser.saveScreenshot("./screenshots/edit.png")
    await browser.page.memberFormPage().clickCancel();
    // await browser.saveScreenshot("./screenshots/list.png")
  });

  after(browser => browser.end());
});