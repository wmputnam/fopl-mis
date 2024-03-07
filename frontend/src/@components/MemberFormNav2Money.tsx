import React from "react";
import { type FrontendProps ,MemberViewStates } from "../@interfaces";

export function MemberFormNav2Money({ setAppState, getAppState }: FrontendProps): any {

    // jscpd:ignore-start
    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.push(getAppState().viewState);
        setAppState((oldState: any) => ({
            ...oldState,
            viewState: MemberViewStates.money,
            fromViewState: newFromViewState
        }));
    }
    // jscpd:ignore-end

    return (
        <button
            className="member--remit-btn basic-button"
            id="member--remit-btn"
            onClick={updViewState}
        >Remittances</button>
    )
}
const memberFormNav2Money = MemberFormNav2Money;
export default memberFormNav2Money