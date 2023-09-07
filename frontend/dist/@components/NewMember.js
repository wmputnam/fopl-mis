import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
var NewMember = function (_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "On the NewMember view now" }), _jsx(MemberFormBase, { getAppState: getAppState, setAppState: setAppState, mode: MemberViewStates.new, memberId: "" })] }));
};
export default NewMember;
//# sourceMappingURL=NewMember.js.map