// import { NightwatchTests, NightwatchBrowser } from "nightwatch";
// import memberListPage from "../../../page-objects/memberListPage";
import CommonPageHeader from "../../page-objects/common.page.header";
import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';

fixture`Common page header`
  .page`${userVariables.baseUrl}`

// Tests
test('should display application title "Membership"', async t => {
  const title = Selector(`title`);

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.
    expect(CommonPageHeader.appName.textContent).eql('Membership');
});

test('should display org logo', async t => {
  const title = Selector(`title`);

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  t.
    expect(CommonPageHeader.orgLogo.visible);
  // browser.page.memberListPage().navigate()
  //   .assert.visible("[ data-testid='org-name']")
});

test('should display app messages', async t => {
  const title = Selector(`title`);

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  t.
    expect(CommonPageHeader.appMessages.visible);
  // browser.page.memberListPage().navigate()
  //   .assert.visible(".app-header--messages")
});

