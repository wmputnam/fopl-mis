import React from "react";
import { MemberListContainerState, MemberListFilter } from "../interfaces";

const MAXROWS = 20;

export const getInitialState = (): MemberListContainerState => (
  {
    maxRows: MAXROWS,
    pageNumber: 1,
    listFilter: { lastName: "" },
    numberOfFilteredPages: 0
  }
);

// setPageNumber
export const setPageNumberAction = (pageNumber: number, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) => (
  {
    type: "SET_PAGE_NUMBER",
    state: oldState,
    setter: setState,
    pageNumber
  } as const
);

export const setPageNumber = (pageNumber: number, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) =>
  dispatch(setPageNumberAction(pageNumber, oldState, setState));

// clearListFilter
export const clearListFilterAction = (oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) => (
  {
    type: "CLEAR_LIST_FILTER",
    state: oldState,
    setter: setState,
  } as const
);

export const clearListFilter = (oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) =>
  dispatch(clearListFilterAction(oldState, setState));

// setListFilter
export const setListFilterAction = (listFilter: MemberListFilter, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) => (
  {
    type: "SET_LIST_FILTER",
    state: oldState,
    setter: setState,
    listFilter
  } as const
);

export const setListFilter = (listFilter: MemberListFilter, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) =>
  dispatch(setListFilterAction(listFilter, oldState, setState));

// setNumberOfFilteredPages
export const setNumberOfFilteredPagesAction = (numPages: number, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) => (
  {
    type: "SET_NUMBER_OF_PAGES",
    state: oldState,
    setter: setState,
    numPages
  } as const
);

export const setNumberOfFilteredPages = (numPages: number, oldState: MemberListContainerState, setState: React.Dispatch<React.SetStateAction<MemberListContainerState>>) =>
  dispatch(setNumberOfFilteredPagesAction(numPages, oldState, setState));



// action types
type AppStateAction = ReturnType<
  typeof setPageNumberAction
  | typeof clearListFilterAction
  | typeof setListFilterAction
  | typeof setNumberOfFilteredPagesAction
>;

// dispatch -- updates the state object
const dispatch = (action: AppStateAction) => {
  console.log(`dispatch type:${action.type}`)
  switch (action.type) {
    case "SET_NUMBER_OF_PAGES":
      console.log(`setting number of pages in the filtered list  to ${action.numPages}`)
      action.setter((oldState: any) => ({
        ...oldState,
        numberOfFilteredPages: action.numPages
      }));
      break;
    case "CLEAR_LIST_FILTER":
      action.setter((oldState: any) => ({
        ...oldState,
        listFilter: ""
      }));
      break;
    case "SET_LIST_FILTER":
      action.setter((oldState: any) => ({
        ...oldState,
        listFilter: action.listFilter,
        pageNumber: 1
      }));
      break;
    case "SET_PAGE_NUMBER":
      action.setter((oldState: any) => ({
        ...oldState,
        pageNumber: action.pageNumber
      }));
      break;
    default:
      break;

  }
}