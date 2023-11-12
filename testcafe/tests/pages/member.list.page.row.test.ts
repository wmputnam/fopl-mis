import { Selector } from 'testcafe';
// @ts-ignore
import { userVariables } from '../../.testcaferc';
import MemberListPage from "../../page-objects/member.list.page"
import { AddMemberInterface } from '../../helpers/interfaces/add.member.inferface';
import MemberService from '../../helpers/services/members.service';
import { randomString } from '../../helpers/utilities/misc';

fixture`member list page row`
  .page`${userVariables.baseUrl}`

// Tests
test('should display full name value in the Name column', async t => {
  const memberMmb = 'LM';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const nameColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--name');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.expect(nameColumnSelector.textContent).contains(`${mem.firstName} ${mem.lastName}`);

});

test('should display address unit city and ZIP value in the Address column', async t => {
  const memberMmb = 'LM';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const addressColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--address');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  await t.expect(addressColumnSelector.textContent).contains(`${mem.address} ${mem.unit}, ${mem.city} ${mem.postalCode?.substring(0, 5)}`);
});

test('should display 1st 10 chars in phone value in the Phone column', async t => {
  const memberMmb = 'LM';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const phoneColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--phone');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  if (mem.phone) {
    await t.expect(phoneColumnSelector.textContent).contains(`${mem.phone.substring(0, 10)}`);
  }
});

test('should display email value in the Email column', async t => {
  const memberMmb = 'LM';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const emailColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--email');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  if (mem.email) {
    await t.expect(emailColumnSelector.textContent).contains(`${mem.email}`);
  }
});

test('should display MMB value in the MMB column', async t => {
  const memberMmb = 'P24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const mmbColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--mmb');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  if (mem.mmb) {
    await t.expect(mmbColumnSelector.textContent).contains(`${mem.mmb}`);
  }
});

test('should display row context tools menu', async t => {
  const memberMmb = 'P24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsColumnSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--tools');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsColumnSelector.visible);
});

test('should have edit item in row context tools menu', async t => {
  const memberMmb = 'P24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuEditSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-edit');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuEditSelector.exists);
});

test('should have renew item in row context tools menu', async t => {
  const memberMmb = 'P24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuRenewSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-renewal');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuRenewSelector.exists);
});

test('should have donation item in row context tools menu for life member', async t => {
  const memberMmb = 'LM';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuDonationSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-renewal');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());

  t.expect(toolsMenuDonationSelector.exists);
});

test('should have remittances item in row context tools menu', async t => {
  const memberMmb = '24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuRemittancesSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-money');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuRemittancesSelector.exists);
});

test('should have notes item in row context tools menu', async t => {
  const memberMmb = '24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuNotesSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-notes');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuNotesSelector.exists);
});


test('should have renew item in row context tools menu for VOL', async t => {
  const memberMmb = 'VOL';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuNotesSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-renewal');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuNotesSelector.exists);
});

test('should have drop item in row context tools menu ', async t => {
  const memberMmb = 'S24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuDropSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-drop');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());


  t.expect(toolsMenuDropSelector.exists);
});

test('should open row context tools menu upon click', async t => {
  const memberMmb = 'F24';
  const memberService = new MemberService(t);

  const mem: AddMemberInterface = {
    firstName: "Jimmy",
    lastName: randomString(),
    address: "123 B ST",
    unit: "APT 3",
    city: "PETALUMA",
    state: "CA",
    postalCode: "94952-1234",
    phone: "818-776-0912h; 818-845-9492o",
    email: `jimmyboy${randomString()}@finaltouch.edu`,
    mmb: memberMmb,
  };

  const memberId = await memberService.addNewMemberViaApi(mem);
  console.log(memberId);

  const title = Selector(`title`);

  const rowSelector = Selector('div').withAttribute(`data-id`, memberId);
  const toolsMenuSelector = rowSelector.find('div').withAttribute(`data-testid`, 'member-row--menu-drop');

  await t
    .expect(title.textContent).eql('React App')
    .maximizeWindow()
    .eval(() => location.reload());
});