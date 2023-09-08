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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:test-members');
const fn = () => `${__filename.split('/').pop()}`;
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function runDelay(time = 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(time);
    });
}
describe(`${fn()}: members GET`, function () {
    let request;
    const randomizer = Date.now();
    const testMemberBody = {
        email: `wmputnam+${randomizer}@gmail.com`,
        firstName: "William",
        lastName: "Putnam"
    };
    let testMemberId = '';
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
            const res = yield request.post("/members").send(testMemberBody);
            testMemberId = res.body.id;
        });
    });
    after(function (done) {
        done();
    });
    it("should allow a GET to /members", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get("/members").send();
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('array');
        });
    });
    it(`should allow GET for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing members/${testMemberId}`);
            const res = yield request.get(`/members/${testMemberId}`).send();
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should return error from GET for a member by Id /members/:memberId when memberId is not found`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get(`/members/duncell`).send();
            (0, chai_1.expect)(res.status).to.equal(404);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain("Member duncell not found -- memberId");
        });
    });
});
describe(`${fn()}: member POST`, function () {
    let request;
    const randomizer = Date.now();
    runDelay(5000);
    const testMemberBody = {
        email: `wmputnam+${randomizer}.post@gmail.com`,
        firstName: "William_post",
        lastName: "Putnam+post"
    };
    runDelay(5000);
    const testDuplicateMemberBody = {
        email: `wmputnam+${randomizer}.dup@gmail.com`,
        firstName: "William_dup",
        lastName: "Putnam+dup"
    };
    let dupTestMemberId;
    function setUpDupTest() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/members").send(testDuplicateMemberBody);
            dupTestMemberId = res.body.id;
            (0, chai_1.expect)(dupTestMemberId).not.to.be.undefined;
            (0, chai_1.expect)(dupTestMemberId).not.to.be.empty;
        });
    }
    before(function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
            done();
        });
    });
    after(function (done) {
        done();
    });
    it("should allow a POST to /members", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/members").send(testMemberBody);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body.id).to.be.a('string');
        });
    });
    it("should return  error from POST to /members when member already exists having the given email", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield setUpDupTest();
            const res = yield request.post("/members").send(testDuplicateMemberBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain('member already exists with provided email -- email');
        });
    });
    it(`should return error from POST when firstName is not provided`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post(`/members`).send({ lastName: testMemberBody.lastName });
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(2);
            (0, chai_1.expect)(res.body.error).to.contain('firstname is a required field -- firstName');
            (0, chai_1.expect)(res.body.error).to.contain('firstname cannot be empty -- firstName');
        });
    });
    it(`should return error from POST when firstName is empty`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post(`/members`).send(Object.assign(Object.assign({}, testMemberBody), { firstName: '' }));
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.contain('firstname cannot be empty -- firstName');
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
        });
    });
    it(`should return error from POST when lastName is not provided`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post(`/members`).send({ firstName: testMemberBody.firstName });
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(2);
            (0, chai_1.expect)(res.body.error).to.contain('lastname is a required field -- lastName');
            (0, chai_1.expect)(res.body.error).to.contain('lastname cannot be empty -- lastName');
        });
    });
    it(`should return error from POST when lastName is empty`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post(`/members`).send(Object.assign(Object.assign({}, testMemberBody), { lastName: '' }));
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain('lastname cannot be empty -- lastName');
        });
    });
    it(`should return error from POST when neither firstname nor lastName provided`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post(`/members`).send({ email: 'test@test.it' });
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(4);
            (0, chai_1.expect)(res.body.error).to.contain('firstname is a required field -- firstName');
            (0, chai_1.expect)(res.body.error).to.contain('firstname cannot be empty -- firstName');
            (0, chai_1.expect)(res.body.error).to.contain('lastname is a required field -- lastName');
            (0, chai_1.expect)(res.body.error).to.contain('lastname cannot be empty -- lastName');
        });
    });
});
describe(`${fn()}: member PUT`, function () {
    let request;
    let testMemberId = '';
    runDelay();
    const randomizer = Date.now();
    const testMemberBody = {
        email: `wmputnam+${randomizer}.put@gmail.com`,
        firstName: "William.put",
        lastName: "Putnam.put"
    };
    const newFirstName = "Billy";
    const newLastName = "Robertsson-Putnam";
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
            const res = yield request.post("/members").send(testMemberBody);
            testMemberId = res.body.id;
        });
    });
    after(function (done) {
        done();
    });
    it(`should allow PUT for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: newFirstName, lastName: newLastName });
            const res = yield request.put(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(204);
            (0, chai_1.expect)(res.body).to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should return error PUT for a member by Id /members/:memberId when not present`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: newFirstName, lastName: newLastName });
            const res = yield request.put(`/members/putcell`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(404);
            (0, chai_1.expect)(res.body.error).to.contain('Member putcell not found -- memberId');
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should return error PUT when sending an empty firstName`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: '', lastName: newLastName });
            const res = yield request.put(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain('firstname cannot be empty -- firstName');
        });
    });
    it(`should return error PUT when sending an empty lastName`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: newFirstName, lastName: '' });
            const res = yield request.put(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain('lastname cannot be empty -- lastName');
        });
    });
    it(`should return error PUT when sending a different email address`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { email: 'test@test.it' });
            const res = yield request.put(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.be.an('array');
            (0, chai_1.expect)(res.body.error.length).to.equal(1);
            (0, chai_1.expect)(res.body.error).to.contain('email supplied for the member different -- email');
        });
    });
});
describe(`${fn()}: member PATCH`, function () {
    let request;
    let testMemberId = '';
    runDelay();
    const randomizer = Date.now();
    const testMemberBody = {
        email: `wmputnam+${randomizer}.patch@gmail.com`,
        firstName: "William.patch",
        lastName: "Putnam.patch"
    };
    const newFirstName2 = "Bill";
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
            const res = yield request.post("/members").send(testMemberBody);
            testMemberId = res.body.id;
        });
    });
    after(function (done) {
        done();
    });
    it(`should allow PATCH for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PATCH members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: newFirstName2 });
            const res = yield request.patch(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(204);
            (0, chai_1.expect)(res.body).to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should return error from PATCH member not found`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PATCH members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: newFirstName2 });
            const res = yield request.patch(`/members/patchcell`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(404);
            (0, chai_1.expect)(res.body.error).to.contain('Member patchcell not found -- memberId');
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should return error when PATCH has empty firstName`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PATCH members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { firstName: '' });
            const res = yield request.patch(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.contain('firstname cannot be empty -- firstName');
        });
    });
    it(`should return error when PATCH has empty lastName`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PATCH members/${testMemberId}`);
            const patchBody = Object.assign(Object.assign({}, testMemberBody), { lastName: '' });
            const res = yield request.patch(`/members/${testMemberId}`).send(patchBody);
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body.error).to.contain('lastname cannot be empty -- lastName');
        });
    });
});
describe(`${fn()}: member DELETE`, function () {
    let request;
    let testMemberId = '';
    runDelay();
    const randomizer = Date.now();
    const testMemberBody = {
        email: `wmputnam+${randomizer}.del@gmail.com`,
        firstName: "William_del",
        lastName: "Putnam_del"
    };
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
            const res = yield request.post("/members").send(testMemberBody);
            testMemberId = res.body.id;
        });
    });
    after(function (done) {
        done();
    });
    it("should allow DELETE of existing member", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.delete(`/members/${testMemberId}`);
            (0, chai_1.expect)(res.status).to.equal(204);
            (0, chai_1.expect)(res.body).to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it("should return error for DELETE of non-existing member", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const expectedError = 'Member dorf not found -- memberId';
            const res = yield request.delete(`/members/dorf`);
            (0, chai_1.expect)(res.status).to.equal(404);
            (0, chai_1.expect)(res.body.error).to.contain(expectedError);
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvbWVtYmVycy9tZW1iZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsMERBQWtDO0FBQ2xDLCtCQUE4QjtBQUM5QixrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGtCQUFrQixDQUFDLENBQUM7QUFHdkQsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFDbEQsU0FBUyxLQUFLLENBQUMsSUFBWTtJQUN6QixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFlLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSTs7UUFDakMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUFBO0FBRUQsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLGVBQWUsRUFBRTtJQUMvQixJQUFJLE9BQWlDLENBQUM7SUFFdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTlCLE1BQU0sY0FBYyxHQUFHO1FBQ3JCLEtBQUssRUFBRSxZQUFZLFVBQVUsWUFBWTtRQUN6QyxTQUFTLEVBQUUsU0FBUztRQUNwQixRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDO0lBRUYsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBR3RCLE1BQU0sQ0FBQzs7WUFDTCxPQUFPLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFP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