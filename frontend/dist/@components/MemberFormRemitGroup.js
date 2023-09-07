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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Profiler } from "react";
import CurrencyFormat from "react-currency-format";
import { MemberService } from "../services/MemberService";
import { oldMemberStateToNew } from "./MemberFormBase";
var stringForRemitDate = function (dt) {
    if (dt) {
        if (typeof dt === 'string') {
            return dt.substring(0, 10);
        }
        else if (typeof dt === 'object' && dt instanceof Date) {
            return dt.toISOString().substring(0, 10);
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
    ;
};
export var MemberFormRemitGroup = function (_a) {
    var onRenderCallback = _a.onRenderCallback, memberObj = _a.memberObj, setMemberObj = _a.setMemberObj;
    var handleRemitDateChange = function (e) {
        if (e.target.id === "money-date") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _remitDate: new Date(e.target.value) })); });
        }
    };
    var handleRemitDuesChange = function (e) {
        if (e.target.id === "money-dues-amount") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _remitDues: e.target.value })); });
        }
    };
    var handleRemitDonationChange = function (e) {
        if (e.target.id === "money-donation-amount") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _remitDonation: e.target.value })); });
        }
    };
    if (memberObj) {
        var remitGroup = (_jsx(_Fragment, { children: _jsx(Profiler, __assign({ id: "memberFormRemit", onRender: onRenderCallback }, { children: _jsxs("div", __assign({ className: "member-form--money-group", "data-testid": "member-form--money-group" }, { children: [_jsx("label", __assign({ htmlFor: "money-date" }, { children: "Date" })), _jsx("input", { type: "date", id: "money-date", className: "new-member--money-date width-date", "data-testid": "new-member--money-date width-date", onChange: handleRemitDateChange, value: stringForRemitDate(memberObj.remitDate) }), _jsx("div", __assign({ className: "new-member--remit-error red-text", "data-testid": "new-member--remit-error red-text" }, { children: memberObj.getRemitDateError() })), !MemberService.isLifeMember(memberObj) && _jsx("label", __assign({ htmlFor: "money-dues-amount" }, { children: "Dues" })), !MemberService.isLifeMember(memberObj) && _jsx(CurrencyFormat, { id: "money-dues-amount", prefix: "$", thousandSeparator: true, decimalScale: 2, fixedDecimalScale: true, className: "new-member--dues-amount width-money", "data-testid": "new-member--dues-amount width-money", placeholder: "Dues amount", onChange: handleRemitDuesChange, value: memberObj.remitDues }), _jsx("label", __assign({ htmlFor: "money-donation-amount" }, { children: "Donation" })), _jsx(CurrencyFormat, { id: "money-donation-amount", prefix: "$", thousandSeparator: true, decimalScale: 2, fixedDecimalScale: true, className: "new-member--donation-amount width-money", "data-testid": "new-member--donation-amount width-money", placeholder: "Donation amount", onChange: handleRemitDonationChange, value: memberObj.remitDonation }), _jsx("div", __assign({ className: "new-member--remit-warn red-text", "data-testid": "new-member--remit-warn red-text" }, { children: memberObj.getRemitAmountWarn() }))] })) })) }));
        console.log("remit group");
        return remitGroup;
    }
    else {
        return _jsx(_Fragment, { children: _jsx("p", { children: "No member object provided" }) });
    }
};
//# sourceMappingURL=MemberFormRemitGroup.js.map