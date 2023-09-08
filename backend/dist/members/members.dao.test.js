"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const members_dao_1 = __importDefault(require("./members.dao"));
const fn = () => `${__filename.split('/').pop()}`;
describe(`${fn()}: addMember`, function () {
    it(`should return the new member id when creating a member`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const randomizer = Date.now();
            const memberId = yield members_dao_1.default.addMember({
                firstName: `f${randomizer}`,
                lastName: `l${randomizer}`
            });
            (0, chai_1.expect)(memberId).not.to.be.undefined;
        });
    });
});
describe(`${fn()}: getMembers`, function () {
    let numberOfMembers;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const allMemberList = yield members_dao_1.default.getMembers();
            numberOfMembers = allMemberList.length;
        });
    });
    it(`should return list of first 25 members when given no parameters`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const memberList = yield members_dao_1.default.getMembers();
            (0, chai_1.expect)(memberList).to.be.an('array');
            (0, chai_1.expect)(memberList.length).to.be.lessThanOrEqual(25);
        });
    });
    it(`should return list of first 10 members when given limit = 10 parameters`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const memberList = yield members_dao_1.default.getMembers(10);
            (0, chai_1.expect)(memberList).to.be.an('array');
            (0, chai_1.expect)(memberList.length).to.be.lessThanOrEqual(10);
        });
    });
    it(`should return list of page *page* *limit*  members when given limit and page parameters`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (numberOfMembers > 10) {
                const memberList = yield members_dao_1.default.getMembers(5, 1);
                (0, chai_1.expect)(memberList).to.be.an('array');
                (0, chai_1.expect)(memberList.length).to.be.equal(5);
            }
            else {
                this.skip();
            }
        });
    });
});
describe(`${fn()}: getMemberById`, function () {
    let memberId;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const memberList = yield members_dao_1.default.getMembers(1);
            memberId = memberList[0]['_id'];
        });
    });
    it(`should return data for member specified by memberId parameter`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.getMemberById(memberId);
            (0, chai_1.expect)(member).not.to.be.null;
            if (member) {
                (0, chai_1.expect)(member['_id']).to.equal(memberId);
            }
        });
    });
    it(`should return null when given memberid parameter that does not exist`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.getMemberById(memberId + 'DORF');
            (0, chai_1.expect)(member).to.be.null;
        });
    });
});
describe(`${fn()}: updateUserById`, function () {
    let testMemberId;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const randomizer = Date.now();
            testMemberId = yield members_dao_1.default.addMember({
                firstName: `f${randomizer}`,
                lastName: `l${randomizer}`
            });
        });
    });
    function has_failed(it) {
        var _a, _b;
        var failed = false;
        var tests = (_b = (_a = it === null || it === void 0 ? void 0 : it.test) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.tests;
        for (var i = 0, limit = (tests === null || tests === void 0 ? void 0 : tests.length) ? tests === null || tests === void 0 ? void 0 : tests.length : 0; !failed && i < limit; ++i)
            failed = (tests === null || tests === void 0 ? void 0 : tests[i].state) === "failed";
        return failed;
    }
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!has_failed(this)) {
                yield members_dao_1.default.removeMemberById(testMemberId);
            }
        });
    });
    it(`should update data for member specified by memberId and {} parameters`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.updateUserById(testMemberId, {});
            (0, chai_1.expect)(member).not.to.be.null;
        });
    });
    it(`should update data for member specified by memberId and memberFields parameters`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.updateUserById(testMemberId, { mmb: "VOL" });
            (0, chai_1.expect)(member).not.to.be.null;
        });
    });
    it(`should return null when given memberid parameter that does not exist`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.updateUserById(testMemberId + 'DORF', { mmb: "VOL" });
            (0, chai_1.expect)(member).to.be.undefined;
        });
    });
});
// removeMemberById
describe(`${fn()}: removeMemberById`, function () {
    let testMemberId;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const randomizer = Date.now();
            testMemberId = yield members_dao_1.default.addMember({
                firstName: `f${randomizer}`,
                lastName: `l${randomizer}`
            });
        });
    });
    function has_failed(it) {
        var _a, _b;
        var failed = false;
        var tests = (_b = (_a = it === null || it === void 0 ? void 0 : it.test) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.tests;
        for (var i = 0, limit = (tests === null || tests === void 0 ? void 0 : tests.length) ? tests === null || tests === void 0 ? void 0 : tests.length : 0; !failed && i < limit; ++i)
            failed = (tests === null || tests === void 0 ? void 0 : tests[i].state) === "failed";
        return failed;
    }
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!has_failed(this)) {
            //   await membersDao.removeMemberById(testMemberId);
            // }
        });
    });
    it(`should delete document for member specified by memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield members_dao_1.default.removeMemberById(testMemberId);
            (0, chai_1.expect)(result.acknowledged).to.be.true;
            (0, chai_1.expect)(result.deletedCount).to.equal(1);
        });
    });
    it(`should return ??? when given memberid parameter that does not exist`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield members_dao_1.default.removeMemberById(testMemberId + 'DORF');
            (0, chai_1.expect)(result.acknowledged).to.be.true;
            (0, chai_1.expect)(result.deletedCount).to.equal(0);
        });
    });
});
// getMemberByEmail
describe(`${fn()}: getMemberByEmail`, function () {
    let email;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const memberList = yield members_dao_1.default.getMembers();
            for (let i = 0; i < memberList.length; i++) {
                const entry = memberList[i];
                if (entry === null || entry === void 0 ? void 0 : entry.email) {
                    email = entry.email;
                    break;
                }
            }
        });
    });
    it(`should return data for member specified by email parameter`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (email) {
                const member = yield members_dao_1.default.getMemberByEmail(email);
                (0, chai_1.expect)(member).not.to.be.null;
            }
            else {
                this.skip();
            }
        });
    });
    it(`should return null when given email parameter that does not exist`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_dao_1.default.getMemberById(email + 'DORF');
            (0, chai_1.expect)(member).to.be.null;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5kYW8udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZW1iZXJzL21lbWJlcnMuZGFvLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEI7QUFDOUIsZ0VBQXVDO0FBR3ZDLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBRWxELFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUU7SUFFN0IsRUFBRSxDQUFDLHdEQUF3RCxFQUFFOztZQUMzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDMUMsU0FBUyxFQUFFLElBQUksVUFBVSxFQUFFO2dCQUMzQixRQUFRLEVBQUUsSUFBSSxVQUFVLEVBQUU7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLENBQUM7S0FBQSxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUU7SUFDOUIsSUFBSSxlQUF1QixDQUFDO0lBRTVCLE1BQU0sQ0FBQzs7WUFDTCxNQUFNLGFBQWEsR0FBRyxNQUFNLHFCQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEQsZUFBZSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDekMsQ0FBQztLQUFBLENBQUMsQ0FBQztJQUdILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRTs7WUFDcEUsTUFBTSxVQUFVLEdBQUcsTUFBTSxxQkFBVSxDQUFDLFVBQVUsRUFBRSxD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