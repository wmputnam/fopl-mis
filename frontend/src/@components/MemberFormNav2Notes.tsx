import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function MemberFormNav2Notes ( {updateViewState }: ViewStateProps):any  {
    
    function updViewState() { updateViewState("notes") }

    return (
        <button onClick={updViewState}>member notes</button>
        )
}

export default MemberFormNav2Notes