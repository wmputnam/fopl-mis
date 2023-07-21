import app from "../../app";
// src/test/members/members.test.ts
import supertest from "supertest";
import { expect } from "chai";
import shortid from "shortid";
import mongoose from "mongoose";
import debug  from "debug";

const log:debug.IDebugger = debug('app:test-members');
let firstMemberIdTest = ''; //later to hold value returned by API
const randomizer = Date.now()
const firstMemberBody = {
  email: `wmputnam+${randomizer}@gmail.com`,
  firstName: "William",
  lastName: "Putnam"
}

const newFirstName = "Billy";
const newFirstName2 = "Bill";
const newLastName = "Robertsson-Putnam";

describe('members endpoints', function() {
  let request: supertest.SuperAgentTest;
  before(function() {
    // server = app.listen(3033);
    request = supertest.agent(app);
  });
  after(function(done) {
    // server.close( function() {
      mongoose.connection.close();
    // });
    done();
  })

  it("should allow a POST to /members", async function () {
    const res = await request.post("/members").send(firstMemberBody);

    firstMemberIdTest = res.body.id;
    expect(res.status).to.equal(200);
    expect( res.body).not.to.be.empty;
    expect( res.body ).to.be.an( 'object' );
    expect( res.body.id ).to.be.a( 'string');
  })

  it("should allow a GET to /members", async function () {
    const res = await request.get("/members").send();

    log(res.body);
    expect(res.status).to.equal(200);
    expect( res.body).not.to.be.empty;
    expect( res.body ).to.be.an( 'array' );
    // expect( res.body.id ).to.be.a( 'string');
    // firstMemberIdTest = res.body.id;
  })
  
  it(`should allow GET for a member by Id /members/:memberId`, async function () {
    log(`testing members/${firstMemberIdTest}`);
    const res = await request.get(`/members/${firstMemberIdTest}`).send();

    log(res.body);
    log(typeof res.body)
    expect(res.status).to.equal(200);
    expect( res.body).not.to.be.empty;
    expect( res.body ).to.be.an( 'object' );

  });

  it(`should allow PATCH for a member by Id /members/:memberId`, async function () {
    log(`testing PATCH members/${firstMemberIdTest}`);
    const patchBody = {
      ...firstMemberBody,
      firstName: newFirstName2
    }
    const res = await request.patch(`/members/${firstMemberIdTest}`).send(patchBody);
    // request.get(`/members/${firstMemberIdTest}`).send();

    log(res.body);
    log(typeof res.body)
    expect(res.status).to.equal(204);
    expect( res.body).to.be.empty;
    expect( res.body ).to.be.an( 'object' );

  });

  it(`should allow PUT for a member by Id /members/:memberId`, async function () {
    log(`testing PUT members/${firstMemberIdTest}`);
    const patchBody = {
      ...firstMemberBody,
      firstName: newFirstName,
      lastName: newLastName
    }
    const res = await request.put(`/members/${firstMemberIdTest}`).send(patchBody);
    // request.get(`/members/${firstMemberIdTest}`).send();

    log(res.body);
    log(typeof res.body)
    expect(res.status).to.equal(204);
    expect( res.body).to.be.empty;
    expect( res.body ).to.be.an( 'object' );

  });

});
