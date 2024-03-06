import membersDao from "../members/members.dao";
import { CRUD } from "../common/interface/crud.interface";
import { CreateMemberDto } from "../members/create.member.dto";
import { PutMemberDto } from "../members/put.member.dto";
import { PatchMemberDto } from "../members/patch.member.dto";
import { PatchMemberStatusDto } from "../members/patch.member.status.dto";
import membersService from "./members.service";
import { IMemberDocument } from "../../../packages/member-document";

class MemberServiceStatus {

  async updateMemberStatus(id: string, resource: PatchMemberStatusDto): Promise<any> {
    const memberData: IMemberDocument | null = await membersService.getMemberById(id);
    if (memberData) {
      if (resource.isActive) {
        if (resource.isActive !== undefined) {
          memberData.isActive = resource.isActive
        }
        if (resource.validPostMail !== undefined) {
          memberData.validPostMail = resource.validPostMail
        }
        if (resource.validPostMail !== undefined) {
          memberData.validEmail = resource.validEmail
        }
        if (resource.newsletterType !== undefined) {
          memberData.newsletterType = resource.newsletterType
        }
        if (resource.isNewMember !== undefined) {
          memberData.isNewMember = resource.isNewMember
        }
      }
      return await membersDao.updateUserById(id, resource);
    }
  }

  async list(limit: number, page: number) {
    return membersDao.getMembers(limit, page);
  }

  async create(resource: CreateMemberDto) {
    return membersDao.addMember(resource);
  }

  async putById(id: string, resource: PutMemberDto): Promise<any> {
    return membersDao.updateUserById(id, resource)
  };

  async readById(id: string) {
    return membersDao.getMemberById(id);
  }

  async deleteById(id: string): Promise<any> {
    return membersDao.removeMemberById(id);
  }

  async patchById(id: string, resource: PatchMemberDto): Promise<any> {
    return membersDao.updateUserById(id, resource);
  }

  async patchStatus(id: string, resource: PatchMemberStatusDto): Promise<any> {
    return membersDao.updateUserById(id, resource);
  }

  async getMemberByEmail(email: string) {
    return membersDao.getMemberByEmail(email);
  }

  async getMemberById(id: string) {
    return membersDao.getMemberById(id);
  }
}

export default new MemberServiceStatus();