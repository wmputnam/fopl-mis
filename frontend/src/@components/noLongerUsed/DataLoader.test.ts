/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../../../../backend/src/app.js";
import loadData from "./DataLoader.js";
import { getServerUrl } from "../../services/AppConfig.js";
import supertest from "supertest";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: loadData`, function () {

  let request: supertest.SuperAgentTest;

  let testMemberId: string;

  before(async function () {
    request = supertest.agent(app);
    const res = await request.get("/members?limit=1");
    testMemberId = res.body?.[0]?.['_id'];
  });

  it('should return an {} object for a new member', async function () {
    const member = await loadData('s', "new", "dorf");
    expect(member).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member).to.be.empty;
  });

  it('should return fetched data object for an existing member from supplied server', async function () {
    const res = await loadData(getServerUrl(), "edit", testMemberId);
    const member = res.body
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member).not.to.be.empty;
    expect(member?.['_id']).to.be.equal(testMemberId);

  });

  it('should return error when server returns a 200+ and <500 status', async function () {
    const res = await loadData(getServerUrl(), "edit", testMemberId + 'dorf');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(res.status).to.be.equal(404);
  });

});