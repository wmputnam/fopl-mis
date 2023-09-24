import { Selector } from 'testcafe';

export default class MemberFormPage {
  static remitDate = Selector('#money-date');
  static remitDues = Selector('#money-dues-amount');
  static remitDonation = Selector('#money-donation-amount');
  static saveBtn = Selector('button').withAttribute('data-testid', 'save-btn');
}