import { Selector } from "testcafe";
import MemberSearchCriteriaInterface from "../interfaces/member.search.criteria"
export default class MemberListPageService {
  static async findMemberOnListPage(t: TestController, criteria: MemberSearchCriteriaInterface): Promise<any> {
    let selectorString
    if (criteria.mmb) {
      selectorString = '.member-row--mmb';
    }
    const searchSelector = Selector(selectorString).nth(1).parent('.member-row');
    const foundRow = await searchSelector();
    if (foundRow && foundRow.getAttribute) {
      return foundRow.getAttribute('data-id');
    } else {
      return "";
    }
  }
}