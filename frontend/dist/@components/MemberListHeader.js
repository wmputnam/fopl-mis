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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MemberViewStates } from "../@interfaces/enums";
var MemberListHeader = function (_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    var handleNewClick = function () {
        console.log("new member");
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.new })); });
    };
    return (_jsxs("div", __assign({ className: "member-row--header header", "data-testid": "member-row--header header" }, { children: [_jsx("div", __assign({ className: "member-row--name", "data-testid": "member-row--name" }, { children: "Name" })), _jsx("div", __assign({ className: "member-row--address", "data-testid": "member-row--address" }, { children: "Address" })), _jsx("div", __assign({ className: "member-row--phone", "data-testid": "member-row--phone" }, { children: "Phone" })), _jsx("div", __assign({ className: "member-row--email", "data-testid": "member-row--email" }, { children: "Email" })), _jsx("div", __assign({ className: "member-row--mmb", "data-testid": "member-row--mmb" }, { children: "MMB" })), _jsx("div", __assign({ className: "member-row--tools", "data-testid": "member-row--tools" }, { children: _jsx("button", __assign({ className: "member-row--header--new-btn", "data-testid": "member-row--header--new-btn", title: "Add new member", onClick: handleNewClick }, { children: "+" })) }))] })));
};
export default MemberListHeader;
//# sourceMappingURL=MemberListHeader.js.map