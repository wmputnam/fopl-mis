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
import { jsx as _jsx } from "react/jsx-runtime";
// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }
function RefreshForm(_a) {
    var getAppState = _a.getAppState, setAppState = _a.setAppState;
    // function updViewState() { updateViewState("list") }
    function handleClick() { }
    return (_jsx("button", __assign({ onClick: handleClick, "data-testid": "refresh-button" }, { children: "Refresh" })));
}
export default RefreshForm;
//# sourceMappingURL=RefreshForm.js.map