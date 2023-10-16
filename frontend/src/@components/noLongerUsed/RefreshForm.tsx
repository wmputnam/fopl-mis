import React from "react";
import { FrontendProps } from "../../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function RefreshForm ( { getAppState,setAppState}: FrontendProps):any  {
    
    // function updViewState() { updateViewState("list") }
    function handleClick() {}
    return (
        <button onClick={handleClick} data-testid="refresh-button">Refresh</button>
        )
}

export default RefreshForm