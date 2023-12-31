import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';
import MemberService from '../../helpers/services/members.service';
import MemberNotesPage from '../../page-objects/member.notes.page';
import { AddMemberInterface, MemberNoteInterface } from '../../helpers/interfaces/add.member.inferface';

function randomString() {
  return "T" + Math.floor(Math.random() * 99999999).toString()
}

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
  const memberService = new MemberService(t);
  const note: MemberNoteInterface[] = [{ date: (new Date().toISOString()), note: "test" }];
  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    mmb: memberMmb,
    notes: note
  };

  const memberId = await memberService.addNewMemberViaApi(mem);


  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = rowSelector.find('div').withAttribute(`data-testid`, "member-row--menu-notes");
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(500)
    .click(visibleNotesMenuItem)
    .wait(500);

  await t.expect(sillyHeader.textContent).contains('Notes');
});

['date', 'note'].forEach((columnName) => {
  test(`should display ${columnName} column on notes display`, async t => {

    const memberMmb = 'LM';
    const memberService = new MemberService(t);
    const note: MemberNoteInterface[] = [{ date: (new Date().toISOString()), note: "test" }];
    const mem: AddMemberInterface = {
      firstName: "Jimmy",
      lastName: randomString(),
      mmb: memberMmb,
      notes: note
    };

    const memberId = await memberService.addNewMemberViaApi(mem);

    const title = Selector(`title`);
    const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
    const toolsSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--tools');
    const visibleNotesMenuItem = rowSelector.find('div').withAttribute(`data-testid`, "member-row--menu-notes");
    const sillyHeader = Selector('h3');
    const columnSelector = columnName === 'date'
      ? MemberNotesPage.dateHeader
      : MemberNotesPage.noteHeader;
    const columnHeading = columnName === 'date'
      ? 'Date'
      : 'Note';

    await t
      .expect(title.textContent).eql('React App')
      .maximizeWindow()
      .eval(() => location.reload());

    await t.hover(toolsSelector)
      .wait(250)
      .click(visibleNotesMenuItem)
      .wait(500);

    await t.expect(columnSelector.textContent).contains(columnHeading);
  });
});

test(`should display date and time under Date column for each note`, async t => {

  const memberMmb = 'LM';
  const memberService = new MemberService(t);
  const note: MemberNoteInterface[] = [{ date: (new Date().toISOString()), note: "test" }];
  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    mmb: memberMmb,
    notes: note
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = rowSelector.find('div').withAttribute(`data-testid`, "member-row--menu-notes");
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleNotesMenuItem)
    .wait(500);

  const dateString = await MemberNotesPage.date.textContent;

  await t.expect(dateString).match(/\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/);
});

test(`should display note text under note column for each note`, async t => {

  const memberMmb = 'LM';
  const memberService = new MemberService(t);
  const note: MemberNoteInterface[] = [{ date: (new Date().toISOString()), note: "test" }];
  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    mmb: memberMmb,
    notes: note
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);
  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--tools');
  const visibleNotesMenuItem = rowSelector.find('div').withAttribute(`data-testid`, "member-row--menu-notes");
  const sillyHeader = Selector('h3');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.hover(toolsSelector)
    .wait(250)
    .click(visibleNotesMenuItem)
    .wait(500);

  const noteString = await MemberNotesPage.note.textContent;

  await t.expect(noteString).notEql("");
});
