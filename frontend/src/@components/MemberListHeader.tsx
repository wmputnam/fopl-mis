import React from "react";

  
const MemberListHeader = ( ):any  => {
    return (
        <div className="member-row--header header">
            <div className="member-row--name">Name</div>
            <div className="member-row--address">Address</div>
            <div className="member-row--phone">Phone</div>
            <div className="member-row--email">Email</div>
            <div className="member-row--mmb">MMB</div>
            <div className="member-row--tools"/>
        </div>
    );
}

export default MemberListHeader;