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

function randomString() {
  return "T" + Math.floor(Math.random() * 99999999).toString()
}

fixture`Member edit process flows`
  .page`${userVariables.baseUrl}`
  .beforeEach(async t => {
    if (t.ctx.memberId) {
      delete t.ctx.memberId;
    }
  })

// Tests
test('should be able to open Edit member to view member', async t => {

  const memberMmb = 'F24';

  const memberService = new MemberService(t);
  const volunteerRoles = [{ 'role': 'book-sale' }]
  const memberId = await memberService.addNewMemberViaApi(
    { firstName: "Jimmy", lastName: randomString(), mmb: memberMmb, volunteer: volunteerRoles });
  t.fixtureCtx.memberId = memberId;
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
  test(`should ${data.isReadOnly ? "not " : " "}be able to Edit member field ${data.field} `, async t => {
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

