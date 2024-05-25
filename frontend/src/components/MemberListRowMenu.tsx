import React from "react";
import { AppState } from "../interfaces";
import { MemberViewStates } from "../interfaces";
import {
  MemberService, pushViewWithMemberId,
  openDeactivateMemberModal,
  openReturnedMailModal,
  openReturnedEMailModal,
  openVerifiedEMailModal,
  openNewMemberOrientationCompletedModal

} from "../services";
export type MemberListRowMenuProps = {
  recordId: string;
  mmb: string;
  name: string;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}


export const MemberListRowMenu = ({ recordId, mmb, name, setAppState, appState }: MemberListRowMenuProps) => {

  const debugName = `${name}:${recordId}`;

  const handleEditClick = (): any => {
    console.log(`edit member ${debugName}`);
    MemberService.saveMemberId(recordId);
    pushViewWithMemberId(appState, MemberViewStates.edit, recordId, setAppState);
  }

  const handleRenewClick = (): any => {
    console.log(`renew ${debugName}`);
    MemberService.saveMemberId(recordId);
    pushViewWithMemberId(appState, MemberViewStates.renew, recordId, setAppState);
  }

  const handleMoneyClick = (): any => {
    console.log(`view remittances for ${debugName}`);
    MemberService.saveMemberId(recordId);
    pushViewWithMemberId(appState, MemberViewStates.money, recordId, setAppState);
  }
  const handleNotesClick = (): any => {
    console.log(`view notes for ${debugName}`);
    MemberService.saveMemberId(recordId);
    pushViewWithMemberId(appState, MemberViewStates.notes, recordId, setAppState);
  }

  const handleDropClick = (): any => {
    console.log(`drop ${debugName}`);
    MemberService.saveMemberId(recordId);
    openDeactivateMemberModal(appState, recordId, `Drop '${name}'?`, setAppState);
  }

  // const deactivateMember = async () => {
  //   const memberId = recordId;
  //   await MemberService.deactivateMemberAction(memberId)
  // }

  const handleReturnedMailClick = (): any => {
    console.log(`returned mail without forwarding address for  ${debugName}`);
    MemberService.saveMemberId(recordId);
    openReturnedMailModal(appState, recordId, `Returned mail without forwarding address for ${name}?`, setAppState);
  }

  // const setReturnedMailStatus = async () => {
  //   const memberId = recordId;
  //   await MemberService.setReturnedMailMemberAction(memberId)
  // }

  const handleReturnedEmailClick = (): any => {
    console.log(`bounced email member ${debugName}`);
    MemberService.saveMemberId(recordId);
    openReturnedEMailModal(appState, recordId, `Bounced email for ${name}?`, setAppState);
  }

  // const setBouncedEmailStatus = async () => {
  //   const memberId = recordId;
  //   await MemberService.setBouncedEmailMemberAction(memberId)
  // }

  const handleVerifiedEmailClick = (): any => {
    console.log(`bounced email member ${debugName}`);
    MemberService.saveMemberId(recordId);
    openVerifiedEMailModal(appState, recordId, `Verify email for ${name}?`, setAppState);
  }

  // const setVerifiedEmailStatus = async () => {
  //   const memberId = recordId;
  //   await MemberService.setVerifiedEmailMemberAction(memberId)
  // }

  const handleNewMemberOrientedClick = (): any => {
    console.log(`member orientation ${debugName}`);
    MemberService.saveMemberId(recordId);
    openNewMemberOrientationCompletedModal(appState, recordId, `Has ${name} completed orientation?`, setAppState);
  }

  // const setNewMemberOrientedStatus = async () => {
  //   const memberId = recordId;
  //   await MemberService.updateIsNewMemberInDatabase(memberId)
  // }

  return (
    <div className="member-row--menu" data-testid="member-row--menu">
      <button className="dropbtn list-row-button" data-testid="dropbtn">⋮</button>
      <div className="dropdown-content" data-testid="dropdown-content">
        {appState.userInfo?.status &&
          <div className="member-row--menu-edit" data-testid="member-row--menu-edit" member-id={recordId} onClick={() => handleEditClick()}>Edit member</div>}
        {appState.userInfo?.status && <div className="member-row--menu-renewal" data-testid="member-row--menu-renewal" member-id={recordId} onClick={() => handleRenewClick()}>
          {MemberService.isLifeMember(mmb) ? "Process donation" : "Renew member"}</div>}
        {appState.userInfo?.status && MemberService.isVolunteer(mmb) && <div className="member-row--menu-signup" data-testid="member-row--menu-signup" onClick={() => handleRenewClick()}>
          VOL to MEMBER</div>}
        {appState.userInfo?.status && <div className="member-row--menu-money" data-testid="member-row--menu-money" onClick={() => handleMoneyClick()}>View remittances</div>}
        {<div className="member-row--menu-notes" data-testid="member-row--menu-notes" onClick={() => handleNotesClick()}>View notes</div>}
        {appState.userInfo?.status && !MemberService.isDroppedMember(mmb) && <div className="member-row--menu-drop" data-testid="member-row--menu-drop" onClick={() => handleDropClick()}>
          Drop member</div>}
        {appState.userInfo?.status && !MemberService.isDroppedMember(mmb) && <div className="member-row--menu-returned-mail" data-testid="member-row--menu-returned-mail" onClick={() => handleReturnedMailClick()}>
          Returned mail</div>}
        {appState.userInfo?.status && !MemberService.isDroppedMember(mmb) && <div className="member-row--menu-email-bounce" data-testid="member-row--email-bounce" onClick={() => handleReturnedEmailClick()}>
          Bounced email</div>}
        {appState.userInfo?.status && !MemberService.isDroppedMember(mmb) && <div className="member-row--menu-email-verify" data-testid="member-row--email-verify" onClick={() => handleVerifiedEmailClick()}>
          Verify email</div>}
        {appState.userInfo?.status && !MemberService.isDroppedMember(mmb) && <div className="member-row--menu-new-mbr" data-testid="member-row--new-mbr" onClick={() => handleNewMemberOrientedClick()}>
          Orientation completed</div>}
      </div>
    </div>
  );


}

export default MemberListRowMenu;