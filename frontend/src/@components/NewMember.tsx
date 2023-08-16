import React from "react";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
import { AppState } from "../App";

export interface NewMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
}

const NewMember = ({ getAppState, setAppState }: NewMemberProps) => {
    return (<>
        <h1>On the NewMember view now</h1>
        <MemberFormBase
            getAppState={getAppState}
            setAppState={setAppState}
            mode={MemberViewStates.new}
            memberId={""}
        />
    </>
    )
}
export default NewMember;