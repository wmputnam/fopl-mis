import React from "react";
import { ViewStateProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function RefreshForm ( {updateViewState }: ViewStateProps):any  {
    
    // function updViewState() { updateViewState("list") }
    function handleClick() {}
    return (
        <button onClick={handleClick}>Refresh</button>
        )
}

export default RefreshForm