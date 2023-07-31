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
const members_service_1 = __importDefault(require("../../services/members.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:members-middleware');
class MembersMiddleware {
    constructor() {
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                log('validating email');
                this.validateSameEmailDoesntExist(req, res, next);
            }
            else {
                next();
            }
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_service_1.default.getMemberByEmail(req.body.email);
            if (member) {
                const errBody = { error: ['member already exists with provided email -- email'] };
                res.status(400).send(errBody);
            }
            else {
                next();
            }
        });
    }
    validateSameEmailBelongToSameMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_service_1.default.getMemberByEmail(req.body.email);
            if (member && member._id === req.params.memberId) {
                next();
            }
            else {
                const errBody = { error: ['invalid email for the supplied member -- email'] };
                res.status(400).send(errBody);
            }
        });
    }
    validateMemberExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_service_1.default.readById(req.params.memberId);
            if (member) {
                next();
            }
            else {
                res.status(404).send({
                    error: `Member ${req.params.memberId} not found`
                });
            }
        });
    }
    extractMemberId(req, res, next) {
        req.body.id = req.params.memberId;
        next();
    }
}
exports.default = new MembersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21lbWJlcnMvbWlkZGxld2FyZS9tZW1iZXJzLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxRkFBNEQ7QUFDNUQsa0RBQTBCO0FBRzFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRTdELE1BQU0saUJBQWlCO0lBQXZCO1FBMkJFLHVCQUFrQixHQUFHLENBQ25CLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzFCLEVBQUU7WUFDRixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNsQixHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0wsSUFBSSxFQUFFLENBQUM7YUFDUjtRQUNILENBQUMsQ0FBQSxDQUFBO0lBeUJILENBQUM7SUE5RE8sNEJBQTRCLENBQ2hDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLE1BQU0sR0FBRyxNQUFNLHlCQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRSxJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLE9BQU8sR0FBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQyxFQUFFLENBQUE7Z0JBQ2hHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLElBQUksRUFBRSxDQUFDO2FBQ1I7UUFDSCxDQUFDO0tBQUE7SUFDSyxtQ0FBbUMsQ0FDdkMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sTUFBTSxHQUFHLE1BQU0seUJBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hELElBQUksRUFBRSxDQUFBO2FBQ1A7aUJBQU07Z0JBQ0wsTUFBTSxPQUFPLEdBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsZ0RBQWdELENBQUMsRUFBRSxDQUFBO2dCQUM1RixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUM7S0FBQTtJQWNLLG9CQUFvQixDQUN4QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEtBQUssRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxZQUFZO2lCQUNqRCxDQUFDLENBQUE7YUFDSDtRQUNILENBQUM7S0FBQTtJQUVELGVBQWUsQ0FDYixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksaUJBQWlCLEVBQUUsQ0FBQyJ9