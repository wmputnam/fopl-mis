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
const mongoose_service_1 = __importDefault(require("../common/services/mongoose.service"));
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)(`app:members-dao`);
class MembersDao {
    constructor() {
        // members: Array<CreateMemberDto> = [];
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.memberSchema = new this.Schema({
            _id: String,
            email: String,
            firstName: String,
            lastName: String,
        }, { id: false });
        this.Member = mongoose_service_1.default.getMongoose().model('Members', this.memberSchema);
        log('Created new instance of MembersDao');
    }
    addMember(memberFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberId = shortid_1.default.generate();
            const member = new this.Member(Object.assign({ _id: memberId }, memberFields));
            yield member.save();
            return memberId;
            //   this.members.push(member);
        });
    }
    getMembers(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            //   return this.members;
            return this.Member.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    getMemberById(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            log(`getMemberById(${memberId})`);
            //   return this.members.find((member:{id:string}) => member.id == memberId)
            return this.Member.findOne({ _id: memberId }).exec();
        });
    }
    // async putMemberById(memberId:string, member:PutMemberDto) {
    //   const objIndex = this.members.findIndex(
    //     (obj: {id:string}) => obj.id == memberId
    //   );
    //   this.members.splice(objIndex,1,member);
    //   return `${memberId} updated via PUT`
    // }
    // async patchMemberById(memberId:string, member:PatchMemberDto) {
    //   const objIndex = this.members.findIndex(
    //     (obj: {id:string}) => obj.id == memberId
    //   );
    //   let currentMember = this.members[objIndex];
    //   const allowedPatchFields = [
    //     'firstName',
    //     'lastName',
    //     'email'
    //   ];
    //   for( let field of allowedPatchFields) {
    //     if (field in member) {
    //       // @ts-ignore
    //       currentMember[field] = member[field];
    //     }
    //   }
    //   this.members.splice(objIndex,1,currentMember);
    //   return `${memberId} updated via PATCH`
    // }
    updateUserById(memberId, memberFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMember = yield this.Member.findOneAndUpdate({ _id: memberId }, { $set: memberFields }, { new: true })
                .exec();
            return existingMember;
        });
    }
    removeMemberById(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Member.deleteOne({ _id: memberId }).exec();
            //   const objIndex = this.members.findIndex(
            //     (obj: {id:string}) => obj.id == memberId
            //   );
            //   this.members.splice(objIndex,1);
            //   return `${memberId} REMOVED`
        });
    }
    getMemberByEmail(email) {
        return this.Member.findOne({ email: email }).exec();
        //   const objIndex = this.members.findIndex(
        //     (obj: {email:string}) => obj.email === email
        //   );
        //   let currentMember = this.members[objIndex];
        //   if (currentMember) {
        //     return currentMember;
        //   } else {
        //     return null;
        //   }
    }
}
exports.default = new MembersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVtYmVycy9tZW1iZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUlBLDJGQUFrRTtBQUVsRSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0sVUFBVTtJQWFkO1FBWkEsd0NBQXdDO1FBQ3hDLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxpQkFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxNQUFNO1lBQ2IsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE1BQU07U0FDakIsRUFBRSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO1FBRWQsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFHeEUsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVLLFNBQVMsQ0FBRSxZQUE0Qjs7WUFDM0MsTUFBTSxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLGlCQUM1QixHQUFHLEVBQUUsUUFBUSxJQUNWLFlBQVksRUFDZixDQUFDO1lBQ0gsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsT0FBTyxRQUFRLENBQUM7WUFDbEIsK0JBQStCO1FBQy9CLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxLQUFLLEdBQUksRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDOztZQUN0Qyx5QkFBeUI7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtpQkFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDbEIsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUUsUUFBZTs7WUFDbEMsR0FBRyxDQUFDLGlCQUFpQixRQUFRLEdBQUcsQ0FBQyxDQUFBO1lBQ25DLDRFQUE0RTtZQUMxRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsQ0FBQztLQUFBO0lBRUQsOERBQThEO0lBQzlELDZDQUE2QztJQUM3QywrQ0FBK0M7SUFDL0MsT0FBTztJQUNQLDRDQUE0QztJQUM1Qyx5Q0FBeUM7SUFDekMsSUFBSTtJQUNKLGtFQUFrRTtJQUNsRSw2Q0FBNkM7SUFDN0MsK0NBQStDO0lBQy9DLE9BQU87SUFDUCxnREFBZ0Q7SUFDaEQsaUNBQWlDO0lBQ2pDLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLE9BQU87SUFDUCw0Q0FBNEM7SUFDNUMsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0Qiw4Q0FBOEM7SUFDOUMsUUFBUTtJQUNSLE1BQU07SUFDTixtREFBbUQ7SUFDbkQsMkNBQTJDO0lBQzNDLElBQUk7SUFDRSxjQUFjLENBQ2xCLFFBQWdCLEVBQ2hCLFlBQTJDOztZQUUzQyxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQ3ZELEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQ2I7aUJBQ0EsSUFBSSxFQUFFLENBQUM7WUFDUixPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFDSyxnQkFBZ0IsQ0FBRSxRQUFlOztZQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEQsNkNBQTZDO1lBQzdDLCtDQUErQztZQUMvQyxPQUFPO1lBQ1AscUNBQXFDO1lBQ3JDLGlDQUFpQztRQUVqQyxDQUFDO0tBQUE7SUFDRCxnQkFBZ0IsQ0FBQyxLQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCw2Q0FBNkM7UUFDN0MsbURBQW1EO1FBQ25ELE9BQU87UUFDUCxnREFBZ0Q7UUFDaEQseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1QixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLE1BQU07SUFDTixDQUFDO0NBQ0Y7QUFDRCxrQkFBZSxJQUFJLFVBQVUsRUFBRSxDQUFDIn0=