import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const commonPageFooterCommands = {

}
const commonPageFooter: PageObjectModel = {
  url: "members/",
  commands: [commonPageFooterCommands],
  elements: {
    pageNum: {
      selector: 'div#foo'
    },
    pageCount: {
      selector: "div#bar"
    },
    appMessages: {
      selector: "div#messages"
    },
  }
}

export { commonPageFooter };
export interface CommonPageHeader
  extends EnhancedPageObject<typeof commonPageFooterCommands, typeof commonPageFooter.elements> { };
