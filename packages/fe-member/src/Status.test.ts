/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "node:url";
import Status from "./Status.js";


const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: create`, function () {

  it('should return a newly constructed Status object with default methods and attributes', function () {
    const result = new Status();

    expect(result).to.be.an('object');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Status).to.be.true;
    expect(result.isActive).to.equal(false);
    expect(result.validPostMail).to.equal('none');
    expect(result.validEmail).to.equal('unchecked');
    expect(result.newsletterType).to.equal('none');
    expect(result.isNewMember).to.equal(true);

  });

});
