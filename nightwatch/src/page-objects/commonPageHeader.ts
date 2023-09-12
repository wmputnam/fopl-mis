import { PageObjectModel, EnhancedPageObject } from "nightwatch"
const commonPageHeaderCommands = {

}
const commonPageHeader: PageObjectModel = {
  url: "members/",
  commands: [commonPageHeaderCommands],
  elements: {
    orgLogo: {
      selector: "[ data-testid='org-name']"
    },
    appName: {
      selector: "[ data-testid='app-name']"
    },
    appMessages: {
      selector: ".app-header--messages"
    }
  }
}

export default commonPageHeader;
export interface CommonPageHeader
  extends EnhancedPageObject<typeof commonPageHeaderCommands, typeof commonPageHeader.elements> { };
