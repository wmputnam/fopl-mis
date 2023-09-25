import { Selector } from 'testcafe';

export default class MemberFormPage {
  static firstName = Selector('#first-name');
  static lastName = Selector('#last-name');
  static address = Selector('#address');
  static unit = Selector('#unit');
  static city = Selector('#city');
  static state = Selector('#state');
  static postalCode = Selector('#postal-code');
  static phone = Selector('#phone');
  static email = Selector('#email');
  static mmb = Selector('#mmb');
  static paidThrough = Selector('#paidThrough');
  static joined = Selector('#joined');
  static lastUpdated = Selector('#last-updated');

  static remitDate = Selector('#money-date');
  static remitDues = Selector('#money-dues-amount');
  static remitDonation = Selector('#money-donation-amount');
  static saveBtn = Selector('button').withAttribute('data-testid', 'save-btn');

  static selectorFor = (name: string): Selector => {
    switch (name) {
      case 'firstName':
        return this.firstName;
      case 'lastName':
        return this.lastName;
      case 'address':
        return this.address;
      case 'unit':
        return this.unit;
      case 'city':
        return this.city;
      case 'state':
        return this.state;
      case 'postalCode':
        return this.postalCode;
      case 'phone':
        return this.phone;
      case 'email':
        return this.email;
      case 'mmb':
        return this.mmb;
      case 'paidThrough':
        return this.paidThrough;
      case 'joined':
        return this.joined;
      case 'lastUpdated':
        return this.lastUpdated;
      case 'remitDate':
        return this.remitDate;
      case 'remitDues':
        return this.remitDues;
      case 'remitDonation':
        return this.remitDonation;
    }
    return {} as Selector;
  }
}