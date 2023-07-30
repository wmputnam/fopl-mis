import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function CancelBtn ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState("list") }

    return (
        <button type="button" onClick={updViewState}>Return to member list</button>
        )
}

export default CancelBtn