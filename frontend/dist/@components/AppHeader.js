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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var AppHeader = function (_a) {
    var messages = _a.messages;
    var messageElements;
    if (messages) {
        messageElements = messages.map(function (m, index) {
            return (_jsx("li", { children: m }, index));
        });
    }
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: "app-header", "data-testid": "app-header", role: "menubar" }, { children: [_jsxs("div", __assign({ className: "app-header--left", "data-testid": "app-header--left" }, { children: [_jsx("div", __assign({ className: "org-name", "data-testid": "org-name" }, { children: _jsx("span", __assign({ className: "" }, { children: "Friends of the Petaluma Library" })) })), _jsx("div", __assign({ className: "app-name", "data-testid": "app-name" }, { children: _jsx("span", __assign({ className: "" }, { children: "Membership" })) }))] })), _jsx("div", __assign({ className: "app-header--middle", "data-testid": "app-header--middle" }, { children: _jsx("div", __assign({ className: "app-header--messages" + (messages.length === 0 ? " HIDE" : " red-text") }, { children: messageElements && messageElements.length > 0 &&
                            _jsx("ul", __assign({ className: "no-bullet", "data-testid": "no-bullet" }, { children: messageElements })) })) })), _jsx("div", __assign({ className: "app-header--right", "data-testid": "app-header--right" }, { children: _jsx("div", { className: "app-header--right-container", "data-testid": "app-header--right-container" }) }))] })) }));
};
export default AppHeader;
//# sourceMappingURL=AppHeader.js.map