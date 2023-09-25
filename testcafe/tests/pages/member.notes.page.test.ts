import { Selector } from 'testcafe';
import { userVariables } from '../../.testcaferc';
import MemberFormPage from '../../page-objects/member.form.page';
import MemberListPage from '../../page-objects/member.list';
import MemberService from '../../helpers/services/members.service';
import MemberListPageService from '../../helpers/services/member.list.page.service';
import MemberRemitPage from '../../page-objects/member.remit.page';
import MemberRemitsPageService from '../../helpers/services/member.remits.page.service';
import MemberNotesPage from '../../page-objects/member.notes.page';

// const getFields = () => [
//   { field: 'firstName', isReadOnly: false },
//   { field: 'lastName', isReadOnly: false },
//   { field: 'address', isReadOnly: false },
//   { field: 'unit', isReadOnly: false },
//   { field: 'city', isReadOnly: false },
//   { field: 'state', isReadOnly: false },
//   { field: 'postalCode', isReadOnly: false },
//   { field: 'phone', isReadOnly: false },
//   { field: 'email', isReadOnly: false },
//   { field: 'mmb', isReadOnly: true },
//   { field: 'joined', isReadOnly: true },
//   { field: 'lastUpdated', isReadOnly: true },
//   { field: 'paidThrough', isReadOnly: true },
// ]


fixture`Member notes page`
  .page`${userVariables.baseUrl}`
  .beforeEach(async t => {
    if (t.ctx.memberId) {
      delete t.ctx.memberId;
    }
  })

// Tests
test('should be able to open View notes from member list', async t => {

  const memberMmb = 'LM';
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: memberMmb });

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-notes");//withAttribute('member-id', memberId);
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow();
  // .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleNotesMenuItem)
    .wait(500);

  await t.expect(sillyHeader.textContent).contains('Notes');
});

['date', 'note'].forEach((columnName) => {
  test(`should display ${columnName} column on notes display`, async t => {

    const memberMmb = 'LM';
    const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: memberMmb });

    const title = Selector(`title`);
    const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
    const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
    const visibleNotesMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-notes");
    const sillyHeader = Selector('h3');
    const columnSelector = columnName === 'date'
      ? MemberNotesPage.date
      : MemberNotesPage.note;
    const columnHeading = columnName === 'date'
      ? 'Date'
      : 'Note';

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow();
    // .eval(() => location.reload());

    await t.hover(toolsSelector)
      .wait(250)
      .click(visibleNotesMenuItem)
      .wait(500);

    await t.expect(columnSelector.textContent).contains(columnHeading);
  });
});

test(`should display date and time under Date column for each note`, async t => {

  const memberMmb = 'LM';
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: memberMmb });

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-notes");
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow();
  // .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleNotesMenuItem)
    .wait(500);

  const dateString = await MemberNotesPage.date.nth(2).textContent;

  await t.expect(dateString).match(/\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/);
});

test(`should display note text under note column for each note`, async t => {

  const memberMmb = 'LM';
  const memberId = await MemberListPageService.findMemberOnListPage(t, { mmb: memberMmb });

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.child('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = Selector('div').withAttribute(`data-testid`, "member-row--menu-notes");
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow();
  // .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleNotesMenuItem)
    .wait(500);

  const noteString = await MemberNotesPage.note.nth(2).textContent;

  await t.expect(noteString).notEql("");
});
