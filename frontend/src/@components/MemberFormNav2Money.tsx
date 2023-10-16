import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Money({ setAppState, getAppState }: FrontendProps): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.push(getAppState().viewState);
        setAppState((oldState: any) => ({
            ...oldState,
            viewState: MemberViewStates.money,
            fromViewState: newFromViewState
        }));
    }

    return (
        <button
            className="member--remit-btn basic-button"
            id="member--remit-btn"
            onClick={updViewState}
        >Remittances</button>
    )
}

export default MemberFormNav2Money