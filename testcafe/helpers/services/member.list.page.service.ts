import { Selector } from "testcafe";
import MemberSearchCriteriaInterface from "../interfaces/member.search.criteria"
export default class MemberListPageService {
  static async findMemberOnListPage(t: TestController, criteria: MemberSearchCriteriaInterface): Promise<any> {
    let selectorString
    if (criteria.mmb) {
      selectorString = '.member-row--mmb';
    } else {
      selectorString = '.member-row--mmb';
    }
    const rowCount = await Selector(selectorString).count
    for (let i = 1; i <= rowCount + 1; i++) {
      const searchSelector = Selector(selectorString).nth(i).parent('.member-row');
      const foundRow = await searchSelector();
      if (foundRow && foundRow.getAttribute) {
        const mmb = await searchSelector().child('.member-row--mmb.col').textContent;
        if (mmb === criteria.mmb) {
          const memberId = await foundRow.getAttribute('data-id');
          return memberId;
        }
      }
    }
    return "";
  }
}