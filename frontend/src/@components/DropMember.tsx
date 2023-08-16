import React from "react";
import Home from "./CancelBtn";
import { MemberViewStates } from "../@interfaces/enums";
import CancelBtn from "./CancelBtn";
import { AppState } from "../App";

export interface DropMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
    memberId?: string;
}
const DropMember = ({ getAppState, setAppState }: DropMemberProps): any => {
    const memberId = getAppState && getAppState().memberId;
    function updViewState() {
        setAppState((oldState: any) => ({ ...oldState, viewState: MemberViewStates.list, memberId: "" }));
    }
    const handleClick = () => {
        updViewState()
        // if (updateCurrentMember) updateCurrentMember("")
    }
    return (
        <>
            <h1 onClick={handleClick}>On the DropMember view now for ${memberId}</h1>
            < Home setAppState={setAppState} getAppState={getAppState} />
            {false && <div><button>Drop</button><CancelBtn getAppState={getAppState} setAppState={setAppState} /></div>}
        </>
    )
}
export default DropMember;