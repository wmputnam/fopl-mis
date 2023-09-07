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
import React, { Profiler } from 'react';
import './App.css';
import DropMember from './@components/DropMember';
import EditMember from './@components/EditMember';
import Home from "./@components/CancelBtn";
import MemberList from './@components/MemberList';
import NewMember from './@components/NewMember';
import RenewMember from './@components/RenewMember';
import { MemberViewStates } from './@interfaces/enums';
import AppHeader from './@components/AppHeader';
import MemberFormNotes from './@components/MemberFormNotes';
import MemberFormMoney from './@components/MemberFormMoney';
import { MemberService } from './services/MemberService';
export var onRenderCallback = function (_a) {
    var id = _a.id, phase = _a.phase;
    id && phase && console.log("".concat(id, " ").concat(phase));
};
export var isEmptyObject = function (obj) {
    for (var i in obj)
        return false;
    return true;
};
export var getInitialViewState = function () { return ({ viewState: MemberViewStates.list }); };
export var getTestViewState = function () { return ({ viewState: MemberViewStates.test }); };
export default function App(_a) {
    var testMode = _a.testMode;
    var initialAppState;
    if (testMode && testMode === true) {
        console.log(" testMode : ".concat(testMode));
        initialAppState = getTestViewState;
    }
    else {
        initialAppState = getInitialViewState;
    }
    var _b = React.useState(initialAppState), appState = _b[0], setAppState = _b[1];
    var getAppState = function () { return appState; };
    var componentDidMount = function () {
        console.log("mounted");
    };
    React.useEffect(function () {
        console.log("feapp: is mounted\n    ".concat(JSON.stringify(appState)));
        return (function () { return console.log("feapp2: will unmount\n    ".concat(JSON.stringify(appState))); });
    }, [appState]);
    var _c = React.useState(["Hello!"]), appMessages = _c[0], setAppMessages = _c[1];
    var component;
    console.log(appState.viewState);
    switch (appState.viewState) {
        case MemberViewStates.list:
            console.log("in the list entry -- expected in normal mode");
            MemberService.clearMemberId();
            component = _jsx(Profiler, __assign({ id: "App-list", onRender: onRenderCallback }, { children: _jsx(MemberList, { setAppState: setAppState, getAppState: getAppState }) }));
            break;
        case MemberViewStates.edit:
            component = _jsx(EditMember, { memberId: MemberService.retrieveMemberId(true), mode: MemberViewStates.edit, setAppState: setAppState, getAppState: getAppState });
            break;
        case MemberViewStates.new:
            component = _jsx(NewMember, { setAppState: setAppState, getAppState: getAppState });
            break;
        case MemberViewStates.drop:
            component = _jsx(DropMember, { memberId: MemberService.retrieveMemberId(true), setAppState: setAppState, getAppState: getAppState });
            break;
        case MemberViewStates.renew:
            component = _jsx(RenewMember, { memberId: MemberService.retrieveMemberId(true), mode: MemberViewStates.renew, setAppState: setAppState, getAppState: getAppState });
            break;
        case MemberViewStates.notes:
            component = _jsx(MemberFormNotes, { memberId: MemberService.retrieveMemberId(true), setAppState: setAppState, getAppState: getAppState });
            break;
        case MemberViewStates.money:
            component = _jsx(MemberFormMoney, { memberId: MemberService.retrieveMemberId(true), setAppState: setAppState, getAppState: getAppState });
            break;
        default:
            console.log("in the lost entry -- expected in test mode");
            component = _jsxs(_Fragment, { children: [_jsx("h1", __assign({ id: "lost" }, { children: " opps we are now lost" })), _jsx(Home, { setAppState: setAppState, getAppState: getAppState })] });
            break;
    }
    return (_jsxs("div", __assign({ className: "App", "data-testid": "App" }, { children: [_jsx("header", { children: _jsx(AppHeader, { messages: appMessages }) }), _jsx("main", { children: component }), _jsx("footer", {})] })));
}
//# sourceMappingURL=App.js.map