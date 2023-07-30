import React from "react";
import Home from "./CancelBtn";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
import Save from "./SaveBtn";

const RenewMember = ({ updateViewState, updateCurrentMember }: ExistingMemberProps) => {
    return (<>
        <h1>On the renew member view now</h1>
        <MemberFormBase mode={MemberViewStates.renew} updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} />
        <div><br></br></div>
        <div className="member-form--controls">
            <Save updateViewState={updateViewState} />
            <Home updateViewState={updateViewState} />
        </div>
    </>
    )
}
export default RenewMember;