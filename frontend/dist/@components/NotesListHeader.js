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
var NotesListHeader = function () {
    return (_jsxs("div", __assign({ className: "notes-row--header header", "data-testid": "notes-row--header header" }, { children: [_jsx("div", __assign({ className: "notes-row--date", "data-testid": "notes-row--date" }, { children: "Date" })), _jsx("div", __assign({ className: "notes-row--note", "data-testid": "notes-row--note" }, { children: "Note" }))] })));
};
export default NotesListHeader;
//# sourceMappingURL=NotesListHeader.js.map