import React from "react";
import { type FrontendProps, MemberViewStates } from "../interfaces";
import { pushView } from "src/services";

export function MemberFormNav2Notes({ setAppState, getAppState }: FrontendProps): any {

    // jscpd:ignore-start
    function updViewState() {
        pushView(getAppState(),MemberViewStates.notes,setAppState);
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