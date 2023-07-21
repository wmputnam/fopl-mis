import React from "react";
import { EditMemberProps } from "../@interfaces/MemberProps";
import MemberForm from "./MemberForm";


const NewMember = ({updateViewState , updateCurrentMember  }: EditMemberProps) => {
    return (<>
        <h1>On the NewMember view now</h1>
        <MemberForm mode="new" updateViewState={updateViewState} updateCurrentMember={updateCurrentMember} />
        </>
    )
}
export default NewMember;