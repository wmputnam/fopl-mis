import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";


function CancelBtn({ setAppState }: FrontendProps): any {

    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, memberId: undefined, iMember: undefined, viewState: MemberViewStates.list }));
    }
    return (
        <button type="button" onClick={updViewState} data-testid="cancel-btn">Cancel</button>
    )
}

export default CancelBtn