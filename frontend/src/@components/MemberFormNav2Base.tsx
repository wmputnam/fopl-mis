import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Base ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState("edit") }

    return (
        <button onClick={updViewState}>member base</button>
        )
}

export default MemberFormNav2Base