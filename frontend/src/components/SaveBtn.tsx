import React from "react";

export type SaveBtnProps = {updateCurrentMember: (x:any)=>any}
export function SaveBtn({ updateCurrentMember }: SaveBtnProps):any  {
    
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