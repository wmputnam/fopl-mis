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
import mongoose, { Mongoose, Schema, SortOrder, } from "mongoose";

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

  collation = {
    locale: 'en',
    strength: 2,
    caseLevel: false,
    caseFirst: 'off'
  };

  memberSchema = new this.Schema<IMember>({
    _id: { type: this.Schema.ObjectId },
    firstName: { type: String, required: true }, //, alias: "first name" },
    lastName: { type: String, required: true }, //, alias: "last name" },
    names: { type: [this.namesSchema] },
    email: String,
    phone: String,
    address: String,
    unit: String,
    city: String,
    state: String,
    postalCode: String, //{ type: String, alias: "zipmerge" },
    volunteer: { type: [this.volunteeerSchema] },
    mmb: String,                     // TODO make this a calculated value
    paidThrough: Date, //{ type: Date, alias: "paid thru" },
    joined: Date,
    lastUpdated: Date, //{ type: Date, alias: "updated" },
    remittances: { type: [this.remittanceSchema] }, //, alias: "payment history" },
    notes: { type: [this.notesSchema] },
    isActive: Boolean,
    isNewMember: Boolean,
    validPostMail: String,
    validEmail: String,  // 'verified' | ' bounced' | 'unchecked' | 'none'
    newsletterType: String, // newsletter: 'email' | 'post' | 'none';
    mem: String,                        // TODO remove after migration
    zip: String,                        // TODO remove after migration
    plus4: String,                      // TODO remove after migration
  }, { id: false, collation: this.collation })

  collectionName: string;
  Member: any;

  constructor() {
    this.collectionName = "members";
    this.Member = mongooseService.getMongoose().model("Members", this.memberSchema, this.collectionName);
    log('Created new instance of MembersDao');
  }

  async addMember(memberFields: CreateMemberDto) {
    const updateDate = new Date();
    // const memberId = shortid.generate();
    let memberId;
    log(JSON.stringify(memberFields));
    const member = new this.Member({
      ...memberFields,
      lastUpdated: updateDate
    });
    member._id = new mongoose.Types.ObjectId();
    try {
      log(`member being saved: ${JSON.stringify(member)}`);
      await member.save();
      // const newMember = member.findOne();
      memberId = member._id;

    } catch (error) {
      log(`caught error(s) ${error}`);
      throw new Error(`caught error(s) ${error}`);
    }
    log(`saved member had id : ${memberId}`)
    return memberId;
    //   this.members.push(member);
  }

  async getMembers(limit = 25, page = 0) {
    log(`limit: ${limit}, page: ${page}`)
    const result: IMember[] = await this.Member.find()
      .sort({ lastName: 1, firstName: 1, _id: 1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
    return result;
  }

  async getMembersV1(limit = 25, page = 0,
    sort: string,
    filter: mongoose.FilterQuery<IMember> = {}
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

  async getMembersCountV1(
    filter: mongoose.FilterQuery<IMember> = {}
  ) {
    log(`getMembersCountV1 - `)
    //   return this.members;

    const result: number = await this.Member.find(filter)
      .count();
    log(`count returns ${result}`);
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
    const updateDate = new Date();
    log(`updateUserById \n    ${JSON.stringify(memberFields)}`)
    const existingMember = await this.Member.findOneAndUpdate(
      { _id: memberId },
      { ...memberFields, lastUpdated: updateDate },
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