import React from "react";
import Home from "./Home";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
import MemberForm from "./MemberForm";
import {CurrentMemberContext} from "../App"

const EditMember = ({updateViewState , updateCurrentMember }: ExistingMemberProps) => {
    let memberId = React.useContext(CurrentMemberContext)
    return (
        <>
        <h1>On the EditMember view now: {memberId}</h1>
        <MemberForm updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} mode="edit" />
        <Home updateViewState={updateViewState}/>
        </>
    )
}
export default EditMember;