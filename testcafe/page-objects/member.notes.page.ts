import { Selector } from 'testcafe';
// import { xpathSelector } from '../helpers/utilities/xpath-selector';

export default class MemberNotesPage {
  static date = Selector(`.notes-row--date`);
  static note = Selector('.notes-row--note');
  static cancelBtn = Selector('button').withAttribute('data-testid', 'cancel-btn');
}