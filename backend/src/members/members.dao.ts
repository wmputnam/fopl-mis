import { CreateMemberDto } from "./create.member.dto";
import { PatchMemberDto } from "./patch.member.dto";
import { PutMemberDto } from "./put.member.dto";
import { IMember } from "packages/member-shared";
import { Remittance } from "packages/Remittance";
import { Volunteer } from "packages/Volunteer";
import { Notes } from "packages/Notes";
import { Names } from "packages/Names";
import { IStatus } from "packages/IStatus";

import mongooseService from "../common/services/mongoose.service";

import shortid from "shortid";
import debug from "debug";
import { Mongoose, SortOrder } from "mongoose";

const log: debug.IDebugger = debug(`app:members-dao`);

class MembersDao {
  // members: Array<CreateMemberDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  remittanceSchema = new this.Schema<Remittance>({
    date: Date,
    amount: String,
    memo: String,
  }, { _id: false });

  volunteeerSchema = new this.Schema<Volunteer>({
    role: String,
    lastWorkDate: Date,
  }, { _id: false });

  notesSchema = new this.Schema<Notes>({
    date: Date,
    note: String,
  }, { _id: false });

  namesSchema = new this.Schema<Names>({
    firstName: String,
    lastName: String,
  }, { _id: false });

  // statusSchema = new this.Schema<IStatus>({
  //   isActive: Boolean,
  //   isNewMember:Boolean,
  //   validPostMail: Boolean,
  //   validEmail: String,  // 'verified' | ' bounced' | 'unchecked' | 'none'
  //   newsletterType: String, // newsletter: 'email' | 'post' | 'none';
  // })
  memberSchema = new this.Schema<IMember>({
    _id: { type: this.Schema.ObjectId },
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
    mmb: String,                     // TODO make this a calculated value
    paidThrough: { type: Date, alias: "paid thru" },
    joined: Date,
    lastUpdated: { type: Date, alias: "updated" },
    remittances: { type: [this.remittanceSchema], alias: "payment history" },
    notes: { type: [this.notesSchema] },
    isActive: Boolean,
    isNewMember: Boolean,
    validPostMail: Boolean,
    validEmail: String,  // 'verified' | ' bounced' | 'unchecked' | 'none'
    newsletterType: String, // newsletter: 'email' | 'post' | 'none';
    mem: String,                        // TODO remove after migration
    zip: String,                        // TODO remove after migration
    plus4: String,                      // TODO remove after migration
  }, { id: false })

  collectionName: string;
  Member: any;

  constructor() {
    this.collectionName = "members";
    this.Member = mongooseService.getMongoose().model("Members", this.memberSchema, this.collectionName);
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
    log(`limit: ${limit}, page: ${page}`)
    const result: IMember[] = await this.Member.find()
      .sort({ lastname: 1, firstName: 1, _id: 1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
    return result;
  }

  async getMembersV1(limit = 25, page = 0,
    sort: string = "lastname firstName _id",
    filter: Object  // TODO make this into a MongoDB/mongoose query
  ) {
    log(`getMembersV1 - limit: ${limit}, page: ${page}, sort: ${sort}`)
    //   return this.members;

    const result: IMember[] = await this.Member.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(limit * page)
      .exec();
    log(`get returns ${result.length}`);
    return result;
  }

  async getMemberById(memberId: string) {
    log(`getMemberById(${memberId})`)
    //   return this.members.find((member:{id:string}) => member.id == memberId)
    const result = await this.Member.findById(memberId).exec();
    log(`result:\n${result}`);
    return result;
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
      .exec().then((reslt: any) => log(`updatebyuserid result: ${JSON.stringify(reslt)}`))
      .catch((err: any) => log(`updatebyuserid err: ${JSON.stringify(err)}`));
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