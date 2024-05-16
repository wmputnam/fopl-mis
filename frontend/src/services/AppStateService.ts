
import { AppState, MemberViewStates } from '../interfaces'
import { MemberService } from './MemberService';

export const getInitialViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.list,
    fromViewState: [],
    listViewFilter: "",
    modalIsOpen: false,
    modalMessage: "",
    modalAction: () => { },
    modalRoot: () => document.body,
  });

export const getTestViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.test,
    fromViewState: [],
    listViewFilter: "",
    modalIsOpen: false,
    modalMessage: "",
    modalAction: () => { },
    modalRoot: () => document.body,
  });


// setListFilter
const setListFilterAction = (oldState: AppState, newFilter: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "UPDATE_LIST_FILTER",
    state: oldState,
    setter: setAppState,
    newFilter,
  } as const
);

export const setListFilter = (oldState: AppState, newFilter: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(setListFilterAction(oldState, newFilter, setAppState));


// clearListFilter
const clearListFilterAction = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "CLEAR_LIST_FILTER",
    state: oldState,
    setter: setAppState,
  } as const
);

export const clearListFilter = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(clearListFilterAction(oldState, setAppState));

// setMemberid
const setMemberIdAction = (oldState: AppState, member_id: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "SET_MEMBER_ID",
    state: oldState,
    setter: setAppState,
    member_id,
  } as const
);

export const setMemberId = (oldState: AppState, member_id: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(setMemberIdAction(oldState, member_id, setAppState));

// clearMemberId
const clearMemberIdAction = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "CLEAR_MEMBER_ID",
    state: oldState,
    setter: setAppState,
  } as const
);

export const clearMemberId = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(clearMemberIdAction(oldState, setAppState));

// setView
const setViewAction = (oldState: AppState, view: MemberViewStates, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "SET_VIEW",
    state: oldState,
    setter: setAppState,
    view,
  } as const
);

export const setView = (oldState: AppState, view: MemberViewStates, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(setViewAction(oldState, view, setAppState));

// pushdView
const pushViewAction = (oldState: AppState, view: MemberViewStates, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "PUSH_VIEW",
    state: oldState,
    setter: setAppState,
    view,
  } as const
);

export const pushView = (oldState: AppState, view: MemberViewStates, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(pushViewAction(oldState, view, setAppState));

// pushdViewWithMemberId
const pushdViewWithMemberIdAction = (oldState: AppState, view: MemberViewStates, member_id: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "PUSH_VIEW_WITH_MEMBERID",
    state: oldState,
    setter: setAppState,
    view,
    member_id
  } as const
);

export const pushViewWithMemberId = (oldState: AppState, view: MemberViewStates, member_id: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(pushdViewWithMemberIdAction(oldState, view, member_id, setAppState));

// popView
const popViewAction = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "POP_VIEW",
    state: oldState,
    setter: setAppState,
  } as const
);

export const popView = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(popViewAction(oldState, setAppState));

// clearMemberAndPopView
const clearMemberAndPopViewAction = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "CLEAR_MEMBER_POP_VIEW",
    state: oldState,
    setter: setAppState,
  } as const
);

