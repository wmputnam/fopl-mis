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
// import debug from "debug";
// const debugLog: debug.IDebugger = debug("members");
class MembersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'MembersRoutes');
    }
    configureRoutes() {
        this.app.route(`/members`)
            .get(members_controller_1.default.listMembers)
            .post(
        // membersMiddleware.validateRequiredMemberBodyFields,
        (0, express_validator_1.body)('email').isEmail(), body_validation_middleware_1.default.verifyBodyFieldsErrors, members_middleware_1.default.validateSameEmailDoesntExist, members_controller_1.default.createMember);
        this.app.param('memberId', members_middleware_1.default.extractMemberId);
        this.app.route(`/members/:memberId`)
            .all(members_middleware_1.default.validateMemberExists)
            .get(members_controller_1.default.getMemberById)
            .delete(members_controller_1.default.removeMember);
        this.app.put(`/members/:memberId`, [
            // membersMiddleware.validateRequiredMemberBodyFields,
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            members_middleware_1.default.validateMemberExists,
            members_middleware_1.default.validateSameEmailBelongToSameMember,
            members_controller_1.default.put
        ]);
        this.app.patch(`/members/:memberId`, [
            // membersMiddleware.validateRequiredMemberBodyFields,
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            // membersMiddleware.validatePatchEmail,
            members_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.MembersRoutes = MembersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21lbWJlcnMvbWVtYmVycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMseUVBQW9FO0FBRXBFLDJGQUFrRTtBQUNsRSx5RkFBZ0U7QUFFaEUsNkJBQTZCO0FBRTdCLHNEQUFzRDtBQUd0RCxNQUFhLGFBQWMsU0FBUSx5Q0FBa0I7SUFDbkQsWUFBYSxHQUF1QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxlQUFlO1FBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3pCLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxXQUFXLENBQUM7YUFDbEMsSUFBSTtRQUNILHNEQUFzRDtRQUN0RCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQyw0QkFBaUIsQ0FBQyw0QkFBNEIsRUFDOUMsNEJBQWlCLENBQUMsWUFBWSxDQUMvQixDQUFDO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLDRCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2FBQ2pDLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQzthQUMzQyxHQUFHLENBQUMsNEJBQWlCLENBQUMsYUFBYSxDQUFDO2FBQ3BDLE1BQU0sQ0FBQyw0QkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtZQUNqQyxzREFBc0Q7WUFDdEQsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQzdDLDRCQUFpQixDQUFDLG9CQUFvQjtZQUN0Qyw0QkFBaUIsQ0FBQyxtQ0FBbUM7WUFDckQsNEJBQWlCLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTtZQUNuQyxzREFBc0Q7WUFDdEQsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQzdDLHdDQUF3QztZQUMxQyw0QkFBaUIsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUVMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUE5Q0Qsc0NBOENDIn0=