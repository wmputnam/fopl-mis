import React from "react";
// import { FrontendProps } from "../@interfaces/MemberProps";

// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }

type SaveBtnProps = {updateCurrentMember: (x:any)=>any}
function SaveBtn({ updateCurrentMember }: SaveBtnProps):any  {
    
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