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
var NotesListRow = function (_a) {
    var date = _a.date, note = _a.note;
    return (_jsxs("div", __assign({ className: "notes-row row", "data-testid": "notes-row row" }, { children: [_jsxs("div", __assign({ className: "notes-row--date col", "data-testid": "notes-row--date col" }, { children: [formatDate(date), " "] })), _jsx("div", __assign({ className: "notes-row--note col", "data-testid": "notes-row--note col" }, { children: note }))] })));
};
export default NotesListRow;
//# sourceMappingURL=NotesListRow.js.map