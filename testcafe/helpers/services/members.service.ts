import { AddMemberInterface, MemberNoteInterface } from "../interfaces/add.member.inferface";

export default class MemberService {

  t: TestController;

  addNewMemberViaApi: (newMember: AddMemberInterface) => Promise<string>;


  constructor(t: TestController) {
    this.t = t;

    this.addNewMemberViaApi = async (newMember: AddMemberInterface): Promise<string> => {
      const url = "http://localhost:3030/members";

      const resp = await t.request.post({
        url: url,
        body: {
          isActive: true,
          ...newMember
        }
      });
      if (resp.status && resp.status === 200) {
        if (resp.body) {
          const bbody: any = resp.body as Object;
          if (bbody.id && typeof bbody.id === 'string') {
            return bbody["id"];
          }
        }
        return `resp.body: ${JSON.stringify(resp.body)}`
      } else {
        return `status: ${resp.status} -- ${resp.statusText}`;
      }
    };
  }

}
