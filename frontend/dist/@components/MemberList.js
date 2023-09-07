import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import members from "../assets/data/member-data.json"
import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader";
// import membersActions from "../actions/members.actions";
import MembersReducers from "../reducers/members.reducers";
import useAxios from "axios-hooks";
// import { MemberViewStates } from "../@interfaces/enums";
import { getServerUrl } from "../services/AppConfig";
var MemberList = function (_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    var _b = useAxios({ baseURL: getServerUrl(), url: "/members" }, { manual: false, useCache: false })[0], data = _b.data, error = _b.error, loading = _b.loading;
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error! ", error.message] });
    var members = data;
    if (members) {
        var memberElements = void 0;
        memberElements = members.map(function (m) {
            return (_jsx(MemberListRow, { recordId: (m === null || m === void 0 ? void 0 : m._id) ? m._id : "", name: MembersReducers.reduceMemberFullName(m), address: MembersReducers.reduceAddressForMemberList(m), phone: m === null || m === void 0 ? void 0 : m.phone, email: m === null || m === void 0 ? void 0 : m.email, paidThrough: MembersReducers.reducePaidThroughForMemberList(m), mmb: m.mmb ? m.mmb : "VOL", getAppState: getAppState, setAppState: setAppState }, m._id));
        });
        return (_jsxs(_Fragment, { children: [!!data && _jsx(MemberListHeader, { getAppState: getAppState, setAppState: setAppState }), !!data && memberElements] }));
    }
    else {
        return (_jsx("p", { children: "No members to display" }));
    }
};
export default MemberList;
//# sourceMappingURL=MemberList.js.map