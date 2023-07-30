import React from "react";
import { EditMemberProps, ViewStateProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";


function CancelBtn({ updateViewState, updateAppMessages }: EditMemberProps): any {

    function updViewState() {
        updateViewState(MemberViewStates.list);
        updateAppMessages && updateAppMessages([])
    }
    return (
        <button type="button" onClick={updViewState}>Return to member list</button>
    )
}

export default CancelBtn