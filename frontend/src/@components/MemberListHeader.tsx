import React from "react";
import { FrontendProps } from "../@interfaces/MemberProps";
import { MemberViewStates } from "../@interfaces/enums";



const MemberListHeader = ({getAppState,setAppState}:FrontendProps ) => 
{

    const handleNewClick = (): any => {
        console.log(`new member`);
        setAppState( (oldState:any) => ({...oldState, viewState:MemberViewStates.new}));
    }

    return (
        <div className="member-row--header header">
            <div className="member-row--name">Name</div>
            <div className="member-row--address">Address</div>
            <div className="member-row--phone">Phone</div>
            <div className="member-row--email">Email</div>
            <div className="member-row--mmb">MMB</div>
            <div className="member-row--tools"><button className="member-row--header--new-btn" title="Add new member" onClick={handleNewClick}>+</button></div>
        </div>
    );
}

export default MemberListHeader;