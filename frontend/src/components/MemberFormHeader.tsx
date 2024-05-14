/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { type FrontendProps } from "../interfaces/index";
import MemberFormNav2Money from "./MemberFormNav2Money";
import MemberFormNav2Notes from "./MemberFormNav2Notes";

const toCapitalCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const MemberFormHeader = ({ getAppState, setAppState }: FrontendProps) => {
  const memberId = getAppState().memberId; // MemberService.retrieveMemberId();
  const pageTitle = toCapitalCase(getAppState().viewState.toString())

  return (
    <>
      <h1 className="member-form--page-title">{pageTitle} member: {memberId}</h1>
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

