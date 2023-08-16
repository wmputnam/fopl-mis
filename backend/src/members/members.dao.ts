import { CreateMemberDto } from "./create.member.dto";
import { PatchMemberDto } from "./patch.member.dto";
import { PutMemberDto } from "./put.member.dto";
import { IMember } from "packages/member-shared";
import { Remittance } from "packages/Remittance";
import { Volunteer } from "packages/Volunteer";
import { Notes } from "packages/Notes";
import { Names } from "packages/Names";

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
  }, { _id: false })
  volunteeerSchema = new this.Schema<Volunteer>({
    role: String,
    lastWorkDate: Date,
  }, { _id: false })
  notesSchema = new this.Schema<Notes>({
    date: Date,
    note: String,
  }, { _id: false })
  namesSchema = new this.Schema<Names>({
    firstName: String,
    lastName: String,
  }, { _id: false })
  memberSchema = new this.Schema<IMember>({
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
    log(`updateUserById \n    ${JSON.stringify(memberFields)}`)
    const existingMember = await this.Member.findOneAndUpdate(
      { _id: memberId },
      memberFields,
      // { $set: memberFields },
      { new: true }
    )
      .exec().then((reslt) => log(`updatebyuserid result: ${JSON.stringify(reslt)}`))
      .catch((err) => log(`updatebyuserid err: ${JSON.stringify(err)}`));
    return existingMember;
  }
  async removeMemberById(memberId: string) {
    return this.Member.deleteOne({ _id: memberId }).exec();
  }
  getMemberByEmail(email: string) {
    return this.Member.findOne({ email: email }).exec();
  }
}
export default new MembersDao();