import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import MemberHelper from "../../../helpers/members.helper"


const openAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  return await browser.page.memberListPage().navigate().openAddMember();
}

const saveAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  await browser.page.memberFormPage().clickSave();
}

const cancelAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  await browser.page.memberFormPage().clickCancel();
}

const enterFirstName = async function (browser: NightwatchBrowser, value: string): Promise<string> {
  await browser.page.memberFormPage().enterFirstName(value);
  return await browser.page.memberFormPage().getFirstName();
}

const enterLastName = async function (browser: NightwatchBrowser, value: string): Promise<string> {
  await browser.page.memberFormPage().enterLastName(value);
  return await browser.page.memberFormPage().getLastName();
}

const enterAddress = async function (browser: NightwatchBrowser, address: string, unit: string = ""): Promise<string> {
  await browser.page.memberFormPage().enterAddress(address);
  await browser.page.memberFormPage().enterUnit(unit);
  return await browser.page.memberFormPage().getAddress();
}

const enterCity = async function (browser: NightwatchBrowser, city: string, state: string = "CA"): Promise<string> {
  await browser.page.memberFormPage().enterCity(city);
  await browser.page.memberFormPage().enterState(state);
  return await browser.page.memberFormPage().getCity();
}

const enterZIP = async function (browser: NightwatchBrowser, ZIP: string): Promise<string> {
  await browser.page.memberFormPage().enterPostalCode(ZIP);
  return await browser.page.memberFormPage().getPostalCode();
}

// TODO -- fix bug in phone data reformatting from xxxxxxxxxx to xxx-xxx-xxxx
const enterPhone = async function (browser: NightwatchBrowser, phone: string): Promise<string> {
  await browser.page.memberFormPage().enterPhone(phone);
  return await browser.page.memberFormPage().getPhone();
}

const enterEmail = async function (browser: NightwatchBrowser, email: string): Promise<string> {
  await browser.page.memberFormPage().enterEmail(email);
  return await browser.page.memberFormPage().getEmail();
}

const enterRemit = async function (browser: NightwatchBrowser, date: string, dues: string, donation: string): Promise<string> {
  await browser.page.memberFormPage().enterRemitDate(date);
  await browser.page.memberFormPage().enterRemitDues(dues);
  await browser.page.memberFormPage().enterRemitDonation(donation);
  return await browser.page.memberFormPage().getRemitDate();
}

const enterVols = async function (browser: NightwatchBrowser, roles: string[]): Promise<string> {
  await browser.page.memberFormPage().enterVolunteerRoles([...roles]);
  return await browser.page.memberFormPage().getVolunteerRoles();
}

const enterNewMember = async function (browser: NightwatchBrowser, data: any) {
  const msgArr: string[] = [];
  await openAddForm(browser);
  const firstName = await enterFirstName(browser, `${data.firstName}`);
  const lastName = await enterLastName(browser, `${data.lastName}`);
  const address = await enterAddress(browser, `${data.address}`, `${data.unit}`);
  const city = await enterCity(browser, `${data.city}`, `${data.state}`);
  const zip = await enterZIP(browser, `${data.postalCode}`);
  const phone = await enterPhone(browser, `${data.phone}`);
  const email = await enterEmail(browser, `${data.email}`);
  const remit = await enterRemit(browser, `${data.remitDate}`, `${data.remitDues}`, `${data.remitDonation}`);
  await saveAddForm(browser);
}
const randomString = (n: number) => {
  const bigInt: BigInt = BigInt(Math.floor(Math.random() * Date.now().valueOf()));
  const longString = bigInt.toString();
  return longString.substring(longString.length - n);
};

