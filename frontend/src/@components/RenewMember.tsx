import React, { Profiler } from 'react';
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
import { AppState, onRenderCallback } from "../App";

export interface RenewMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
    mode: MemberViewStates;
    memberId?: string;
}
const RenewMember = ({ memberId, getAppState, setAppState }: RenewMemberProps) => {
    return (<>
        <h1>On the renew member view now</h1>
        <Profiler id="memberRenew" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
            <MemberFormBase
                getAppState={getAppState}
                setAppState={setAppState}
            />
        </Profiler>
    </>
    )
}
export default RenewMember;