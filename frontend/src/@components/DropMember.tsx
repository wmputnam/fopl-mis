import React from "react";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
import { CurrentMemberContext } from "../App"
import Home from "./CancelBtn";
import { MemberViewStates } from "../@interfaces/enums";

const DropMember = ({ updateViewState, updateCurrentMember }: ExistingMemberProps): any => {
    const memberId = React.useContext(CurrentMemberContext)
    const handleClick = () => {
        updateViewState(MemberViewStates.list)
        if (updateCurrentMember) updateCurrentMember("")
    }
    return (
        <>
            <h1 onClick={handleClick}>On the DropMember view now for ${memberId}</h1>
            < Home updateViewState={updateViewState} />
        </>
    )
}
export default DropMember;