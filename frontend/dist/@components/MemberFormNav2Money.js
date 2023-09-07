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
import { MemberViewStates } from "../@interfaces/enums";
// export interface MemberToolProps {
//     setViewState:(a:string) => void;
//   }
function MemberFormNav2Money(_a) {
    var setAppState = _a.setAppState;
    function updViewState() {
        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.money })); });
    }
    return (_jsx("button", __assign({ onClick: updViewState }, { children: "member $$$" })));
}
export default MemberFormNav2Money;
//# sourceMappingURL=MemberFormNav2Money.js.map