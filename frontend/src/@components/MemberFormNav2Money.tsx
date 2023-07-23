import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Money ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState("money") }

    return (
        <button onClick={updViewState}>member $$$</button>
        )
}

export default MemberFormNav2Money