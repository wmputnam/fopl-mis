import { PageObjectModel, EnhancedPageObject } from "nightwatch"
import { WebElement, By, RelativeBy, Actions, Capabilities } from 'selenium-webdriver';
const memberFormPageCommands = {
  async clickCancel(this: MemberFormPage): Promise<any> {
    return await this.waitForElementVisible("@cancelBtn")
      .click("@cancelBtn")
      .waitForElementNotPresent("@cancelBtn");
  },
  async clickSave(this: MemberFormPage): Promise<any> {
    // await this.waitForElementVisible("@saveBtn");
    // return;
    return await this.element("@saveBtn").click();
    // return this.waitForElementNotPresent("@saveBtn");
  },
  async enterFirstName(this: MemberFormPage, value: string): Promise<WebElement> {
    await this.waitForElementVisible("@firstName");
    // await this.element("@firstName").clear();
    return await this.element("@firstName").setValue(value);
  },
  async getFirstName(this: MemberFormPage): Promise<string | null> {
    // console.log(`memberFormPage: getting value of firstName field`)
    return await this.element("@firstName").getValue();
  },
  async enterLastName(this: MemberFormPage, value: string): Promise<WebElement> {
    await this.waitForElementVisible("@lastName");
    await this.element("@lastName").clear();
    return await this.element("@lastName").setValue(value);
  },
  async getLastName(this: MemberFormPage): Promise<string | null> {
    // await this.waitForElementVisible("@lastName");
    return await this.element("@lastName").getValue();
  },
  async enterAddress(this: MemberFormPage, value: string): Promise<WebElement> {
    await this.waitForElementVisible("@address");
    await this.element("@address").clear();
    return await this.element("@address").setValue(value);
  },
  async getAddress(this: MemberFormPage): Promise<string | null> {
    // await this.waitForElementVisible("@address");
    return await this.element("@address").getValue();
  },
  async enterUnit(this: MemberFormPage, value: string): Promise<WebElement> {
    await this.waitForElementVisible("@unit");
    await this.element("@unit").clear();
    return await this.element("@unit").setValue(value);
  },
  async getUnit(this: MemberFormPage): Promise<string | null> {
    // await this.waitForElementVisible("@unit");
    return await this.element("@unit").getValue();
  },
  async enterCity(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@city").setValue(value);
  },
  async getCity(this: MemberFormPage): Promise<string | null> {
    // await this.waitForElementVisible("@city");
    return await this.element("@city").getValue();
  },
  async enterState(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@state").setValue(value);
  },
  async getState(this: MemberFormPage): Promise<string | null> {
    return await this.element("@state").getValue();
  },
  async enterPostalCode(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@postalCode").setValue(value);
  },
  async getPostalCode(this: MemberFormPage): Promise<string | null> {
    return await this.element("@postalCode").getValue();
  },
  async enterPhone(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@phone").setValue(value);
  },
  async getPhone(this: MemberFormPage): Promise<string | null> {
    return await this.element("@phone").getValue();
  },
  async enterEmail(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@email").setValue(value);
  },
  async getEmail(this: MemberFormPage): Promise<string | null> {
    return await this.element("@email").getValue();
  },
  async enterRemitDate(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@remitDate").setValue(value);
  },
  async snapRemitDate(this: MemberFormPage): Promise<string | null> {
    const screenshot: string = await this.element("@remitDate").takeScreenshot();
    require("fs")
      .writeFile("./screenshots/page/memberFormPage/remitDate.png",
        screenshot, { encoding: "base64" }, (err: Error) => {
          if (err) throw err;
        })
    return "";
  },

  async getRemitDate(this: MemberFormPage): Promise<string | null> {
    return await this.element("@remitDate").getValue();
  },
  async enterRemitDues(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@remitDues").setValue(value);
  },
  async getRemitDues(this: MemberFormPage): Promise<string | null> {
    return await this.element("@remitDues").getValue();
  },
  async enterRemitDonation(this: MemberFormPage, value: string): Promise<WebElement> {
    return await this.element("@remitDonation").setValue(value);
  },
  async getRemitDonation(this: MemberFormPage): Promise<string | null> {
    return await this.element("@remitDonation").getValue();
  },
  async enterVolunteerRoles(this: MemberFormPage, value: string): Promise<WebElement> {
    // await this.waitForElementVisible("@remitDonation");
    // await this.element("@remitDonation").clear();
    // return await this.element("@remitDonation").sendKeys(value);
    return {} as WebElement;
  },
  async getVolunteerRoles(this: MemberFormPage): Promise<string | null> {
    // await this.waitForElementVisible("@remitDonation");
    // return await this.element("@remitDonation").getValue();
    return "";
  },


}
const memberFormPage: PageObjectModel = {
  url: "http://localhost:3000",
  commands: [memberFormPageCommands],
  elements: {
    firstName: {
      selector: '//*[@data-testid="member--first-name"]',
      locateStrategy: 'xpath'
    },
    /*  
    {shortName:"firstName", placeHolder:"First name"},
  {shortName:"lastName", placeHolder:"Last name"},
  {shortName:"address", placeHolder:"Address"},
  { shortName: "Unit", placeHolder: "Unit" },
  { shortName: "city", placeHolder: "City" },
  { shortName: "state", placeHolder: "State" },
  { shortName: "postalCode", placeHolder: "ZIP code" },
  { shortName: "phone", placeHolder: "Phone" },
  { shortName: "email", placeHolder: "Email" },
  { shortName: "remitDate", placeHolder: "" },
  { shortName: "remitDues", placeHolder: "Dues amount" },
  { shortName: "remitDonation", placeHolder: "Donation amount" },
*/
    lastName: {
      selector: '#last-name'
      // ,
      // locateStrategy: 'css'
    },
    address: {
      selector: '//*[@data-testid="member--address"]',
      locateStrategy: 'xpath'
    },
    unit: {
      selector: '//*[@data-testid="member--unit"]',
      locateStrategy: 'xpath'
    },
    city: {
      selector: '//*[@data-testid="member--city"]',
      locateStrategy: 'xpath'
    },
    state: {
      selector: '//*[@data-testid="member--state"]',
      locateStrategy: 'xpath'
    },
    postalCode: {
      selector: '#postal-code',
    },
    phone: {
      selector: '//*[@data-testid="member--phone"]',
      locateStrategy: 'xpath'
    },
    email: {
      selector: '//*[@data-testid="member--email"]',
      locateStrategy: 'xpath'
    },
    remitDate: {
      selector: '//*[@data-testid="member--money-date"]',
      locateStrategy: 'xpath'
    },
    remitDues: {
      selector: '#money-dues-amount',
    },
    remitDonation: {
      selector: '//*[@data-testid="member--donation-amount"]',
      locateStrategy: 'xpath'
    },
    volBookSale: {
      selector: "//*[@data-testid='vol-role--book-sale--input']",
      locateStrategy: 'xpath'
    },
    volBookStore: {
      selector: "//*[@data-testid='vol-role--book-store--input']",
      locateStrategy: 'xpath'
    },
    volHospitality: {
      selector: "//*[@data-testid='vol-role--hospitality--input']",
      locateStrategy: 'xpath'
    },
    volNewsletter: {
      selector: "//*[@data-testid='vol-role--newsletter--input']",
      locateStrategy: 'xpath'
    },
    volPublicity: {
      selector: "//*[@data-testid='vol-role--publicity--input']",
      locateStrategy: 'xpath'
    },
    volScheduleVolunteers: {
      selector: "//*[@data-testid=vol-roler--schedule-volunteers--input']",
      locateStrategy: 'xpath'
    },
    volSortBooks: {
      selector: "//*[@data-testid='vol-role--sort-books--input']",
      locateStrategy: 'xpath'
    },
    volFundRaising: {
      selector: "//*[@data-testid='vol-role--fund-raising--input']",
      locateStrategy: 'xpath'
    },
    volLumacon: {
      selector: "//*[@data-testid='vol-role--lumacon--input']",
      locateStrategy: 'xpath'
    },
    volMendBooks: {
      selector: "//*[@data-testid='vol-role--mend-books--input']",
      locateStrategy: 'xpath'
    },
    volPickupDonations: {
      selector: "//*[@data-testid='vol-role--pick-up-donations--input']",
      locateStrategy: 'xpath'
    },
    volPriceDonations: {
      selector: "//*[@data-testid='vol-role--price-books--input']",
      locateStrategy: 'xpath'
    },
    volSetupForSales: {
      selector: "//*[@data-testid='vol-role--set-up-for-sales--input']",
      locateStrategy: 'xpath'
    },
    volSalesSignage: {
      selector: "//*[@data-testid='vol-role--sales-signage--input']",
      locateStrategy: 'xpath'
    },
    volStockBookStore: {
      selector: "//*[@data-testid='vol-role--stock-book-store--input']",
      locateStrategy: 'xpath'
    },
    volOther: {
      selector: "//*[@data-testid='vol-role--other--input']",
      locateStrategy: 'xpath'
    },

    mmb: {
      selector: '//*[@data-testid="member--mmb--input"]',
      locateStrategy: 'xpath'
    },
    paidThrough: {
      selector: '//*[@data-testid="member-paid-through--input"]',
      locateStrategy: 'xpath'
    },
    joined: {
      selector: '//*[@data-testid="member--joined--input"]',
      locateStrategy: 'xpath'
    },
    lastUpdated: {
      selector: '//*[@data-testid="member--last-updated--input"]',
      locateStrategy: 'xpath'
    },
    saveBtn: {
      selector: '//*[@data-testid="member-form--controls"]//*[@data-testid="save-btn"]',
      locateStrategy: 'xpath'
    },
    cancelBtn: {
      selector: '//*[@data-testid="member-form--controls"]//*[@data-testid="save-btn"]',
      locateStrategy: 'xpath'
    },
    firstNameError: {
      selector: '.member--first-name-error'
    },
    lastNameError: {
      selector: '.member--last-name-error'
    },
    remitDateWarn: {
      selector: '.new-member--remit-warn'
    },
    remitAmountError: {
      selector: '.new-member--remit-error'
    },
  }
}

export default memberFormPage;
export interface MemberFormPage
  extends EnhancedPageObject<typeof memberFormPageCommands, typeof memberFormPage.elements> { };
