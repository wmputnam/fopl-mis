import app from "../app";
import supertest from "supertest";
import { expect } from "chai";
import debug from "debug";
import membersService from "./members.service";

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: getMemberById`, function () {
  let request: supertest.SuperAgentTest;

  before(async function () {
    request = supertest.agent(app);
  });

  after(function (done) {
    done();
  });




  it(`should return member from db when given a valid id`, async function () {
    async function getActiveMemberId() {
      const res = await request.get("/members").send();
      return res.body[0]['_id'];
    }

    const testMemberId = await getActiveMemberId();
    const member = await membersService.getMemberById(testMemberId);
    expect(member).not.to.be.empty;
  });


  it(`should return null from db when given an invalid id`, async function () {
    const testMemberId = 'duncell';
    const member = await membersService.getMemberById(testMemberId);
    expect(member).to.be.null;
  });
})