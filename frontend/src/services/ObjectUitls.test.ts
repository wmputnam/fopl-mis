/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import {
  isEmptyObject
} from "./ObjectUtils"


const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: isEmptyObject`, function () {

  it('should return true when object is empty', function () {
    const result = isEmptyObject({});
    expect(result).to.equal(true);
  });

  it('should return false when object is not empty', function () {
    const result = isEmptyObject({ name: "Fred" });
    expect(result).to.equal(false);
  });

});
