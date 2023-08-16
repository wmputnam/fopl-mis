import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Money({ setAppState }: FrontendProps): any {

    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, viewState: MemberViewStates.money }));
    }

    return (
        <button onClick={updViewState}>member $$$</button>
    )
}

export default MemberFormNav2Money