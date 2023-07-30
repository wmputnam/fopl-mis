import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";


function CancelBtn ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState(MemberViewStates.list) }

    return (
        <button type="button" onClick={updViewState}>Return to member list</button>
        )
}

export default CancelBtn