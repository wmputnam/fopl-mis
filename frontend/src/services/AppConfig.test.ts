import { getServerUrl } from "./AppConfig";

/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: getServerUrl`, function () {

  it('should return a URL for the BE server', function () {
    const result = getServerUrl();
    expect(result).to.be.equal('http://localhost:3030');
  });

})