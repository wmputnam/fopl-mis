import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

export function MemberFormNav2Notes({ setAppState, getAppState }: FrontendProps): any {

    // jscpd:ignore-start
    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.push(getAppState().viewState);
        setAppState((oldState: any) => ({
            ...oldState,
            viewState: MemberViewStates.notes,
            fromViewState: newFromViewState
        }));
    }
    // jscpd:ignore-end

    return (
        <button
            className="member--notes-btn basic-button"
            id="member--notes-btn"
            onClick={updViewState}>
            Notes</button>
    )
}

const memberFormNav2Notes = MemberFormNav2Notes

export default memberFormNav2Notes