import { CreateMemberDto } from "./create.member.dto";
import { PatchMemberDto } from "./patch.member.dto";
import { PutMemberDto } from "./put.member.dto";
import { IMember } from "packages/member-shared";
import { Remittance } from "packages/Remittance";
import { Volunteer } from "packages/Volunteer";

import mongooseService from "../common/services/mongoose.service";

import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug(`app:members-dao`);

class MembersDao {
  // members: Array<CreateMemberDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  remittanceSchema = new this.Schema<Remittance>({
    date: Date,
    amount: String,
    memo: String,
  }, { id: false })
  volunteeerSchema = new this.Schema<Volunteer>({
    role: String,
    lastWorkDate: Date,
  }, { id: false })
  memberSchema = new this.Schema<IMember>({
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

  }, { id: false })

  Member = mongooseService.getMongoose().model('Members', this.memberSchema);

  constructor() {
    log('Created new instance of MembersDao');
  }

  async addMember(memberFields: CreateMemberDto) {
    const memberId = shortid.generate();
    log(JSON.stringify(memberFields));
    const member = new this.Member({
      ...memberFields
    });
    member._id = memberId;
    try {
      log(JSON.stringify(member));
      await member.save();
    } catch (error) {
      log(`caught error(s) ${error}`);
      throw new Error(`caught error(s) ${error}`);
    }
    return memberId;
    //   this.members.push(member);
  }

  async getMembers(limit = 25, page = 0) {
    //   return this.members;
    return this.Member.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getMemberById(memberId: string) {
    log(`getMemberById(${memberId})`)
    //   return this.members.find((member:{id:string}) => member.id == memberId)
    return this.Member.findOne({ _id: memberId }).exec();
  }

  async updateUserById(
    memberId: string,
    memberFields: PatchMemberDto | PutMemberDto
  ) {
    const existingMember = await this.Member.findOneAndUpdate(
      { _id: memberId },
      { $set: memberFields },
      { new: true }
    )
      .exec();
    return existingMember;
  }
  async removeMemberById(memberId: string) {
    return this.Member.deleteOne({ _id: memberId }).exec();
    //   const objIndex = this.members.findIndex(
    //     (obj: {id:string}) => obj.id == memberId
    //   );
    //   this.members.splice(objIndex,1);
    //   return `${memberId} REMOVED`

  }
  getMemberByEmail(email: string) {
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
export default new MembersDao();