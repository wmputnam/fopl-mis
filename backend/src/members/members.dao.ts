import { CreateMemberDto } from "./create.member.dto";
import { PatchMemberDto } from "./patch.member.dto";
import { PutMemberDto } from "./put.member.dto";

import mongooseService from "../common/services/mongoose.service";

import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug(`app:members-dao`);

class MembersDao {
  // members: Array<CreateMemberDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  memberSchema = new this.Schema({
    _id: String,
    email: String,
    firstName: String,
    lastName: String,
  }, {id:false})

  Member = mongooseService.getMongoose().model('Members',this.memberSchema);

  constructor() {
    log('Created new instance of MembersDao');
  }

  async addMember( memberFields:CreateMemberDto) {
    const memberId = shortid.generate();
    const member = new this.Member({
      _id: memberId,
      ...memberFields
    });
    await member.save();
    return memberId;
  //   this.members.push(member);
  }

  async getMembers(limit  = 25, page = 0) {
  //   return this.members;
    return this.Member.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getMemberById( memberId:string ) {
    log(`getMemberById(${memberId})`)
  //   return this.members.find((member:{id:string}) => member.id == memberId)
    return this.Member.findOne({ _id: memberId }).exec();
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
  async updateUserById(
    memberId: string,
    memberFields: PatchMemberDto | PutMemberDto
  ) {
    const existingMember = await this.Member.findOneAndUpdate(
      { _id: memberId },
      { $set: memberFields },
      { new: true}
    )
    .exec();
    return existingMember;
  }
  async removeMemberById( memberId:string) {
    return this.Member.deleteOne({ _id: memberId}).exec();
  //   const objIndex = this.members.findIndex(
  //     (obj: {id:string}) => obj.id == memberId
  //   );
  //   this.members.splice(objIndex,1);
  //   return `${memberId} REMOVED`
  
  }
  getMemberByEmail(email:string) {
    return this.Member.findOne({ email: email}).exec();
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