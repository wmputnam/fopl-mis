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
import RemittancesListRow from "./MoneyListRow";
import BackToMemberBtn from "./BackToMemberBtn";
import CancelBtn from "./CancelBtn";
import RemittancesListHeader from "./MoneyListHeader";
// import { MemberService } from "../services/MemberService";
import { getServerUrl } from "../services/AppConfig";
import { onRenderCallback } from "../App";
import useAxios from "axios-hooks";
var MemberFormMoney = function (_a) {
    var _b;
    var memberId = _a.memberId, getAppState = _a.getAppState, setAppState = _a.setAppState;
    // function isEmptyObject(obj: Object) {
    //   for (let i in obj) return false;
    //   return true;
    // }
    // const dataInitial: any = React.useRef({});
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
    console.log("fe-formbase\n    ".concat(JSON.stringify(memberData)));
    // React.useEffect(() => {
    //   // memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
    //   if (memberId && isEmptyObject(dataInitial.current)) {
    //     loadData(getServerUrl(), memberId, "")
    //       .then((loadRes: any) => {
    //         if ([200, 201].includes(loadRes.status)) {
    //           console.log("successful load")
    //           dataInitial.current = loadRes.body;
    //           setMemberData(dataInitial.current)
    //         }
    //       })
    //       .catch((fault) => {
    //         return { status: 500, error: `fault occured: ${JSON.stringify(fault)}` };
    //       });
    //   }
    // }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   , []);
    // const [memberData, setMemberData] = React.useState(dataInitial.current);
    //= someData && someData?.[0] && someData[0]?.data ? someData[0].data : undefined;
    var remitArr = memberData && memberData.remittances ? memberData.remittances : undefined;
    var remittancesElements;
    if (remitArr) {
        remittancesElements = remitArr.map(function (m, indx) {
            return (_jsx(_Fragment, { children: _jsx(RemittancesListRow, { date: (m === null || m === void 0 ? void 0 : m.date) !== undefined ? new Date(m.date) : new Date(), amount: m === null || m === void 0 ? void 0 : m.amount, memo: m.memo }, indx) }));
        });
        return (_jsxs(_Fragment, { children: [_jsx(BackToMemberBtn, { getAppState: getAppState, setAppState: setAppState }), _jsx(Home, { getAppState: getAppState, setAppState: setAppState }), _jsx(CancelBtn, { getAppState: getAppState, setAppState: setAppState }), _jsxs(Profiler, __assign({ id: "memberRemit", onRender: onRenderCallback }, { children: [_jsxs("h3", { children: ["Remittances for ", memberData.firstName + " " + memberData.lastName] }), !!remitArr && _jsx(RemittancesListHeader, {}), !!remitArr && remittancesElements] }))] }));
    }
    else {
        return (_jsx("p", { children: "No member data to display" }));
    }
};
export default MemberFormMoney;
//# sourceMappingURL=MemberFormMoney.js.map