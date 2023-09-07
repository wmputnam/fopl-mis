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
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Home from "./CancelBtn";
import RefreshForm from "./RefreshForm";
import MemberFormNav2Base from "./MemberFormNav2Base";
import MemberFormNav2Money from "./MemberFormNav2Money";
import MemberFormNav2Notes from "./MemberFormNav2Notes";
import { MemberService } from "../services/MemberService";
var toCapitalCase = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
var MemberFormHeader = function (_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    var memberId = MemberService.retrieveMemberId();
    return (_jsxs(_Fragment, { children: [_jsxs("h1", { children: [toCapitalCase(getAppState().viewState.toString()), " member: ", memberId] }), _jsx("nav", __assign({ className: "member-form--nav", "data-testid": "member-form--nav" }, { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Home, { getAppState: getAppState, setAppState: setAppState }) }), _jsx("li", { children: _jsx(RefreshForm, { getAppState: getAppState, setAppState: setAppState }) }), _jsx("li", { children: _jsx(MemberFormNav2Base, { getAppState: getAppState, setAppState: setAppState }) }), _jsx("li", { children: _jsx(MemberFormNav2Money, { getAppState: getAppState, setAppState: setAppState }) }), _jsx("li", { children: _jsx(MemberFormNav2Notes, { getAppState: getAppState, setAppState: setAppState }) })] }) }))] }));
};
export default MemberFormHeader;
//# sourceMappingURL=MemberFormHeader.js.map