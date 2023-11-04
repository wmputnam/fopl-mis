/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import { resultingOptionsChange } from "./VolunteerRoleMultiselect.js";

const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

const formatAmountTestData = () => {
  return [
    { amount: "5", expectedResult: { wholePart: "5.00", leadingSpaces: "      " } },
    { amount: "5.00", expectedResult: { wholePart: "5.00", leadingSpaces: "      " } },
    { amount: "5.25", expectedResult: { wholePart: "5.25", leadingSpaces: "      " } },
    { amount: "50", expectedResult: { wholePart: "50.00", leadingSpaces: "     " } },
    { amount: "100", expectedResult: { wholePart: "100.00", leadingSpaces: "    " } },
    { amount: "5000", expectedResult: { wholePart: "5,000.00", leadingSpaces: "  " } },
    { amount: "999999", expectedResult: { wholePart: "999,999.00", leadingSpaces: "" } },
    { amount: "9999999", expectedResult: { wholePart: "9999999.00", leadingSpaces: "" } },
    { amount: "$5", expectedResult: { wholePart: "5.00", leadingSpaces: "      " } },
    { amount: "$5.00", expectedResult: { wholePart: "5.00", leadingSpaces: "      " } },
    { amount: "$5.25", expectedResult: { wholePart: "5.25", leadingSpaces: "      " } },
    { amount: "$50", expectedResult: { wholePart: "50.00", leadingSpaces: "     " } },
    { amount: "$100", expectedResult: { wholePart: "100.00", leadingSpaces: "    " } },
    { amount: "$5000", expectedResult: { wholePart: "5,000.00", leadingSpaces: "  " } },
    { amount: "$999999", expectedResult: { wholePart: "999,999.00", leadingSpaces: "" } },
    { amount: "$9999999", expectedResult: { wholePart: "9999999.00", leadingSpaces: "" } },
    { amount: "george", expectedResult: { wholePart: "george", leadingSpaces: "" } },
  ]
}
describe(`${fn()}: resultingOptionsChange`, function () {

  // formatAmountTestData().forEach((data) => {

    it.only(`should return old options when there is no update`, async function () {

      const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }], [{ label: 'book sale', value: 'book-sale' }]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(testResult).not.to.be.null;
      expect(testResult).to.an('object');
    });
  it.only(`should return new options when there is an added option`, async function () {

    const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }], [{ label: 'book sale', value: 'book-sale' },{label:'Hospitality',value:'hospitality'}]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testResult).not.to.be.null;
    expect(testResult).to.an('object');
  });
  it.only(`should return new options when there is an removed option`, async function () {

    const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }, { label: 'Hospitality', value: 'hospitality' }], [{ label: 'book sale', value: 'book-sale' } ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testResult).not.to.be.null;
    expect(testResult).to.an('object');
  });

  });
// });