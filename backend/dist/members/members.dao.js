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