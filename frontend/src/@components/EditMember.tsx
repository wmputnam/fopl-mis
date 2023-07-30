import React from "react";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
// import MemberForm from "./MemberForm";
import MemberFormHeader from "./MemberFormHeader";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";

const EditMember = ({ updateViewState, updateCurrentMember, updateAppMessages }: ExistingMemberProps) => {
    return (
        <>
            <MemberFormHeader updateViewState={updateViewState} mode={MemberViewStates.edit} />
            <MemberFormBase
                updateViewState={updateViewState}
                updateAppMessages={updateAppMessages}
                mode={MemberViewStates.edit}
            />
        </>
    )
}
export default EditMember;