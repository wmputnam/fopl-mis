import React from "react";
// import { FrontendProps } from "../@interfaces/MemberProps";
// import MemberForm from "./MemberForm";
import MemberFormHeader from "./MemberFormHeader";
import MemberFormBase from "./MemberFormBase";
import { AppState } from "../App";
// import { MemberViewStates } from "../@interfaces/enums";

export interface EditProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>; //React.Dispatch<React.SetStateAction<AppState>>
    getAppState: () => AppState;
}

const EditMember = ({ setAppState, getAppState }: EditProps) => {
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
export default EditMember;