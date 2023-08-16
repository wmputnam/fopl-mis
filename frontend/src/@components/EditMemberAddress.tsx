import React from "react";
import Home from "./CancelBtn";
import { FrontendProps } from "../@interfaces/MemberProps";


const EditMemberAddress = ({ getAppState, setAppState }: FrontendProps) => {
    return (<>
        <h1>On the EditMemberAddress view now</h1>
        <Home 
        getAppState={getAppState}
        setAppState={setAppState} 
        />
    </>
    )
}
export default EditMemberAddress;