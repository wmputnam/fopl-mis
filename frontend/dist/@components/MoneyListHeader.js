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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var RemittancesListHeader = function () {
    return (_jsxs("div", __assign({ className: "remits-row--header header", "data-testid": "remits-row--header header" }, { children: [_jsx("div", __assign({ className: "remits-row--date", "data-testid": "remits-row--date" }, { children: "Date" })), _jsx("div", __assign({ className: "remits-row--memo", "data-testid": "remits-row--memo" }, { children: "Memo" })), _jsx("div", __assign({ className: "remits-row--amount", "data-testid": "remits-row--amount" }, { children: "Amount" }))] })));
};
export default RemittancesListHeader;
//# sourceMappingURL=MoneyListHeader.js.map