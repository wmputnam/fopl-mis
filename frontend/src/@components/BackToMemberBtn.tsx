import React from "react";
import { EditMemberProps, ViewStateProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";


function BackToMemberBtn({ updateViewState }: EditMemberProps): any {

    function updViewState() {
        updateViewState(MemberViewStates.edit);
    }
    return (
        <button type="button" onClick={updViewState}>Back to member</button>
    )
}

export default BackToMemberBtn