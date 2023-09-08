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
const debug_1 = __importDefault(require("debug"));
const body_validation_middleware_1 = require("./body.validation.middleware");
const log = (0, debug_1.default)('app:body.validation.middleware');
const fn = () => `${__filename.split('/').pop()}`;
describe(`${fn()}: generateErrorBody`, function () {
    it("should create an errors array for discovered errors", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const fve = [];
            const errorBodyObj = (0, body_validation_middleware_1.generateErrorBody)([
                { msg: "a firstName error", type: "field", path: "firstName", location: "body", value: null },
                { msg: "a lastName error", type: "field", path: "lastName", location: "body", value: null },
                { msg: "an error", type: "alternative", nestedErrors: fve },
            ]);
            (0, chai_1.expect)(errorBodyObj.error).to.be.an('array');
            (0, chai_1.expect)(errorBodyObj.error.length).to.equal(3);
        });
    });
    it(`should return an empty array when there are no discovered errors`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const errorBodyObj = (0, body_validation_middleware_1.generateErrorBody)([]);
            (0, chai_1.expect)(errorBodyObj.error).to.be.an('array');
            (0, chai_1.expect)(errorBodyObj.error.length).to.equal(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vbWlkZGxld2FyZS9ib2R5LnZhbGlkYXRpb24ubWlkZGxld2FyZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw2RUFBaUU7QUFHakUsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFFckUsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFFbEQsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLHFCQUFxQixFQUFFO0lBRXJDLEVBQUUsQ0FBQyxxREFBcUQsRUFBRTs7WUFDeEQsTUFBTSxHQUFHLEdBQTJCLEVBQUUsQ0FBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxJQUFBLDhDQUFpQixFQUFDO2dCQUNyQyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUM3RixFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUMzRixFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO2FBQzVELENBQUMsQ0FBQztZQUVILElBQUEsYUFBTSxFQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxrRUFBa0UsRUFBRTs7WUFDckUsTUFBTSxZQUFZLEdBQUcsSUFBQSw4Q0FBaUIsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUUzQyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBQSxhQUFNLEVBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQSxDQUFDLENBQUM7QUFHTCxDQUFDLENBQUMsQ0FBQyJ9