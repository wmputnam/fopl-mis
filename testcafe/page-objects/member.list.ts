import { Selector } from 'testcafe';

const label = Selector('label');

class Feature {
  label: Selector;
  checkbox: Selector;

  constructor(text) {
    this.label = label.withText(text);
    this.checkbox = this.label.find('input[type=checkbox]');
  }
}

class MemberListPage {
  memberList: Selector;
  memberRow: Selector;
  memberRowTools: (row: number) => Selector;
  memberRowRenew: Selector;
  results: Selector;
  macOSRadioButton: Selector;
  commentsTextArea: Selector;
  featureList: Feature[];
  slider: { handle: Selector; tick: Selector };
  interfaceSelect: Selector;
  interfaceSelectOption: Selector;
  findMemberOnListPage: (t:TestController,criteria:any) => string;

  constructor() {
    this.memberList = Selector('#developer-name');
    this.memberRow = Selector('#tried-test-cafe');
    this.memberRowTools = (row: number): Selector => {
      return Selector('div').withAttribute(`data-testid`, 'member-row--tools').nth(row);
    };
    this.memberRowRenew = Selector('div').withAttribute(`data-testid`, "member-row--menu-renewal");
    this.findMemberOnListPage = (t: TestController, criteria: any):string => {
      return "";
    }

    this.results = Selector('.result-content');
    this.macOSRadioButton = Selector('input[type=radio][value=MacOS]');
    this.commentsTextArea = Selector('#comments');

    this.featureList = [
      new Feature('Support for testing on remote devices'),
      new Feature('Re-using existing JavaScript code for testing'),
      new Feature('Easy embedding into a Continuous integration system'),
    ];


    this.slider = {
      handle: Selector('.ui-slider-handle'),
      tick: Selector('.slider-value'),
    };

    this.interfaceSelect = Selector('#preferred-interface');
    this.interfaceSelectOption = this.interfaceSelect.find('option');


  }
}

export default new MemberListPage();
