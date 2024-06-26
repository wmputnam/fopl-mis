import { type CRUD } from "../common/index.js";
import {
  membersDao,
  CreateMemberDto,
  PutMemberDto,
  PatchMemberDto,
  PatchMemberStatusDto
} from "../members/index.js";

export class MemberService implements CRUD {
  async list(limit: number, page: number) {
    return membersDao.getMembers(limit, page);
  }

  async listV1(limit: number, page: number, sort: string, filter: Object) {
    return await membersDao.getMembersV1(limit, page, sort, filter);
  };

  async countV1(filter: Object) {
    return await membersDao.getMembersCountV1(filter);
  };

  async create(resource: CreateMemberDto) {
    return membersDao.addMember(resource);
  };

  async putById(id: string, resource: PutMemberDto): Promise<any> {
    return membersDao.updateUserById(id, resource)
  };

  async readById(id: string) {
    return membersDao.getMemberById(id);
  };

  async deleteById(id: string): Promise<any> {
    return membersDao.removeMemberById(id);
  };

  async patchById(id: string, resource: PatchMemberDto): Promise<any> {
    return membersDao.updateUserById(id, resource);
  };

  async patchStatus(id: string, resource: PatchMemberStatusDto): Promise<any> {
    return membersDao.updateUserById(id, resource);
  };

  async getMemberByEmail(email: string) {
    return membersDao.getMemberByEmail(email);
  };

  async getMemberById(id: string) {
    return membersDao.getMemberById(id);
  };

}
