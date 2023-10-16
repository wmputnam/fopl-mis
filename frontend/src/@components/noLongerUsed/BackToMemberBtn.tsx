import React from "react";
import { MemberViewStates } from "../../@interfaces/enums";
import { FrontendProps } from "../../@interfaces/MemberProps";


function BackToMemberBtn({ setAppState, getAppState }: FrontendProps, fromViewState:MemberViewStates): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.pop();

        setAppState((oldState: any) => ({ 
            ...oldState, 
            viewState: MemberViewStates.edit, 
            fromViewState: newFromViewState }));
    }
    return (
        <button type="button" onClick={updViewState} data-testid="back-to-member-edit-btn">Back to member</button>
    )
}

export default BackToMemberBtn