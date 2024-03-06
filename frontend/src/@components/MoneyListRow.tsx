import React from "react";
import { IRemittance } from "../../../packages/member-document";

function formatDate(d: Date): string {
    const yr: string = d.getFullYear().toString();
    const rmo: string = (d.getMonth() + 1).toString();
    const mo = rmo.length < 2 ? "0" + rmo : rmo;
    const rda: string = (d.getDate() + 1).toString();
    const da = rda.length < 2 ? "0" + rda : rda;
    return yr + "-" + mo + "-" + da;
}

const repeatMe = (str: string, n: number) => {
    let buf = "";
    for (let i = 0; i < n; i++) {
        buf = `${buf}${str}`
    }
    return buf;
}

const isNumber = (str: any) => typeof str === 'string' && str.length > 0 && !isNaN(Number(str));

const isUsd = (str: any) => typeof str === 'string' && str.length > 0 && str.charAt(0) === "$" && !isNaN(Number(str.substring(1)));

const formatWhole = (str: string): { wholePart: string, leadingSpaces: string } => {
    const wholeLength = str.length;

    if (wholeLength <= 3) {
        return {
            wholePart: str,
            leadingSpaces: `${repeatMe(' ', 7 - wholeLength)}`
        };
    } else if (wholeLength <= 6) {
        const thousLen = wholeLength - 3;
        return {
            wholePart: `${str.slice(0, thousLen)},${str.slice(thousLen)}`,
            leadingSpaces: `${repeatMe(' ', 6 - wholeLength)}`
        };
    } else {
        return {
            wholePart: str,
            leadingSpaces: ''
        };
    }
}

const formatPadded = (amount: string): { wholePart: string, leadingSpaces: string } => {
    if (amount.indexOf('.') > -1) {
        const parts = amount.split('.');
        const { wholePart, leadingSpaces } = formatWhole(parts[0]);
        // const amtValue = Number(amount);
        return {
            wholePart: `${wholePart}.${parts[1].substring(0, 2)}`,
            leadingSpaces: leadingSpaces
        };
    } else {
        const { wholePart, leadingSpaces } = formatWhole(amount);
        return {
            wholePart: `${wholePart}.00`,
            leadingSpaces: leadingSpaces
        };
    }
}

const formatAmount = (amount: string): { wholePart: string, leadingSpaces: string } => {
    if (isNumber(amount)) {
        return formatPadded(amount);
    } else if (isUsd(amount)) {
        return formatPadded(amount.slice(1));;
    } else {
        return {
            wholePart: amount,
            leadingSpaces: ''
        };
    }
}
const RemittancesListRow = ({ date, amount, memo }: IRemittance): any => {
    const dateFormatted = formatDate(date);
    const { wholePart, leadingSpaces } = formatAmount(amount);
    const currencySymbol = '$ ';
    return (
        <div className="remits-row row" data-testid="remits-row" >
            <div className="remits-row--date col" data-testid="remits-row--date">{dateFormatted} </div>
            <div className="remits-row--memo col" data-testid="remits-row--memo">{memo}</div>
            <div className="remits-row--amount col" data-testid="remits-row--amount"><span className="inline">{currencySymbol + " "}</span><pre className="inline">{leadingSpaces}</pre><span className="inline">{wholePart}</span></div>
        </div>
    );
}

export default RemittancesListRow;
export { formatAmount, formatDate, formatPadded, formatWhole };