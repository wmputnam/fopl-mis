import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const memberListPageCommands = {

}
const memberListPage: PageObjectModel = {
  url: "http://localhost:3000",
  commands: [memberListPageCommands],
  elements: {
    memberList: {
      selector: '[ data-testid = "member-row--header header"]', // TODO fix component bug
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
    memberRow: {
      selector: "div#bar"
    },
    addMemberBtn: {
      selector: "button"
    }
  }
}

export default memberListPage;
export interface MemberListPage
  extends EnhancedPageObject<typeof memberListPageCommands, typeof memberListPage.elements> { };
