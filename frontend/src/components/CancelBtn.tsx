import React from "react";
import { type FrontendProps } from "../interfaces";
import { popView } from "src/services";


export function CancelBtn({ getAppState, setAppState }: FrontendProps): any {

    function updViewState() {
        popView(getAppState(),setAppState)
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