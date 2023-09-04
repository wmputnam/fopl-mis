import { expect } from "chai";
import debug from "debug";
import { generateErrorBody } from "./body.validation.middleware";
import { FieldValidationError } from "express-validator";

const log: debug.IDebugger = debug('app:body.validation.middleware');

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: generateErrorBody`, function () {

  it("should create an errors array for discovered errors", async function () {
    const fve: FieldValidationError[] = [];
    const errorBodyObj = generateErrorBody([
      { msg: "a firstName error", type: "field", path: "firstName", location: "body", value: null },
      { msg: "a lastName error", type: "field", path: "lastName", location: "body", value: null },
      { msg: "an error", type: "alternative", nestedErrors: fve },
    ]);

    expect(errorBodyObj.error).to.be.an('array');
    expect(errorBodyObj.error.length).to.equal(3);
  })

  it(`should return an empty array when there are no discovered errors`, async function () {
    const errorBodyObj = generateErrorBody([]);

    expect(errorBodyObj.error).to.be.an('array');
    expect(errorBodyObj.error.length).to.equal(0);
  });


});