import { Selector } from 'testcafe';
import { xpathSelector } from '../helpers/utilities/xpath-selector';

export default class CommonPageHeader {
  static orgLogo = xpathSelector(`//*[@data-testid="data-testid='org-name"]`);
  static appName = xpathSelector(`//*[@data-testid='app-name']`);
  static appMessages = xpathSelector(`//*[contains(@class=".app-header--messages")]`);
} 
