import { expect } from "chai";

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: index test`, function () {
  it("should always pass", function () {
    expect(true).to.equal(true);
  });
});