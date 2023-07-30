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
        this.remittanceSchema = new this.Schema({
            date: Date,
            amount: String,
            memo: String,
        }, { id: false });
        this.volunteeerSchema = new this.Schema({
            role: String,
            lastWorkDate: Date,
        }, { id: false });
        this.memberSchema = new this.Schema({
            _id: String,
            firstName: { type: String, required: true, alias: "first name" },
            lastName: { type: String, required: true, alias: "last name" },
            email: String,
            phone: String,
            address: String,
            unit: String,
            city: String,
            state: String,
            postalCode: { type: String, alias: "zipmerge" },
            volunteerPreferences: { type: [this.volunteeerSchema], alias: "volunteer" },
            mmb: String,
            paidThrough: { type: Date, alias: "paid thru" },
            joined: Date,
            lastUpdated: { type: Date, alias: "updated" },
            remittances: { type: [this.remittanceSchema], alias: "payment history" },
        }, { id: false });
        this.Member = mongoose_service_1.default.getMongoose().model('Members', this.memberSchema);
        log('Created new instance of MembersDao');
    }
    addMember(memberFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberId = shortid_1.default.generate();
            log(JSON.stringify(memberFields));
            const member = new this.Member(Object.assign({}, memberFields));
            member._id = memberId;
            try {
                log(JSON.stringify(member));
                yield member.save();
            }
            catch (error) {
                log(`caught error(s) ${error}`);
                throw new Error(`caught error(s) ${error}`);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVtYmVycy9tZW1iZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU9BLDJGQUFrRTtBQUVsRSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0sVUFBVTtJQW1DZDtRQWxDQSx3Q0FBd0M7UUFDeEMsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLHFCQUFnQixHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBYTtZQUM3QyxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDYixFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDakIscUJBQWdCLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFZO1lBQzVDLElBQUksRUFBRSxNQUFNO1lBQ1osWUFBWSxFQUFFLElBQUk7U0FDbkIsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pCLGlCQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFVO1lBQ3RDLEdBQUcsRUFBRSxNQUFNO1lBQ1gsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7WUFDaEUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7WUFDOUQsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxNQUFNO1lBQ2YsSUFBSSxFQUFFLE1BQU07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