var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Profiler } from 'react';
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
import { onRenderCallback } from "../App";
var RenewMember = function (_a) {
    var memberId = _a.memberId, getAppState = _a.getAppState, setAppState = _a.setAppState;
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "On the renew member view now" }), _jsx(Profiler, __assign({ id: "memberRenew", onRender: onRenderCallback }, { children: _jsx(MemberFormBase, { getAppState: getAppState, setAppState: setAppState, mode: MemberViewStates.renew, memberId: memberId }) }))] }));
};
export default RenewMember;
//# sourceMappingURL=RenewMember.js.map