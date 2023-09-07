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
import { MemberService } from "../services/MemberService";
var stringForMmbDate = function (dt) {
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
export var MemberFormMmbGroup = function (memberObj, onRenderCallback) {
    if (memberObj) {
        var mmbGroup = (_jsx(_Fragment, { children: _jsx(Profiler, __assign({ id: "MemberMmb", onRender: onRenderCallback }, { children: _jsxs("div", __assign({ className: "member-form--mmb-group", "data-testid": "member-form--mmb-group" }, { children: [_jsxs("div", __assign({ className: "existing-member--mmb", "data-testid": "existing-member--mmb" }, { children: [_jsx("label", __assign({ htmlFor: "mmb" }, { children: "Mmb " })), _jsx("input", { type: "text", maxLength: 10, readOnly: true, id: "mmb", className: "width-mmb readonly-input", "data-testid": "width-mmb readonly-input", value: memberObj.mmb })] })), !MemberService.isLifeMember(memberObj) &&
                            _jsxs("div", __assign({ className: "existing-member--paid-through", "data-testid": "existing-member--paid-through" }, { children: [_jsx("label", __assign({ htmlFor: "paidThrough" }, { children: "Paid through " })), _jsx("input", { id: "paidThrough", type: "text", readOnly: true, className: "form-paid-through width-date readonly-input", "data-testid": "form-paid-through width-date readonly-input", value: stringForMmbDate(memberObj.paidThrough) })] })), _jsxs("div", __assign({ className: "existing-member--joined", "data-testid": "existing-member--joined" }, { children: [_jsx("label", __assign({ htmlFor: "joined" }, { children: "Joined " })), _jsx("input", { type: "text", readOnly: true, id: "joined", className: "form--joined width-date readonly-input", "data-testid": "form--joined width-date readonly-input", value: stringForMmbDate(memberObj.joined) })] })), _jsxs("div", __assign({ className: "existing-member--last-updated", "data-testid": "existing-member--last-updated" }, { children: [_jsx("label", __assign({ htmlFor: "last-updated" }, { children: "Last updated " })), _jsx("input", { type: "text", readOnly: true, id: "last-updated", className: "form--last-updated width-date readonly-input", "data-testid": "form--last-updated width-date readonly-input", value: stringForMmbDate(memberObj.lastUpdated) })] }))] })) })) }));
        console.log("mmb group!");
        return mmbGroup;
    }
    else {
        return _jsx(_Fragment, { children: _jsx("p", { children: "No member object provided" }) });
    }
};
//# sourceMappingURL=MemberFormMmbGroup.js.map