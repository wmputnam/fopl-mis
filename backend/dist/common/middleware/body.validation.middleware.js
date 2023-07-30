"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const log = (0, debug_1.default)('app:body-validation-middleware');
class BodyValidationMiddleware {
    verifyBodyFieldsErrors(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            let errsString = "";
            errsString = errors.array()
                .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`))
                .join(", ");
            log(errsString);
            return res.status(400).send({ errors: `${errsString}` });
        }
        next();
    }
}
exports.default = new BodyValidationMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL21pZGRsZXdhcmUvYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFFMUIseURBQTJFO0FBRTNFLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRXJFLE1BQU0sd0JBQXdCO0lBQzVCLHNCQUFzQixDQUNwQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO2lCQUN4QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7Q0FDRjtBQUNELGtCQUFlLElBQUksd0JBQXdCLEVBQUUsQ0FBQyJ9