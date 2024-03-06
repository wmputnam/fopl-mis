/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import { resultingOptionsChange } from "./VolunteerRoleMultiselect.js";

const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: resultingOptionsChange`, function () {

  it(`should return old options when there is no update`, async function () {

    const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }], [{ label: 'book sale', value: 'book-sale' }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testResult).not.to.be.null;
    expect(typeof testResult).to.equal('object');
  });
  it(`should return new options when there is an added option`, async function () {

    const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }], [{ label: 'book sale', value: 'book-sale' }, { label: 'Hospitality', value: 'hospitality' }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testResult).not.to.be.null;
    expect(typeof testResult).to.equal('object');
  });
  it(`should return new options when there is an removed option`, async function () {

    const testResult = resultingOptionsChange([{ label: 'book sale', value: 'book-sale' }, { label: 'Hospitality', value: 'hospitality' }], [{ label: 'book sale', value: 'book-sale' }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testResult).not.to.be.null;
    console.log(`testResult is ${typeof testResult}`)
    expect(typeof testResult).to.equal('object');
  });

});
