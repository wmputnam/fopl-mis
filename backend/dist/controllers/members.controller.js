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
const members_service_1 = __importDefault(require("../services/members.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:members-controller');
class MembersController {
    listMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield members_service_1.default.list(100, 0);
            res.status(200).send(members);
        });
    }
    getMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield members_service_1.default.getMemberById(req.body.id);
            log(`getMemberByID(${req.body.id})`);
            res.status(200).send(member);
        });
    }
    createMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let memberId;
            try {
                memberId = yield members_service_1.default.create(req.body);
            }
            catch (error) {
                res.status(400).send(`{error: ${error}}`);
                return;
            }
            res.status(200).send({ id: memberId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield members_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield members_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    ;
    removeMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield members_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new MembersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL21lbWJlcnMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtGQUF5RDtBQUN6RCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFFN0QsTUFBTSxpQkFBaUI7SUFDZixXQUFXLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDM0QsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0lBQ0ssYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0seUJBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvRCxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFDSyxZQUFZLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDNUQsSUFBSSxRQUFRLENBQUM7WUFDYixJQUFJO2dCQUNGLFFBQVEsR0FBRyxNQUFNLHlCQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRDtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxHQUFHLENBQUMsQ0FBQTtnQkFDekMsT0FBTzthQUNSO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFDSyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDckQsR0FBRyxDQUFDLE1BQU0seUJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFDSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkQsR0FBRyxDQUFDLE1BQU0seUJBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFBQSxDQUFDO0lBQ0ksWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzVELEdBQUcsQ0FBQyxNQUFNLHlCQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=