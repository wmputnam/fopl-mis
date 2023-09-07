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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import useAxios from "axios-hooks";
import CancelBtn from "./CancelBtn";
import Save from "./DataUpdater";
import SaveBtn from "./SaveBtn";
import { isEmptyObject, onRenderCallback } from "../App";
import { getServerUrl } from "../services/AppConfig";
import { Member } from "../services/Member";
import { MemberViewStates } from "../@interfaces/enums";
import { MemberFormBaseGroup } from "./MemberFormBaseGroup";
import { MemberFormMmbGroup } from "./MemberFormMmbGroup";
import { MemberFormRemitGroup } from "./MemberFormRemitGroup";
import { MemberFormVolGroup } from "./MemberFormVolGroup";
import { MemberService } from "../services/MemberService";
var getFormProblems = function (_memberObj) {
    if (_memberObj) {
        console.log("prior to checking the error array is \n    ".concat(JSON.stringify(_memberObj.dataEntryErrors)));
        var isUpdateFormErrorsNeeded = false;
        var errArr = new Array();
        if ((_memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.firstName) === "") {
            var firstNameErrorMsg = "First name cannot be empty";
            errArr.push({ target: "first-name", message: "".concat(firstNameErrorMsg), level: "error" });
            isUpdateFormErrorsNeeded = true;
        }
        else if (_memberObj.existingFirstNameError()) {
            isUpdateFormErrorsNeeded = true;
        }
        if ((_memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.lastName) === "") {
            var lastNameErrorMsg = "Last name cannot be empty";
            errArr.push({ target: "last-name", message: "".concat(lastNameErrorMsg), level: "error" });
            isUpdateFormErrorsNeeded = true;
        }
        else if (_memberObj.existingLastNameError()) {
            isUpdateFormErrorsNeeded = true;
        }
        if (!_memberObj.remitDate && (_memberObj.remitDues !== "" || _memberObj.remitDonation !== "")) {
            var remitErrorMsg = "Remittance date must contain a value";
            errArr.push({ target: "money-date", message: "".concat(remitErrorMsg), level: "error" });
            isUpdateFormErrorsNeeded = true;
        }
        else if (_memberObj.existingRemitDateError()) {
            isUpdateFormErrorsNeeded = true;
        }
        if (_memberObj.remitDate && (_memberObj.remitDues === "" && _memberObj.remitDonation === "")) {
            var remitWarnMsg = "Please provide remittance value(s)";
            errArr.push({ target: "money-donation", message: "".concat(remitWarnMsg), level: "warn" });
            isUpdateFormErrorsNeeded = true;
        }
        else if (_memberObj.existingRemitAmountWarn()) {
            isUpdateFormErrorsNeeded = true;
        }
        console.log("error array is ".concat(isUpdateFormErrorsNeeded ? "updated" : "same", "\n    ").concat(JSON.stringify(errArr)));
        if (isUpdateFormErrorsNeeded) {
            return errArr;
        }
        else {
            return null;
        }
    }
    return null;
};
export var oldMemberStateToNew = function (oldObj, chgObj) {
    var newMemberObj = Member.create();
    var lupdt = new Date().valueOf();
    var someObj = __assign(__assign(__assign({}, oldObj), chgObj), { lastUpdated: new Date(lupdt) });
    for (var k in someObj) {
        if (Object.hasOwn(newMemberObj, k)) {
            newMemberObj[k] = someObj[k];
        }
    }
    return newMemberObj;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var replacerFunc = function () {
    var visited = new WeakSet();
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (visited.has(value)) {
                return;
            }
            visited.add(value);
        }
        return value;
    };
};
var MemberFormBase = function (_a) {
    var memberId = _a.memberId, mode = _a.mode, getAppState = _a.getAppState, setAppState = _a.setAppState;
    console.log("url: /members/".concat(memberId));
    var _b = useAxios({ baseURL: getServerUrl(), url: "/members/".concat(memberId) }, { manual: false, useCache: false })[0], data = _b.data, error = _b.error, loading = _b.loading;
    var haveData = isEmptyObject(data);
    var _c = React.useState({}), memberObj = _c[0], setMemberObj = _c[1];
    React.useEffect(function () {
        setMemberObj(MemberService.createMemberFromLoad(data, mode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [haveData]);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error! ", error.message] });
    var setFormErrors = function (newErrArr) {
        setMemberObj(function (oldObj) { return (oldMemberStateToNew(oldObj, { _dataEntryErrors: __spreadArray([], newErrArr, true) })); });
    };
    function handleFormSave(a) {
        console.log("Saving changes for ".concat(memberId === "" ? "NEW MEMBER" : memberId));
        var formErrors = getFormProblems(memberObj);
        if (formErrors) {
            console.log("current form errors preventing save: ".concat(memberObj.getFormErrorsForDisplay()));
            setFormErrors(formErrors);
        }
        else {
            //  memberObj object is not quite ready for commit -- postUnjournalledRemits makes final changes
            //  - putting entered remits into the remittances array
            //  - updating mmb, paidThrough, and joined as appropriate
            var readyMemberobj = MemberService.postUnjournalledRemits(memberObj);
            var memberObjToSave = readyMemberobj.toIMember();
            if (memberObjToSave) {
                Save(getServerUrl(), memberObjToSave, memberId)
                    .then(function (savRes) {
                    var _a, _b;
                    savRes && console.log("member-form--handlesave status -- ".concat(savRes.status, ", errors: ").concat((_a = savRes === null || savRes === void 0 ? void 0 : savRes.body) === null || _a === void 0 ? void 0 : _a.error));
                    if ([200, 201, 204].includes(savRes.status)) {
                        // clearFieldChangesWithSaves();
                        console.log("successful save");
                        setAppState(function (oldState) { return (__assign(__assign({}, oldState), { viewState: MemberViewStates.list })); });
                    }
                    else {
                        var errArr = new Array();
                        errArr.push({ target: "any", message: (_b = savRes === null || savRes === void 0 ? void 0 : savRes.body) === null || _b === void 0 ? void 0 : _b.error, level: "error" }); // TODO -- process this array
                        setFormErrors(errArr);
                    }
                }).catch(function (fault) {
                    throw new Error("fault occured in Save: ".concat(JSON.stringify(fault)));
                });
            }
            else {
                throw new Error("cannot save an undefined IMember to DB");
            }
        }
    }
    console.log("building JSX \n data fetch status ".concat(JSON.stringify(data)));
    if ((data) || mode === MemberViewStates.new) {
        var formBaseGroupComponent = MemberFormBaseGroup({
            onRenderCallback: onRenderCallback,
            memberObj: memberObj,
            setMemberObj: setMemberObj,
        });
        var formMoneyGroupComponent = MemberFormRemitGroup({
            onRenderCallback: onRenderCallback,
            memberObj: memberObj,
            setMemberObj: setMemberObj
        });
        var formMmbGroupComponent = MemberFormMmbGroup(memberObj, onRenderCallback);
        var formVolGroupComponent = MemberFormVolGroup(memberObj, setMemberObj, onRenderCallback);
        var pageComponents = (_jsx(_Fragment, { children: _jsxs("form", __assign({ className: "member-form", "data-testid": "member-form" }, { children: [formBaseGroupComponent, ([MemberViewStates.new, MemberViewStates.renew].includes(mode)) && formMoneyGroupComponent, mode === MemberViewStates.new && formVolGroupComponent, mode !== MemberViewStates.new && formMmbGroupComponent, _jsx("div", { children: _jsx("br", {}) }), _jsxs("div", __assign({ className: "member-form--controls", "data-testid": "member-form--controls" }, { children: [_jsx(SaveBtn, { updateCurrentMember: handleFormSave }), _jsx(CancelBtn, { getAppState: getAppState, setAppState: setAppState })] }))] })) }));
        // console.log(JSON.stringify(pageComponents, replacerFunc()));
        return pageComponents;
    }
    else {
        return _jsx("p", { children: "Error! Should never reach here" });
    }
};
export default MemberFormBase;
//# sourceMappingURL=MemberFormBase.js.map