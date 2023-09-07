import { Member } from "./Member";
import { MemberViewStates } from "../@interfaces/enums";
var isPropDefined = function (imember, prop) { return (imember === null || imember === void 0 ? void 0 : imember[prop]) !== undefined; };
var MemberService = /** @class */ (function () {
    function MemberService() {
    }
    MemberService.createMemberFromLoad = function (loadedIMemberData, mode) {
        var _a, _b, _c, _d, _e, _f, _g;
        var newMember = Member.create();
        if (mode === MemberViewStates.new) {
            return newMember;
        }
        else {
            if (isPropDefined(loadedIMemberData, "_id"))
                newMember["_id"] = loadedIMemberData["_id"];
            if (isPropDefined(loadedIMemberData, "firstName"))
                newMember["firstName"] = loadedIMemberData["firstName"];
            if (isPropDefined(loadedIMemberData, "lastName"))
                newMember["lastName"] = loadedIMemberData["lastName"];
            if (isPropDefined(loadedIMemberData, "names")) {
                if (loadedIMemberData.names) {
                    if (newMember.names === undefined) {
                        newMember.names = Array();
                    }
                    for (var i = 0; i < loadedIMemberData.names.length; i++) {
                        newMember["names"][i] = loadedIMemberData.names[i];
                    }
                }
            }
            if (isPropDefined(loadedIMemberData, "email"))
                newMember["email"] = loadedIMemberData["email"];
            if (isPropDefined(loadedIMemberData, "phone"))
                newMember["phone"] = loadedIMemberData["phone"];
            if (isPropDefined(loadedIMemberData, "address"))
                newMember["address"] = loadedIMemberData["address"];
            if (isPropDefined(loadedIMemberData, "unit"))
                newMember["unit"] = loadedIMemberData["unit"];
            if (isPropDefined(loadedIMemberData, "city"))
                newMember["city"] = loadedIMemberData["city"];
            if (isPropDefined(loadedIMemberData, "state"))
                newMember["state"] = loadedIMemberData["state"];
            if (isPropDefined(loadedIMemberData, "postalCode"))
                newMember["postalCode"] = loadedIMemberData["postalCode"];
            if (isPropDefined(loadedIMemberData, "volunteerPreferences")) {
                for (var i = 0; i < ((loadedIMemberData === null || loadedIMemberData === void 0 ? void 0 : loadedIMemberData.volunteerPreferences) ? (_a = loadedIMemberData === null || loadedIMemberData === void 0 ? void 0 : loadedIMemberData.volunteerPreferences) === null || _a === void 0 ? void 0 : _a.length : 0); i++) {
                    if (newMember.volunteerPreferences === undefined) {
                        newMember.volunteerPreferences = Array();
                    }
                    var vObj = (_b = loadedIMemberData.volunteerPreferences) === null || _b === void 0 ? void 0 : _b[i];
                    if (vObj !== undefined) {
                        if (typeof vObj === 'string') {
                            var newVolObj = {
                                role: (_c = loadedIMemberData.volunteerPreferences) === null || _c === void 0 ? void 0 : _c[i],
                            };
                            newMember["volunteerPreferences"][i] = newVolObj;
                        }
                        else if (typeof vObj === 'object') {
                            newMember["volunteerPreferences"][i] = vObj;
                        }
                    }
                }
            }
            if (isPropDefined(loadedIMemberData, "mmb"))
                newMember["mmb"] = loadedIMemberData["mmb"];
            if (isPropDefined(loadedIMemberData, "joined"))
                newMember["joined"] = loadedIMemberData["joined"];
            if (isPropDefined(loadedIMemberData, "lastUpdated"))
                newMember["lastUpdated"] = loadedIMemberData["lastUpdated"];
            if (isPropDefined(loadedIMemberData, "remittances")) {
                if (newMember.remittances === undefined) {
                    newMember.remittances = Array();
                }
                for (var i = 0; i < (loadedIMemberData.remittances ? loadedIMemberData.remittances.length : 0); i++) {
                    if ((_d = loadedIMemberData.remittances) === null || _d === void 0 ? void 0 : _d[i]) {
                        newMember.remittances.push((_e = loadedIMemberData.remittances) === null || _e === void 0 ? void 0 : _e[i]);
                    }
                }
            }
            if (isPropDefined(loadedIMemberData, "notes")) {
                if (newMember.notes === undefined) {
                    newMember.notes = Array();
                }
                for (var i = 0; i < (loadedIMemberData.notes ? loadedIMemberData.notes.length : 0); i++) {
                    if ((_f = loadedIMemberData.notes) === null || _f === void 0 ? void 0 : _f[i]) {
                        newMember.notes.push((_g = loadedIMemberData.notes) === null || _g === void 0 ? void 0 : _g[i]);
                    }
                }
            }
            return newMember;
        }
    };
    MemberService.createMemberFromLocalStorage = function () {
        var newMember = Member.create();
        var isLoaded = localStorage.getItem("loaded") !== null;
        if (isLoaded) {
            newMember.id = localStorage.getItem("memberId") ? localStorage.getItem("memberId") : undefined;
            newMember.firstName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";
            newMember.lastName = localStorage.getItem("lastName") ? localStorage.getItem("lastName") : "";
            newMember.email = localStorage.getItem("email") ? localStorage.getItem("email") : "";
            newMember.phone = localStorage.getItem("phone") ? localStorage.getItem("phone") : "";
            newMember.address = localStorage.getItem("address") ? localStorage.getItem("address") : "";
            newMember.unit = localStorage.getItem("unit") ? localStorage.getItem("unit") : "";
            newMember.city = localStorage.getItem("city") ? localStorage.getItem("city") : "";
            newMember.state = localStorage.getItem("state") ? localStorage.getItem("state") : "";
            newMember.postalCode = localStorage.getItem("postalCode") ? localStorage.getItem("postalCode") : "";
            newMember.mmb = localStorage.getItem("mmb") ? localStorage.getItem("mmb") : "";
            newMember.joined = localStorage.getItem("joined") ? new Date(localStorage.getItem("joined")) : undefined;
            newMember.lastUpdated = localStorage.getItem("lastUpdated") ? new Date(localStorage.getItem("lastUpdated")) : undefined;
            var namesJSON = localStorage.getItem("names");
            if (namesJSON != null) {
                var namesObj = JSON.parse(namesJSON);
                newMember.names = namesObj;
            }
            var notesJSON = localStorage.getItem("notes");
            if (notesJSON != null) {
                var notesObj = JSON.parse(notesJSON);
                newMember.notes = notesObj;
            }
            var remitsJSON = localStorage.getItem("remittances");
            if (remitsJSON != null) {
                var remitsObj = JSON.parse(namesJSON);
                newMember.remittances = remitsObj;
            }
            var volsJSON = localStorage.getItem("volunteerPreferences");
            if (volsJSON != null) {
                var volsObj = JSON.parse(volsJSON);
                newMember.volunteerPreferences = volsObj;
            }
        }
        console.log("returning member ".concat(isLoaded ? "from local storage" : "new"));
        return newMember;
    };
    MemberService.getDuesRates = function () {
        return {
            LIFE_MEMBER_DUES: 100.00,
            PATRON_DUES: 25.00,
            FAMILY_DUES: 10.00,
            INDIVIDUAL_DUES: 5.00,
            SENIOR_STUDENT_DUES: 2.00,
        };
    };
    MemberService.getNewMmbBundle = function (_memberObj) {
        var mmb = "VOL";
        var joined = undefined;
        var duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
        var newPaidThroughDate = MemberService.getNewPaidThroughDate(_memberObj);
        if (duesEntry !== undefined
            && (duesEntry === null || duesEntry === void 0 ? void 0 : duesEntry.amount) !== undefined
            && (duesEntry === null || duesEntry === void 0 ? void 0 : duesEntry.date) !== undefined
            && newPaidThroughDate !== undefined) {
            if (!_memberObj.joined) {
                joined = duesEntry.date;
            }
            var _a = MemberService.getDuesRates(), LIFE_MEMBER_DUES = _a.LIFE_MEMBER_DUES, PATRON_DUES = _a.PATRON_DUES, FAMILY_DUES = _a.FAMILY_DUES, INDIVIDUAL_DUES = _a.INDIVIDUAL_DUES, SENIOR_STUDENT_DUES = _a.SENIOR_STUDENT_DUES;
            var duesAmount = parseFloat(duesEntry.amount);
            var yy = MemberService.getYyFromDate(newPaidThroughDate);
            if (yy !== undefined && !Number.isNaN(duesAmount)) {
                if (duesAmount >= LIFE_MEMBER_DUES) {
                    mmb = "LM";
                }
                else if (duesAmount < LIFE_MEMBER_DUES && duesAmount >= PATRON_DUES) {
                    mmb = "P" + yy;
                }
                else if (duesAmount >= FAMILY_DUES && duesAmount < PATRON_DUES) {
                    mmb = "F" + yy;
                }
                else if (duesAmount >= INDIVIDUAL_DUES && duesAmount < FAMILY_DUES) {
                    mmb = "" + yy;
                }
                else if (duesAmount >= SENIOR_STUDENT_DUES && duesAmount < INDIVIDUAL_DUES) {
                    mmb = "S" + yy;
                }
            }
            if (joined) {
                return { mmb: mmb, paidThroughDate: newPaidThroughDate, joined: joined };
            }
            else {
                return { mmb: mmb, paidThroughDate: newPaidThroughDate };
            }
        }
        return { mmb: mmb };
    };
    MemberService.postUnjournalledRemits = function (_memberObj) {
        var _a, _b;
        // add any entered remit information to the remittances array 
        var newMember = _memberObj.deepClone();
        if (newMember) {
            if (newMember.remitDate) {
                if (newMember.remitDues) {
                    (_a = newMember._remittances) === null || _a === void 0 ? void 0 : _a.push({ date: newMember.remitDate, amount: newMember.remitDues, memo: "dues" });
                    if (newMember.mmb !== "LM") {
                        var _c = MemberService.getNewMmbBundle(newMember), mmb = _c.mmb, paidThroughDate = _c.paidThroughDate, joined = _c.joined;
                        if (mmb) {
                            newMember.mmb = mmb;
                        }
                        if (paidThroughDate) {
                            newMember.paidThrough = paidThroughDate;
                        }
                        if (joined) {
                            newMember.joined = joined;
                        }
                    }
                }
                if (newMember.remitDonation) {
                    (_b = newMember._remittances) === null || _b === void 0 ? void 0 : _b.push({ date: newMember.remitDate, amount: newMember.remitDonation, memo: "donation" });
                }
            }
            return newMember;
        }
        return _memberObj;
    };
    MemberService.getNewMmb = function (_memberObj) {
        var duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
        var newPaidThroughDate = MemberService.getNewPaidThroughDate(_memberObj);
        if (duesEntry !== undefined
            && (duesEntry === null || duesEntry === void 0 ? void 0 : duesEntry.amount) !== undefined
            && (duesEntry === null || duesEntry === void 0 ? void 0 : duesEntry.date) !== undefined
            && newPaidThroughDate !== undefined) {
            var _a = MemberService.getDuesRates(), LIFE_MEMBER_DUES = _a.LIFE_MEMBER_DUES, PATRON_DUES = _a.PATRON_DUES, FAMILY_DUES = _a.FAMILY_DUES, INDIVIDUAL_DUES = _a.INDIVIDUAL_DUES, SENIOR_STUDENT_DUES = _a.SENIOR_STUDENT_DUES;
            var duesAmount = parseFloat(duesEntry.amount);
            var yy = MemberService.getYyFromDate(newPaidThroughDate);
            if (yy !== undefined && !Number.isNaN(duesAmount)) {
                if (duesAmount >= LIFE_MEMBER_DUES) {
                    return "LM";
                }
                else if (duesAmount < LIFE_MEMBER_DUES && duesAmount >= PATRON_DUES) {
                    return "P" + yy;
                }
                else if (duesAmount >= FAMILY_DUES && duesAmount < PATRON_DUES) {
                    return "F" + yy;
                }
                else if (duesAmount >= INDIVIDUAL_DUES && duesAmount < FAMILY_DUES) {
                    return "" + yy;
                }
                else if (duesAmount >= SENIOR_STUDENT_DUES && duesAmount < INDIVIDUAL_DUES) {
                    return "S" + yy;
                }
            }
            else {
                return undefined;
            }
        }
    };
    ;
    MemberService.hasSameNames = function (refArr, newArr) {
        if (refArr.length !== newArr.length) {
            return false;
        }
        else {
            for (var i = 0; i < refArr.length; i++) {
                if (refArr[i].firstName !== newArr[i].firstName || refArr[i].lastName !== newArr[i].lastName) {
                    return false;
                }
            }
        }
        return true;
    };
    MemberService.hasSameRemits = function (refArr, newArr) {
        if (refArr.length !== newArr.length) {
            return false;
        }
        else {
            for (var i = 0; i < refArr.length; i++) {
                if (refArr[i].date.valueOf() !== newArr[i].date.valueOf() || refArr[i].amount !== newArr[i].amount || refArr[i].memo !== newArr[i].memo) {
                    return false;
                }
            }
        }
        return true;
    };
    MemberService.hasSameVolPrefs = function (refArr, newArr) {
        if (refArr.length !== newArr.length) {
            return false;
        }
        else {
            for (var i = 0; i < refArr.length; i++) {
                if (refArr[i].role !== newArr[i].role) {
                    return false;
                }
            }
        }
        return true;
    };
    MemberService.hasSameNotes = function (refArr, newArr) {
        if (refArr.length !== newArr.length) {
            return false;
        }
        else {
            for (var i = 0; i < refArr.length; i++) {
                if (refArr[i].date.valueOf() !== newArr[i].date.valueOf() || refArr[i].note !== newArr[i].note) {
                    return false;
                }
            }
        }
        return true;
    };
    MemberService.getDatePlus1Year = function (initialDate) {
        if (initialDate) {
            var futureDate = new Date();
            futureDate.setFullYear(initialDate.getFullYear() + 1);
            return futureDate;
        }
        else {
            return undefined;
        }
    };
    MemberService.getYyFromDate = function (refDate) { return (refDate && refDate instanceof Date
        ? refDate.getFullYear().toString().substring(2, 4)
        : undefined); }; // get the year from the century-year
    MemberService.eliminateEmptyProperties = function (memberData) {
        var oData = {};
        for (var e in memberData) {
            if (memberData.hasOwnProperty(e) && memberData[e] !== undefined) {
                console.log("fe-member-service--elimEmptyProperties key: ".concat(e, " typeof: ").concat(typeof memberData[e], " value: ").concat(memberData[e]));
                if (typeof memberData[e] === 'string') {
                    if (memberData[e] !== "") {
                        oData[e] = memberData[e];
                    }
                }
                else if (memberData[e] instanceof Array) {
                    if (memberData[e].length > 0) {
                        oData[e] = Array();
                        for (var indx = 0; indx < memberData[e].length; indx++) {
                            oData[e].push(structuredClone(memberData[e][indx]));
                        }
                    }
                }
                else if (memberData[e] instanceof Date) {
                    oData[e] = new Date(memberData[e].valueOf());
                }
            }
        }
        return oData;
    };
    MemberService.findNewAndChanged = function (iMemberRef, iMemberNew, ikeys) {
        var _a, _b;
        if (ikeys === void 0) { ikeys = []; }
        if (iMemberRef) {
            var deltaIMember = {};
            var searchKeys = ikeys.length > 0 ? ikeys : Object.keys(iMemberRef);
            for (var e in iMemberRef) {
                console.log("fe-member-service--elimEmptyProperties key: ".concat(e, " typeof: ").concat(typeof iMemberRef[e], " value: ").concat(iMemberRef[e]));
                if (searchKeys.includes(e)) {
                    if (iMemberRef.hasOwnProperty(e) && iMemberNew.hasOwnProperty(e) &&
                        typeof iMemberRef[e] === typeof iMemberNew[e]) {
                        if (typeof iMemberRef[e] === "string" &&
                            iMemberRef[e] !== iMemberNew[e]) {
                            deltaIMember[e] = iMemberNew[e];
                        }
                        else if (typeof iMemberRef[e] === "object" &&
                            iMemberRef[e] instanceof Date &&
                            ((_a = iMemberRef[e]) === null || _a === void 0 ? void 0 : _a.valueOf()) !== ((_b = iMemberNew[e]) === null || _b === void 0 ? void 0 : _b.valueOf())) {
                            deltaIMember[e] = new Date(iMemberNew[e].valueOf());
                        }
                        else if (typeof iMemberRef[e] === "object") {
                            switch (e) {
                                case "names":
                                    if (!MemberService.hasSameNames(iMemberRef[e], iMemberNew[e])) {
                                        deltaIMember[e] = Array(iMemberNew[e]);
                                    }
                                    break;
                                case "remittances":
                                    if (!MemberService.hasSameRemits(iMemberRef[e], iMemberNew[e])) {
                                        deltaIMember[e] = Array(iMemberNew[e]);
                                    }
                                    break;
                                case "volunteerProferences":
                                    if (!MemberService.hasSameVolPrefs(iMemberRef[e], iMemberNew[e])) {
                                        deltaIMember[e] = Array(iMemberNew[e]);
                                    }
                                    break;
                                case "notes":
                                    if (!MemberService.hasSameNotes(iMemberRef[e], iMemberNew[e])) {
                                        deltaIMember[e] = Array(iMemberNew[e]);
                                    }
                                    break;
                            }
                        }
                    }
                    else {
                        if (typeof iMemberNew[e] === 'string') {
                            deltaIMember[e] = iMemberNew[e];
                        }
                        else if (typeof iMemberNew[e] === "object" &&
                            iMemberNew[e] instanceof Date) {
                            deltaIMember[e] = new Date(iMemberNew[e].valueOf());
                        }
                        else if (typeof iMemberNew[e] === "object") {
                            switch (e) {
                                case "names":
                                    deltaIMember[e] = Array(iMemberNew[e]);
                                    break;
                                case "remittances":
                                    deltaIMember[e] = Array(iMemberNew[e]);
                                    break;
                                case "volunteerProferences":
                                    deltaIMember[e] = Array(iMemberNew[e]);
                                    break;
                                case "notes":
                                    deltaIMember[e] = Array(iMemberNew[e]);
                                    break;
                            }
                        }
                    }
                }
            }
            return deltaIMember;
        }
        else {
            return iMemberNew;
        }
    };
    MemberService.hasProp = (function (obj, prop) { return obj.hasOwnProperty.call(obj, prop); });
    MemberService.isEmptyObject = function (obj) {
        for (var i in obj)
            return false;
        return true;
    };
    MemberService.isLifeMember = function (_memberInfo) {
        var LIFE_MEMBER_MMB = ["LM", "HLM"];
        if (_memberInfo) {
            if (_memberInfo instanceof Member) {
                var _mmb = (_memberInfo === null || _memberInfo === void 0 ? void 0 : _memberInfo.mmb) === undefined ? "" : _memberInfo.mmb;
                return LIFE_MEMBER_MMB.includes(_mmb);
            }
            else if (typeof _memberInfo === 'string') {
                return LIFE_MEMBER_MMB.includes(_memberInfo);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MemberService.isVolunteer = function (_memberInfo) {
        var VOLUNTEER_MMB = ["VOL"];
        if (_memberInfo) {
            if (_memberInfo instanceof Member) {
                var _mmb = (_memberInfo === null || _memberInfo === void 0 ? void 0 : _memberInfo.mmb) === undefined ? "" : _memberInfo.mmb;
                return VOLUNTEER_MMB.includes(_mmb);
            }
            else if (typeof _memberInfo === 'string') {
                return VOLUNTEER_MMB.includes(_memberInfo);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MemberService.isDroppedMember = function (_memberInfo) {
        var DROPPED_MEMBER_MMB = ["OUT"];
        if (_memberInfo) {
            if (_memberInfo instanceof Member) {
                var _mmb = (_memberInfo === null || _memberInfo === void 0 ? void 0 : _memberInfo.mmb) === undefined ? "" : _memberInfo.mmb;
                return DROPPED_MEMBER_MMB.includes(_mmb);
            }
            else if (typeof _memberInfo === 'string') {
                return DROPPED_MEMBER_MMB.includes(_memberInfo);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MemberService.getMostRecentDuesEntry = function (_memberObj) {
        if ((_memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.remittances) !== undefined && (_memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.remittances.length) !== undefined) {
            var duesEntries = _memberObj.remittances.filter(function (_a) {
                var date = _a.date, amount = _a.amount, memo = _a.memo;
                return memo === "dues";
            });
            var duesDateValues = duesEntries.map(function (e) { return e.date.valueOf(); });
            var maxDuesDateValue = Math.max.apply(Math, duesDateValues);
            var MILLI_SEC_PER_DAY = 8.67e+7;
            var maxCurrentDuesDate = new Date(maxDuesDateValue + MILLI_SEC_PER_DAY);
            var result = { date: maxCurrentDuesDate, amount: "0", memo: "" };
            for (var i = 0; i <= _memberObj.remittances.length; i++) {
                var _remit = _memberObj.remittances[i];
                if (_remit !== undefined && _remit.date !== undefined && _remit.memo !== undefined && _remit.memo === "dues" && _remit.amount !== undefined && parseFloat(_remit.amount) >= 0.0) {
                    var _remitDate = new Date(_remit.date);
                    if (_remitDate < result.date) {
                        result.date = _remitDate;
                        result.amount = _remit.amount;
                        result.memo = _remit.memo;
                    }
                }
            }
            if (result.memo === "dues") {
                return result;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    };
    MemberService.getUspsValidAddress = function (_memberObj) {
        // TODO call USPS validation here 
        if (_memberObj) {
            var iAddress = Object.create({});
            if (_memberObj.address) {
                iAddress["address"] = _memberObj.address;
            }
            if (_memberObj.unit) {
                iAddress["unit"] = _memberObj.unit;
            }
            if (_memberObj.city) {
                iAddress["city"] = _memberObj.city;
            }
            if (_memberObj.state) {
                iAddress["state"] = _memberObj.state;
            }
            if (_memberObj.postalCode) {
                iAddress["postalCode"] = _memberObj.postalCode;
            }
            return iAddress;
        }
        else {
            return undefined;
        }
    };
    MemberService.areAddressesSame = function (_memberObj, validatedAddress) {
        var _a, _b, _c, _d, _e;
        var address = _memberObj.address, unit = _memberObj.unit, city = _memberObj.city, state = _memberObj.state, postalCode = _memberObj.postalCode;
        return (((_a = validatedAddress === null || validatedAddress === void 0 ? void 0 : validatedAddress.address) === null || _a === void 0 ? void 0 : _a.valueOf()) === (address === null || address === void 0 ? void 0 : address.valueOf())) &&
            (((_b = validatedAddress === null || validatedAddress === void 0 ? void 0 : validatedAddress.unit) === null || _b === void 0 ? void 0 : _b.valueOf()) === (unit === null || unit === void 0 ? void 0 : unit.valueOf())) &&
            (((_c = validatedAddress === null || validatedAddress === void 0 ? void 0 : validatedAddress.city) === null || _c === void 0 ? void 0 : _c.valueOf()) === (city === null || city === void 0 ? void 0 : city.valueOf())) &&
            (((_d = validatedAddress === null || validatedAddress === void 0 ? void 0 : validatedAddress.state) === null || _d === void 0 ? void 0 : _d.valueOf()) === (state === null || state === void 0 ? void 0 : state.valueOf())) &&
            (((_e = validatedAddress === null || validatedAddress === void 0 ? void 0 : validatedAddress.postalCode) === null || _e === void 0 ? void 0 : _e.valueOf()) === (postalCode === null || postalCode === void 0 ? void 0 : postalCode.valueOf()));
    };
    MemberService.pushUniqToVolunteerPrefs = function (_memberObj, volunteerRole) {
        var _a, _b;
        if (!((_a = _memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.volunteerPreferences) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
            var role = _a.role;
            return role;
        }).includes(volunteerRole))) {
            (_b = _memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.volunteerPreferences) === null || _b === void 0 ? void 0 : _b.push({ role: volunteerRole });
        }
    };
    MemberService.getNewRemittances = function (remitDate, remitDues, remitDonation) {
        var result = Array();
        var _remitDues = undefined;
        var _remitDonation = undefined;
        if (remitDate !== undefined) {
            if (remitDues !== undefined) {
                _remitDues = { date: new Date(remitDate), amount: "".concat(remitDues), memo: "dues" };
                result.push(_remitDues);
            }
            if (remitDonation !== undefined) {
                _remitDonation = { date: new Date(remitDate), amount: "".concat(remitDonation), memo: "donation" };
                result.push(_remitDonation);
            }
        }
        return result;
    };
    MemberService.getNewPaidThroughDate = function (_memberObj) {
        var duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
        if (duesEntry !== undefined) {
            var duesPdThru = duesEntry
                ? MemberService.getDatePlus1Year(duesEntry.date)
                : undefined;
            var priorPdThru = _memberObj._hasPaidThroughDate()
                ? MemberService.getDatePlus1Year(_memberObj.paidThrough)
                : undefined;
            var newPaidThroughDate = new Date(Math.max(duesPdThru !== undefined ? duesPdThru.valueOf() : 0, priorPdThru !== undefined ? priorPdThru.valueOf() : 0));
            if (newPaidThroughDate.valueOf() === (new Date(0)).valueOf()) {
                return undefined;
            }
            else {
                return newPaidThroughDate;
            }
        }
        else {
            return undefined;
        }
    };
    MemberService.getNewJoinedRenewDate = function (_memberObj) {
        var duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
        return duesEntry ? duesEntry.date : undefined;
    };
    MemberService.addNote = function (_memberObj, note) {
        var _a;
        (_a = _memberObj === null || _memberObj === void 0 ? void 0 : _memberObj.notes) === null || _a === void 0 ? void 0 : _a.push({
            date: new Date(),
            note: note
        });
    };
    MemberService.newMemberObjWithFormInput = function (_memberObj, inTarget, inValue) {
        if (_memberObj) {
            var resMemberObj = _memberObj.deepClone();
            if (resMemberObj) {
                switch (inTarget) {
                    case "first-name":
                        resMemberObj.firstName = inValue;
                        break;
                    case "last-name":
                        resMemberObj.lastName = inValue;
                        break;
                    case "names":
                        // TODO
                        break;
                    case "email":
                        resMemberObj.email = inValue;
                        break;
                    case "phone":
                        var p = MemberService.getFormattedPhoneNumber(inValue);
                        resMemberObj.phone = p;
                        break;
                    case "address":
                        resMemberObj.address = inValue;
                        break;
                    case "unit":
                        resMemberObj.unit = inValue;
                        break;
                    case "city":
                        resMemberObj.city = inValue;
                        break;
                    case "state":
                        resMemberObj.state = inValue;
                        break;
                    case "postal-code":
                        resMemberObj.postalCode = inValue;
                        break;
                    case "mmb":
                        resMemberObj.mmb = inValue;
                        break;
                    case "paid-through":
                        resMemberObj.paidThrough = new Date(inValue);
                        break;
                    case "joined":
                        resMemberObj.joined = new Date(inValue);
                        break;
                    case "volunteer-preference--book-sale":
                        var BOOK_SALE = "Book sale";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, BOOK_SALE);
                        break;
                    case "volunteer-preference--book-store":
                        var BOOK_STORE = "Book store";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, BOOK_STORE);
                        break;
                    case "volunteer-preference--hospitality":
                        var HOSPITALITY = "Hospitality";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, HOSPITALITY);
                        break;
                    case "volunteer-preference--newsletter":
                        var NEWSLETTER = "Newsletter";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, NEWSLETTER);
                        break;
                    case "volunteer-preference--publicity":
                        var PUBLICITY = "Publicity";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, PUBLICITY);
                        break;
                    case "volunteer-preference--schedule-volunteers":
                        var SCHED_VOLUNTEERS = "Schedule volunteers";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, SCHED_VOLUNTEERS);
                        break;
                    case "volunteer-preference--sort-books":
                        var SORT_BOOKS = "Sort books";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, SORT_BOOKS);
                        break;
                    case "volunteer-preference--fund-raising":
                        var FUNDRAISING = "Fund raising";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, FUNDRAISING);
                        break;
                    case "volunteer-preference--lumacon":
                        var LUMACON = "LUMACON";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, LUMACON);
                        break;
                    case "volunteer-preference--mend-books":
                        var MEND_BOOKS = "Mend books";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, MEND_BOOKS);
                        break;
                    case "volunteer-preference--pick-up-donations":
                        var PICKUP_DONATIONS = "Pick up donations";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, PICKUP_DONATIONS);
                        break;
                    case "volunteer-preference--price-books":
                        var PRICE_BOOKS = "Price books";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, PRICE_BOOKS);
                        break;
                    case "volunteer-preference--set-up-for-sales":
                        var SETUP_SALES = "Set up for sales";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, SETUP_SALES);
                        break;
                    case "volunteer-preference--sales-signage":
                        var SALES_SIGNAGE = "Sales signage";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, SALES_SIGNAGE);
                        break;
                    case "volunteer-preference--stock-book-store":
                        var STOCK_STORE = "Stock store";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, STOCK_STORE);
                        break;
                    case "volunteer-preference--other":
                        var OTHER = "Other: ";
                        MemberService.pushUniqToVolunteerPrefs(resMemberObj, OTHER + inValue);
                        break;
                }
                resMemberObj.lastUpdated = new Date();
            }
            return resMemberObj;
        }
        return undefined;
    };
    MemberService.PHONE_RE = /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/;
    MemberService.getFormattedPhoneNumber = function (input) {
        return input.replace(MemberService.PHONE_RE, function (substring, g1, g2, g3) {
            var output = "(";
            if (g1.length) {
                output += g1;
                if (g1.length === 3) {
                    output += ")";
                    if (g2.length) {
                        output += " " + g2;
                        if (g2.length === 3) {
                            output += " - ";
                            if (g3.length) {
                                output += g3;
                            }
                        }
                    }
                }
            }
            return output;
        });
    };
    MemberService.persistMemberDataToLocalStorage = function (rawData, force) {
        if (force === void 0) { force = false; }
        console.log("persist to local storage?");
        var ignore = localStorage.getItem("loaded");
        if (!ignore || force) {
            // 1. does rawData have anything to process?
            if (rawData && rawData.length && rawData.length === 3 && rawData[0]['data']) {
                // 2. does rawData contain single member data (IMember)  vs list of members
                if (typeof rawData[0]['data'] === 'object') {
                    if (rawData[0]['data'] instanceof Array) {
                        console.log("data load returned array (likely list of member)");
                    }
                    else if (rawData[0]['data']['_id'] && rawData[0]['data']['firstName'] && rawData[0]['data']['lastName']) {
                        console.log("loaded data looks like an IMember -- persisting values to local storage");
                        localStorage.setItem("memberId", rawData[0]['data']['_id']);
                        localStorage.setItem("firstName", rawData[0]['data']['firstName']);
                        localStorage.setItem("lastName", rawData[0]['data']['lastName']);
                        if (rawData[0]['data']['names'] && rawData[0]['data']['names'].length) {
                            localStorage.setItem("names", JSON.stringify(rawData[0]['data']['names']));
                        }
                        if (rawData[0]['data']["email"]) {
                            localStorage.setItem("email", rawData[0]['data']["email"]);
                        }
                        if (rawData[0]['data']["phone"]) {
                            localStorage.setItem("phone", rawData[0]['data']["phone"]);
                        }
                        if (rawData[0]['data']["address"]) {
                            localStorage.setItem("address", rawData[0]['data']["address"]);
                        }
                        if (rawData[0]['data']["unit"]) {
                            localStorage.setItem("unit", rawData[0]['data']["unit"]);
                        }
                        if (rawData[0]['data']["city"]) {
                            localStorage.setItem("city", rawData[0]['data']["city"]);
                        }
                        if (rawData[0]['data']["state"]) {
                            localStorage.setItem("state", rawData[0]['data']["state"]);
                        }
                        if (rawData[0]['data']["postalCode"]) {
                            localStorage.setItem("postalCode", rawData[0]['data']["postalCode"]);
                        }
                        if (rawData[0]['data']["mmb"]) {
                            localStorage.setItem("mmb", rawData[0]['data']["mmb"]);
                        }
                        if (rawData[0]['data']["joined"]) {
                            localStorage.setItem("joined", rawData[0]['data']["joined"]);
                        }
                        if (rawData[0]['data']["lastUpdated"]) {
                            localStorage.setItem("lastUpdated", rawData[0]['data']["lastUpdated"]);
                        }
                        if (rawData[0]['data']["volunteerPreferences"] && rawData[0]['data']["volunteerPreferences"].length) {
                            localStorage.setItem("volunteerPreferences", JSON.stringify(rawData[0]['data']['volunteerPreferences']));
                        }
                        if (rawData[0]['data']["remittances"] && rawData[0]['data']["remittances"].length) {
                            localStorage.setItem("remittances", JSON.stringify(rawData[0]['data']['remittances']));
                        }
                        if (rawData[0]['data']["notes"] && rawData[0]['data']["notes"].length) {
                            localStorage.setItem("notes", JSON.stringify(rawData[0]['data']['notes']));
                        }
                        localStorage.setItem("loaded", "true");
                    }
                }
                else {
                    console.log("loaded data is not recognized - expected IMember -- nothing persisted");
                }
            }
        }
        else {
            console.log("ignoring call to persist and overwrite local storage");
        }
    };
    MemberService.persistMemberObjToLocalStorage = function (memberObj) {
        var _a;
        if (memberObj) {
            memberObj.id && localStorage.setItem("memberId", memberObj.id);
            memberObj.firstName && localStorage.setItem("firstName", memberObj.firstName);
            memberObj.lastName && localStorage.setItem("lastName", memberObj.lastName);
            memberObj.email && localStorage.setItem("email", memberObj.email);
            memberObj.phone && localStorage.setItem("phone", memberObj.phone);
            memberObj.address && localStorage.setItem("address", memberObj.address);
            memberObj.unit && localStorage.setItem("unit", memberObj.unit);
            memberObj.city && localStorage.setItem("city", memberObj.city);
            memberObj.state && localStorage.setItem("state", memberObj.state);
            memberObj.postalCode && localStorage.setItem("postalCode", memberObj.postalCode);
            memberObj.mmb && localStorage.setItem("mmb", memberObj.mmb);
            memberObj.joined && localStorage.setItem("joined", (_a = memberObj === null || memberObj === void 0 ? void 0 : memberObj.joined) === null || _a === void 0 ? void 0 : _a.toISOString());
            memberObj.lastUpdated && localStorage.setItem("lastUpdated", memberObj.lastUpdated.toISOString());
            memberObj.names && localStorage.setItem("names", JSON.stringify(memberObj.names));
            memberObj.volunteerPreferences && localStorage.setItem("volunteerPreferences", JSON.stringify(memberObj.volunteerPreferences));
            memberObj.remittances && localStorage.setItem("remittances", JSON.stringify(memberObj.remittances));
            memberObj.notes && localStorage.setItem("notes", JSON.stringify(memberObj.notes));
            localStorage.setItem("loaded", "true");
        }
    };
    MemberService.retrieveMemberId = function (failOnEmpty) {
        if (failOnEmpty === void 0) { failOnEmpty = false; }
        var lsMemberId = localStorage.getItem("memberId") !== null ? localStorage.getItem("memberId") : undefined;
        if (lsMemberId) {
            return lsMemberId;
        }
        else if (failOnEmpty) {
            throw Error("expected member id to be available");
        }
        else {
            return "";
        }
    };
    MemberService.saveMemberId = function (value) {
        if (window !== undefined) {
            localStorage.setItem("memberId", value);
        }
    };
    MemberService.clearMemberId = function (failOnEmpty) {
        if (failOnEmpty === void 0) { failOnEmpty = false; }
        if (window !== undefined) {
            localStorage.removeItem("memberId");
        }
    };
    return MemberService;
}());
export { MemberService };
//# sourceMappingURL=MemberService.js.map