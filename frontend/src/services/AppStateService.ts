import { AppState, MemberViewStates } from '../interfaces'

export const getInitialViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.list,
    fromViewState: [],
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
    modalIsOpen: false,
    modalMessage: "",
    modalAction: () => { },
    modalRoot: () => document.body,
  });