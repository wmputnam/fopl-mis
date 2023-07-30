import React from "react";
import { EditMemberProps } from "../@interfaces/MemberProps";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";


const NewMember = ({ updateViewState }: EditMemberProps) => {
    return (<>
        <h1>On the NewMember view now</h1>
        <MemberFormBase mode={MemberViewStates.new} updateViewState={updateViewState}  />
    </>
    )
}
export default NewMember;