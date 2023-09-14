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
  { shortName: "remitDate", visible: true, placeHolder: "" },
  { shortName: "remitDues", visible: true, placeHolder: "Dues amount" },
  { shortName: "remitDonation", visible: true, placeHolder: "Donation amount" },
  { shortName: "volBookSale", visible: true, placeHolder: "" },
  { shortName: "volBookStore", visible: true, placeHolder: "" },
  { shortName: "volHospitality", visible: true, placeHolder: "" },
  { shortName: "volNewsletter", visible: true, placeHolder: "" },
  { shortName: "volPublicity", visible: true, placeHolder: "" },
  { shortName: "volScheduleVolunteers", visible: true, placeHolder: "" },
  { shortName: "volSortBooks", visible: true, placeHolder: "" },
  { shortName: "volFundRaising", visible: true, placeHolder: "" },
  { shortName: "volLumacon", visible: true, placeHolder: "" },
  { shortName: "volMendBooks", visible: true, placeHolder: "" },
  { shortName: "volPickupDonations", visible: true, placeHolder: "" },
  { shortName: "volPriceDonations", visible: true, placeHolder: "" },
  { shortName: "volSetupForSales", visible: true, placeHolder: "" },
  { shortName: "volSalesSignage", visible: true, placeHolder: "" },
  { shortName: "volStockBookStore", visible: true, placeHolder: "" },
  { shortName: "volOther", visible: true, placeHolder: "" },
  { shortName: "mmb", visible: false, placeHolder: "" },
  { shortName: "paidThrough", visible: false, placeHolder: "" },
  { shortName: "joined", visible: false, placeHolder: "" },
  { shortName: "lastUpdated", visible: false, placeHolder: "" },
  { shortName: "saveBtn", visible: true, placeHolder: "" },
  { shortName: "cancelBtn", visible: true, placeHolder: "" },
]
describe('new member page', function () {
  const visibleFields = fields.filter((data) => data.visible);
  const notVisibleFields = fields.filter((data) => !data.visible);
  const visibleFieldsHavingPlaceholders =
    fields.filter((data) => data.visible && data.placeHolder !== "");

  it('opens from member list page', async function (browser: NightwatchBrowser) {
    await browser.page.memberListPage().navigate().openAddMember();
    await browser.assert.visible(browser.page.memberFormPage().element("@firstName"));
  });

  visibleFields.forEach((data) => {
    it(`opens with ${data.shortName} visible`, async function (browser: NightwatchBrowser) {
      await browser.page.memberListPage().navigate().openAddMember();
      await browser.assert.visible(browser.page.memberFormPage().element(`@${data.shortName}`));
    });
  });

  notVisibleFields.forEach((data) => {
    it(`opens with ${data.shortName} not present`, async function (browser: NightwatchBrowser) {
      await browser.page.memberListPage().navigate().openAddMember();
      await browser.assert.not.elementPresent(browser.page.memberFormPage().element(`@${data.shortName}`));
    });
  });

  visibleFieldsHavingPlaceholders.forEach((data) => {
    it(`opens with ${data.shortName} has placeholder text ${data.placeHolder}`, async function (browser: NightwatchBrowser) {
      await browser.page.memberListPage().navigate().openAddMember();
      await browser.page.memberFormPage().waitForElementVisible(`@${data.shortName}`)
      await browser.page.memberFormPage().assert.attributeContains(`@${data.shortName}`, 'placeholder', `${data.placeHolder}`);
      // const placeHolderFound = await browser
      //   .element(`@${data.shortName}`).getProperty("placeholder");
      // console.log(`field ${data.shortName} has placeHolder ${placeHolderFound} -- looking for ${data.placeHolder}`)
      // expect(placeHolderFound).to.equal(data.placeHolder);
    });
  });

});