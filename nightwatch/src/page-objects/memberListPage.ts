import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const memberListPageCommands = {
  openAddMember(this: MemberListPage) {
    return this.waitForElementVisible("@addMemberBtn").click("@addMemberBtn")
      .waitForElementNotPresent("@addMemberBtn");
  }
}
const memberListPage: PageObjectModel = {
  url: "http://localhost:3000",
  commands: [memberListPageCommands],
  elements: {
    memberList: {
      selector: '//*[@data-testid="member-row--header"]',
      locateStrategy: 'xpath'
    },
    nameColumnHeading: {
      selector: '//*[@data-testid="member-row--name"]',
      locateStrategy: 'xpath'
    },
    addressColumnHeading: {
      selector: '//*[@data-testid="member-row--address"]',
      locateStrategy: 'xpath'
    },
    phoneColumnHeading: {
      selector: '//*[@data-testid="member-row--phone"]',
      locateStrategy: 'xpath'
    },
    emailColumnHeading: {
      selector: '//*[@data-testid="member-row--email"]',
      locateStrategy: 'xpath'
    },
    mmbColumnHeading: {
      selector: '//*[@data-testid="member-row--mmb"]',
      locateStrategy: 'xpath'
    },
    toolsColumnHeading: {
      selector: '//*[@data-testid="member-row--tools"]',
      locateStrategy: 'xpath'
    },
    addMemberBtn: {
      selector: "//*[@data-testid='member-row--header--new-btn']",
      locateStrategy: 'xpath'
    },
    memberRow: {
      selector: '//*[@data-testid="member-row"]',
      locateStrategy: 'xpath'
    },
    memberRowName: {
      selector: '//*[@data-testid="member-row--name"]',
      locateStrategy: 'xpath'
    },
    memberRowAddress: {
      selector: '//*[@data-testid="member-row--address"]',
      locateStrategy: 'xpath'
    },
    memberRowPhone: {
      selector: '//*[@data-testid="member-row--phone"]',
      locateStrategy: 'xpath'
    },
    memberRowEmail: {
      selector: '//*[@data-testid="member-row--email"]',
      locateStrategy: 'xpath'
    },
    memberRowMmb: {
      selector: '//*[@data-testid="member-row--mmb"]',
      locateStrategy: 'xpath'
    },
    memberRowTools: {
      selector: '//*[@data-testid="member-row--tools"]',
      locateStrategy: 'xpath'
    },
  }
}

export default memberListPage;
export interface MemberListPage
  extends EnhancedPageObject<typeof memberListPageCommands, typeof memberListPage.elements> { };
