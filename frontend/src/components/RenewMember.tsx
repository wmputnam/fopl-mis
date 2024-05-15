import React, { Profiler } from 'react';
import { MemberFormBase } from "./MemberFormBase";
import { MemberViewStates } from "../interfaces";
import { onRenderCallback } from "../interfaces";
import { AppState } from '../interfaces';

export interface RenewMemberProps {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    getAppState: () => any;
    mode: MemberViewStates;
    memberId?: string;
}
export const RenewMember = ({ memberId, getAppState, setAppState }: RenewMemberProps) => {
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