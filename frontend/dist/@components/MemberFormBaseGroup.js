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
import { Profiler } from "react";
import { oldMemberStateToNew } from "./MemberFormBase";
export var MemberFormBaseGroup = function (_a) {
    var onRenderCallback = _a.onRenderCallback, memberObj = _a.memberObj, setMemberObj = _a.setMemberObj;
    function handleFirstNameChange(e) {
        if (memberObj && e.target.id === "first-name") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _firstName: e.target.value })); });
        }
    }
    function handleLastNameChange(e) {
        if (memberObj && e.target.id === "last-name") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _lastName: e.target.value })); });
        }
    }
    function handleAddressChange(e) {
        if (memberObj && e.target.id === "address") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _address: e.target.value })); });
        }
    }
    function handleUnitChange(e) {
        if (memberObj && e.target.id === "unit") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _unit: e.target.value })); });
        }
    }
    function handleCityChange(e) {
        if (memberObj && e.target.id === "city") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _city: e.target.value })); });
        }
    }
    function handleStateChange(e) {
        if (memberObj && e.target.id === "state") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _state: e.target.value })); });
        }
    }
    function handlePostalCodeChange(e) {
        if (memberObj && e.target.id === "postal-code") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _postalCode: e.target.value })); });
        }
    }
    function handlePhoneChange(e) {
        if (memberObj && e.target.id === "phone") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _phone: e.target.value })); });
        }
    }
    function handleEmailChange(e) {
        if (memberObj && e.target.id === "email") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _email: e.target.value })); });
        }
    }
    if (memberObj) {
        console.log("value of unit is \"".concat((memberObj && memberObj.unit) ? memberObj.unit : "", "\""));
        return (_jsx(_Fragment, { children: _jsxs(Profiler, __assign({ id: "memberFormBase", onRender: onRenderCallback }, { children: [_jsxs("div", __assign({ className: "member-form--name-group", "data-testid": "member-form--name-group" }, { children: [_jsx("label", __assign({ htmlFor: "first-name" }, { children: "First name" })), _jsx("input", { type: "text", id: "first-name", className: "new-member--first-name width-wide", "data-testid": "new-member--first-name width-wide", placeholder: "First name", required: true, value: memberObj.firstName, onChange: handleFirstNameChange, onInvalid: function (e) { return e.target.setCustomValidity('First name is required'); }, onInput: function (e) { return e.target.setCustomValidity(''); } }), _jsx("div", __assign({ className: "new-member--first-name-error red-text width-wide", "data-testid": "new-member--first-name-error red-text width-wide" }, { children: memberObj.getFirstNameError() })), _jsx("label", __assign({ htmlFor: "last-name" }, { children: "Last name" })), _jsx("input", { type: "text", id: "last-name", className: "new-member--last-name width-wide", "data-testid": "new-member--last-name width-wide", placeholder: "Last name", required: true, value: memberObj.lastName, onChange: handleLastNameChange, onInvalid: function (e) { return e.target.setCustomValidity('Last name is required'); }, onInput: function (e) { return e.target.setCustomValidity(''); } }), _jsx("div", __assign({ className: "new-member--last-name-error red-text width-wide", "data-testid": "new-member--last-name-error red-text width-wide" }, { children: memberObj.getLastNameError() }))] })), _jsxs("div", __assign({ className: "member-form--address-group", "data-testid": "member-form--address-group" }, { children: [_jsx("label", __assign({ htmlFor: "address" }, { children: "Address" })), _jsx("input", { type: "text", id: "address", className: "new-member--address width-wide", "data-testid": "new-member--address width-wide", placeholder: "Address", value: memberObj.address, onChange: handleAddressChange }), _jsx("label", __assign({ htmlFor: "unit" }, { children: "Unit" })), _jsx("input", { type: "text", id: "unit", className: "new-member--unit width-wide", "data-testid": "new-member--unit width-wide", placeholder: "Unit", value: memberObj.unit, onChange: handleUnitChange }), _jsx("br", {}), _jsx("label", __assign({ htmlFor: "city" }, { children: "City" })), _jsx("input", { type: "text", id: "city", className: "new-member--city width-wide", "data-testid": "new-member--city width-wide", placeholder: "City", value: memberObj.city, onChange: handleCityChange }), _jsx("label", __assign({ htmlFor: "state" }, { children: "State" })), _jsx("input", { type: "text", id: "state", className: "new-member--appState width-narrow", "data-testid": "new-member--appState width-narrow", placeholder: "State", value: memberObj.state, onChange: handleStateChange }), _jsx("label", __assign({ htmlFor: "postal-code" }, { children: "ZIP code" })), _jsx("input", { type: "text", id: "postal-code", className: "new-member--postal-code  width-medium", "data-testid": "new-member--postal-code  width-medium", placeholder: "ZIP code", value: memberObj.postalCode, onChange: handlePostalCodeChange })] })), _jsxs("div", __assign({ className: "member-form--contact-group", "data-testid": "member-form--contact-group" }, { children: [_jsx("label", __assign({ htmlFor: "phone" }, { children: "Phone" })), _jsx("input", { type: "telephone", id: "phone", className: "new-member--phone width-phone", "data-testid": "new-member--phone width-phone", placeholder: "Phone", value: memberObj.phone, onChange: handlePhoneChange }), _jsx("label", __assign({ htmlFor: "email" }, { children: "Email" })), _jsx("input", { type: "email", id: "email", className: "new-member--email width-phone", "data-testid": "new-member--email width-phone", placeholder: "Email", required: false, value: memberObj.email, onChange: handleEmailChange, onInvalid: function (e) { return e.target.setCustomValidity('Email is required'); }, onInput: function (e) { return e.target.setCustomValidity(''); } })] }))] })) }));
    }
    else {
        return _jsx(_Fragment, { children: _jsx("p", { children: "No member object provided" }) });
    }
};
//# sourceMappingURL=MemberFormBaseGroup.js.map