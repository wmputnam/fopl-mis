import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';
import MemberFormPage from '../../page-objects/member.form.page';
import MemberService from '../../helpers/services/members.service';
import MemberRemitsPageService from '../../helpers/services/member.remits.page.service';

function randomString() {
  return "T" + Math.floor(Math.random() * 99999999).toString()
}

fixture`Member dues payment process flows`
  .page`${userVariables.baseUrl}`
  .beforeEach(async t => {
    if (t.ctx.memberId) {
      delete t.ctx.memberId;
    }
  })

// Tests
test('should be able to open Renew member (process dues payment) for member', async t => {

  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: randomString() });


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

test('should be able to open Process donation for life member', async t => {
  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: randomString(), mmb: "LM" });

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

test('should be able to Process dues payment for member', async t => {
  const memberService = new MemberService(t);

  const title = Selector(`title`);
  const memberId = await memberService.addNewMemberViaApi({
    firstName: "Jimmy",
    lastName: randomString(),

  });
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
    .click(MemberFormPage.saveBtn)
    ;
  await t
    .wait(250)
    .eval(() => location.reload());

  await t
    .wait(250)
    .expect(mmbSelector.textContent).contains('F24');
});

test('should be able to Process donation payment for member', async t => {
  const title = Selector(`title`);
  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: randomString(), mmb: "LM" });
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

test('should be able find processed dues payment for member on remits page', async t => {
  const enteredRemitDate = '2023-09-13';
  const enteredRemitDues = '10';

  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: randomString() });

  const title = Selector(`title`);
  console.log(`added new member document with id: ${memberId}`)
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
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

test('should be able to Process donation payment for member', async t => {
  const title = Selector(`title`);
  const memberService = new MemberService(t);
  const memberId = await memberService.addNewMemberViaApi({ firstName: "Jimmy", lastName: randomString(), mmb: "LM" });

  const enteredRemitDate = '2023-09-13';
  const enteredRemitDonation = '10';

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--mmb');
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleRenewMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal")
    .withAttribute('member-id', memberId);
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

