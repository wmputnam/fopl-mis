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
        const errorsArr = (0, express_validator_1.validationResult)(req).array()
            .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`));
        if (errorsArr.length > 0) {
            //   const errorsCombined = errors
            //     .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`))
            //     .join(", ");
            //   log(errsString);
            log(`error array -- ${JSON.stringify(errorsArr)}`);
            const bodyObj = { error: errorsArr };
            log(`error in request -- sending 400 -- ${JSON.stringify(bodyObj)}`);
            return res.status(400).send(bodyObj);
        }
        next();
    }
}
exports.default = new BodyValidationMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL21pZGRsZXdhcmUvYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFFMUIseURBQTJFO0FBRzNFLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRXJFLE1BQU0sd0JBQXdCO0lBQzVCLHNCQUFzQixDQUNwQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixNQUFNLFNBQVMsR0FBYSxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTthQUN0RCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsa0NBQWtDO1lBQ2xDLDRGQUE0RjtZQUM1RixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsTUFBTSxPQUFPLEdBQWtCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxzQ0FBc0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGO0FBQ0Qsa0JBQWUsSUFBSSx3QkFBd0IsRUFBRSxDQUFDIn0=