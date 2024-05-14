import React from "react";
import { type FrontendProps } from "../interfaces";


export function CancelBtn({ getAppState, setAppState }: FrontendProps): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        const returnToViewState = newFromViewState.pop();
        setAppState((oldState: any) => ({
            ...oldState,
            viewState: returnToViewState,
            fromViewState: newFromViewState
        }));
    }
    return (
        <button
            type="button"
            className="cancel-btn basic-button"
            onClick={updViewState}
            data-testid="cancel-btn">
            Cancel
        </button>
    )
}

const cancelBtn = CancelBtn;
export default cancelBtn