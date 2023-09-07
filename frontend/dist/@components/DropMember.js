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
import { MemberViewStates } from "../@interfaces/enums";
import CancelBtn from "./CancelBtn";
var DropMember = function (_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    var memberId = getAppState && getAppState().memberId;
    function updViewState() {
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.list, memberId: "" })); });
    }
    var handleClick = function () {
        updViewState();
        // if (updateCurrentMember) updateCurrentMember("")
    };
    return (_jsxs(_Fragment, { children: [_jsxs("h1", __assign({ onClick: handleClick }, { children: ["On the DropMember view now for $", memberId] })), _jsx(Home, { setAppState: setAppState, getAppState: getAppState }), false && _jsxs("div", { children: [_jsx("button", { children: "Drop" }), _jsx(CancelBtn, { getAppState: getAppState, setAppState: setAppState })] })] }));
};
export default DropMember;
//# sourceMappingURL=DropMember.js.map