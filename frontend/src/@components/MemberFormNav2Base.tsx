import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Base({ getAppState, setAppState }: FrontendProps): any {

    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, viewState: MemberViewStates.edit }));
    }
    return (
        <button onClick={updViewState}>member base</button>
    )

}
export default MemberFormNav2Base