import React from "react";
import { EditMemberProps } from "../@interfaces/MemberProps";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
import Home from "./Home";
import Save from "./Save";


const NewMember = ({updateViewState , updateCurrentMember  }: EditMemberProps) => {
    return (<>
        <h1>On the NewMember view now</h1>
        <MemberFormBase mode={MemberViewStates.new} updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} />
        <div><br></br></div>
        <div className="member-form--controls">
            <Save updateViewState={updateViewState} />
            <Home updateViewState={updateViewState} />
        </div>
        </>
    )
}
export default NewMember;