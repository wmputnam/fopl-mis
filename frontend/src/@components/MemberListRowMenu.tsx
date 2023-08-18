import React from "react";
import { AppState } from "../App";
import { MemberViewStates } from "../@interfaces/enums";
import { MemberService } from "../services/MemberService";
export type MemberListRowMenuProps = {
  recordId: string;
  mmb: string;
  getAppState: () => any;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
const MemberListRowMenu = ({ recordId, mmb, setAppState }: MemberListRowMenuProps) => {

  const handleEditClick = (): any => {
    console.log(`edit member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.edit }));
  }

  const handleRenewClick = (): any => {
    console.log(`renew member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.renew }));
  }

  // const handleNewClick = (): any => {
  //   console.log(`new member`);
  //   setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.new }));
  // }

  const handleMoneyClick = (): any => {
    console.log(`edit member money ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.money }));
  }
  const handleNotesClick = (): any => {
    console.log(`edit member money ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.notes }));
  }
  const handleDropClick = (): any => {
    console.log(`drop member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.drop }));
  }


  return (
    <div className="member-row--menu">
      <button className="dropbtn">⋮</button>
      <div className="dropdown-content">
        <div className="member-row--menu-edit" member-id={recordId} onClick={() => handleEditClick()}>Edit member</div>
        <div className="member-row--menu-renewal" member-id={recordId} onClick={() => handleRenewClick()}>
          {MemberService.isLifeMember(mmb) ? "Process donation" : "Renew member"}</div>
        {MemberService.isVolunteer(mmb) && <div className="member-row--menu-signup" onClick={() => handleRenewClick()}>
          VOL to MEMBER</div>}
        {<div className="member-row--menu-money" onClick={() => handleMoneyClick()}>View remittances</div>}
        {<div className="member-row--menu-notes" onClick={() => handleNotesClick()}>View notes</div>}
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-drop" onClick={() => handleDropClick()}>
          Drop member</div>}
      </div>
    </div>
  );
}

export default MemberListRowMenu;