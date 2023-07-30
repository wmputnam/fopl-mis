import React from "react";
import MemberListRowMenu from "./MemberListRowMenu";
import { AllMemberProps } from "../@interfaces/MemberProps";

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
const MemberListRow = ( {recordId,name, address, phone, email,paidThrough,updateViewState,mmb, updateCurrentMember,updateAppMessages} : AllMemberProps):any  => {
      
        return (
        <div className="member-row row" title={name + " "+ paidThrough} data-id={recordId}>
            <div className="member-row--name col">{name}</div>
            <div className="member-row--address col">{address}</div>
            <div className="member-row--phone col">{phone}</div>
            <div className="member-row--email col">{email}</div>
            <div className="member-row--mmb col">{mmb}</div>
            <div className="member-row--tools dropdown col">
            <MemberListRowMenu recordId={recordId} mmb={mmb} updateViewState={updateViewState} updateCurrentMember={updateCurrentMember}/></div>
        
        </div>
    );
}

export default MemberListRow;