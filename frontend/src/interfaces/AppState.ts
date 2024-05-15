import { MemberViewStates } from '.';
export interface AppState {
  memberId: string;
  viewState: MemberViewStates;
  fromViewState: MemberViewStates[];
  modalIsOpen: boolean;
  modalMessage: string;
  modalAction: () => any;
  modalRoot: () => any;
  listViewFilter?: string;
}