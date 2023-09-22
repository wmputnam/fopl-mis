import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";


function CancelBtn({ getAppState,setAppState }: FrontendProps): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        const returnToViewState = newFromViewState.pop();
        console.log(`cancel on ${getAppState().fromViewState} will return to ${returnToViewState.toString()}`);
        setAppState((oldState: any) => ({ 
            ...oldState,  
            viewState: returnToViewState, 
            fromViewState: newFromViewState }));
    }
    return (
        <button
            type="button"
            className="cancel-btn"
            onClick={updViewState}
            data-testid="cancel-btn">
            Cancel
        </button>
    )
}

export default CancelBtn