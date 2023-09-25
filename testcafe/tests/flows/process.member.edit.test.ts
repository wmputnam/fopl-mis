import { Selector } from 'testcafe';
import { userVariables } from '../../.testcaferc';
import MemberFormPage from '../../page-objects/member.form.page';
import MemberListPage from '../../page-objects/member.list';
import MemberService from '../../helpers/services/members.service';
import MemberListPageService from '../../helpers/services/member.list.page.service';
import MemberRemitPage from '../../page-objects/member.remit.page';
import MemberRemitsPageService from '../../helpers/services/member.remits.page.service';

const getFields = () => [
  { field: 'firstName', isReadOnly: false },
  { field: 'lastName', isReadOnly: false },
  { field: 'address', isReadOnly: false },
  { field: 'unit', isReadOnly: false },
  { field: 'city', isReadOnly: false },
  { field: 'state', isReadOnly: false },
  { field: 'postalCode', isReadOnly: false },
  { field: 'phone', isReadOnly: false },
  { field: 'email', isReadOnly: false },
  { field: 'mmb', isReadOnly: true },
  { field: 'joined', isReadOnly: true },
  { field: 'lastUpdated', isReadOnly: true },
  { field: 'paidThrough', isReadOnly: true },
]


fixture`Member edit process flows`
  .page`${userVariables.baseUrl}`
  .beforeEach(async t => {
    if (t.ctx.memberId) {
      delete t.ctx.memberId;
    }
  })

// Tests
test('should be able to open Edit member to view member', async t => {

  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: "T" });


  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleEditMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-edit").withAttribute('member-id', memberId);
  const sillyHeader = Selector('h1');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleEditMenuItem)
    .wait(500);

  await t.expect(sillyHeader.textContent).contains('Edit');
});

getFields().forEach(data => {
  test.only(`should ${data.isReadOnly ? "not " : " "}be able to Edit member field ${data.field} `, async t => {
    const memberMmb = 'F24';
    let memberId: string;
    if (t.fixtureCtx.memberId && t.fixtureCtx.memberId !== "") {
      memberId = t.fixtureCtx.memberId;
    } else {
      memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: memberMmb });
      t.fixtureCtx.memberId = memberId;
      console.log(`found ${memberMmb} member document with id: ${memberId}`)
    }


    if (memberId && memberId !== "") {
      const title = Selector(`title`);
      const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
      const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
      const visibleEditMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-edit").withAttribute('member-id', memberId);
      const fieldSelector = Selector(MemberFormPage.selectorFor(data.field));

      await t
        .expect(title.textContent).eql('React App')
        .maximizeWindow()
        .eval(() => location.reload());

      await t.hover(toolsSelector)
        .wait(250)
        .click(visibleEditMenuItem)
        .wait(500);

      // const expectReadOnly = data.isReadOnly;
      const readOnlyAttr = await fieldSelector.getAttribute('readonly');
      if (data.isReadOnly) {
        await t.expect(readOnlyAttr === "").ok();
      } else {
        await t.expect(readOnlyAttr === null).ok();
      }
    }
  })
});

test.skip('should be able to open Process donation for life member', async t => {
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: 'LM' });

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal").withAttribute('member-id', memberId);
  const sillyHeader = Selector('h1');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleRenewMenuItem)
    .wait(500);

  await t.expect(sillyHeader.textContent).contains('renew');

});

test.skip('should be able to Process dues payment for member', async t => {
  const memberService = new MemberService(t);

  const title = Selector(`title`);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: "T" });
  console.log(`added new member document with id: ${memberId}`)
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
  const sillyHeader = Selector('h1');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRenewMenuItem)
    .wait(500);

  await t
    .expect(sillyHeader.textContent).contains('renew');

  await t
    .typeText(MemberFormPage.remitDate, '2023-09-13')
    .typeText(MemberFormPage.remitDues, '10')
    .click(MemberFormPage.saveBtn);

  await t
    .wait(250)
    .eval(() => location.reload());

  await t
    .wait(250)
    .expect(mmbSelector.textContent).contains('F24');
});

