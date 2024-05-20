import { MemberViewStates } from '.';
export interface AppState {
  memberId: string;
  // viewState: MemberViewStates;
  viewStateStack: MemberViewStates[];
  // listViewFilter?: string;
  modalIsOpen: boolean;
  modalMessage: string;
  modalAction: (s: string) => any;
  modalRoot: () => any;
}