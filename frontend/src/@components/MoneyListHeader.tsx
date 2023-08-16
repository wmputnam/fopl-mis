import React from "react";

  
const RemittancesListHeader = ( ):any  => {
    return (
        <div className="remits-row--header header">
            <div className="remits-row--date">Date</div>
            <div className="remits-row--memo">Memo</div>
            <div className="remits-row--amount">Amount</div>
        </div>
    );
}

export default RemittancesListHeader;