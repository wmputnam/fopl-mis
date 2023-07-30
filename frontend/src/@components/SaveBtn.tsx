import React from "react";
import { EditMemberProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

function SaveBtn({ updateViewState, updateCurrentMember }:  EditMemberProps):any  {
    
    // function updViewState() { updateViewState("list") }
    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (updateCurrentMember) {
            const res = updateCurrentMember("Save");
            return res;
        }
    }

    return (
        <button type="submit" onClick={handleClick}>Save</button>
        )
}

export default SaveBtn