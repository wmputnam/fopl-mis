import React from "react";
import { Remittance } from "packages/Remittance";

function formatDate(d: Date): string {
    const yr: string = d.getFullYear().toString();
    const rmo: string = d.getMonth().toString();
    const mo = rmo.length < 2 ? "0" + rmo : rmo;
    const rda: string = d.getDay().toString();
    const da = rda.length < 2 ? "0" + rda : rda;
    const rhr: string = d.getHours().toString();
    const hr = rhr.length < 2 ? "0" + rhr : rhr;
    const rmi: string = d.getMinutes().toString();
    const mi = rmi.length < 2 ? "0" + rmi : rmi;
    const rse: string = d.getSeconds().toString();
    const se = rse.length < 2 ? "0" + rse : rse;
    return yr + "-" + mo + "-" + da + " " + hr + ":" + mi + ":" + se;
}

const RemittancesListRow = ({ date, amount, memo }: Remittance): any => {
    return (
        <div className="remits-row row" >
            <div className="remits-row--date col">{formatDate(date)} </div>
            <div className="remits-row--amount col">{amount}</div>
            <div className="remits-row--memo col">{memo}</div>
        </div>
    );
}

export default RemittancesListRow;