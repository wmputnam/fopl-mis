import { MemberViewStates } from '.';
export interface AppState {
  memberId: string;
  viewState: MemberViewStates;
  fromViewState: MemberViewStates[];
  listViewFilter?: string;
  modalIsOpen: boolean;
  modalMessage: string;
  modalAction: () => any;
  modalRoot: () => any;
}