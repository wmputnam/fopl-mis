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
        <button 
            className="save-btn basic-button"
        type="submit" 
        onClick={handleClick} 
        data-testid="save-btn">Save</button>
        )
}

export default SaveBtn