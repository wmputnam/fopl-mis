/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import { formatAmount } from "./MoneyListRow";

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
describe(`${fn()}: Remits list row formatAmount`, function () {

    formatAmountTestData().forEach((data) => {

        it.only(`should return formatted amount "${data.expectedResult.wholePart}" and leadingSpaces "${data.expectedResult.leadingSpaces}" when amount is "${data.amount}"`, async function () {
            const testResult = formatAmount(data.amount);
            console.log(`amount "${data.amount}" expectedResult: { wholePart: ${data.expectedResult.wholePart}, leadingSpaces: "${data.expectedResult.leadingSpaces}"}, actualResult: {wholePart: ${testResult.wholePart}, leadingSpaces: "${testResult.leadingSpaces}"}"`)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(testResult).not.to.be.null;
            expect(testResult).to.an('object');
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(testResult.wholePart).not.to.be.empty;
            expect(testResult.wholePart).to.be.equal(data.expectedResult.wholePart);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            // expect(testResult.leadingSpaces).not.to.be.empty;
            expect(testResult.leadingSpaces).to.be.equal(data.expectedResult.leadingSpaces);
        });

    });
});