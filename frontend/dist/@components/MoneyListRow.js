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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
function formatDate(d) {
    var yr = d.getFullYear().toString();
    var rmo = d.getMonth().toString();
    var mo = rmo.length < 2 ? "0" + rmo : rmo;
    var rda = d.getDay().toString();
    var da = rda.length < 2 ? "0" + rda : rda;
    var rhr = d.getHours().toString();
    var hr = rhr.length < 2 ? "0" + rhr : rhr;
    var rmi = d.getMinutes().toString();
    var mi = rmi.length < 2 ? "0" + rmi : rmi;
    var rse = d.getSeconds().toString();
    var se = rse.length < 2 ? "0" + rse : rse;
    return yr + "-" + mo + "-" + da + " " + hr + ":" + mi + ":" + se;
}
var RemittancesListRow = function (_a) {
    var date = _a.date, amount = _a.amount, memo = _a.memo;
    return (_jsxs("div", __assign({ className: "remits-row row", "data-testid": "remits-row row" }, { children: [_jsxs("div", __assign({ className: "remits-row--date col", "data-testid": "remits-row--date col" }, { children: [formatDate(date), " "] })), _jsx("div", __assign({ className: "remits-row--memo col", "data-testid": "remits-row--memo col" }, { children: memo })), _jsx("div", __assign({ className: "remits-row--amount col", "data-testid": "remits-row--amount col" }, { children: amount }))] })));
};
export default RemittancesListRow;
//# sourceMappingURL=MoneyListRow.js.map