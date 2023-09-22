/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { FrontendProps } from "../@interfaces/MemberProps";
import CancelBtn from "./CancelBtn";
// import RefreshForm from "./RefreshForm";
import MemberFormNav2Money from "./MemberFormNav2Money";
import MemberFormNav2Notes from "./MemberFormNav2Notes";
// import { MemberService } from "../services/MemberService";
// import { MemberViewStates } from "../@interfaces/enums";

const toCapitalCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MemberFormHeader = ({ getAppState, setAppState }: FrontendProps) => {
  const memberId = getAppState().memberId; // MemberService.retrieveMemberId();
  const pageTitle = toCapitalCase(getAppState().viewState.toString())

  return (
    <>
      <h1>{pageTitle} member: {memberId}</h1>
      <nav className="member-form--nav" data-testid="member-form--nav">
        <ul>
          <li><MemberFormNav2Money
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
          <li><MemberFormNav2Notes
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
        </ul>
      </nav>
    </>);
}

export default MemberFormHeader;