/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { EditMemberProps, AllMemberProps, ViewStateProps } from "../@interfaces/MemberProps";
import { CurrentMemberContext } from "../App"
import Home from "./CancelBtn";
import RefreshForm from "./RefreshForm";
import MemberFormNav2Base from "./MemberFormNav2Base";
import MemberFormNav2Money from "./MemberFormNav2Money";
import MemberFormNav2Notes from "./MemberFormNav2Notes";
import useAxios from "axios-hooks";
import membersReducers from "../reducers/members.reducers";


const MemberFormHeader = ({ updateViewState }: ViewStateProps) => {
  let memberId = React.useContext(CurrentMemberContext)

  return (
    <>
      <h1>On the EditMember view now: {memberId}</h1>
      <nav className="member-form--nav">
        <ul>
          <li><Home updateViewState={updateViewState} /></li>
          <li><RefreshForm updateViewState={updateViewState} /></li>
          <li><MemberFormNav2Base updateViewState={updateViewState} /></li>
          <li><MemberFormNav2Money updateViewState={updateViewState} /></li>
          <li><MemberFormNav2Notes updateViewState={updateViewState} /></li>
        </ul>
      </nav>
    </>);
}

export default MemberFormHeader;