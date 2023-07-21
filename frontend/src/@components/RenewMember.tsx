import React from "react";
import Home from "./Home";
import { ExistingMemberProps } from "../@interfaces/MemberProps";

const RenewMember = ({updateViewState , updateCurrentMember }: ExistingMemberProps) => {
    return (
        <>
        <h1>On the RenewMember view now</h1>
        <Home updateViewState={updateViewState}/>
        </>
    )
}
export default RenewMember;