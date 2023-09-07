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
import { MemberService } from "../services/MemberService";
var MemberListRowMenu = function (_a) {
    var recordId = _a.recordId, mmb = _a.mmb, setAppState = _a.setAppState;
    var handleEditClick = function () {
        console.log("edit member ".concat(recordId));
        MemberService.saveMemberId(recordId);
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.edit })); });
    };
    var handleRenewClick = function () {
        console.log("renew member ".concat(recordId));
        MemberService.saveMemberId(recordId);
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.renew })); });
    };
    // const handleNewClick = (): any => {
    //   console.log(`new member`);
    //   setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.new }));
    // }
    var handleMoneyClick = function () {
        console.log("edit member money ".concat(recordId));
        MemberService.saveMemberId(recordId);
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.money })); });
    };
    var handleNotesClick = function () {
        console.log("edit member money ".concat(recordId));
        MemberService.saveMemberId(recordId);
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.notes })); });
    };
    var handleDropClick = function () {
        console.log("drop member ".concat(recordId));
        MemberService.saveMemberId(recordId);
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.drop })); });
    };
    return (_jsxs("div", __assign({ className: "member-row--menu", "data-testid": "member-row--menu" }, { children: [_jsx("button", __assign({ className: "dropbtn", "data-testid": "dropbtn" }, { children: "\u22EE" })), _jsxs("div", __assign({ className: "dropdown-content", "data-testid": "dropdown-content" }, { children: [_jsx("div", __assign({ className: "member-row--menu-edit", "data-testid": "member-row--menu-edit", "member-id": recordId, onClick: function () { return handleEditClick(); } }, { children: "Edit member" })), _jsx("div", __assign({ className: "member-row--menu-renewal", "data-testid": "member-row--menu-renewal", "member-id": recordId, onClick: function () { return handleRenewClick(); } }, { children: MemberService.isLifeMember(mmb) ? "Process donation" : "Renew member" })), MemberService.isVolunteer(mmb) && _jsx("div", __assign({ className: "member-row--menu-signup", "data-testid": "member-row--menu-signup", onClick: function () { return handleRenewClick(); } }, { children: "VOL to MEMBER" })), _jsx("div", __assign({ className: "member-row--menu-money", "data-testid": "member-row--menu-money", onClick: function () { return handleMoneyClick(); } }, { children: "View remittances" })), _jsx("div", __assign({ className: "member-row--menu-notes", "data-testid": "member-row--menu-notes", onClick: function () { return handleNotesClick(); } }, { children: "View notes" })), !MemberService.isDroppedMember(mmb) && _jsx("div", __assign({ className: "member-row--menu-drop", "data-testid": "member-row--menu-drop", onClick: function () { return handleDropClick(); } }, { children: "Drop member" }))] }))] })));
};
export default MemberListRowMenu;
//# sourceMappingURL=MemberListRowMenu.js.map