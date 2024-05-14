import React from "react";
import { MemberFormHeader } from "./MemberFormHeader";
import { MemberFormBase } from "./MemberFormBase";
import { AppState } from "../App";

export interface EditProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>; //React.Dispatch<React.SetStateAction<AppState>>
    getAppState: () => AppState;
}

export const EditMember = ({ setAppState, getAppState }: EditProps) => {
    return (
        <>
            <MemberFormHeader
                setAppState={setAppState}
                getAppState={getAppState}
            />
            <MemberFormBase
                setAppState={setAppState}
                getAppState={getAppState}
            />
        </>
    )
}
