import { expect } from "chai";
import membersDao from "./members.dao";
import { IMember } from "packages";
import mongoose from "mongoose";

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: addMember`, function () {

  it(`should return the new member id when creating a member`, async function () {
    const randomizer = Date.now();
    const memberId = await membersDao.addMember({
      firstName: `f${randomizer}`,
      lastName: `l${randomizer}`
    });
    expect(memberId).not.to.be.undefined;
  });

})

describe(`${fn()}: getMembers`, function () {
  let numberOfMembers: number;

  before(async function () {
    const allMemberList = await membersDao.getMembers();
    numberOfMembers = allMemberList.length;
  });


  it(`should return list of first 25 members when given no parameters`, async function () {
    const memberList = await membersDao.getMembers();
    expect(memberList).to.be.an('array');
    expect(memberList.length).to.be.lessThanOrEqual(25);
  });

  it(`should return list of first 10 members when given limit = 10 parameters`, async function () {
    const memberList = await membersDao.getMembers(10);
    expect(memberList).to.be.an('array');
    expect(memberList.length).to.be.lessThanOrEqual(10);
  });


  it(`should return list of page *page* *limit*  members when given limit and page parameters`, async function () {
    if (numberOfMembers > 10) {
      const memberList = await membersDao.getMembers(5, 1);
      expect(memberList).to.be.an('array');
      expect(memberList.length).to.be.equal(5);
    } else {
      this.skip();
    }
  });

});

const dorfId = "303030303030303030303030"
describe(`${fn()}: getMemberById`, function () {

  let memberId: string;

  before(async function () {
    const memberList = await membersDao.getMembers(1);
    if (memberList && memberList[0] && memberList[0]['_id']) {
      memberId = memberList[0]['_id'];
      console.log(`using ${memberId}`)
      const memberIdObj = new mongoose.Types.ObjectId(memberId);
      console.log(`${JSON.stringify(memberIdObj)} -- ${Object.keys(memberIdObj)}`)
    }
  });

  it(`should return data for member specified by memberId parameter`, async function () {
    const member = await membersDao.getMemberById(memberId);
    expect(member).not.to.be.null;
    if (member) {
      const memberIdAsString = new String(memberId);
      const returnedMemberIdAsString = new String(member['_id'])
      expect(returnedMemberIdAsString.trim()).to.equal(memberIdAsString.trim());
    }
  });

  it(`should return null when given memberid parameter that does not exist`, async function () {
    const member = await membersDao.getMemberById(dorfId);
    expect(member).to.be.null;
  });

});

describe(`${fn()}: updateUserById`, function () {

  let testMemberId: string;
  before(async function () {
    const randomizer = Date.now();
    testMemberId = await membersDao.addMember({
      firstName: `f${randomizer} `,
      lastName: `l${randomizer} `
    });
  });

  function has_failed(it: Mocha.Context) {
    var failed = false;
    var tests = it?.test?.parent?.tests;
    for (var i = 0, limit = tests?.length ? tests?.length : 0; !failed && i < limit; ++i)
      failed = tests?.[i].state === "failed";
    return failed;
  }
  after(async function () {
    if (!has_failed(this)) {
      await membersDao.removeMemberById(testMemberId);
    }
  });

  it(`should update data for member specified by memberId and { } parameters`, async function () {
    const member = await membersDao.updateUserById(testMemberId, {});
    expect(member).not.to.be.null;
  });

  it(`should update data for member specified by memberId and memberFields parameters`, async function () {
    const member = await membersDao.updateUserById(testMemberId, { mmb: "VOL" });
    expect(member).not.to.be.null;

  });

  it(`should return null when given memberid parameter that does not exist`, async function () {
    const member = await membersDao.updateUserById(dorfId, { mmb: "VOL" });
    expect(member).to.be.undefined;
  });

});

// removeMemberById
describe(`${fn()}: removeMemberById`, function () {

  let testMemberId: string;

  before(async function () {
    const randomizer = Date.now();
    testMemberId = await membersDao.addMember({
      firstName: `f${randomizer} `,
      lastName: `l${randomizer} `
    });
  });

  function has_failed(it: Mocha.Context) {
    var failed = false;
    var tests = it?.test?.parent?.tests;
    for (var i = 0, limit = tests?.length ? tests?.length : 0; !failed && i < limit; ++i)
      failed = tests?.[i].state === "failed";
    return failed;
  }
  after(async function () {
    // if (!has_failed(this)) {
    //   await membersDao.removeMemberById(testMemberId);
    // }
  });

  it(`should delete document for member specified by memberId`, async function () {
    const result = await membersDao.removeMemberById(testMemberId);
    expect(result.acknowledged).to.be.true;
    expect(result.deletedCount).to.equal(1);
  });
  it(`should return ??? when given memberid parameter that does not exist`, async function () {
    const result = await membersDao.removeMemberById(dorfId);
    expect(result.acknowledged).to.be.true;
    expect(result.deletedCount).to.equal(0);
  });
});

// getMemberByEmail
describe(`${fn()}: getMemberByEmail`, function () {

  let email: string;

  before(async function () {
    const memberList = await membersDao.getMembers();
    for (let i = 0; i < memberList.length; i++) {
      const entry = memberList[i];
      if (entry?.email) {
        email = entry.email;
        break;
      }
    }
  });

  it(`should return data for member specified by email parameter`, async function () {
    if (email) {
      const member = await membersDao.getMemberByEmail(email);
      expect(member).not.to.be.null;
    } else {
      this.skip();
    }
  });

  it(`should return null when given email parameter that does not exist`, async function () {
    const member = await membersDao.getMemberById(dorfId);
    expect(member).to.be.null;
  });

});
