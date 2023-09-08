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
            .post((0, express_validator_1.body)("firstName", "firstname is a required field").exists(), (0, express_validator_1.body)("firstName", "firstname cannot be empty").isLength({ min: 1 }), (0, express_validator_1.body)("lastName", "lastname is a required field").exists(), (0, express_validator_1.body)("lastName", "lastname cannot be empty").isLength({ min: 1 }), body_validation_middleware_1.default.verifyBodyFieldsErrors, members_middleware_1.default.validateSameEmailDoesntExist, members_controller_1.default.createMember);
        this.app.param('memberId', members_middleware_1.default.extractMemberId);
        this.app.route(`/members/:memberId`)
            .all(members_middleware_1.default.validateMemberExists)
            .get(members_controller_1.default.getMemberById)
            .delete(members_controller_1.default.removeMember);
        this.app.put(`/members/:memberId`, [
            (0, express_validator_1.body)("firstName", "firstname is a required field").exists(),
            (0, express_validator_1.body)("firstName", "firstname cannot be empty").isLength({ min: 1 }),
            (0, express_validator_1.body)("lastName", "lastname is a required field").exists(),
            (0, express_validator_1.body)("lastName", "lastname cannot be empty").isLength({ min: 1 }),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            members_middleware_1.default.validateMemberExists,
            members_middleware_1.default.validateSameEmailBelongToSameMember,
            members_controller_1.default.put
        ]);
        this.app.patch(`/members/:memberId`, [
            (0, express_validator_1.body)('firstName', "firstname cannot be empty").isString().isLength({ min: 1 }),
            (0, express_validator_1.body)('lastName', "lastname cannot be empty").isString().isLength({ min: 1 }),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            members_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.MembersRoutes = MembersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lbWJlcnMvbWVtYmVycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMseUVBQW9FO0FBRXBFLDJGQUFrRTtBQUNsRSx5RkFBZ0U7QUFFaEUsa0RBQTBCO0FBRTFCLE1BQU0sUUFBUSxHQUFvQixJQUFBLGVBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztBQUduRCxNQUFhLGFBQWMsU0FBUSx5Q0FBa0I7SUFDbkQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxlQUFlO1FBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxXQUFXLENBQUM7YUFDbEMsSUFBSSxDQUNILElBQUEsd0JBQUksRUFBQyxXQUFXLEVBQUMsK0JBQStCLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFDMUQsSUFBQSx3QkFBSSxFQUFDLFdBQVcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNuRSxJQUFBLHdCQUFJLEVBQUMsVUFBVSxFQUFFLDhCQUE4QixDQUFDLENBQUMsTUFBTSxFQUFFLEVBQ3pELElBQUEsd0JBQUksRUFBQyxVQUFVLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDakUsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDRCQUFpQixDQUFDLDRCQUE0QixFQUM5Qyw0QkFBaUIsQ0FBQyxZQUFZLENBQy9CLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsNEJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7YUFDakMsR0FBRyxDQUFDLDRCQUFpQixDQUFDLG9CQUFvQixDQUFDO2FBQzNDLEdBQUcsQ0FBQyw0QkFBaUIsQ0FBQyxhQUFhLENBQUM7YUFDcEMsTUFBTSxDQUFDLDRCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO1lBQ2pDLElBQUEsd0JBQUksRUFBQyxXQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDM0QsSUFBQSx3QkFBSSxFQUFDLFdBQVcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNuRSxJQUFBLHdCQUFJLEVBQUMsVUFBVSxFQUFFLDhCQUE4QixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3pELElBQUEsd0JBQUksRUFBQyxVQUFVLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDakUsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDRCQUFpQixDQUFDLG9CQUFvQjtZQUN0Qyw0QkFBaUIsQ0FBQyxtQ0FBbUM7WUFDckQsNEJBQWlCLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTtZQUNuQyxJQUFBLHdCQUFJLEVBQUMsV0FBVyxFQUFFLDJCQUEyQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzlFLElBQUEsd0JBQUksRUFBQyxVQUFVLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDNUUsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDRCQUFpQixDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQTdDRCxzQ0E2Q0MifQ==