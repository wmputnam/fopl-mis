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
        }, { _id: false });
        this.volunteeerSchema = new this.Schema({
            role: String,
            lastWorkDate: Date,
        }, { _id: false });
        this.notesSchema = new this.Schema({
            date: Date,
            note: String,
        }, { _id: false });
        this.namesSchema = new this.Schema({
            firstName: String,
            lastName: String,
        }, { _id: false });
        this.statusSchema = new this.Schema({
            active: Boolean,
            postMail: Boolean,
            email: Boolean,
            newsletter: String, // newsletter: 'email' | 'post' | 'none';
        });
        this.memberSchema = new this.Schema({
            _id: String,
            firstName: { type: String, required: true, alias: "first name" },
            lastName: { type: String, required: true, alias: "last name" },
            names: { type: [this.namesSchema] },
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
            notes: { type: [this.notesSchema] },
            status: { type: this.statusSchema },
            mem: String,
            zip: String,
            plus4: String, // TODO remove after migration
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
            log(`updateUserById \n    ${JSON.stringify(memberFields)}`);
            const existingMember = yield this.Member.findOneAndUpdate({ _id: memberId }, memberFields, 
            // { $set: memberFields },
            { new: true })
                .exec().then((reslt) => log(`updatebyuserid result: ${JSON.stringify(reslt)}`))
                .catch((err) => log(`updatebyuserid err: ${JSON.stringify(err)}`));
            return existingMember;
        });
    }
    removeMemberById(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Member.deleteOne({ _id: memberId }).exec();
        });
    }
    getMemberByEmail(email) {
        return this.Member.findOne({ email: email }).exec();
    }
}
exports.default = new MembersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVtYmVycy9tZW1iZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVVBLDJGQUFrRTtBQUVsRSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0sVUFBVTtJQTBEZDtRQXpEQSx3Q0FBd0M7UUFDeEMsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLHFCQUFnQixHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBYTtZQUM3QyxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDYixFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFbkIscUJBQWdCLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFZO1lBQzVDLElBQUksRUFBRSxNQUFNO1lBQ1osWUFBWSxFQUFFLElBQUk7U0FDbkIsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLGdCQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFRO1lBQ25DLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLE1BQU07U0FDYixFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFbkIsZ0JBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQVE7WUFDbkMsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE1BQU07U0FDakIsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLGlCQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFTO1lBQ3JD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