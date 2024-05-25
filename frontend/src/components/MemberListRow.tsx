import React from "react";
import { MemberListRowMenu } from "./MemberListRowMenu";
import { AppState } from "../interfaces";

export type MemberListRowProps = {
    recordId: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    paidThrough: string;
    mmb: string
    getAppState: () => any;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
const nop = (e: any) => {
    e.preventDefault();
    console.log(`context menu invoked`);
};
export const MemberListRow = ({ recordId, name, address, phone, email, paidThrough, mmb, getAppState, setAppState }: MemberListRowProps): any => {
    return (
        <div className="member-row row"
            data-testid="member-row"
            title={name + " " + paidThrough}
            data-id={recordId}
            onContextMenu={nop}>
            <div className="member-row--name col"
                data-testid="member-row--name">{name}</div>
            <div className="member-row--address col"
                data-testid="member-row--address">{address}</div>
            <div className="member-row--phone col"
                data-testid="member-row--phone">{phone}</div>
            <div className="member-row--email col"
                data-testid="member-row--email">{email}</div>
            <div className="member-row--mmb col"
                data-testid="member-row--mmb">{mmb}</div>
            <div className="member-row--tools dropdown col"
                data-testid="member-row--tools">
                <MemberListRowMenu
                    recordId={recordId}
                    mmb={mmb}
                    name={name}
                    appState={getAppState()}
                    setAppState={setAppState}
                /></div>

        </div>
    );
}
export default MemberListRow;