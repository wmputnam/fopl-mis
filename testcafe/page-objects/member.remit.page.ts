import { Selector } from 'testcafe';
import { xpathSelector } from '../helpers/utilities/xpath-selector';

export default class MemberRemitPage {
  static date = (rowNum: string) => xpathSelector(
    `(//*[@data-testid="remits-row--memo"])[${rowNum}]/ancestor::div[contains(@class,"remits-row")]//div[@data-testid="remits-row--date"]`);
  static memo = Selector('.remits-row--memo');
  static amount = (rowNum: string) => xpathSelector(
    `(//*[@data-testid="remits-row--memo"])[${rowNum}]/ancestor::div[contains(@class,"remits-row")]//div[@data-testid="remits-row--amount"]`);
  static cancelBtn = Selector('button').withAttribute('data-testid', 'cancel-btn');
}