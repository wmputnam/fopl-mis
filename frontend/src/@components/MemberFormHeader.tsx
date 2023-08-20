/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { FrontendProps } from "../@interfaces/MemberProps";
import Home from "./CancelBtn";
import RefreshForm from "./RefreshForm";
import MemberFormNav2Base from "./MemberFormNav2Base";
import MemberFormNav2Money from "./MemberFormNav2Money";
import MemberFormNav2Notes from "./MemberFormNav2Notes";
import { MemberService } from "../services/MemberService";

const toCapitalCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MemberFormHeader = ({ getAppState, setAppState }: FrontendProps) => {
  let memberId = MemberService.retrieveMemberId();

  return (
    <>
      <h1>{toCapitalCase(getAppState().viewState.toString())} member: {memberId}</h1>
      <nav className="member-form--nav" data-testid="member-form--nav">
        <ul>
          <li><Home
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
          <li><RefreshForm
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
          <li><MemberFormNav2Base
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
          <li><MemberFormNav2Money
            getAppState={getAppState}
            setAppState={setAppState}
          /></li>
          <li><MemberFormNav2Notes getAppState={getAppState}
            setAppState={setAppState}
          /></li>
        </ul>
      </nav>
    </>);
}

export default MemberFormHeader;