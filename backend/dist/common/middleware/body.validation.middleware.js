"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorBody = void 0;
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const log = (0, debug_1.default)('app:body-validation-middleware');
const generateErrorBody = (validationErrors) => {
    const errorsArr = validationErrors
        .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`));
    if (errorsArr.length > 0) {
        return { error: errorsArr };
    }
    else {
        return { error: [] };
    }
};
exports.generateErrorBody = generateErrorBody;
class BodyValidationMiddleware {
    verifyBodyFieldsErrors(req, res, next) {
        const errorBodyObj = (0, exports.generateErrorBody)((0, express_validator_1.validationResult)(req).array());
        if (errorBodyObj.error.length > 0) {
            log(`error in request -- sending 400 -- ${JSON.stringify(errorBodyObj)}`);
            return res.status(400).send(errorBodyObj);
        }
        next();
    }
}
exports.default = new BodyValidationMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL21pZGRsZXdhcmUvYm9keS52YWxpZGF0aW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLHlEQUEyRjtBQUczRixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUU5RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsZ0JBQW1DLEVBQWtCLEVBQUU7SUFDdkYsTUFBTSxTQUFTLEdBQWEsZ0JBQWdCO1NBQ3pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QixPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO0tBQzdCO1NBQU07UUFDTCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFBO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFBO0FBUlksUUFBQSxpQkFBaUIscUJBUTdCO0FBQ0QsTUFBTSx3QkFBd0I7SUFDNUIsc0JBQXNCLENBQ3BCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCO1FBRTFCLE1BQU0sWUFBWSxHQUFHLElBQUEseUJBQWlCLEVBQUMsSUFBQSxvQ0FBZ0IsRUFBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxzQ0FBc0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGO0FBQ0Qsa0JBQWUsSUFBSSx3QkFBd0IsRUFBRSxDQUFDIn0=