test.skip('should be able to Process donation payment for member', async t => {
  const title = Selector(`title`);
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: 'LM' });
  console.log(`added new member document with id: ${memberId}`)
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
  const sillyHeader = Selector('h1');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRenewMenuItem)
    .wait(500);

  await t
    .expect(sillyHeader.textContent).contains('renew');

  await t
    .typeText(MemberFormPage.remitDate, '2023-09-13')
    .typeText(MemberFormPage.remitDonation, '10')
    .click(MemberFormPage.saveBtn);

  await t
    .wait(250)
    .eval(() => location.reload());

  await t
    .wait(250)
    .expect(mmbSelector.textContent).contains('LM');
});

test.skip('should be able find processed dues payment for member on remits page', async t => {
  const enteredRemitDate = '2023-09-13';
  const enteredRemitDues = '10';

  const memberService = new MemberService(t);

  const title = Selector(`title`);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: "T" });
  console.log(`added new member document with id: ${memberId}`)
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
  //const visibleRemitMenuItem = toolsSelector.child('div.member-row--menu-money');
  const visibleRemitMenuItem = Selector(`div[data-id="${memberId}"] div[data-testid="member-row--tools"] div.member-row--menu-money`);
  const sillyHeader = Selector('h1');
  const sillierHeader = Selector('h3');
  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRenewMenuItem)
    .wait(500);

  await t
    .expect(sillyHeader.textContent).contains('renew');

  await t
    .typeText(MemberFormPage.remitDate, enteredRemitDate)
    .typeText(MemberFormPage.remitDues, enteredRemitDues)
    .click(MemberFormPage.saveBtn);

  await t
    .wait(250)
    .eval(() => location.reload());

  await t
    .wait(250)
    .expect(mmbSelector.textContent).contains('F24');

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRemitMenuItem);

  await t
    .wait(500)
    .expect(sillierHeader.textContent).contains('Remittances');

  const { date, amount, memo } = await
    MemberRemitsPageService.findMostRecentEntryOnPage(t, 'dues');

  const dateCleaned = date.replace(/[^\d-]/g, '');
  const amountCleaned = amount.replace(/[^\d\.]/g, '');

  await t
    .expect(dateCleaned).eql(enteredRemitDate)
    .expect(Number(amountCleaned)).notEql(NaN)
    .expect(Number(amountCleaned)).eql(Number(enteredRemitDues))
    .expect(memo).eql('dues');
});

test.skip('should be able to Process donation payment for member', async t => {
  const title = Selector(`title`);
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: 'LM' });

  console.log(`found life member document with id: ${memberId}`)
  const enteredRemitDate = '2023-09-13';
  const enteredRemitDonation = '10';

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
  //const visibleRemitMenuItem = toolsSelector.child('div.member-row--menu-money');
  const visibleRemitMenuItem = Selector(`div[data-id="${memberId}"] div[data-testid="member-row--tools"] div.member-row--menu-money`);
  const sillyHeader = Selector('h1');
  const sillierHeader = Selector('h3');
  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRenewMenuItem)
    .wait(500);

  await t
    .expect(sillyHeader.textContent).contains('renew');

  await t
    .typeText(MemberFormPage.remitDate, enteredRemitDate)
    .typeText(MemberFormPage.remitDonation, enteredRemitDonation)
    .click(MemberFormPage.saveBtn);

  await t
    .wait(250)
    .eval(() => location.reload());

  await t
    .wait(250)
    .expect(mmbSelector.textContent).contains('LM');

  await t
    .hover(toolsSelector)
    .wait(250)
    .click(visibleRemitMenuItem);

  await t
    .wait(500)
    .expect(sillierHeader.textContent).contains('Remittances');

  const { date, amount, memo } = await
    MemberRemitsPageService.findMostRecentEntryOnPage(t, 'donation');

  const dateCleaned = date.replace(/[^\d-]/g, '');
  const amountCleaned = amount.replace(/[^\d\.]/g, '');

  await t
    .expect(dateCleaned).eql(enteredRemitDate)
    .expect(Number(amountCleaned)).notEql(NaN)
    .expect(Number(amountCleaned)).eql(Number(enteredRemitDonation))
    .expect(memo).eql('donation');
});
// findMostRecentEntryOnPage

