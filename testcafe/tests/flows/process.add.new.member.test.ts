// import { NightwatchTests, NightwatchBrowser } from "nightwatch";
// import MemberHelper from "../../../helpers/members.helper"
import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';
import MemberListPage from "../../page-objects/member.list.page"
import MemberFormPage from '../../page-objects/member.form.page';
import MemberService from '../../helpers/services/members.service';
import MemberRemitsPageService from '../../helpers/services/member.remits.page.service';

// function randomString() {
//   return "T" + Math.floor(Math.random() * 99999999).toString()
// }

fixture`add new member process flows`
  .page`${userVariables.baseUrl}`
  .beforeEach(async t => {
    if (t.ctx.memberId) {
      delete t.ctx.memberId;
    }
  })


const openAddForm = async function (t: TestController): Promise<any> {
  // let memberListPage = new MemberListPage();
  await t.click(MemberListPage.addMemberBtn);
}

const saveAddForm = async function (t: TestController) {
  await t.click(MemberFormPage.saveBtn);
  //   await browser.page.memberFormPage().clickSave();
}

// const cancelAddForm = async function (t:TestController): Promise<any> {
//   await browser.page.memberFormPage().clickCancel();
// }

const enterFirstName = async function (t: TestController, value: string) {
  await t
    .typeText(MemberFormPage.firstName, value);
  // await t.expect(MemberFormPage.firstName.textContent).contains(value);
}

const enterLastName = async function (t: TestController, value: string) {
  await t
    .typeText(MemberFormPage.lastName, value);
  // await t.expect(MemberFormPage.lastName.textContent).contains(value);
}

const enterAddress = async function (t: TestController, address: string, unit: string = "") {
  await t
    .typeText(MemberFormPage.address, address);
  if (unit !== "") {
    await t.typeText(MemberFormPage.unit, unit);
  }
  // await t
  //   .expect(MemberFormPage.address.textContent).contains(address)
  //   .expect(MemberFormPage.unit.textContent).contains(unit);
}

const enterCity = async function (t: TestController, city: string, state: string = "CA") {
  await t
    .selectText(MemberFormPage.city)
    .typeText(MemberFormPage.city, city)
    .typeText(MemberFormPage.state, state)
  // await t.
  //   expect(MemberFormPage.city.textContent).contains(city)
  //   .expect(MemberFormPage.state.textContent).contains(state);
}

const enterZIP = async function (t: TestController, ZIP: string) {
  await t
    .selectText(MemberFormPage.postalCode)
    .typeText(MemberFormPage.postalCode, ZIP);
  // await t.expect(MemberFormPage.postalCode.textContent).contains(ZIP);
}

// // TODO -- fix bug in phone data reformatting from xxxxxxxxxx to xxx-xxx-xxxx
const enterPhone = async function (t: TestController, phone: string) {
  let enterPhone = phone;
  if (phone.indexOf("-") == -1) {
    enterPhone = `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6)}`
  }
  await t
    .typeText(MemberFormPage.phone, enterPhone);
  // await t.expect(MemberFormPage.phone.textContent).contains(phone);
}

const enterEmail = async function (t: TestController, email: string) {
  await t
    .typeText(MemberFormPage.email, email);
  // await t.expect(MemberFormPage.email.textContent).contains(email);
  //   await browser.page.memberFormPage().enterEmail(email);
  //   return await browser.page.memberFormPage().getEmail();
}

const enterRemit = async function (t: TestController, date: string, dues: string, donation: string) {
  await t
    .typeText(MemberFormPage.remitDate, date);
  if (dues !== "") {
    await t.typeText(MemberFormPage.remitDues, dues)
  }
  if (donation !== "") {
    await t
      .typeText(MemberFormPage.remitDonation, donation)
      ;
  }
  // await t.
  //   expect(MemberFormPage.remitDate.textContent).contains(date)
  //   .expect(MemberFormPage.remitDues.textContent).contains(dues)
  //   .expect(MemberFormPage.remitDonation.textContent).contains(donation)
  //   ;
}

// const enterVols = async function (t:TestController, roles: string[]) {
// await t
// .typeText(MemberFormPage.lastName, value);
// await t.expect(MemberFormPage.lastName.textContent).contains(value);
//   await browser.page.memberFormPage().enterVolunteerRoles([...roles]);
//   return await browser.page.memberFormPage().getVolunteerRoles();
// }

// const enterNewMember = async function (t:TestController, data: any) {
const enterNewMember = async function (t: TestController, data: any) {
  const msgArr: string[] = [];
  await openAddForm(t);
  await enterFirstName(t, `${data.firstName}`);
  await enterLastName(t, `${data.lastName}`);
  await enterAddress(t, `${data.address}`, `${data.unit}`);
  await enterCity(t, `${data.city}`, `${data.state}`);
  await enterZIP(t, `${data.postalCode}`);
  await enterPhone(t, `${data.phone}`);
  await enterEmail(t, `${data.email}`);
  await enterRemit(t, `${data.remitDate}`, `${data.remitDues}`, `${data.remitDonation}`);
  // await t.debug();
  await saveAddForm(t);
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


// describe('add new member', function () {
// Tests
newLifeMems.forEach((data) => {
  test('should be able to add new Life Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).eql("LM");
  });

});