const newMems: any[] = [
  { firstName: "Terry", lastName: `Hazel_${randomString(6)}`, address: "200 Boron Rd", unit: "", city: "Ruperville", state: "NV", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "100", remitDonation: "25", vols: ["book store", "lumacon"] },
  { firstName: "Julie", lastName: `Roch_${randomString(6)}`, address: "400 Main St", unit: "", city: "Penngrove", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "25", remitDonation: "5", vols: ["book sale"] },
  { firstName: "Art", lastName: `Greene_${randomString(6)}`, address: "333 2nd St", unit: "", city: "Santa Rosa", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "10", remitDonation: "", vols: ["book sale"] },
  { firstName: "Jacob", lastName: `Rose_${randomString(6)}`, address: "25 8th", unit: "", city: "Petalua", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "5", remitDonation: "", vols: ["book sale"] },
  { firstName: "Mary", lastName: `Lake_${randomString(6)}`, address: "250 Cyrus Way", unit: "", city: "Petaluma", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "2", remitDonation: "", vols: ["book sale"] },
  { firstName: "Sheldon", lastName: `Brooks_${randomString(6)}`, address: "100 Keokuk", unit: "", city: "Petaluma", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "0", remitDonation: "", vols: ["book sale"] },
]
const newLifeMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 100.0);

const newBenMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 50.0 && parseFloat(data.remitDues) < 100.0);

const newPatMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 25.0 && parseFloat(data.remitDues) < 50.0);

const newFamMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 10.0 && parseFloat(data.remitDues) < 25.0);

const newIndMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 5.0 && parseFloat(data.remitDues) < 10.0);

const newSMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 2.0 && parseFloat(data.remitDues) < 5.0);

const newVols: any[] = newMems.filter((data) => parseFloat(data.remitDues) < 2.0);


describe('add new member', function () {

  newLifeMems.forEach((data) => {
    it('supports adding a new Life Member', async function (browser: NightwatchBrowser) {
      const refDate = new Date();
      await enterNewMember(browser, data);
      browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('LM');
    });
  });

  newBenMems.forEach((data) => {
    it('supports adding a new BEN Member', async function (browser: NightwatchBrowser) {
      const refDate = new Date();
      enterNewMember(browser, data);
      browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('BEN');
    });
  });

  newPatMems.forEach((data) => {
    it('supports adding a new Patron Member', async function (browser: NightwatchBrowser) {
      const refDate = new Date();
      await enterNewMember(browser, data);
      browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('P24');
    });
  });
  newFamMems.forEach((data) => {
    it('supports adding a new Family Member', async function (browser: NightwatchBrowser) {
      const refDate = new Date();
      await enterNewMember(browser, data);
      browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('F24');

    });
  });

  newIndMems.forEach((data) => {
    it('supports adding a new Individual Member', async function (browser: NightwatchBrowser) {
      const refDate = new Date();
      await enterNewMember(browser, data);
      browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('24');
    });
  });

  newSMems.forEach((data) => {
    const refDate = new Date();
    it('supports adding a new Senior/Student Member', async function (browser: NightwatchBrowser) {
      await enterNewMember(browser, data); browser.page.memberListPage().assert.visible("@memberList");
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('S24');

    });
  });

  newVols.forEach((data) => {
    const refDate = new Date();
    it('supports adding a new VOL Member', async function (browser: NightwatchBrowser) {
      await enterNewMember(browser, data);
      const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
      expect(mostRecentMember._id).to.be.a.string;
      expect(mostRecentMember.lastName).to.be.equal(data.lastName);
      expect(mostRecentMember.mmb).to.be.equal('VOL');
    });
  });

  it.skip('should display error when Save clicked and required first name data is missing', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    await saveAddForm(browser);
    await browser.page.memberFormPage().element.find("@firstNameError").assert.visible();
  });

  it.skip('should display error when Save clicked and required last name data is missing', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    await saveAddForm(browser);
    await browser.page.memberFormPage().element.find("@lastNameError").assert.visible();
  });

  it.skip('should display error when Save clicked and dues is entered without a date', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, ``, `2`, ``);
    await saveAddForm(browser);
    await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
  });

  it.skip('should display error when Save clicked and donation is entered without a date', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, ``, ``, `2`);
    await saveAddForm(browser);
    await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
  });

  it.skip('should display warning when Save clicked and remit date entered without either dues or donation', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, `08122023`, ``, ``);
    await saveAddForm(browser);
    await browser.page.memberFormPage().element.find("@remitDateWarn").assert.visible();
  });

  after(browser => browser.end());
});