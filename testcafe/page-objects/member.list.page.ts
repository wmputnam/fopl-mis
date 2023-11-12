import { Selector } from 'testcafe';
import { xpathSelector } from '../helpers/utilities/xpath-selector';
/*
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
*/

class MemberListPage {
  static memberList: Selector = xpathSelector(`//*[@data-testid="member-row--header"]`);
  static nameColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--name"]');
  static addressColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--address"]');
  static phoneColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--phone"]');
  static emailColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--email"]');
  static mmbColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--mmb"]');
  static toolsColumnHeading: Selector = xpathSelector('//*[@data-testid="member-row--tools"]');
  static addMemberBtn: Selector = xpathSelector(`//*[@data-testid='member-row--header--new-btn']`);
  static getRowSelectorByMemberId = (memberId: string) => xpathSelector(`//*[@data-id=${memberId}]`);
  static getRowSelectorByLastName = (lastName: string) => xpathSelector(`//*[contains(@title,'${lastName}')]`);
  static getNameCellSelectorForRow = (rowSelector: Selector) => rowSelector.find('div').withAttribute(`data-testid`, 'member-row--name');
  static getAddressCellSelectorForRow = (rowSelector: Selector) => rowSelector.find('div').withAttribute(`data-testid`, 'member-row--address');
  static getPhoneCellSelectorForRow = (rowSelector: Selector) => rowSelector.find('div').withAttribute(`data-testid`, 'member-row--phone');
  static getEmailCellSelectorForRow = (rowSelector: Selector) => rowSelector.find('div').withAttribute(`data-testid`, 'member-row--email');
  static getMMBCellSelectorForRow = (rowSelector: Selector) => rowSelector.find('div').withAttribute(`data-testid`, 'member-row--mmb');

  // memberRowTools: (row: number) => Selector;
  // memberRowRenew: Selector;
  // results: Selector;
  // macOSRadioButton: Selector;
  // commentsTextArea: Selector;
  // featureList: Feature[];
  // slider: { handle: Selector; tick: Selector };
  // interfaceSelect: Selector;
  // interfaceSelectOption: Selector;
  // findMemberOnListPage: (t:TestController,criteria:any) => string;

  constructor() {
    // this.memberList = xpathSelector(`//*[@data-testid="member-row--header"]`);
    // this.nameColumnHeading = xpathSelector('//*[@data-testid="member-row--name"]');
    // this.addressColumnHeading = xpathSelector('//*[@data-testid="member-row--address"]');
    // this.phoneColumnHeading = xpathSelector('//*[@data-testid="member-row--phone"]');
    // this.emailColumnHeading = xpathSelector('//*[@data-testid="member-row--email"]');
    // this.mmbColumnHeading = xpathSelector('//*[@data-testid="member-row--mmb"]');
    // this.toolsColumnHeading = xpathSelector('//*[@data-testid="member-row--tools"]');
    // this.addMemberBtn = xpathSelector(`//*[@data-testid='member-row--header--new-btn']`)
    // this.memberRowTools = (row: number): Selector => {
    //   return Selector('div').withAttribute(`data-testid`, 'member-row--tools').nth(row);
    // };
    // this.memberRowRenew = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal");
    // this.findMemberOnListPage = (t: TestController, criteria: any):string => {
    //   return "";
    // }

    // this.results = Selector('.result-content');
    // this.macOSRadioButton = Selector('input[type=radio][value=MacOS]');
    // this.commentsTextArea = Selector('#comments');

    // this.featureList = [
    //   new Feature('Support for testing on remote devices'),
    //   new Feature('Re-using existing JavaScript code for testing'),
    //   new Feature('Easy embedding into a Continuous integration system'),
    // ];


    // this.slider = {
    //   handle: Selector('.ui-slider-handle'),
    //   tick: Selector('.slider-value'),
    // };

    // this.interfaceSelect = Selector('#preferred-interface');
    // this.interfaceSelectOption = this.interfaceSelect.find('option');


  }
}

export default MemberListPage;
