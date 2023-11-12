import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';
import MemberListPage from "../../page-objects/member.list.page"

fixture`member list page`
  .page`${userVariables.baseUrl}`

// Tests
test('should display columns for "Name", "Address", "Phone", "Email", "MMB", and row context menu', async t => {
  const title = Selector(`title`);

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  t.expect(MemberListPage.nameColumnHeading.visible);
  t.expect(MemberListPage.addressColumnHeading.visible);
  t.expect(MemberListPage.phoneColumnHeading.visible);
  t.expect(MemberListPage.emailColumnHeading.visible);
  t.expect(MemberListPage.mmbColumnHeading.visible);
  t.expect(MemberListPage.toolsColumnHeading.visible);
  // exp ect(CommonPageHeader.appName.textContent).eql('Membership');
});

test(`should display an Add member button`, async t => {
  const title = Selector(`title`);

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  t.expect(MemberListPage.addMemberBtn.visible);
});