newBenMems.forEach((data) => {
  //   it('supports adding a new BEN Member', async function (t:TestController) {
  //     const refDate = new Date();
  //     enterNewMember(browser, data);
  //     browser.page.memberListPage().assert.visible("@memberList");
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('BEN');
  //   });
  test('should be able to add new BEN Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).eql("BEN");
  });
});

newPatMems.forEach((data) => {
  test('should be able to add new Patron Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).contains("P");
  });
  //   it('supports adding a new Patron Member', async function (t:TestController) {
  //     const refDate = new Date();
  //     await enterNewMember(browser, data);
  //     browser.page.memberListPage().assert.visible("@memberList");
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('P24');
  //   });
});
newFamMems.forEach((data) => {
  test('should be able to add new Family Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).contains("F");
  });
  //   it('supports adding a new Family Member', async function (t:TestController) {
  //     const refDate = new Date();
  //     await enterNewMember(browser, data);
  //     browser.page.memberListPage().assert.visible("@memberList");
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('F24');

  //   });
});

newIndMems.forEach((data) => {
  //   it('supports adding a new Individual Member', async function (t:TestController) {
  //     const refDate = new Date();
  //     await enterNewMember(browser, data);
  //     browser.page.memberListPage().assert.visible("@memberList");
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('24');
  //   });
  test('should be able to add new Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).eql("24");
  });
});

newSMems.forEach((data) => {
  test('should be able to add new Senior/Student Member', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).contains("S");
  });

  //   const refDate = new Date();
  //   it('supports adding a new Senior/Student Member', async function (t:TestController) {
  //     await enterNewMember(browser, data); browser.page.memberListPage().assert.visible("@memberList");
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('S24');

  //   });
});

newVols.forEach((data) => {
  test('should be able to add new VOL', async t => {
    const title = Selector(`title`);

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());


    await enterNewMember(t, data);

    // await t.debug();

    const rowSelector = MemberListPage.getRowSelectorByLastName(data.lastName);

    const nameSelector = MemberListPage.getNameCellSelectorForRow(rowSelector);
    const mmbSelector = MemberListPage.getMMBCellSelectorForRow(rowSelector);

    await t.eval(() => location.reload());

    await t.wait(250);

    await t
      .expect(nameSelector.textContent).contains(data.lastName)
      .expect(mmbSelector.textContent).eql("VOL");
  });
  // const refDate = new Date();
  //   it('supports adding a new VOL Member', async function (t:TestController) {
  //     await enterNewMember(browser, data);
  //     const mostRecentMember = await MemberHelper.getLastUpdatedMember(refDate);
  //     // expect(mostRecentMember._id).to.be.a.string;
  //     expect(mostRecentMember.lastName).to.be.equal(data.lastName);
  //     expect(mostRecentMember.mmb).to.be.equal('VOL');
  //   });
});

// it.skip('should display error when Save clicked and required first name data is missing', async function (t:TestController) {
//   await openAddForm(browser);
//   await saveAddForm(browser);
//   await browser.page.memberFormPage().element.find("@firstNameError").assert.visible();
// });

// it.skip('should display error when Save clicked and required last name data is missing', async function (t:TestController) {
//   await openAddForm(browser);
//   await saveAddForm(browser);
//   await browser.page.memberFormPage().element.find("@lastNameError").assert.visible();
// });

// it.skip('should display error when Save clicked and dues is entered without a date', async function (t:TestController) {
//   await openAddForm(browser);
//   const firstName = await enterFirstName(browser, `Sandy`);
//   const lastName = await enterLastName(browser, `Beach`);
//   const remit = await enterRemit(browser, ``, `2`, ``);
//   await saveAddForm(browser);
//   await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
// });

// it.skip('should display error when Save clicked and donation is entered without a date', async function (t:TestController) {
//   await openAddForm(browser);
//   const firstName = await enterFirstName(browser, `Sandy`);
//   const lastName = await enterLastName(browser, `Beach`);
//   const remit = await enterRemit(browser, ``, ``, `2`);
//   await saveAddForm(browser);
//   await browser.page.memberFormPage().element.find("@remitAmountError").assert.visible();
// });

// it.skip('should display warning when Save clicked and remit date entered without either dues or donation', async function (t:TestController) {
//   await openAddForm(browser);
//   const firstName = await enterFirstName(browser, `Sandy`);
//   const lastName = await enterLastName(browser, `Beach`);
//   const remit = await enterRemit(browser, `08122023`, ``, ``);
//   await saveAddForm(browser);
//   await browser.page.memberFormPage().element.find("@remitDateWarn").assert.visible();
// });

// after(browser => browser.end());
// });