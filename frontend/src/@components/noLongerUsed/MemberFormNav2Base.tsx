import React from "react";
import { FrontendProps } from "../../@interfaces/MemberProps";
import { MemberViewStates } from "../../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Base({ getAppState, setAppState }: FrontendProps): any {

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.push(getAppState().viewState);

        setAppState((oldState: any) => ({ ...oldState, 
            viewState: MemberViewStates.edit,
            fromViewState: newFromViewState
 }));
    }
    return (
        <button onClick={updViewState}>member base</button>
    )

}
export default MemberFormNav2Base