import React from "react";
import Home from "./CancelBtn";
import { ExistingMemberProps } from "../@interfaces/MemberProps";


const EditMemberAddress = ({ updateViewState, updateCurrentMember }: ExistingMemberProps) => {
    return (<>
        <h1>On the EditMemberAddress view now</h1>
        <Home updateViewState={updateViewState} />
    </>
    )
}
export default EditMemberAddress;