/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../../../backend/src/app.js";
import { getServerUrl } from "../services/AppConfig.js";
import supertest from "supertest";
import { fileURLToPath } from "url";
import Save from "./DataUpdater.js";

const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function runDelay(time = 1000) {
  await delay(time);
}

const getTestPostPayload = () => {
  runDelay(2000);
  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}@gmail.com`,
    firstName: "William",
    lastName: "Putnam"
  };
  return testMemberBody;
}

const getTestPutPayload = () => {
  runDelay(2000);

  const testMemberBody = {
    firstName: "William.put",
    lastName: "Putnam.put"
  };
  return testMemberBody;
}

const getTestPostErrorPayload = () => {
  runDelay(2000);
  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}@gmail.com`,
    firstName: "William",
    lastName: "Putnam"
  };
  return testMemberBody;
}

describe(`${fn()}: Save`, function () {

  let request: supertest.SuperAgentTest;

  let testMemberId: string;

  before(async function () {
    request = supertest.agent(app);
    const res = await request.get("/members?limit=1");  // TODO check ou this bug
    testMemberId = res.body?.[0]?.['_id'];
  });

  it('should return successful POST result when member id is ""', async function () {
    const testPayload = getTestPostPayload();
    const res = await Save(getServerUrl(), testPayload, "");
    // console.log(JSON.stringify(res));
    const body = JSON.parse(res.text);  // TODO this being text and not a JSON object may be a bug
    const id = body.id;
    expect(res.req.method).to.be.equal('POST');
    expect(res.status).to.be.equal(200);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(id).not.to.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(id).not.to.be.null;
    expect(id).to.a('string');
  });

  it('should return successful POST result when member is not supplied', async function () {
    const testPayload = getTestPostPayload();
    const res = await Save(getServerUrl(), testPayload);
    // console.log(JSON.stringify(res));
    const body = JSON.parse(res.text);  // TODO this being text and not a JSON object may be a bug
    const id = body.id;
    expect(res.req.method).to.be.equal('POST');
    expect(res.status).to.be.equal(200);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(id).not.to.be.undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(id).not.to.be.null;
    expect(id).to.a('string');
  });

  it('should return successful PUT result when member is supplied', async function () {
    const testPayload = getTestPutPayload();
    const res = await Save(getServerUrl(), testPayload, testMemberId);
    // console.log(JSON.stringify(res));
    expect(res.req.method).to.be.equal('PUT');
    expect(res.status).to.be.equal(204);
  });

  it('should return error PUT result when member supplied as a different email', async function () {
    const testPayload = getTestPostErrorPayload();
    const res = await Save(getServerUrl(), testPayload, testMemberId);
    console.log(JSON.stringify(res));
    expect(res.req.method).to.be.equal('PUT');
    expect(res.status).to.be.equal(400);
    const body = JSON.parse(res.text);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(body.error).not.to.be.undefined;
    expect(body.error).to.be.an('array');
    expect(body.error.length).to.be.eq(1);
    expect(body.error[0]).to.be.equal('email supplied for the member different -- email');
  });


});