import React from "react";
import { AllMemberProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     memberId:string;
//     mmb:string;
//     setViewState:(values:any) => undefined;
//     updateCurrent:(values:any) => undefined;
//   }
  
const MemberListRowMenu = ( {recordId,updateViewState,mmb, updateCurrentMember} : AllMemberProps):any  => {
  console.log(recordId);

  const handleEditClick = ():any => {
    console.log(`edit member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( "edit" )
  }
  
  const handleRenewClick = ():any => {
    console.log(`renew member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( "renew" )
  }

  const handleNewClick = ():any => {
    console.log(`new member`);
    updateViewState( "new" )
  }
  const handleChangeAddressClick = ():any => {
    console.log(`edit member address ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( "edit-address" )
  }
  const handleDropClick = ():any => {
    console.log(`drop member ${recordId}`);
    updateCurrentMember(recordId||"")
    updateViewState( "drop" )
  }

  return (
        <div className="member-row--menu">
            <button className="dropbtn">⋮</button>
            <div className="dropdown-content">
                <div className="member-row--menu-edit" member-id={recordId} onClick={() => handleEditClick()}>Edit</div>
                <div className="member-row--menu-renewal" member-id={recordId} onClick={() => handleRenewClick()}>{mmb==="LM"||mmb==="HLM"?"Donation":"Renewal"}</div>
                {mmb==="VOL"&&<div className="member-row--signup" onClick={() => handleNewClick()}>VOL to MEMBER</div>}
                <div className="member-row--change-address" onClick={() => handleChangeAddressClick()}>Change address</div>
                <div className="member-row--drop" onClick={() => handleDropClick()}>Drop</div>
            </div>
        </div>
    );
}

export default MemberListRowMenu;