import app from "../../app";
import supertest from "supertest";
import { expect } from "chai";
import debug from "debug";

const log: debug.IDebugger = debug('app:test-members');


const fn = () => `${__filename.split('/').pop()}`;
function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function runDelay(time = 1000) {
  await delay(time);
}

describe(`${fn()}: members GET`, function () {
  let request: supertest.SuperAgentTest;

  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}@gmail.com`,
    firstName: "William",
    lastName: "Putnam"
  };

  let testMemberId = '';


  before(async function () {
    request = supertest.agent(app);
    const res = await request.post("/members").send(testMemberBody);
    testMemberId = res.body.id;
  });

  after(function (done) {
    done();
  })

  it("should allow a GET to /members", async function () {
    const res = await request.get("/members").send();

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('array');
  })

  it(`should allow GET for a member by Id /members/:memberId`, async function () {
    log(`testing members/${testMemberId}`);
    const res = await request.get(`/members/${testMemberId}`).send();

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');

  });

  it(`should return error from GET for a member by Id /members/:memberId when memberId is not found`, async function () {
    const res = await request.get(`/members/duncell`).send();

    expect(res.status).to.equal(404);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain("Member duncell not found -- memberId");
  });
});

describe(`${fn()}: member POST`, function () {

  let request: supertest.SuperAgentTest;



  const randomizer = Date.now();

  runDelay(5000);

  const testMemberBody = {
    email: `wmputnam+${randomizer}.post@gmail.com`,
    firstName: "William_post",
    lastName: "Putnam+post"
  };

  runDelay(5000);

  const testDuplicateMemberBody = {
    email: `wmputnam+${randomizer}.dup@gmail.com`,
    firstName: "William_dup",
    lastName: "Putnam+dup"
  };

  let dupTestMemberId;

  async function setUpDupTest() {
    const res = await request.post("/members").send(testDuplicateMemberBody);
    dupTestMemberId = res.body.id;
    expect(dupTestMemberId).not.to.be.undefined;
    expect(dupTestMemberId).not.to.be.empty;
  }

  before(async function (done) {
    request = supertest.agent(app);
    done();
  });

  after(function (done) {
    done();
  })

  it("should allow a POST to /members", async function () {
    const res = await request.post("/members").send(testMemberBody);

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
  });

  it("should return  error from POST to /members when member already exists having the given email", async function () {

    await setUpDupTest()

    const res = await request.post("/members").send(testDuplicateMemberBody);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain('member already exists with provided email -- email');
  });

  it(`should return error from POST when firstName is not provided`, async function () {
    const res = await request.post(`/members`).send({ lastName: testMemberBody.lastName });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(2);
    expect(res.body.error).to.contain('firstname is a required field -- firstName');
    expect(res.body.error).to.contain('firstname cannot be empty -- firstName');
  });

  it(`should return error from POST when firstName is empty`, async function () {
    const res = await request.post(`/members`).send({ ...testMemberBody, firstName: '' });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.contain('firstname cannot be empty -- firstName');
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
  });

  it(`should return error from POST when lastName is not provided`, async function () {
    const res = await request.post(`/members`).send({ firstName: testMemberBody.firstName });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(2);
    expect(res.body.error).to.contain('lastname is a required field -- lastName');
    expect(res.body.error).to.contain('lastname cannot be empty -- lastName');
  });

  it(`should return error from POST when lastName is empty`, async function () {
    const res = await request.post(`/members`).send({ ...testMemberBody, lastName: '' });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain('lastname cannot be empty -- lastName');
  });

  it(`should return error from POST when neither firstname nor lastName provided`, async function () {
    const res = await request.post(`/members`).send({ email: 'test@test.it' });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(4);
    expect(res.body.error).to.contain('firstname is a required field -- firstName');
    expect(res.body.error).to.contain('firstname cannot be empty -- firstName');
    expect(res.body.error).to.contain('lastname is a required field -- lastName');
    expect(res.body.error).to.contain('lastname cannot be empty -- lastName');
  });
});

describe(`${fn()}: member PUT`, function () {

  let request: supertest.SuperAgentTest;

  let testMemberId = '';

  runDelay();
  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}.put@gmail.com`,
    firstName: "William.put",
    lastName: "Putnam.put"
  };

  const newFirstName = "Billy";

  const newLastName = "Robertsson-Putnam";

  before(async function () {
    request = supertest.agent(app);
    const res = await request.post("/members").send(testMemberBody);
    testMemberId = res.body.id;
  });

  after(function (done) {
    done();
  });

  it(`should allow PUT for a member by Id /members/:memberId`, async function () {
    log(`testing PUT members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: newFirstName,
      lastName: newLastName
    }
    const res = await request.put(`/members/${testMemberId}`).send(patchBody);
    expect(res.status).to.equal(204);
    expect(res.body).to.be.empty;
    expect(res.body).to.be.an('object');
  });

  it(`should return error PUT for a member by Id /members/:memberId when not present`, async function () {
    log(`testing PUT members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: newFirstName,
      lastName: newLastName
    }
    const res = await request.put(`/members/putcell`).send(patchBody);
    expect(res.status).to.equal(404);
    expect(res.body.error).to.contain('Member putcell not found -- memberId');
    expect(res.body).to.be.an('object');
  });

  it(`should return error PUT when sending an empty firstName`, async function () {
    log(`testing PUT members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: '',
      lastName: newLastName
    }
    const res = await request.put(`/members/${testMemberId}`).send(patchBody);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain('firstname cannot be empty -- firstName');
  });

  it(`should return error PUT when sending an empty lastName`, async function () {
    log(`testing PUT members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: newFirstName,
      lastName: ''
    }
    const res = await request.put(`/members/${testMemberId}`).send(patchBody);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain('lastname cannot be empty -- lastName');
  });

  it(`should return error PUT when sending a different email address`, async function () {
    log(`testing PUT members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      email: 'test@test.it'
    }
    const res = await request.put(`/members/${testMemberId}`).send(patchBody);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('array');
    expect(res.body.error.length).to.equal(1);
    expect(res.body.error).to.contain('email supplied for the member different -- email');
  });
});

describe(`${fn()}: member PATCH`, function () {

  let request: supertest.SuperAgentTest;

  let testMemberId = '';

  runDelay();

  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}.patch@gmail.com`,
    firstName: "William.patch",
    lastName: "Putnam.patch"
  };

  const newFirstName2 = "Bill";

  before(async function () {
    request = supertest.agent(app);
    const res = await request.post("/members").send(testMemberBody);
    testMemberId = res.body.id;

  });

  after(function (done) {
    done();
  });

  it(`should allow PATCH for a member by Id /members/:memberId`, async function () {
    log(`testing PATCH members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: newFirstName2
    }
    const res = await request.patch(`/members/${testMemberId}`).send(patchBody);

    expect(res.status).to.equal(204);
    expect(res.body).to.be.empty;
    expect(res.body).to.be.an('object');

  });

  it(`should return error from PATCH member not found`, async function () {
    log(`testing PATCH members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: newFirstName2
    }
    const res = await request.patch(`/members/patchcell`).send(patchBody);

    expect(res.status).to.equal(404);
    expect(res.body.error).to.contain('Member patchcell not found -- memberId');
    expect(res.body).to.be.an('object');

  });

  it(`should return error when PATCH has empty firstName`, async function () {
    log(`testing PATCH members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      firstName: ''
    }
    const res = await request.patch(`/members/${testMemberId}`).send(patchBody);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.contain('firstname cannot be empty -- firstName');
  });

  it(`should return error when PATCH has empty lastName`, async function () {
    log(`testing PATCH members/${testMemberId}`);
    const patchBody = {
      ...testMemberBody,
      lastName: ''
    }
    const res = await request.patch(`/members/${testMemberId}`).send(patchBody);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.contain('lastname cannot be empty -- lastName');
  });
});

describe(`${fn()}: member DELETE`, function () {

  let request: supertest.SuperAgentTest;

  let testMemberId = '';

  runDelay();

  const randomizer = Date.now();

  const testMemberBody = {
    email: `wmputnam+${randomizer}.del@gmail.com`,
    firstName: "William_del",
    lastName: "Putnam_del"
  };

  before(async function () {
    request = supertest.agent(app);
    const res = await request.post("/members").send(testMemberBody);
    testMemberId = res.body.id;

  });

  after(function (done) {
    done();
  })

  it("should allow DELETE of existing member", async function () {
    const res = await request.delete(`/members/${testMemberId}`);
    expect(res.status).to.equal(204);
    expect(res.body).to.be.empty;
    expect(res.body).to.be.an('object');
  });

  it("should return error for DELETE of non-existing member", async function () {
    const expectedError = 'Member dorf not found -- memberId'
    const res = await request.delete(`/members/dorf`);

    expect(res.status).to.equal(404);
    expect(res.body.error).to.contain(expectedError);
    expect(res.body).to.be.an('object');
  });


});