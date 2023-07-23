import React from "react";
import Home from "./Home";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
// import MemberForm from "./MemberForm";
import MemberFormHeader from "./MemberFormHeader";
import MemberFormBase from "./MemberFormBase";
import Save from "./Save";
import { MemberViewStates } from "../@interfaces/enums";

const EditMember = ({updateViewState , updateCurrentMember }: ExistingMemberProps) => {
    return (
        <>
        <MemberFormHeader updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} mode={MemberViewStates.edit} />
        <MemberFormBase updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} mode={MemberViewStates.edit} />
        <div><br></br></div>
        <div className="member-form--controls">
            <Save updateViewState={updateViewState} />
            <Home updateViewState={updateViewState} />
        </div>
        </>
    )
}
export default EditMember;