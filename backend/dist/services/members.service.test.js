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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const members_service_1 = __importDefault(require("./members.service"));
const fn = () => `${__filename.split('/').pop()}`;
describe(`${fn()}: getMemberById`, function () {
    let request;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            request = supertest_1.default.agent(app_1.default);
        });
    });
    after(function (done) {
        done();
    });
    it(`should return member from db when given a valid id`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            function getActiveMemberId() {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request.get("/members").send();
                    return res.body[0]['_id'];
                });
            }
            const testMemberId = yield getActiveMemberId();
            const member = yield members_service_1.default.getMemberById(testMemberId);
            (0, chai_1.expect)(member).not.to.be.empty;
        });
    });
    it(`should return null from db when given an invalid id`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const testMemberId = 'duncell';
            const member = yield members_service_1.default.getMemberById(testMemberId);
            (0, chai_1.expect)(member).to.be.null;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5zZXJ2aWNlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbWVtYmVycy5zZXJ2aWNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBeUI7QUFDekIsMERBQWtDO0FBQ2xDLCtCQUE4QjtBQUU5Qix3RUFBK0M7QUFFL0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFFbEQsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixFQUFFO0lBQ2pDLElBQUksT0FBaUMsQ0FBQztJQUV0QyxNQUFNLENBQUM7O1lBQ0wsT0FBTyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQSxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsVUFBVSxJQUFJO1FBQ2xCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFLSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7O1lBQ3ZELFNBQWUsaUJBQWlCOztvQkFDOUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNqRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7YUFBQTtZQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0saUJBQWlCLEVBQUUsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLHlCQUFjLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hFLElBQUEsYUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNqQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0lBR0gsRUFBRSxDQUFDLHFEQUFxRCxFQUFFOztZQUN4RCxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSx5QkFBYyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRSxJQUFBLGFBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztRQUM1QixDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUEifQ==