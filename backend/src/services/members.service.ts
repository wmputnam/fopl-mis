import membersDao from "../members/members.dao";
import { CRUD } from "../common/interface/crud.interface";
import { CreateMemberDto } from "../members/create.member.dto";
import { PutMemberDto } from "../members/put.member.dto";
import { PatchMemberDto } from "../members/patch.member.dto";

class MemberService implements CRUD {
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
  async getMemberByEmail(email: string) {
    return membersDao.getMemberByEmail(email);
  }
  async getMemberById(id: string) {
    return membersDao.getMemberById(id);
  }
}

export default new MemberService();