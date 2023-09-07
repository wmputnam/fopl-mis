import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// import { FrontendProps } from "../@interfaces/MemberProps";
// import MemberForm from "./MemberForm";
import MemberFormHeader from "./MemberFormHeader";
import MemberFormBase from "./MemberFormBase";
import { MemberViewStates } from "../@interfaces/enums";
var EditMember = function (_a) {
    var memberId = _a.memberId, mode = _a.mode, setAppState = _a.setAppState, getAppState = _a.getAppState;
    return (_jsxs(_Fragment, { children: [_jsx(MemberFormHeader, { setAppState: setAppState, getAppState: getAppState }), _jsx(MemberFormBase, { memberId: memberId, mode: MemberViewStates.edit, setAppState: setAppState, getAppState: getAppState })] }));
};
export default EditMember;
//# sourceMappingURL=EditMember.js.map