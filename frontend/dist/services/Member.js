var Member = /** @class */ (function () {
    function Member(params) {
        if (params === void 0) { params = {}; }
        this._id = undefined;
        this._firstName = "";
        this._lastName = "";
        this._names = [];
        this._email = undefined;
        this._phone = undefined;
        this._address = undefined;
        this._unit = undefined;
        this._city = undefined;
        this._state = undefined;
        this._postalCode = undefined;
        this._volunteerPreferences = [];
        this._mmb = undefined;
        this._paidThrough = undefined;
        this._joined = undefined;
        this._lastUpdated = undefined;
        this._remittances = [];
        this._remitDate = undefined;
        this._remitDues = undefined;
        this._remitDonation = undefined;
        this._remitError = undefined;
        this._remitWarn = undefined;
        this._notes = [];
        // volunteer-preference--book-sale
        this._volunteerPreferenceBookSale = undefined;
        // volunteer-preference--book-store
        this._volunteerPreferenceBookStore = undefined;
        // volunteer-preference--hospitality
        this._volunteerPreferenceHospitality = undefined;
        // volunteer-preference--newsletter
        this._volunteerPreferenceNewsletter = undefined;
        // volunteer-preference--publicity
        this._volunteerPreferencePublicity = undefined;
        // volunteer-preference--schedule-volunteers
        this._volunteerPreferenceScheduleVolunteers = undefined;
        // volunteer-preference--sort-books
        this._volunteerPreferenceSortBooks = undefined;
        // volunteer-preference--fund-raising
        this._volunteerPreferenceFundRaising = undefined;
        // volunteer-preference--lumacon
        this._volunteerPreferenceLumacon = undefined;
        // volunteer-preference--mend-books
        this._volunteerPreferenceMendBooks = undefined;
        // volunteer-preference--pick-up-donations
        this._volunteerPreferencePickUpDonations = undefined;
        // volunteer-preference--price-books
        this._volunteerPreferencePriceBooks = undefined;
        // volunteer-preference--set-up-for-sales
        this._volunteerPreferenceSetUpForSales = undefined;
        // volunteer-preference--sales-signage
        this._volunteerPreferenceSalesSignage = undefined;
        // volunteer-preference--stock-book-store
        this._volunteerPreferenceStockBookStore = undefined;
        // volunteer-preference--other
        this._volunteerPreferenceOther = undefined;
        /*
        target: string,
        message: string,
        level: "error" | "warn" | "info"
        */
        this._dataEntryErrors = [];
        var _a = params.memberId, memberId = _a === void 0 ? undefined : _a;
        this._id = memberId;
    }
    Object.defineProperty(Member.prototype, "id", {
        get: function () {
            return this._id ? this._id : "";
        },
        set: function (value) {
            if (value && value !== "") {
                if (this._id && this._id !== "") {
                    console.log("setting _id to ".concat(value, " when has _id ").concat(this._id, " is not allowed"));
                    return;
                }
                this._id = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "firstName", {
        get: function () {
            return this._firstName ? this._firstName : "";
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "lastName", {
        get: function () {
            return this._lastName ? this._lastName : "";
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "names", {
        get: function () {
            return this._names;
        },
        set: function (value) {
            if (value !== undefined) {
                if (this._names === undefined) {
                    this._names = Array();
                }
                for (var i = 0; i < value.length; i++)
                    this._names.push(value[i]);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "email", {
        get: function () {
            return this._email ? this._email : "";
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "phone", {
        get: function () {
            return this._phone ? this._phone : "";
        },
        set: function (value) {
            this._phone = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "address", {
        get: function () {
            return this._address ? this._address : "";
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "unit", {
        get: function () {
            return this._unit ? this._unit : "";
        },
        set: function (value) {
            this._unit = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "city", {
        get: function () {
            return this._city ? this._city : "";
        },
        set: function (value) {
            this._city = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "state", {
        get: function () {
            return this._state ? this._state : "";
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "postalCode", {
        get: function () {
            return this._postalCode ? this._postalCode : "";
        },
        set: function (value) {
            this._postalCode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferences", {
        get: function () {
            // consolidate flattened prefs into the desired array
            var newVolArr = Array();
            // volunteer-preference--book-sale
            if (this._volunteerPreferenceBookSale) {
                newVolArr.push({ role: "Book sale" });
            }
            // volunteer-preference--book-store
            if (this._volunteerPreferenceBookStore) {
                newVolArr.push({ role: "Book store" });
            }
            // volunteer-preference--hospitality
            if (this._volunteerPreferenceHospitality) {
                newVolArr.push({ role: "Hospitality" });
            }
            // volunteer-preference--newsletter
            if (this._volunteerPreferenceNewsletter) {
                newVolArr.push({ role: "Newsletter" });
            }
            // volunteer-preference--publicity
            if (this._volunteerPreferencePublicity) {
                newVolArr.push({ role: "Publicity" });
            }
            // volunteer-preference--schedule-volunteers
            if (this._volunteerPreferenceScheduleVolunteers) {
                newVolArr.push({ role: "Schedule volunteers" });
            }
            // volunteer-preference--sort-books
            if (this._volunteerPreferenceSortBooks) {
                newVolArr.push({ role: "Sort books" });
            }
            // volunteer-preference--fund-raising
            if (this._volunteerPreferenceFundRaising) {
                newVolArr.push({ role: "Fund raising" });
            }
            // volunteer-preference--lumacon
            if (this._volunteerPreferenceLumacon) {
                newVolArr.push({ role: "LUMACON" });
            }
            // volunteer-preference--mend-books
            if (this._volunteerPreferenceMendBooks) {
                newVolArr.push({ role: "Mend books" });
            }
            // volunteer-preference--pick-up-donations
            if (this._volunteerPreferencePickUpDonations) {
                newVolArr.push({ role: "Pick up donations" });
            }
            // volunteer-preference--price-books
            if (this._volunteerPreferencePriceBooks) {
                newVolArr.push({ role: "Pricing" });
            }
            // volunteer-preference--set-up-for-sales
            if (this._volunteerPreferenceSetUpForSales) {
                newVolArr.push({ role: "Set up" });
            }
            // volunteer-preference--sales-signage
            if (this._volunteerPreferenceSalesSignage) {
                newVolArr.push({ role: "Signage" });
            }
            // volunteer-preference--stock-book-store
            if (this._volunteerPreferenceStockBookStore) {
                newVolArr.push({ role: "Stock bookstore" });
            }
            // volunteer-preference--other
            if (this._volunteerPreferenceOther) {
                newVolArr.push({ role: this._volunteerPreferenceOther });
            }
            this._volunteerPreferences = newVolArr;
            return this._volunteerPreferences;
        },
        set: function (value) {
            if (value !== undefined) {
                if (this._volunteerPreferences === undefined) {
                    this._volunteerPreferences = Array();
                }
                for (var i = 0; i < value.length; i++) {
                    this._volunteerPreferences.push(value[i]);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "mmb", {
        get: function () {
            return this._mmb ? this._mmb : "";
        },
        set: function (value) {
            this._mmb = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "paidThrough", {
        get: function () {
            return this._paidThrough ? this._paidThrough : undefined;
        },
        set: function (value) {
            this._paidThrough = value;
        },
        enumerable: false,
        configurable: true
    });
    Member.prototype._hasPaidThroughDate = function () {
        var _a;
        return this._paidThrough !== undefined && ((_a = this.paidThrough) === null || _a === void 0 ? void 0 : _a.getDate) !== undefined;
    };
    Object.defineProperty(Member.prototype, "joined", {
        get: function () {
            return this._joined ? this._joined : undefined;
        },
        set: function (value) {
            this._joined = value;
        },
        enumerable: false,
        configurable: true
    });
    Member.prototype._hasJoinedDate = function () {
        var _a;
        return this._joined !== undefined && ((_a = this._joined) === null || _a === void 0 ? void 0 : _a.getDate) !== undefined;
    };
    Object.defineProperty(Member.prototype, "lastUpdated", {
        get: function () {
            return this._lastUpdated ? this._lastUpdated : undefined;
        },
        set: function (value) {
            this._lastUpdated = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remittances", {
        get: function () {
            return this._remittances;
        },
        set: function (value) {
            if (value !== undefined) {
                if (this._remittances === undefined) {
                    this._remittances = Array();
                }
                for (var i = 0; i < value.length; i++) {
                    this._remittances.push(value[i]);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remitDate", {
        get: function () {
            return this._remitDate ? this._remitDate : undefined;
        },
        set: function (value) {
            this._remitDate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remitDues", {
        get: function () {
            return this._remitDues ? this._remitDues : "";
        },
        set: function (value) {
            this._remitDues = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remitDonation", {
        get: function () {
            return this._remitDonation ? this._remitDonation : "";
        },
        set: function (value) {
            this._remitDonation = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remitError", {
        get: function () {
            return this._remitError ? this._remitError : "";
        },
        set: function (value) {
            this._remitError = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "remitWarn", {
        get: function () {
            return this._remitWarn ? this._remitWarn : "";
        },
        set: function (value) {
            this._remitWarn = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "notes", {
        get: function () {
            return this._notes;
        },
        set: function (value) {
            if (value !== undefined) {
                if (this._notes === undefined) {
                    this._notes = Array();
                }
                for (var i = 0; i < value.length; i++) {
                    this._notes.push(value[i]);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceBookSale", {
        get: function () {
            return this._volunteerPreferenceBookSale ? this._volunteerPreferenceBookSale : false;
        },
        set: function (value) {
            this._volunteerPreferenceBookSale = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceBookStore", {
        get: function () {
            return this._volunteerPreferenceBookStore ? this._volunteerPreferenceBookStore : false;
        },
        set: function (value) {
            this._volunteerPreferenceBookStore = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceHospitality", {
        get: function () {
            return this._volunteerPreferenceHospitality ? this._volunteerPreferenceHospitality : false;
        },
        set: function (value) {
            this._volunteerPreferenceHospitality = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceNewsletter", {
        get: function () {
            return this._volunteerPreferenceNewsletter ? this._volunteerPreferenceNewsletter : false;
        },
        set: function (value) {
            this._volunteerPreferenceNewsletter = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferencePublicity", {
        get: function () {
            return this._volunteerPreferencePublicity ? this._volunteerPreferencePublicity : false;
        },
        set: function (value) {
            this._volunteerPreferencePublicity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceScheduleVolunteers", {
        get: function () {
            return this._volunteerPreferenceScheduleVolunteers ? this._volunteerPreferenceScheduleVolunteers : false;
        },
        set: function (value) {
            this._volunteerPreferenceScheduleVolunteers = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceSortBooks", {
        get: function () {
            return this._volunteerPreferenceSortBooks ? this._volunteerPreferenceSortBooks : false;
        },
        set: function (value) {
            this._volunteerPreferenceSortBooks = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceFundRaising", {
        get: function () {
            return this._volunteerPreferenceFundRaising ? this._volunteerPreferenceFundRaising : false;
        },
        set: function (value) {
            this._volunteerPreferenceFundRaising = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceLumacon", {
        get: function () {
            return this._volunteerPreferenceLumacon ? this._volunteerPreferenceLumacon : false;
        },
        set: function (value) {
            this._volunteerPreferenceLumacon = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceMendBooks", {
        get: function () {
            return this._volunteerPreferenceMendBooks ? this._volunteerPreferenceMendBooks : false;
        },
        set: function (value) {
            this._volunteerPreferenceMendBooks = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferencePickUpDonations", {
        get: function () {
            return this._volunteerPreferencePickUpDonations ? this._volunteerPreferencePickUpDonations : false;
        },
        set: function (value) {
            this._volunteerPreferencePickUpDonations = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferencePriceBooks", {
        get: function () {
            return this._volunteerPreferencePriceBooks ? this._volunteerPreferencePriceBooks : false;
        },
        set: function (value) {
            this._volunteerPreferencePriceBooks = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceSetUpForSales", {
        get: function () {
            return this._volunteerPreferenceSetUpForSales ? this._volunteerPreferenceSetUpForSales : false;
        },
        set: function (value) {
            this._volunteerPreferenceSetUpForSales = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceSalesSignage", {
        get: function () {
            return this._volunteerPreferenceSalesSignage ? this._volunteerPreferenceSalesSignage : false;
        },
        set: function (value) {
            this._volunteerPreferenceSalesSignage = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceStockBookStore", {
        get: function () {
            return this._volunteerPreferenceStockBookStore ? this._volunteerPreferenceStockBookStore : false;
        },
        set: function (value) {
            this._volunteerPreferenceStockBookStore = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "volunteerPreferenceOther", {
        get: function () {
            return this._volunteerPreferenceOther ? this._volunteerPreferenceOther : "";
        },
        set: function (value) {
            this._volunteerPreferenceOther = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "dataEntryErrors", {
        get: function () {
            var newArr = Array();
            for (var i = 0; i < this._dataEntryErrors.length; i++) {
                newArr[i] = structuredClone(this._dataEntryErrors[i]);
            }
            return newArr;
        },
        set: function (value) {
            this.dataEntryErrors = value;
        },
        enumerable: false,
        configurable: true
    });
    Member.prototype.findError = function (targetField) {
        var existingErr = this._dataEntryErrors.find(function (e) { return e.target === targetField; });
        if (existingErr) {
            return existingErr; // { target: targetField, message: "no one here but us chickens", level: "info" };
        }
    };
    Member.prototype.isThereAnyErrorOn = function (targetField) {
        var existingErrIndx = this._dataEntryErrors.findIndex(function (e) { return e.target === targetField; });
        return existingErrIndx !== -1;
    };
    Member.prototype.existingFirstNameError = function () {
        return this.isThereAnyErrorOn("first-name");
    };
    Member.prototype.getFirstNameError = function () {
        var _a;
        return (_a = this.findError("first-name")) === null || _a === void 0 ? void 0 : _a.message;
    };
    Member.prototype.existingLastNameError = function () {
        return this.isThereAnyErrorOn("last-name");
    };
    Member.prototype.getLastNameError = function () {
        var _a;
        return (_a = this.findError("last-name")) === null || _a === void 0 ? void 0 : _a.message;
    };
    Member.prototype.existingRemitDateError = function () {
        return this.isThereAnyErrorOn("money-date");
    };
    Member.prototype.getRemitDateError = function () {
        var _a;
        return (_a = this.findError("money-date")) === null || _a === void 0 ? void 0 : _a.message;
    };
    Member.prototype.existingRemitAmountWarn = function () {
        return this.isThereAnyErrorOn("money-donation");
    };
    Member.prototype.getRemitAmountWarn = function () {
        var _a;
        return (_a = this.findError("money-donation")) === null || _a === void 0 ? void 0 : _a.message;
    };
    Member.prototype.getErrorsWithout = function (targetField) {
        var existingErrIndx = this._dataEntryErrors.findIndex(function (e) { return e.target === targetField; });
        if (existingErrIndx !== -1) {
            var newArr = Array();
            for (var i = 0; i < existingErrIndx; i++) {
                newArr[i] = structuredClone(this._dataEntryErrors[i]);
            }
            for (var i = existingErrIndx + 1; i < this._dataEntryErrors.length; i++) {
                newArr[i - 1] = structuredClone(this._dataEntryErrors[i]);
            }
            return newArr;
        }
    };
    Member.prototype.getErrorsAdding = function (targetField, message, level) {
        if (level === void 0) { level = "error"; }
        var newArr = Array();
        for (var i = 0; i < this._dataEntryErrors.length; i++) {
            newArr[i] = structuredClone(this._dataEntryErrors[i]);
        }
        newArr.push({ target: targetField, message: message, level: level });
        return newArr;
    };
    Member.prototype.getFormErrorsForDisplay = function () {
        if (this.dataEntryErrors && this.dataEntryErrors.length && this.dataEntryErrors.length > 0) {
            return this._dataEntryErrors.map(function (fe) { return "".concat(fe.message); }).join("<br>");
        }
        else {
            return "";
        }
    };
    Member.create = function (memberId) {
        if (memberId === void 0) { memberId = undefined; }
        if (memberId) {
            var m = new Member({ memberId: memberId });
            console.log(JSON.stringify(m));
            return m;
        }
        else {
            var m = new Member();
            console.log(JSON.stringify(m));
            return m;
            // return new Member();
        }
    };
    Member.createFromIMember = function (imember) {
        if (imember) {
            var id = Member._isDefined(imember, "_id") ? imember._id : "";
            var member = Member.create(id);
            Member._isDefined(imember, "_id") && (member.id = imember._id);
            Member._isDefined(imember, "firstName") && (member.firstName = imember.firstName);
            Member._isDefined(imember, "lastName") && (member.lastName = imember.lastName);
            Member._isDefined(imember, "names") && (member.names = imember.names);
            Member._isDefined(imember, "email") && (member.email = imember.email);
            Member._isDefined(imember, "phone") && (member.phone = imember.phone);
            Member._isDefined(imember, "address") && (member.address = imember.address);
            Member._isDefined(imember, "unit") && (member.unit = imember.unit);
            Member._isDefined(imember, "city") && (member.city = imember.city);
            Member._isDefined(imember, "state") && (member.state = imember.state);
            Member._isDefined(imember, "postalCode") && (member.postalCode = imember.postalCode);
            Member._isDefined(imember, "volunteerPreferences") && (member.volunteerPreferences = imember.volunteerPreferences);
            Member._isDefined(imember, "mmb") && (member.mmb = imember.mmb);
            Member._isDefined(imember, "paidThrough") && (member.paidThrough = imember.paidThrough);
            Member._isDefined(imember, "joined") && (member.joined = imember.joined);
            Member._isDefined(imember, "remittances") && (member.remittances = imember.remittances);
            Member._isDefined(imember, "notes") && (member.notes = imember.notes);
            Member._isDefined(imember, "lastUpdated") && (member.lastUpdated = imember.lastUpdated);
            return member;
        }
        else {
            return undefined;
        }
    };
    Member.prototype.toIMember = function () {
        var imember = Object.create({});
        if (this.id) {
            imember["_id"] = this.id;
        }
        if (this.firstName) {
            imember["firstName"] = this.firstName;
        }
        if (this.lastName) {
            imember["lastName"] = this.lastName;
        }
        if (this.names) {
            imember["names"] = this.names;
        }
        if (this.email) {
            imember["email"] = this.email;
        }
        if (this.phone) {
            imember["phone"] = this.phone;
        }
        if (this.address) {
            imember["address"] = this.address;
        }
        if (this.unit) {
            imember["unit"] = this.unit;
        }
        if (this.city) {
            imember["city"] = this.city;
        }
        if (this.state) {
            imember["state"] = this.state;
        }
        if (this.postalCode) {
            imember["postalCode"] = this.postalCode;
        }
        if (this.volunteerPreferences) {
            imember["volunteerPreferences"] = this.volunteerPreferences;
        }
        if (this.mmb) {
            imember["mmb"] = this.mmb;
        }
        if (this.paidThrough) {
            imember["paidThrough"] = this.paidThrough;
        }
        if (this.joined) {
            imember["joined"] = this.joined;
        }
        if (this.remittances) {
            imember["remittances"] = this.remittances;
        }
        if (this.notes) {
            imember["notes"] = this.notes;
        }
        if (this.lastUpdated) {
            imember["lastUpdated"] = this.lastUpdated;
        }
        return imember;
    };
    Member.prototype.deepClone = function () {
        var currImember = this.toIMember();
        var cloneMember = currImember ? Member.createFromIMember(currImember) : undefined;
        return cloneMember;
    };
    Member._isDefined = function (m, p) { return (m === null || m === void 0 ? void 0 : m[p]) !== undefined; };
    return Member;
}());
export { Member };
//# sourceMappingURL=Member.js.map