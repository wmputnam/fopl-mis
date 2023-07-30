import { IMember } from "packages/member-shared";
import { MemberViewStates } from "./enums";

export interface RecordIdProps {
  recordId?: string;
  _id?: string;
  lastUpdated?: string;   // the database record identifier
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
export type ViewStateProps = {
  updateViewState: (a: MemberViewStates) => any;
  mode?: string;
}
export type CurrentMemberProps = {
  updateCurrentMember?: (a: string) => any;
}


export interface EditMemberProps extends ViewStateProps, CurrentMemberProps, CurrentMessageProps {
};
export interface ExistingMemberProps extends ViewStateProps, CurrentMemberProps, RecordIdProps, PersonBaseProps, BasicAddressProps, CurrentMessageProps {};
export interface AppMessages {
  messages: string[];
}
export type CurrentMessageProps = {
  updateAppMessages?: (arr: string[]) => any;
}

export interface AllMemberProps extends ViewStateProps, CurrentMemberProps, CurrentMessageProps, Partial<IMember> {
  recordId: string;
  name: string;
  paidThroughString: string;
  mode: string;
};
// address:string;
// phone:string;
// email:string;
// paidThrough:string;
// mmb:string;
// updateCurrent:(values:any) => undefined;
// }
export interface MemberProps { }
