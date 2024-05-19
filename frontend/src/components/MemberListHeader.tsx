import React from "react";
import { type FrontendProps, MemberViewStates } from "../interfaces";
import { pushView } from "src/services";



export const MemberListHeader = ({ getAppState, setAppState }: FrontendProps) => {

    const handleNewClick = (): any => {
        console.log(`new member`);
        pushView(getAppState(), MemberViewStates.new,setAppState);
    }

    return (
        <div
            className="member-row--header header"
            data-testid="member-row--header">
            <div
                className="member-row--name"
                data-testid="member-row--name">Name</div>
            <div
                className="member-row--address"
                data-testid="member-row--address">Address</div>
            <div
                className="member-row--phone"
                data-testid="member-row--phone">Phone</div>
            <div
                className="member-row--email"
                data-testid="member-row--email">Email</div>
            <div
                className="member-row--mmb"
                data-testid="member-row--mmb">MMB</div>
            <div
                className="member-row--tools"
                data-testid="member-row--tools">
                <button
                    className="member-row--header--new-btn" data-testid="member-row--header--new-btn"
                    title="Add new member"
                    onClick={handleNewClick}>+</button></div>
        </div>
    );
}

export default MemberListHeader;