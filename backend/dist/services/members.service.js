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
const members_dao_1 = __importDefault(require("../members/members.dao"));
class MemberService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.getMembers(limit, page);
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.addMember(resource);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.updateUserById(id, resource);
        });
    }
    ;
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.getMemberById(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.removeMemberById(id);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.updateUserById(id, resource);
        });
    }
    getMemberByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.getMemberByEmail(email);
        });
    }
    getMemberById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return members_dao_1.default.getMemberById(id);
        });
    }
}
exports.default = new MemberService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21lbWJlcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFnRDtBQU1oRCxNQUFNLGFBQWE7SUFDWCxJQUFJLENBQUMsS0FBYSxFQUFFLElBQVk7O1lBQ3BDLE9BQU8scUJBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUNLLE1BQU0sQ0FBQyxRQUF5Qjs7WUFDcEMsT0FBTyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFDSyxPQUFPLENBQUMsRUFBVSxFQUFFLFFBQXNCOztZQUM5QyxPQUFPLHFCQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNoRCxDQUFDO0tBQUE7SUFBQSxDQUFDO0lBQ0ksUUFBUSxDQUFDLEVBQVU7O1lBQ3ZCLE9BQU8scUJBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBQ0ssVUFBVSxDQUFDLEVBQVU7O1lBQ3pCLE9BQU8scUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFDSyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQXdCOztZQUNsRCxPQUFPLHFCQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFDSyxnQkFBZ0IsQ0FBQyxLQUFhOztZQUNsQyxPQUFPLHFCQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUFBO0lBQ0ssYUFBYSxDQUFDLEVBQVU7O1lBQzVCLE9BQU8scUJBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=