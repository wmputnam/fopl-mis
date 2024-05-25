import { IUserInfo, MemberViewStates } from '.';

export type AppActionType = 'nothing pending' | 'login pending' | 'logout pending';


export interface AppState {
  viewStateStack: MemberViewStates[];
  userInfo:IUserInfo|undefined;
  pendingAction: AppActionType;
  memberId: string;
  modalIsOpen: boolean;
  modalMessage: string;
  modalAction: (s: string) => any;
  modalRoot: () => any;
}