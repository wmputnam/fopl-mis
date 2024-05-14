import React from "react";
import { MemberFormBase } from "./MemberFormBase";
import { AppState } from "../App";

export interface NewMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
}

export const NewMember = ({ getAppState, setAppState }: NewMemberProps) => {
    return (<>
        <h1>On the NewMember view now</h1>
        <MemberFormBase
            getAppState={getAppState}
            setAppState={setAppState}
        />
    </>
    )
}
export default NewMember;