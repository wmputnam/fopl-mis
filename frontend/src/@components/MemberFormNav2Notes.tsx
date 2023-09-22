import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Notes({ setAppState, getAppState }: FrontendProps): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.push(getAppState().viewState);
        setAppState((oldState: any) => ({
            ...oldState,
            viewState: MemberViewStates.notes,
            fromViewState: newFromViewState
        }));
    }

    return (
        <button
            className="member--notes-btn"
            id="member--notes-btn"
            onClick={updViewState}>
            member notes</button>
    )
}

export default MemberFormNav2Notes