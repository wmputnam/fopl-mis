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
import MemberListRowMenu from "./MemberListRowMenu";
var MemberListRow = function (_a) {
    var recordId = _a.recordId, name = _a.name, address = _a.address, phone = _a.phone, email = _a.email, paidThrough = _a.paidThrough, mmb = _a.mmb, getAppState = _a.getAppState, setAppState = _a.setAppState;
    return (_jsxs("div", __assign({ className: "member-row row", "data-testid": "member-row row", title: name + " " + paidThrough, "data-id": recordId }, { children: [_jsx("div", __assign({ className: "member-row--name col", "data-testid": "member-row--name col" }, { children: name })), _jsx("div", __assign({ className: "member-row--address col", "data-testid": "member-row--address col" }, { children: address })), _jsx("div", __assign({ className: "member-row--phone col", "data-testid": "member-row--phone col" }, { children: phone })), _jsx("div", __assign({ className: "member-row--email col", "data-testid": "member-row--email col" }, { children: email })), _jsx("div", __assign({ className: "member-row--mmb col", "data-testid": "member-row--mmb col" }, { children: mmb })), _jsx("div", __assign({ className: "member-row--tools dropdown col", "data-testid": "member-row--tools dropdown col" }, { children: _jsx(MemberListRowMenu, { recordId: recordId, mmb: mmb, getAppState: getAppState, setAppState: setAppState }) }))] })));
};
export default MemberListRow;
//# sourceMappingURL=MemberListRow.js.map