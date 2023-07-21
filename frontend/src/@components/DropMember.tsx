import React from "react";
import { ExistingMemberProps } from "../@interfaces/MemberProps";
import {CurrentMemberContext} from "../App"
import Home from "./Home";

const DropMember = ({updateViewState , updateCurrentMember }: ExistingMemberProps):any => {
    const memberId = React.useContext(CurrentMemberContext)
    const handleClick = () => {
        updateViewState("list")
        updateCurrentMember("")
    }
    return (
        <>
        <h1 onClick={handleClick}>On the DropMember view now for ${memberId}</h1>
        < Home updateViewState={updateViewState} />
        </>
    )
}
export default DropMember;