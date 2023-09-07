var MembersReducers = /** @class */ (function () {
    function MembersReducers() {
    }
    MembersReducers.reduceMemberFullName = function (m) {
        var _a, _b;
        var fullname = "";
        // precedence rule for this (poorly designed) interface
        // if there is a names:Array<{lastName:string,firstName:string}>
        // then return the fullnames:Array<string> = names.map( item => item.firstName + " "+ item.lastName)
        //                 fullname = fullnames.join(" & ")
        // else if there are lastName and firstName properties
        // then fullname = m.firstName + " " + m.lastName
        // else if there is a name property
        // then fullname = name
        // else fullname = ""
        if (m.hasOwnProperty("names") && (m === null || m === void 0 ? void 0 : m.names) && ((_a = m.names) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            var fullnames = (_b = m === null || m === void 0 ? void 0 : m.names) === null || _b === void 0 ? void 0 : _b.map(function (item) { return (item === null || item === void 0 ? void 0 : item.firstName) + " " + (item === null || item === void 0 ? void 0 : item.lastName); });
            fullname = fullnames.join(" & ");
        }
        else if (m.hasOwnProperty("lastName") || m.hasOwnProperty("firstName")) {
            fullname = (m === null || m === void 0 ? void 0 : m.firstName) + " " + (m === null || m === void 0 ? void 0 : m.lastName);
        }
        else if (m.hasOwnProperty("name")) {
            fullname = (m === null || m === void 0 ? void 0 : m.name) === undefined ? "" : m.name;
        }
        return fullname;
    };
    MembersReducers.reduceAddressForMemberList = function (m) {
        var reducer_address;
        var reducer_unit;
        var reducer_city;
        var reducer_zip;
        if ((m === null || m === void 0 ? void 0 : m.address) === undefined) {
            reducer_address = "";
        }
        else {
            reducer_address = m.address;
        }
        if ((m === null || m === void 0 ? void 0 : m.unit) === undefined) {
            reducer_unit = "";
        }
        else {
            reducer_unit = " " + m.unit;
        }
        if ((m === null || m === void 0 ? void 0 : m.city) === undefined) {
            reducer_city = "";
        }
        else {
            reducer_city = ", " + m.city;
        }
        if ((m === null || m === void 0 ? void 0 : m.postalCode) === undefined) {
            reducer_zip = "";
        }
        else {
            reducer_zip = " " + m.postalCode.substring(0, 5);
        }
        return reducer_address + reducer_unit + reducer_city + reducer_zip;
    };
    MembersReducers.reducePaidThroughForMemberList = function (m) {
        var lifeMembershipCodes = ["LM", "HLM", "BEN"];
        var volunteerCodes = ["VOL"];
        var allNopayCodes = lifeMembershipCodes.concat(volunteerCodes);
        if ((m === null || m === void 0 ? void 0 : m.mmb) !== undefined && allNopayCodes.includes(m.mmb)) {
            return "---";
        }
        else if ((m === null || m === void 0 ? void 0 : m.paidThrough) !== undefined) {
            var computedType = ({}).toString.call(m.paidThrough).toLowerCase();
            if (computedType === '[object date]') {
                return m.paidThrough.toISOString().substring(0, 10);
            }
            else if (computedType === '[object string]') {
                return m.paidThrough.substring(0, 10);
            }
            else {
                return "unknown";
            }
        }
        else {
            return "undefined";
        }
    };
    MembersReducers.reduceJoinedForMemberList = function (m) {
        if ((m === null || m === void 0 ? void 0 : m.joined) !== undefined) {
            var computedType = ({}).toString.call(m.joined).toLowerCase();
            console.log("fe-members-reducers.reduceJoiedForMemberList: computed type is ".concat(computedType));
            if (computedType === '[object date]') {
                return m.joined.toISOString().substring(0, 10);
            }
            else if (computedType === '[object string]') {
                return m.joined.substring(0, 10);
            }
            else {
                return "unknown";
            }
        }
        else {
            return "undefined";
        }
    };
    MembersReducers.reduceLastUpdatedForMemberList = function (m) {
        if ((m === null || m === void 0 ? void 0 : m.lastUpdated) !== undefined) {
            var computedType = ({}).toString.call(m.lastUpdated).toLowerCase();
            console.log("fe-members-reducers.reduceUpdatedForMemberList: computed type is ".concat(computedType));
            if (computedType === '[object date]') {
                return m.lastUpdated.toISOString().substring(0, 10);
            }
            else if (computedType === '[object string]') {
                return m.lastUpdated.substring(0, 10);
            }
            else {
                return "unknown";
            }
        }
        else {
            return "undefined";
        }
    };
    return MembersReducers;
}());
export default MembersReducers;
//# sourceMappingURL=members.reducers.js.map