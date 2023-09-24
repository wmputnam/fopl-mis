import { Selector } from "testcafe";
import { xpathSelector } from "../utilities/xpath-selector";
import MemberRemitPage from "../../page-objects/member.remit.page";

export default class MemberRemitsPageService {
  static async findMostRecentEntryOnPage(t: TestController, criteria: 'dues' | 'donation' = 'dues'): Promise<any> {
    const memoSelector = MemberRemitPage.memo.withExactText(criteria);
    const rowCount = await memoSelector().count;
    const dateSelector = MemberRemitPage.date((rowCount + 1).toString());
    const amountSelector = MemberRemitPage.amount((rowCount + 1).toString());
    const foundDate = await dateSelector
      .textContent;
    const foundAmount = await amountSelector
      .textContent;
    return { date: foundDate, amount: foundAmount, memo: criteria };
  }
}