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
        (0, express_validator_1.body)('email').normalizeEmail({ gmail_remove_subaddress: true }).isEmail(), body_validation_middleware_1.default.verifyBodyFieldsErrors, members_middleware_1.default.validateSameEmailDoesntExist, members_controller_1.default.createMember);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lbWJlcnMvbWVtYmVycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMseUVBQW9FO0FBRXBFLDJGQUFrRTtBQUNsRSx5RkFBZ0U7QUFFaEUsNkJBQTZCO0FBRTdCLHNEQUFzRDtBQUd0RCxNQUFhLGFBQWMsU0FBUSx5Q0FBa0I7SUFDbkQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxlQUFlO1FBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxXQUFXLENBQUM7YUFDbEMsSUFBSTtRQUNILHNEQUFzRDtRQUN0RCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDekUsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDRCQUFpQixDQUFDLDRCQUE0QixFQUM5Qyw0QkFBaUIsQ0FBQyxZQUFZLENBQy9CLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsNEJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7YUFDakMsR0FBRyxDQUFDLDRCQUFpQixDQUFDLG9CQUFvQixDQUFDO2FBQzNDLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxhQUFhLENBQUM7YUFDcEMsTUFBTSxDQUFDLDRCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO1lBQ2pDLHNEQUFzRDtZQUN0RCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MsNEJBQWlCLENBQUMsb0JBQW9CO1lBQ3RDLDRCQUFpQixDQUFDLG1DQUFtQztZQUNyRCw0QkFBaUIsQ0FBQyxHQUFHO1NBQ3RCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFO1lBQ25DLHNEQUFzRDtZQUN0RCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0Msd0NBQXdDO1lBQ3hDLDRCQUFpQixDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQTlDRCxzQ0E4Q0MifQ==