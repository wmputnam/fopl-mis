import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Money ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState(MemberViewStates.money) }

    return (
        <button onClick={updViewState}>member $$$</button>
        )
}

export default MemberFormNav2Money