import { Selector } from "testcafe";

const getElementsByXpath = Selector((xpath: string) => {
  const interator: XPathResult =
    document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  const items: Node[] = [];

  let item = interator.iterateNext();

  while (item) {
    items.push(item);
    item = interator.iterateNext();
  }

  return items;
});

export default {};
export function xpathSelector(xpath: string): Selector {
  return Selector(getElementsByXpath(xpath));
}