import React from "react";
import MemberListRowMenu from "./MemberListRowMenu";
import { AppState } from "../App";
// import { AllMemberProps, FrontendProps } from "../@interfaces/MemberProps";

// export interface MemberProps {
//     memberId:string;
//     name:string;
//     address:string;
//     phone:string;
//     email:string;
//     paidThrough:string;
//     mmb:string;
//     setViewState:(values:any) => undefined;
//     updateCurrent:(values:any) => undefined;
//   }
// function handleHover(){

// }
export type MemberListRowProps = {
    recordId: string; 
    name: string;
    address: string;
    phone: string;
    email: string;
    paidThrough: string;
    mmb: string
    getAppState: () => any; 
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
const MemberListRow = ({recordId, name,address, phone, email, paidThrough, mmb, getAppState, setAppState }: MemberListRowProps): any => {
    return (
        <div className="member-row row" data-testid="member-row row" title={name + " " + paidThrough} data-id={recordId}>
            <div className="member-row--name col" data-testid="member-row--name col">{name}</div>
            <div className="member-row--address col" data-testid="member-row--address col">{address}</div>
            <div className="member-row--phone col" data-testid="member-row--phone col">{phone}</div>
            <div className="member-row--email col" data-testid="member-row--email col">{email}</div>
            <div className="member-row--mmb col" data-testid="member-row--mmb col">{mmb}</div>
            <div className="member-row--tools dropdown col" data-testid="member-row--tools dropdown col">
                <MemberListRowMenu 
                    recordId={recordId} 
                    mmb={mmb}
                    getAppState={getAppState}
                    setAppState={setAppState}
                /></div>

        </div>
    );
}
export default MemberListRow;