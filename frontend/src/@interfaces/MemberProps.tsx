export interface RecordIdProps {
    recordId?:string;  
    _id?:string;      // the database record identifier
  }
export interface PersonBaseProps {
    lastName?: string;
    firstName?: string;
    name?: string;
    names?: Array<{lastName:string,firstName:string}>
}
export interface BasicAddressProps {
  address?:string;
  unit?:string;
  city?:string;
  state?:string;
  postalCode?:string;
} 
export interface ContactProps {
  phone?:string;
  email?:string;
} 
export interface OtherProps {
  paidThrough?:string;
  mmb?:string;
} 
export type ViewStateProps = {
  updateViewState:(a:string) => undefined;
}
export type CurrentMemberProps = {
  updateCurrentMember:(a:string) => undefined;
}
export interface EditMemberProps extends ViewStateProps, CurrentMemberProps {
  mode?:string;
};
export interface ExistingMemberProps extends ViewStateProps,CurrentMemberProps,RecordIdProps,PersonBaseProps,BasicAddressProps {
  
};

export interface AllMemberProps extends ViewStateProps, CurrentMemberProps,RecordIdProps,PersonBaseProps,BasicAddressProps,ContactProps,OtherProps {
  
};
    // address:string;
    // phone:string;
    // email:string;
    // paidThrough:string;
    // mmb:string;
    // updateCurrent:(values:any) => undefined;
  // }
  export interface MemberProps {}
