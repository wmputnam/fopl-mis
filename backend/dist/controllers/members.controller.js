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
const util_1 = __importDefault(require("util"));
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
                const errBody = { error: [`${error}`] };
                res.status(400).send(errBody);
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
            log(`put body ${JSON.stringify(req.body)}`);
            log(`put request\n     ${util_1.default.inspect(req)}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL21lbWJlcnMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtGQUF5RDtBQUN6RCxrREFBMEI7QUFFMUIsZ0RBQXdCO0FBRXhCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRTdELE1BQU0saUJBQWlCO0lBQ2YsV0FBVyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzNELE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUNLLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM3RCxNQUFNLE1BQU0sR0FBRyxNQUFNLHlCQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0QsR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsQ0FBQztLQUFBO0lBQ0ssWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzVELElBQUksUUFBUSxDQUFDO1lBQ2IsSUFBSTtnQkFDRixRQUFRLEdBQUcsTUFBTSx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEQ7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxNQUFNLE9BQU8sR0FBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFFdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzdCLE9BQU87YUFDUjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBQ0ssS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3JELEdBQUcsQ0FBQyxNQUFNLHlCQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBQ0ssR0FBRyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ25ELEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUMzQyxHQUFHLENBQUMscUJBQXFCLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLHlCQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUNJLFlBQVksQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM1RCxHQUFHLENBQUMsTUFBTSx5QkFBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksaUJBQWlCLEVBQUUsQ0FBQyJ9