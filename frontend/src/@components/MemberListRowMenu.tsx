import React from "react";
import { AllMemberProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberViewStates {
//     memberId:string;
//     mmb:string;
//     setViewState:(values:any) => undefined;
//     updateCurrent:(values:any) => undefined;
//   }
  
const MemberListRowMenu = ({ recordId, updateViewState = (a: string | undefined):any => { }, mmb, updateCurrentMember = (a: string | undefined):any => { } } : Partial<AllMemberProps>):any  => {
  // console.log(recordId);

  const handleEditClick = ():any => {
    console.log(`edit member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( MemberViewStates.edit )
  }
  
  const handleRenewClick = ():any => {
    console.log(`renew member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( MemberViewStates.renew )
  }

  const handleNewClick = ():any => {
    console.log(`new member`);
    updateViewState( MemberViewStates.new )
  }
  const handleMoneyClick = ():any => {
    console.log(`edit member money ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( MemberViewStates.money )
  }
  const handleDropClick = ():any => {
    console.log(`drop member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( MemberViewStates.drop )
  }

  return (
        <div className="member-row--menu">
            <button className="dropbtn">⋮</button>
            <div className="dropdown-content">
                <div className="member-row--menu-edit" member-id={recordId} onClick={() => handleEditClick()}>Edit</div>
                <div className="member-row--menu-renewal" member-id={recordId} onClick={() => handleRenewClick()}>{mmb==="LM"||mmb==="HLM"?"Donation":"Renewal"}</div>
                {mmb==="VOL"&&<div className="member-row--menu-signup" onClick={() => handleNewClick()}>VOL to MEMBER</div>}
                <div className="member-row--menu-money" onClick={() => handleMoneyClick()}>$$$</div>
                <div className="member-row--menu-drop" onClick={() => handleDropClick()}>Drop</div>
            </div>
        </div>
    );
}

export default MemberListRowMenu;