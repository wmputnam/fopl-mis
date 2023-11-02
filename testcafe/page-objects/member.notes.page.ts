import { Selector } from 'testcafe';
// import { xpathSelector } from '../helpers/utilities/xpath-selector';

export default class MemberNotesPage {
  static dateHeader = Selector(`.notes-row--date`);
  static noteHeader = Selector('.notes-row--note');
  static date = Selector(`.notes-row--date.col`);
  static note = Selector('.notes-row--note.col');
  static cancelBtn = Selector('button').withAttribute('data-testid', 'cancel-btn');
}