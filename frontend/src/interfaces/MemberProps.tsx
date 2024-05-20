// import { IMemberDocument } from "member-document";
// import { MemberViewStates } from ".";
import { AppState } from "../interfaces";
import { MemberListContainerState } from "./MemberListContainerState";

export interface RecordIdProps {
  recordId?: string;
  _id?: string;
  lastUpdated?: string;
}
export interface PersonBaseProps {
  lastName?: string;
  firstName?: string;
  name?: string;
  names?: Array<{ lastName: string, firstName: string }>
}
export interface BasicAddressProps {
  address?: string;
  unit?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}
export interface ContactProps {
  phone?: string;
  email?: string;
}
export interface OtherProps {
  paidThrough?: string;
  mmb?: string;
  joined?: string;
}
// export type ViewStateProps = {
//   updateViewState: (a: MemberViewStates) => any;
//   getAppState: () => any;
//   mode?: string;
// }

export type CurrentMemberProps = {
  updateCurrentMember: (a: string) => any;
}


// export interface EditMemberProps extends ViewStateProps, CurrentMemberProps, CurrentMessageProps, AppStateProps {
// };
// export interface ExistingMemberProps extends ViewStateProps, CurrentMemberProps, RecordIdProps, PersonBaseProps, BasicAddressProps, CurrentMessageProps, AppStateProps { };
export interface AppMessages {
  messages: string[];
}
export type CurrentMessageProps = {
  updateAppMessages?: (arr: string[]) => any;
}

export type AppStateProps = {
  getAppState: () => any;
}

// export interface AllMemberProps extends ViewStateProps, CurrentMemberProps, CurrentMessageProps, AppStateProps, Partial<IMemberDocument> {
//   recordId: string;
//   name: string;
//   paidThroughString: string;
//   mode: string;
// };

export interface FrontendProps {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;
}


export interface MemberListContainerProps extends FrontendProps {
  // getListFilter: () => string
}
export interface MemberListHeaderProps extends FrontendProps {
  pageState: MemberListContainerState;
  updatePageState: React.Dispatch<React.SetStateAction<MemberListContainerState>>;

}

export interface MemberListFooterProps extends FrontendProps {
  updatePageState: React.Dispatch<React.SetStateAction<MemberListContainerState>>;
  pageState: MemberListContainerState;

}
export interface MemberListProps extends MemberListContainerProps {
  updatePageState: React.Dispatch<React.SetStateAction<MemberListContainerState>>;
  pageState: MemberListContainerState;
}
export interface ModalFmProps {
  actionMessage: string;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;

}
export interface MemberProps { }
