import React from "react";
import { MemberViewStates } from "../@interfaces/enums";
import { FrontendProps } from "../@interfaces/MemberProps";


function BackToMemberBtn({ setAppState }: FrontendProps): any {

    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, viewState: MemberViewStates.edit }));
    }
    return (
        <button type="button" onClick={updViewState} data-testid="back-to-member-edit-btn">Back to member</button>
    )
}

export default BackToMemberBtn