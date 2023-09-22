import { PageObjectModel, EnhancedPageObject } from "nightwatch"


const memberRemitsPageCommands = {
  async clickCancel(this: MemberRemitsPage): Promise<any> {
    return await this.waitForElementVisible("@cancelBtn")
      .click("@cancelBtn")
      .waitForElementNotPresent("@remitsList");
  },

}
const memberRemitsPage: PageObjectModel = {
  url: "http://localhost:3000",
  commands: [memberRemitsPageCommands],
  elements: {
    remitsList: {
      selector: '.remits-row--header',
    },
    dateColumnHeading: {
      selector: '.remits-row--header .remits-row--date',
    },
    memoColumnHeading: {
      selector: '.remits-row--header .remits-row--memo',
    },
    amountColumnHeading: {
      selector: '.remits-row--header .remits-row--amount',
    },
    remitRow: {
      selector: '.remits-row',
    },
    remitRowDate: {
      selector: '.remits-row:nth-of-type(2) > .remits-row--date',
    },
    remitRowMemo: {
      selector: '.remits-row:nth-of-type(2) > .remits-row--memo',
    },
    remitRowAmount: {
      selector: '.remits-row:nth-of-type(2) > .remits-row--amount',
    },
    backToMemberBtn: {
      selector: 'button[data-testid="back-to-member-edit-btn"]'
    },
    // TODO fix page so that there is only on of these
    cancelBtn: {
      selector: 'button.cancel-btn'
    },
  }
}

export default memberRemitsPage;
export interface MemberRemitsPage
  extends EnhancedPageObject<typeof memberRemitsPageCommands, typeof memberRemitsPage.elements> { };
