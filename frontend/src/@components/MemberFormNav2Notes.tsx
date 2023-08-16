import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Notes({ getAppState, setAppState }: FrontendProps): any {

    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, viewState: MemberViewStates.notes }));
    }

    return (
        <button onClick={updViewState}>member notes</button>
    )
}

export default MemberFormNav2Notes