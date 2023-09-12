import React from "react";

  
const RemittancesListHeader = ( ):any  => {
    return (
        <div className="remits-row--header header" data-testid="remits-row--header">
            <div className="remits-row--date" data-testid="remits-row--date">Date</div>
            <div className="remits-row--memo" data-testid="remits-row--memo">Memo</div>
            <div className="remits-row--amount" data-testid="remits-row--amount">Amount</div>
        </div>
    );
}

export default RemittancesListHeader;