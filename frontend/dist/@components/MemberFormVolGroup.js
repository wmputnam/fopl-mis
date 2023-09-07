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
export var MemberFormVolGroup = function (memberObj, setMemberObj, onRenderCallback) {
    var handleCheckboxClick = function (e) {
        console.log(" vol CheckboxClick: target: ".concat(e.target.id, ", value: ").concat(e.target.checked));
        switch (e.target.id) {
            case "volunteer-preference--book-sale":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookSale: e.target.value })); });
                break;
            case "volunteer-preference--book-store":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookStore: e.target.value })); });
                break;
            case "volunteer-preference--hospitality":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceHospitality: e.target.value })); });
                break;
            case "volunteer-preference--newsletter":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceNewsletter: e.target.value })); });
                break;
            case "volunteer-preference--publicity":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferencePublicity: e.target.value })); });
                break;
            case "volunteer-preference--schedule-volunteers":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceScheduleVolunteers: e.target.value })); });
                break;
            case "volunteer-preference--sort-books":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceSortBooks: e.target.value })); });
                break;
            case "volunteer-preference--fund-raising":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceFundRaising: e.target.value })); });
                break;
            case "volunteer-preference--lumacon":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceLumacon: e.target.value })); });
                break;
            case "volunteer-preference--mend-books":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceMendBooks: e.target.value })); });
                break;
            case "volunteer-preference--pick-up-donations":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferencePickUpDonations: e.target.value })); });
                break;
            case "volunteer-preference--price-books":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferencePriceBooks: e.target.value })); });
                break;
            case "volunteer-preference--set-up-for-sales":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceSetUpForSales: e.target.value })); });
                break;
            case "volunteer-preference--sales-signage":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceSalesSignage: e.target.value })); });
                break;
            case "volunteer-preference--stock-book-store":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceStockBookStore: e.target.value })); });
                break;
            case "volunteer-preference--other":
                setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceOther: e.target.value })); });
                break;
        }
    };
    var handleOtherVolFieldChange = function (e) {
        if (e.target.id === "volunteer-preference--other") {
            setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _volunteerPreferenceOther: e.target.value })); });
        }
    };
    if (memberObj) {
        var volGroup = (_jsx(_Fragment, { children: _jsx(Profiler, __assign({ id: "MemberVol", onRender: onRenderCallback }, { children: _jsx("div", __assign({ className: "member-form--volunteer-preferences", "data-testid": "member-form--volunteer-preferences" }, { children: _jsxs("fieldset", __assign({ className: "member-form--volunteer-preferences-fieldset", "data-testid": "member-form--volunteer-preferences-fieldset" }, { children: [_jsx("legend", { children: "\u00A0\u00A0Volunteer preferences\u00A0\u00A0" }), _jsxs("ul", __assign({ className: "member-form--volunteer-preferences-list", "data-testid": "member-form--volunteer-preferences-list" }, { children: [_jsx("li", { children: _jsxs("div", __assign({ className: "new-member--book-sale", "data-testid": "new-member--book-sale" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--book-sale" }, { children: "Staff book sale" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--book-sale", className: "form--book-sale", "data-testid": "form--book-sale", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--book-store", "data-testid": "new-member--book-store" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--book-store" }, { children: "Staff book store" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--book-store", className: "form--bookstore", "data-testid": "form--bookstore", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--hospitality", "data-testid": "new-member--hospitality" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--hospitality" }, { children: "Hospitality" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--hospitality", className: "form--hospitality", "data-testid": "form--hospitality", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--newsletter", "data-testid": "new-member--newsletter" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--newsletter" }, { children: "Newsletter" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--newsletter", className: "form--newsletter", "data-testid": "form--newsletter", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--publicity", "data-testid": "new-member--publicity" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--publicity" }, { children: "Publicity" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--publicity", className: "form--publicity", "data-testid": "form--publicity", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--schedule-volunteers", "data-testid": "new-member--schedule-volunteers" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--schedule-volunteers" }, { children: "Schedule volunteers" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--schedule-volunteers", className: "form--schedule-volunteers", "data-testid": "form--schedule-volunteers", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--sort-books", "data-testid": "new-member--sort-books" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--sort-books" }, { children: "Sort books" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--sort-books", className: "form--sort-books", "data-testid": "form--sort-books", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--fund-raising", "data-testid": "new-member--fund-raising" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--fund-raising" }, { children: "Fund raising" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--fund-raising", className: "form--fund-raising", "data-testid": "form--fund-raising", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--lumacon", "data-testid": "new-member--lumacon" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--lumacon" }, { children: "Staff LUMACON" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--lumacon", className: "form--lumacon", "data-testid": "form--lumacon", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--mend-books", "data-testid": "new-member--mend-books" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--mend-books" }, { children: "Mend books" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--mend-books", className: "form--mend-books", "data-testid": "form--mend-books", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--pick-up-donations", "data-testid": "new-member--pick-up-donations" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--pick-up-donations" }, { children: "Pick up donations" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--pick-up-donations", className: "form--pick-up-donations", "data-testid": "form--pick-up-donations", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--price-books", "data-testid": "new-member--price-books" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--price-books" }, { children: "Price books" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--price-books", className: "form--price-books", "data-testid": "form--price-books", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--set-up-for-sales", "data-testid": "new-member--set-up-for-sales" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--set-up-for-sales" }, { children: "Set up for sales" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--set-up-for-sales", className: "form--set-up-for-sales", "data-testid": "form--set-up-for-sales", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--sales-signage", "data-testid": "new-member--sales-signage" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--sales-signage" }, { children: "Sales signage" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--sales-signage", className: "form--sales-signage", "data-testid": "form--sales-signage", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--stock-book-store", "data-testid": "new-member--stock-book-store" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--stock-book-store" }, { children: "Stock book store" })), _jsx("input", { type: "checkbox", id: "volunteer-preference--stock-book-store", className: "form--stock-book-store", "data-testid": "form--stock-book-store", onClick: handleCheckboxClick, defaultChecked: false })] })) }), _jsx("li", { children: _jsxs("div", __assign({ className: "new-member--other", "data-testid": "new-member--other" }, { children: [_jsx("label", __assign({ htmlFor: "volunteer-preference--other", className: "form--other-label", "data-testid": "form--other-label" }, { children: "Other" })), _jsx("input", { type: "text", id: "volunteer-preference--other", className: "form--other", "data-testid": "form--other", onChange: handleOtherVolFieldChange, defaultChecked: false })] })) })] }))] })) })) })) }));
        console.log("vol group");
        return volGroup;
    }
    else {
        return _jsx(_Fragment, { children: _jsx("p", { children: "No member object provided" }) });
    }
};
//# sourceMappingURL=MemberFormVolGroup.js.map