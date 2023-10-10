import React from "react";
import { AppState } from "../App";
import { MemberViewStates } from "../@interfaces/enums";
import { MemberService } from "../services/MemberService";
export type MemberListRowMenuProps = {
  recordId: string;
  mmb: string;
  name: string;
  getAppState: () => any;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const getNewFromState = (getAppState: () => any) => {
  const newFromViewState = getAppState().fromViewState;
  newFromViewState.push(getAppState().viewState);
  return newFromViewState;
}

const MemberListRowMenu = ({ recordId, mmb, name, setAppState, getAppState }: MemberListRowMenuProps) => {

  const debugName = `${name}:${recordId}`;

  const handleEditClick = (): any => {
    console.log(`edit member ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.edit,
      fromViewState: getNewFromState(getAppState)
    }));
  }

  const handleRenewClick = (): any => {
    console.log(`renew ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.renew,
      fromViewState: getNewFromState(getAppState)
    }));
  }

  const handleMoneyClick = (): any => {
    console.log(`view remittances for ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.money,
      fromViewState: getNewFromState(getAppState)
    }));
  }
  const handleNotesClick = (): any => {
    console.log(`view remittances for ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      viewState: MemberViewStates.notes,
      fromViewState: getNewFromState(getAppState)
    }));
  }

  const handleDropClick = (): any => {
    console.log(`drop ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      modalAction: deactivateMember,
      modalMessage: `Drop this ${name}?`,
      modalIsOpen: true,
    }));
  }

  const deactivateMember = async () => {
    const memberId = recordId;
    await MemberService.deactivateMemberAction(memberId)
  }

  const handleReturnedMailClick = (): any => {
    console.log(`returned mail without forwarding address for  ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      modalAction: setReturnedMailStatus,
      modalMessage: `Returned mail without forwarding address for ${name}?`,
      modalIsOpen: true,
    }));
  }

  const setReturnedMailStatus = async () => {
    const memberId = recordId;
    await MemberService.setReturnedMailMemberAction(memberId)
  }

  const handleReturnedEmailClick = (): any => {
    console.log(`bounced email member ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      modalAction: setBouncedEmailStatus,
      modalMessage: `Bounced email for ${name}?`,
      modalIsOpen: true,
    }));
  }
  const setBouncedEmailStatus = async () => {
    const memberId = recordId;
    await MemberService.setBouncedEmailMemberAction(memberId)
  }

  const handleVerifiedEmailClick = (): any => {
    console.log(`bounced email member ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      modalAction: setVerifiedEmailStatus,
      modalMessage: `Verify email for ${name}?`,
      modalIsOpen: true,
    }));
  }
  const setVerifiedEmailStatus = async () => {
    const memberId = recordId;
    await MemberService.setVerifiedEmailMemberAction(memberId)
  }

  const handleNewMemberOrientedClick = (): any => {
    console.log(`member orientation ${debugName}`);
    MemberService.saveMemberId(recordId);
    setAppState((oldState: AppState) => ({
      ...oldState,
      memberId: recordId,
      modalAction: () => { },
      modalMessage: `Has ${name} completed orientation?`,
      modalIsOpen: true,
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
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-returned-mail" data-testid="member-row--menu-returned-mail" onClick={() => handleReturnedMailClick()}>
          Returned mail</div>}
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-email-bounce" data-testid="member-row--email-bounce" onClick={() => handleReturnedEmailClick()}>
          Bounced email</div>}
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-email-verify" data-testid="member-row--email-verify" onClick={() => handleVerifiedEmailClick()}>
          Verify email</div>}
        {!MemberService.isDroppedMember(mmb) && <div className="member-row--menu-new-mbr" data-testid="member-row--new-mbr" onClick={() => handleNewMemberOrientedClick()}>
          Orientation completed</div>}
      </div>
    </div>
  );
}

export default MemberListRowMenu;