export const clearMemberAndPopView = (oldState: AppState, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(clearMemberAndPopViewAction(oldState, setAppState));

// openModal
const openModalForMemberTaskAction = (
  oldState: AppState,
  member_id: string,
  modal_action: (s: string) => any,
  modal_message: string,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>) => (
  {
    type: "OPEN_MODAL_FOR_MEMBER_TASK",
    state: oldState,
    setter: setAppState,
    memberId: member_id,
    modalAction: modal_action,
    modalMessage: modal_message
  } as const
);

export const openDeactivateMemberModal = (oldState: AppState, member_id: string, modal_message: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(
    openModalForMemberTaskAction(
      oldState,
      member_id,
      deactivateMember,
      modal_message,
      setAppState));

export const openReturnedMailModal = (oldState: AppState, member_id: string, modal_message: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(
    openModalForMemberTaskAction(
      oldState,
      member_id,
      setReturnedMailStatus,
      modal_message,
      setAppState));

export const openReturnedEMailModal = (oldState: AppState, member_id: string, modal_message: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(
    openModalForMemberTaskAction(
      oldState,
      member_id,
      setBouncedEmailStatus,
      modal_message,
      setAppState));

export const openVerifiedEMailModal = (oldState: AppState, member_id: string, modal_message: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(
    openModalForMemberTaskAction(
      oldState,
      member_id,
      setVerifiedEmailStatus,
      modal_message,
      setAppState));

export const openNewMemberOrientationCompletedModal = (oldState: AppState, member_id: string, modal_message: string, setAppState: React.Dispatch<React.SetStateAction<AppState>>) =>
  dispatch(
    openModalForMemberTaskAction(
      oldState,
      member_id,
      setNewMemberOrientedStatus,
      modal_message,
      setAppState));

// action types
type AppStateAction = ReturnType<
  typeof setListFilterAction
  | typeof clearListFilterAction
  | typeof setMemberIdAction
  | typeof clearMemberIdAction
  | typeof setViewAction
  | typeof pushViewAction
  | typeof pushdViewWithMemberIdAction
  | typeof popViewAction
  | typeof clearMemberAndPopViewAction
  | typeof openModalForMemberTaskAction
>;

// dispatch -- returns new state object
const dispatch = (action: AppStateAction) => {
  console.log(`dispatch type:${action.type}`)
  switch (action.type) {
    case "UPDATE_LIST_FILTER":
      action.setter((oldState: any) => ({
        ...oldState,
        viewListFilter: action.newFilter
      }));
      break;
    case "CLEAR_LIST_FILTER":
      action.setter((oldState: any) => ({
        ...oldState,
        viewListFilter: ""
      }));
      break;
    case "SET_MEMBER_ID":
      action.setter((oldState: any) => ({
        ...oldState,
        memberId: action.member_id
      }));
      break;
    case "CLEAR_MEMBER_ID":
      action.setter((oldState: any) => ({
        ...oldState,
        memberId: ""
      }));
      break;
    case "SET_VIEW":
      action.setter((oldState: any) => ({
        ...oldState,
        viewState: action.view,
        fromViewState: []
      }));
      break;
    case "PUSH_VIEW":
    case "PUSH_VIEW_WITH_MEMBERID": {
      const memberIdToUse = action.type === "PUSH_VIEW"
        ? action.state.memberId
        : action.member_id;
      const newViewStack = action.state.fromViewState;
      newViewStack.push(action.state.viewState);
      action.setter((oldState: any) => ({
        ...oldState,
        memberId: memberIdToUse,
        viewState: action.view,
        fromViewState: newViewStack
      }));
      break;
    }
    case "POP_VIEW":
    case "CLEAR_MEMBER_POP_VIEW": {
      const memberIdToUse = action.type === "POP_VIEW"
        ? action.state.memberId
        : "";
      const newViewStack = action.state.fromViewState;
      const newView = newViewStack.pop();
      action.setter((oldState: any) => ({
        ...oldState,
        viewState: newView,
        fromViewState: newViewStack,
        memberId: memberIdToUse
      }));
      break;
    }
    case "OPEN_MODAL_FOR_MEMBER_TASK": {
      // MemberService.saveMemberId(action.memberId);
      action.setter((oldState: AppState) => ({
        ...oldState,
        memberId: action.memberId,
        modalAction: action.modalAction,
        modalMessage: action.modalMessage,
        modalIsOpen: true,
      }));
      break;
    }
    default:
      break;

  }
}

const deactivateMember = async (memberId: string) => {
  // const memberId = recordId;
  await MemberService.deactivateMemberAction(memberId)
}

const setReturnedMailStatus = async (memberId: string) => {
  // const memberId = recordId;
  await MemberService.setReturnedMailMemberAction(memberId)
}

const setBouncedEmailStatus = async (memberId: string) => {
  // const memberId = recordId;
  await MemberService.setBouncedEmailMemberAction(memberId)
}

const setVerifiedEmailStatus = async (memberId: string) => {
  // const memberId = recordId;
  await MemberService.setVerifiedEmailMemberAction(memberId)
}

const setNewMemberOrientedStatus = async (memberId: string) => {
  // const memberId = recordId;
  await MemberService.updateIsNewMemberInDatabase(memberId)
}