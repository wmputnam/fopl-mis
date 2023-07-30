"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersRoutes = void 0;
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const common_routes_config_1 = require("../common/common.routes.config");
const members_controller_1 = __importDefault(require("../controllers/members.controller"));
const members_middleware_1 = __importDefault(require("./middleware/members.middleware"));
const debug_1 = __importDefault(require("debug"));
const debugLog = (0, debug_1.default)("members");
class MembersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'MembersRoutes');
    }
    configureRoutes() {
        this.app.route(`/members`)
            .get(members_controller_1.default.listMembers)
            .post((0, express_validator_1.body)('email').normalizeEmail({ gmail_remove_subaddress: true }).isEmail(), body_validation_middleware_1.default.verifyBodyFieldsErrors, members_middleware_1.default.validateSameEmailDoesntExist, members_controller_1.default.createMember);
        this.app.param('memberId', members_middleware_1.default.extractMemberId);
        this.app.route(`/members/:memberId`)
            .all(members_middleware_1.default.validateMemberExists)
            .get(members_controller_1.default.getMemberById)
            .delete(members_controller_1.default.removeMember);
        this.app.put(`/members/:memberId`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            members_middleware_1.default.validateMemberExists,
            members_middleware_1.default.validateSameEmailBelongToSameMember,
            members_controller_1.default.put
        ]);
        this.app.patch(`/members/:memberId`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            members_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.MembersRoutes = MembersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lbWJlcnMvbWVtYmVycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMseUVBQW9FO0FBRXBFLDJGQUFrRTtBQUNsRSx5RkFBZ0U7QUFFaEUsa0RBQTBCO0FBRTFCLE1BQU0sUUFBUSxHQUFvQixJQUFBLGVBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztBQUduRCxNQUFhLGFBQWMsU0FBUSx5Q0FBa0I7SUFDbkQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxlQUFlO1FBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxXQUFXLENBQUM7YUFDbEMsSUFBSSxDQUNILElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUN6RSxvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0MsNEJBQWlCLENBQUMsNEJBQTRCLEVBQzlDLDRCQUFpQixDQUFDLFlBQVksQ0FDL0IsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSw0QkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzthQUNqQyxHQUFHLENBQUMsNEJBQWlCLENBQUMsb0JBQW9CLENBQUM7YUFDM0MsR0FBRyxDQUFDLDRCQUFpQixDQUFDLGFBQWEsQ0FBQzthQUNwQyxNQUFNLENBQUMsNEJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7WUFDakMsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDRCQUFpQixDQUFDLG9CQUFvQjtZQUN0Qyw0QkFBaUIsQ0FBQyxtQ0FBbUM7WUFDckQsNEJBQWlCLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTtZQUNuQyxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MsNEJBQWlCLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBMUNELHNDQTBDQyJ9