import { PageObjectModel, EnhancedPageObject } from "nightwatch"

const memberRowToolsXpath = (n: number): string => `(//*[@data-testid="member-row--tools"])[${n + 1}]//button`;

const memberRowToolsEditXpath = (n: number): string => `(//*[@data-testid="member-row--menu-edit"])[${n}]`;

const memberRowToolsRemitsXpath = (n: number): string => `(//*[@data-testid="member-row--menu-money"])[${n}]`;

const memberListPageCommands = {
  async openAddMember(this: MemberListPage) {
    return await this.waitForElementVisible("@addMemberBtn")
      .click("@addMemberBtn")
      .waitForElementNotPresent("@addMemberBtn");
  },

  async openEditMember(this: MemberListPage, rowNum: number) {
    const toolsSelector: string = memberRowToolsXpath(rowNum);
    const menuEditSelector: string = memberRowToolsEditXpath(rowNum);
    console.log(`row ${rowNum}\n    tools menu: ${toolsSelector}\n    edit button: ${menuEditSelector}`)
    await this.waitForElementVisible(by.xpath(toolsSelector));
    await this.click(by.xpath(memberRowToolsXpath(rowNum)));
    await this.waitForElementVisible(by.xpath(menuEditSelector));
    await this.click(by.xpath(menuEditSelector));
    return await this.waitForElementNotPresent(by.xpath(toolsSelector));
  },

  async openRemitsMember(this: MemberListPage, rowNum: number) {
    const toolsSelector: string = memberRowToolsXpath(rowNum);
    const menuRemitsSelector: string = memberRowToolsRemitsXpath(rowNum);
    console.log(`row ${rowNum}\n    tools menu: ${toolsSelector}\n    remits button: ${menuRemitsSelector}`)
    await this.waitForElementVisible(by.xpath(toolsSelector));
    await this.click(by.xpath(memberRowToolsXpath(rowNum)));
    await this.waitForElementVisible(by.xpath(menuRemitsSelector));
    await this.click(by.xpath(menuRemitsSelector));
    this.pause(10000);
    return await this.waitForElementNotPresent(by.xpath(toolsSelector));
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
