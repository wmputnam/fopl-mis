import React from "react";
import CancelBtn from "../CancelBtn";
import { FrontendProps } from "../../@interfaces/MemberProps";


const EditMemberAddress = ({ getAppState, setAppState }: FrontendProps) => {
    return (<>
        <h1>On the EditMemberAddress view now</h1>
        <CancelBtn
            getAppState={getAppState}
            setAppState={setAppState} />
    </>);
}
export default EditMemberAddress;