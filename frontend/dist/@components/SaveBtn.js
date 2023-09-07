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
function SaveBtn(_a) {
    var updateCurrentMember = _a.updateCurrentMember;
    function handleClick(event) {
        event.preventDefault();
        if (updateCurrentMember) {
            var res = updateCurrentMember("Save");
            return res;
        }
    }
    return (_jsx("button", __assign({ type: "submit", onClick: handleClick, "data-testid": "save-btn" }, { children: "Save" })));
}
export default SaveBtn;
//# sourceMappingURL=SaveBtn.js.map