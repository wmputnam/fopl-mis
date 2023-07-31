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
// src/test/members/members.test.ts
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:test-members');
let firstMemberIdTest = ''; //later to hold value returned by API
const randomizer = Date.now();
const firstMemberBody = {
    email: `wmputnam+${randomizer}@gmail.com`,
    firstName: "William",
    lastName: "Putnam"
};
const newFirstName = "Billy";
const newFirstName2 = "Bill";
const newLastName = "Robertsson-Putnam";
describe('members endpoints', function () {
    let request;
    before(function () {
        // server = app.listen(3033);
        request = supertest_1.default.agent(app_1.default);
    });
    after(function (done) {
        // server.close( function() {
        mongoose_1.default.connection.close();
        // });
        done();
    });
    it("should allow a POST to /members", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/members").send(firstMemberBody);
            firstMemberIdTest = res.body.id;
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body.id).to.be.a('string');
        });
    });
    it("should allow a GET to /members", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get("/members").send();
            log(res.body);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('array');
            // expect( res.body.id ).to.be.a( 'string');
            // firstMemberIdTest = res.body.id;
        });
    });
    it(`should allow GET for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing members/${firstMemberIdTest}`);
            const res = yield request.get(`/members/${firstMemberIdTest}`).send();
            log(res.body);
            log(typeof res.body);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should allow PATCH for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PATCH members/${firstMemberIdTest}`);
            const patchBody = Object.assign(Object.assign({}, firstMemberBody), { firstName: newFirstName2 });
            const res = yield request.patch(`/members/${firstMemberIdTest}`).send(patchBody);
            // request.get(`/members/${firstMemberIdTest}`).send();
            log(res.body);
            log(typeof res.body);
            (0, chai_1.expect)(res.status).to.equal(204);
            (0, chai_1.expect)(res.body).to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    it(`should allow PUT for a member by Id /members/:memberId`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            log(`testing PUT members/${firstMemberIdTest}`);
            const patchBody = Object.assign(Object.assign({}, firstMemberBody), { firstName: newFirstName, lastName: newLastName });
            const res = yield request.put(`/members/${firstMemberIdTest}`).send(patchBody);
            // request.get(`/members/${firstMemberIdTest}`).send();
            log(res.body);
            log(typeof res.body);
            (0, chai_1.expect)(res.status).to.equal(204);
            (0, chai_1.expect)(res.body).to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvbWVtYmVycy9tZW1iZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLDBEQUFrQztBQUNsQywrQkFBOEI7QUFFOUIsd0RBQWdDO0FBQ2hDLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN2RCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxDQUFDLHFDQUFxQztBQUNqRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDN0IsTUFBTSxlQUFlLEdBQUc7SUFDdEIsS0FBSyxFQUFFLFlBQVksVUFBVSxZQUFZO0lBQ3pDLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFFBQVEsRUFBRSxRQUFRO0NBQ25CLENBQUE7QUFFRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBQzdCLE1BQU0sV0FBVyxHQUFHLG1CQUFtQixDQUFDO0FBRXhDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUM1QixJQUFJLE9BQWlDLENBQUM7SUFDdEMsTUFBTSxDQUFDO1FBQ0wsNkJBQTZCO1FBQzdCLE9BQU8sR0FBRyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxVQUFVLElBQUk7UUFDbEIsNkJBQTZCO1FBQzdCLGtCQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLE1BQU07UUFDTixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLGlDQUFpQyxFQUFFOztZQUNwQyxNQUFNLEdBQUcsR0FBRyxN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