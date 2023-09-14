import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const memberFormPageCommands = {

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
      selector: '//*[@data-testid="member--lastname"]',
      locateStrategy: 'xpath'
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
      selector: '//*[@data-testid="member--postalCode"]',
      locateStrategy: 'xpath'
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
      selector: '//*[@data-testid="member--dues-amount"]',
      locateStrategy: 'xpath'
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
      selector: '//*[@ata-testid="member--joined--input"]',
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
      selector: '[ data-testid = "member-row--phone"]',
      locateStrategy: 'xpath'
    },
    lastNameError: {
      selector: '[ data-testid = "member-row--email"]',
      locateStrategy: 'xpath'
    },
    remitDateWarn: {
      selector: '[ data-testid = "member-row--mmb"]',
      locateStrategy: 'xpath'
    },
    remitAmountError: {
      selector: '[ data-testid = "member-row--tools"]',
      locateStrategy: 'xpath'
    },
  }
}

export default memberFormPage;
export interface MemberListPage
  extends EnhancedPageObject<typeof memberFormPageCommands, typeof memberFormPage.elements> { };
