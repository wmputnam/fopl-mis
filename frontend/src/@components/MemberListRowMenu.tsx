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

const getNewFromState = (getAppState: () => any) => {
  const newFromViewState = getAppState().fromViewState;
  newFromViewState.push(getAppState().viewState);
  return newFromViewState;
}
const MemberListRowMenu = ({ recordId, mmb, setAppState, getAppState }: MemberListRowMenuProps) => {

  const handleEditClick = (): any => {
    console.log(`edit member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.edit,
      fromViewState: getNewFromState(getAppState)
    }));
  }

  const handleRenewClick = (): any => {
    console.log(`renew member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.renew,
      fromViewState: getNewFromState(getAppState)
    }));
  }

  const handleMoneyClick = (): any => {
    console.log(`edit member money ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.money,
      fromViewState: getNewFromState(getAppState)
    }));
  }
  const handleNotesClick = (): any => {
    console.log(`edit member money ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.notes,
      fromViewState: getNewFromState(getAppState)
    }));
  }
  const handleDropClick = (): any => {
    console.log(`drop member ${recordId}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.drop,
      fromViewState: getNewFromState(getAppState)
    }));
  }


  return (
    <div className="member-row--menu" data-testid="member-row--menu">
      <button className="dropbtn" data-testid="dropbtn">⋮</button>
      <div className="dropdown-content" data-testid="dropdown-content">
        <div className="member-row--menu-edit" data-testid="member-row--menu-edit" member-id={recordId} onClick={() => handleEditClick()}>Edit member</div>
        <div className="member-row--menu-renewal" data-testid="member-row--menu-renewal" member-id={recordId} onClick={() => handleRenewClick()}>
          {MemberService.isLifeMember(mmb) ? "Process donation" : "Renew member"}</div>
        {MemberService.isVolunteer(mmb) && <div className="member-row--menu-signup" data-testid="member-row--menu-signup" onClick={() => handleRenewClick()}>
          VOL to MEMBER</div>}
        {<div className="member-row--menu-money" data-testid="member-row--menu-money" onClick={() => handleMoneyClick()}>View remittances</div>}
        {<div className="member-row--menu-notes" data-testid="member-row--menu-notes" onClick={() => handleNotesClick()}>View notes</div>}
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-drop" data-testid="member-row--menu-drop" onClick={() => handleDropClick()}>
          Drop member</div>}
      </div>
    </div>
  );
}

export default MemberListRowMenu;