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
            // return membersDao.putMemberById(id,resource);
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
            // return membersDao.patchMemberById(id,resource);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL21lbWJlcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFnRDtBQU1oRCxNQUFNLGFBQWE7SUFDWCxJQUFJLENBQUMsS0FBYSxFQUFFLElBQVk7O1lBQ3BDLE9BQU8scUJBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUNLLE1BQU0sQ0FBQyxRQUF5Qjs7WUFDcEMsT0FBTyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFDSyxPQUFPLENBQUMsRUFBVSxFQUFFLFFBQXNCOztZQUM5QyxnREFBZ0Q7WUFDaEQsT0FBTyxxQkFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDaEQsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUNJLFFBQVEsQ0FBQyxFQUFVOztZQUN2QixPQUFPLHFCQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUNLLFVBQVUsQ0FBQyxFQUFVOztZQUN6QixPQUFPLHFCQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBQ0ssU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUF3Qjs7WUFDbEQsa0RBQWtEO1lBQ2xELE9BQU8scUJBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUNLLGdCQUFnQixDQUFDLEtBQWE7O1lBQ2xDLE9BQU8scUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFDSyxhQUFhLENBQUMsRUFBVTs7WUFDNUIsT0FBTyxxQkFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksYUFBYSxFQUFFLENBQUMifQ==