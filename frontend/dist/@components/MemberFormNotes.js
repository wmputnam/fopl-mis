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
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profiler } from "react";
import Home from "./CancelBtn";
import NotesListRow from "./NotesListRow";
import NotesListHeader from "./NotesListHeader";
import CancelBtn from "./CancelBtn";
import BackToMemberBtn from "./BackToMemberBtn";
import { getServerUrl } from "../services/AppConfig";
import { onRenderCallback } from "../App";
import useAxios from "axios-hooks";
var MemberFormNotes = function (_a) {
    var _b;
    var memberId = _a.memberId, getAppState = _a.getAppState, setAppState = _a.setAppState;
    var LoadFromDb = function (memberId) {
        return useAxios({ baseURL: getServerUrl(), url: "/members/".concat(memberId) }, { manual: false, useCache: false });
    };
    var someData;
    if (memberId) {
        someData = LoadFromDb(memberId);
    }
    else {
        someData = undefined;
    }
    var memberData = someData && (someData === null || someData === void 0 ? void 0 : someData[0]) && ((_b = someData[0]) === null || _b === void 0 ? void 0 : _b.data) ? someData[0].data : undefined;
    var notesArr = memberData && memberData.notes ? memberData.notes : undefined;
    var notesElements;
    if (notesArr) {
        notesElements = notesArr.map(function (m) {
            return (_jsx(_Fragment, { children: _jsx(NotesListRow, { date: (m === null || m === void 0 ? void 0 : m.date) !== undefined ? new Date(m.date) : new Date(), note: m.note }, m === null || m === void 0 ? void 0 : m.date.toString()) }));
        });
        return (_jsxs(_Fragment, { children: [_jsx(BackToMemberBtn, { getAppState: getAppState, setAppState: setAppState }), _jsx(Home, { getAppState: getAppState, setAppState: setAppState }), _jsx(CancelBtn, { getAppState: getAppState, setAppState: setAppState }), _jsxs("h3", { children: ["Notes for ", memberData.firstName + " " + memberData.lastName] }), _jsxs(Profiler, __assign({ id: "memberNotes", onRender: onRenderCallback }, { children: [!!notesArr && _jsx(NotesListHeader, {}), !!notesArr && notesElements] }))] }));
    }
    else {
        return (_jsx("p", { children: "No member data to display" }));
    }
};
export default MemberFormNotes;
//# sourceMappingURL=MemberFormNotes.js.map