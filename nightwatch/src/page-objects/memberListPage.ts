import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const memberListPageCommands = {

}
const memberListPage: PageObjectModel = {
  url: "http://localhost:3000",
  commands: [memberListPageCommands],
  elements: {
    memberList: {
      selector: '[ data-testid = "member-row--header"]',
    },
    nameColumnHeading: {
      selector: '[ data-testid = "member-row--name"]'
    },
    addressColumnHeading: {
      selector: '[ data-testid = "member-row--address"]'
    },
    phoneColumnHeading: {
      selector: '[ data-testid = "member-row--phone"]'
    },
    emailColumnHeading: {
      selector: '[ data-testid = "member-row--email"]'
    },
    mmbColumnHeading: {
      selector: '[ data-testid = "member-row--mmb"]'
    },
    toolsColumnHeading: {
      selector: '[ data-testid = "member-row--tools"]'
    },
    addMemberBtn: {
      selector: "button"
    },
    memberRow: {
      selector: '//*[@data-testid="member-row"]',
      locateStrategy: 'xpath'
    },
    memberRowName: {
      selector: '[ data-testid = "member-row--name"]'
    },
    memberRowAddress: {
      selector: '[ data-testid = "member-row--address"]'
    },
    memberRowPhone: {
      selector: '[ data-testid = "member-row--phone"]'
    },
    memberRowEmail: {
      selector: '[ data-testid = "member-row--email"]'
    },
    memberRowMmb: {
      selector: '[ data-testid = "member-row--mmb"]'
    },
    memberRowTools: {
      selector: '[ data-testid = "member-row--tools"]'
    },
  }
}

export default memberListPage;
export interface MemberListPage
  extends EnhancedPageObject<typeof memberListPageCommands, typeof memberListPage.elements> { };
