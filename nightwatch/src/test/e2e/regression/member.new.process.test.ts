import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import memberListPage from "../../../page-objects/memberListPage";
import memberFormPage from "../../../page-objects/memberFormPage";

const openAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  await browser.page.memberListPage().navigate().openAddMember();
}

const saveAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  await browser.page.memberFormPage().clickSave();
}

const cancelAddForm = async function (browser: NightwatchBrowser): Promise<any> {
  await browser.page.memberFormPage().clickCancel();
}

const enterFirstName = async function (browser: NightwatchBrowser, value: string): Promise<string> {
  await browser.page.memberFormPage().enterFirstName(value);
  // browser.pause(3000)
  // return ""
  const name = await browser.page.memberFormPage().getFirstName();
  console.log(`first name: ${name}`);
  return name;
}

const enterLastName = async function (browser: NightwatchBrowser, value: string): Promise<string> {
  await browser.page.memberFormPage().enterLastName(value);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getLastName();
}

const enterAddress = async function (browser: NightwatchBrowser, address: string, unit: string = ""): Promise<string> {
  await browser.page.memberFormPage().enterAddress(address);
  browser.pause(3000)
  await browser.page.memberFormPage().enterUnit(unit);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getAddress();
}

const enterCity = async function (browser: NightwatchBrowser, city: string, state: string = "CA"): Promise<string> {
  await browser.page.memberFormPage().enterCity(city);
  browser.pause(3000)
  await browser.page.memberFormPage().enterState(state);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getCity();
}

const enterZIP = async function (browser: NightwatchBrowser, ZIP: string): Promise<string> {
  await browser.page.memberFormPage().enterPostalCode(ZIP);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getPostalCode();
}

// TODO -- fix bug in phone data reformatting from xxxxxxxxxx to xxx-xxx-xxxx
const enterPhone = async function (browser: NightwatchBrowser, phone: string): Promise<string> {
  await browser.page.memberFormPage().enterPhone(phone);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getPhone();
}

const enterEmail = async function (browser: NightwatchBrowser, email: string): Promise<string> {
  await browser.page.memberFormPage().enterEmail(email);
  browser.pause(3000)
  // return ""
  return await browser.page.memberFormPage().getEmail();
}

const enterRemit = async function (browser: NightwatchBrowser, date: string, dues: string, donation: string): Promise<string> {
  // await browser.element('body').takeScreenshot();
  await browser.page.memberFormPage().enterRemitDate(date);
  // browser.pause(3000)
  // await browser.page.memberFormPage().snapRemitDate();
  await browser.page.memberFormPage().enterRemitDues(dues);
  // browser.pause(3000)
  // return "";
  await browser.page.memberFormPage().enterRemitDonation(donation);
  browser.pause(3000)
  // return ""
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
  // await browser.pause(3000);
  const lastName = await enterLastName(browser, `${data.lastName}`);
  // await browser.pause(3000);
  const address = await enterAddress(browser, `${data.address}`, `${data.unit}`);
  // await browser.pause(3000);
  const city = await enterCity(browser, `${data.city}`, `${data.state}`);
  // await browser.pause(3000);
  const zip = await enterZIP(browser, `${data.postalCode}`);
  // await browser.pause(3000);
  const phone = await enterPhone(browser, `${data.phone}`);
  // await browser.pause(3000);
  const email = await enterEmail(browser, `${data.email}`);
  // await browser.pause(3000);
  const remit = await enterRemit(browser, `${data.remitDate}`, `${data.remitDues}`, `${data.remitDonation}`);
  await browser.pause(3000);
  console.log(`entry for {firstName: "${firstName}",lastname:"${lastName}",address:"${address}", city:"${city}", zip: "${zip}", phone:"${phone}", email:"${email}", remit:"${remit}"}`)
  // await browser.saveScreenshot("./screenshots/new/member.new.process.test/add.new.member.life.member.beforesave.png")
  // await enterVols(browser, [...`${data.vols}`]);
  // await browser.pause(3000);
  await saveAddForm(browser);
  // TODO -- [FM-4] fix add member code -- the 100$ dues resulted in a VOL rather than a life member

}
const randomString = (n: number) => {
  const longString = Date.now().valueOf().toString();
  return longString.substring(longString.length - n);
};

