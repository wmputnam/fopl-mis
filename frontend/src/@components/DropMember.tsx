import React from "react";
import { CancelBtn } from "./CancelBtn";
import { AppState } from "../App";
import { MemberViewStates } from "../@interfaces";

export interface DropMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
    memberId?: string;
}
export const DropMember = ({ getAppState, setAppState }: DropMemberProps): any => {
    const memberId = getAppState && getAppState().memberId;

    function updViewState() {
        const newFromViewState = getAppState().fromViewState;
        newFromViewState.pop();

        setAppState((oldState: any) => ({
            ...oldState,
            viewState: MemberViewStates.list,
            memberId: "",
            fromViewState: newFromViewState
        }));
    }
    const handleClick = () => {
        updViewState()
        // if (updateCurrentMember) updateCurrentMember("")
    }
    return (
        <>
            <h1 onClick={handleClick}>On the DropMember view now for ${memberId}</h1>
            <CancelBtn
                getAppState={getAppState}
                setAppState={setAppState}
            />

        </>
    )
}
export default DropMember;