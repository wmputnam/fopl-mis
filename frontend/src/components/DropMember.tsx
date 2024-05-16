import React from "react";
import { CancelBtn } from "./CancelBtn";
import { AppState } from "../interfaces";
// import { MemberViewStates } from "../interfaces";
// import { clearMemberAndPopView } from "src/services";

export interface DropMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
    memberId?: string;
}
export const DropMember = ({ getAppState, setAppState }: DropMemberProps): any => {
    const memberId = getAppState && getAppState().memberId;

    // function updViewState() {
        // clearMemberAndPopView(getAppState(), setAppState)
        // const newFromViewState = getAppState().fromViewState;
        // newFromViewState.pop();

        // setAppState((oldState: any) => ({
        //     ...oldState,
        //     viewState: MemberViewStates.list,
        //     memberId: "",
        //     fromViewState: newFromViewState
        // }));
    // }
    const handleClick = () => {
        // updViewState()
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