const newMems: any[] = [
  { firstName: "Terry", lastName: `Hazel_${randomString(6)}`, address: "200 Boron Rd", unit: "", city: "Ruperville", state: "NV", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "100", remitDonation: "25", vols: ["book store", "lumacon"] },
  { firstName: "Julie", lastName: `Roch_${randomString(6)}`, address: "400 Main St", unit: "", city: "Penngrove", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "25", remitDonation: "5", vols: ["book sale"] },
  { firstName: "Art", lastName: `Greene_${randomString(6)}`, address: "333 2nd St", unit: "", city: "Santa Rosa", state: "CA", postalCode: "12345-6789", phone: "5555551234", email: `test_${randomString(6)}@test.it`, remitDate: "08122023", remitDues: "25", remitDonation: "5", vols: ["book sale"] },
]
const newLifeMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 100.0);

const newBenMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 50.0 && parseFloat(data.remitDues) < 100.0);
const newPatMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 25.0 && parseFloat(data.remitDues) < 50.0);
const newFamMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 10.0 && parseFloat(data.remitDues) < 25.0);

const newIndMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 5.0 && parseFloat(data.remitDues) < 10.0);

const newSMems: any[] = newMems.filter((data) => parseFloat(data.remitDues) >= 2.0 && parseFloat(data.remitDues) < 5.0);

const newVols: any[] = newMems.filter((data) => parseFloat(data.remitDues) < 5.0);


describe('add new member', function () {
  // console.log(`newLifeMems: ${JSON.stringify(newLifeMems)}`)

  newLifeMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new Life Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  newBenMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new BEN Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  newPatMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new Patron Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });
  newFamMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new Family Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  newIndMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new Individual Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  newSMems.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new Senior/Student Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  newVols.forEach((data) => {
    // console.log(`data: ${JSON.stringify(data)}`)
    it.skip('supports adding a new VOL Member', async function (browser: NightwatchBrowser) {
      enterNewMember(browser, data);
    });
  });

  it.skip('should display error when Save clicked and required first name data is missing', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    await saveAddForm(browser);
    browser.pause(1000);
    // TODO -- [FM-14] fix error display ugliness
    await browser.page.memberFormPage().element.find("@firstNameError").assert.visible();
  });

  it.skip('should display error when Save clicked and required last name data is missing', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    await saveAddForm(browser);
    browser.pause(1000);
    // TODO -- [FM-14] fix error display ugliness
    await browser.page.memberFormPage().element.find("@lastNameError").assert.visible();
  });

  it('should display error when Save clicked and dues is entered without a date', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    // await browser.pause(3000);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, ``, `2`, ``);
    await saveAddForm(browser);

    // await browser.pause(3000);

    browser.pause(1000);
    // TODO -- [FM-14] fix error display ugliness
    await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
  });

  it('should display error when Save clicked and donation is entered without a date', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    // await browser.pause(3000);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, ``, ``, `2`);
    await saveAddForm(browser);
    browser.pause(1000);
    // TODO -- [FM-14] fix error display ugliness
    await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
  });

  it.skip('should display warning when Save clicked and remit date entered without either dues or donation', async function (browser: NightwatchBrowser) {
    await openAddForm(browser);
    const firstName = await enterFirstName(browser, `Sandy`);
    // await browser.pause(3000);
    const lastName = await enterLastName(browser, `Beach`);
    const remit = await enterRemit(browser, `08122023`, ``, ``);
    await saveAddForm(browser);
    browser.pause(1000);
    // TODO -- [FM-14] fix error display ugliness
    await browser.page.memberFormPage().element.find("@remitDateWarn").assert.visible();
  });

});