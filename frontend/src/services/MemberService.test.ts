/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import { Member } from "./Member";
import { MemberService } from "./MemberService";
import shortid from "shortid";
import { MemberViewStates } from "../@interfaces/enums";
import { IMember } from "packages";
import { Remittance } from "packages/Remittance";
import { IAddress } from "packages/IAddress";

const getTestImember = () => ({
  lastName: "Wang",
  firstName: "Xiaowei",
  _id: shortid()
});

const getFm4TestData = () => {
  const testMember = Member.create();
  testMember.firstName = "Cliff";
  testMember.lastName = "Castillo";
  testMember.email = "not.me@test.it";
  testMember.phone = "414-555-1212";
  testMember.address = "100 Manor Ln";
  testMember.unit = "Bed 300";
  testMember.city = "Petaluma";
  testMember.state = "CA";
  testMember.postalCode = "94952";
  testMember.remitDate = new Date("2023-09-17");
  testMember.remitDues = "$100.00";
  // console.log(`test member:\n ${JSON.stringify(testMember)}`);
  // console.log('compare:    \n {"_firstName":"Cliff","_lastName":"Castillo","_names":[],"_email":"not.me@test.it","_phone":"414-555-1212","_address":"100 Manor Ln","_unit":"Bed 300","_city":"Petaluma","_state":"CA","_postalCode":"94952","_volunteerPreferences":[],"_remittances":[],"_remitDate":"2023-09-17T00:00:00.000Z","_remitDues":"$100.00","_notes":[],"_dataEntryErrors":[]}');
  return testMember;
}
const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

const getTestMemberWithoutDuesEntry = (): Member => {
  const member = Member.create(shortid());
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432"
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "VOL";
  member.paidThrough = new Date("2020-04-01");
  member.joined = new Date("1990-01-01");
  member.remittances = [];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [{ target: "test", message: "i am a test", level: "info" }];
  member.lastUpdated = new Date();
  return member;
};

const getTestMemberWithDamagedDuesEntry = (): Member => {
  const member = Member.create(shortid());
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432"
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "VOL";
  member.paidThrough = new Date("2020-04-01");
  member.joined = new Date("1990-01-01");
  member.remittances = [{ date: {} as unknown as Date, amount: undefined as unknown as string, memo: "dues" }];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [{ target: "test", message: "i am a test", level: "info" }];
  member.lastUpdated = new Date();
  return member;
};

const getTestMemberWithRemit = (remit: Remittance, priorPaidThru: string | null = null, joined: string | null = null): Member => {
  const member = Member.create(shortid());
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432"
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "VOL";
  member.paidThrough = priorPaidThru === null ? undefined : new Date(priorPaidThru);
  member.joined = joined === null ? undefined : new Date(joined);
  member.remittances = [{ date: new Date(remit.date), amount: remit.amount, memo: remit.memo }];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [];
  member.lastUpdated = new Date();
  return member;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTestMemberWithOnlyLastNameErrors = (): Member => {
  const member = Member.create(shortid());
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432"
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "VOL";
  member.paidThrough = new Date("2020-04-01");
  member.joined = new Date("1990-01-01");
  member.remittances = [{ date: new Date("1990-01-01"), amount: "2", memo: "dues" }];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [
    { target: "last-name", message: "i am a test", level: "error" },
  ];
  member.lastUpdated = new Date();
  return member;
};

const getTestMemberWithoutErrors = (): Member => {
  const member = Member.create(shortid());
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432"
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "VOL";
  member.paidThrough = new Date("2020-04-01");
  member.joined = new Date("1990-01-01");
  member.remittances = [{ date: new Date("1990-01-01"), amount: "2", memo: "dues" }];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [];
  member.lastUpdated = new Date();
  return member;
};
const compareMembers = (a: Partial<Member>, b: Partial<Member>): { same: boolean; messages: string[] } => {
  let isSame = true;
  const messages: string[] = new Array<string>();
  // id
  if (a.id && b.id) {
    if (a.id !== b.id) {
      messages.push(`id: > ${a.id} < ${b.id}`);
      isSame = false;
    }
  }
  else if (a.id) {
    messages.push(`id: > ${a.id} <`);
    isSame = false;
  } else if (b.id) {
    messages.push(`id: >< ${b.id}`);
    isSame = false;
  } else {
    messages.push(`id: undefined`);
  }

  // firstName
  if (a.firstName && b.firstName) {
    if (a.firstName !== b.firstName) {
      messages.push(`firstName: > ${a.firstName} < ${b.firstName}`);
      isSame = false;
    }
  } else if (a.firstName) {
    messages.push(`firstName: > ${a.firstName} < `);
    isSame = false;
  } else if (b.firstName) {
    messages.push(`firstName: >< ${b.firstName}`);
    isSame = false;
  }
  // lastName
  if (a.lastName && b.lastName) {
    if (a.lastName !== b.lastName) {
      messages.push(`lastName: > ${a.lastName} < ${b.lastName}`);
      isSame = false;
    }
  } else if (a.lastName) {
    messages.push(`lastName: > ${a.lastName} <`);
    isSame = false;
  } else if (b.lastName) {
    messages.push(`lastName: >< ${b.lastName}`);
    isSame = false;
  }
  // address
  if (a.address && b.address) {
    if (a.address !== b.address) {
      messages.push(`address: > ${a.address} < ${b.address}`);
      isSame = false;
    }
  } else if (a.address) {
    messages.push(`address: > ${a.address} <`);
    isSame = false;
  } else if (b.address) {
    messages.push(`address: >< ${b.address}`);
    isSame = false;
  }
  // unit
  if (a.unit && b.unit) {
    if (a.unit !== b.unit) {
      messages.push(`unit: > ${a.unit} < ${b.unit}`);
      isSame = false;
    }
  } else if (a.unit) {
    messages.push(`unit: > ${a.unit} <`);
    isSame = false;
  } else if (b.unit) {
    messages.push(`unit: >< ${b.unit}`);
    isSame = false;
  }
  // city
  if (a.city && b.city) {
    if (a.city !== b.city) {
      messages.push(`city: > ${a.city} < ${b.city}`);
      isSame = false;
    }
  } else if (a.city) {
    messages.push(`city: > ${a.city} <`);
    isSame = false;
  } else if (b.city) {
    messages.push(`city: >< ${b.city}`);
    isSame = false;
  }
  // state
  if (a.state && b.state) {
    if (a.state !== b.state) {
      messages.push(`state: > ${a.state} < ${b.state}`);
      isSame = false;
    }
  } else if (a.state) {
    messages.push(`state: > ${a.state} <`);
    isSame = false;
  } else if (b.state) {
    messages.push(`state: >< ${b.state}`);
    isSame = false;
  }
  // postalCode
  if (a.postalCode && b.postalCode) {
    if (a.postalCode !== b.postalCode) {
      messages.push(`postalCode: > ${a.postalCode} < ${b.postalCode}`);
      isSame = false;
    }
  } else if (a.postalCode) {
    messages.push(`postalCode: > ${a.postalCode} <`);
    isSame = false;
  } else if (b.postalCode) {
    messages.push(`postalCode: >< ${b.postalCode}`);
    isSame = false;
  }
  // email
  if (a.email && b.email) {
    if (a.email !== b.email) {
      messages.push(`email: > ${a.email} < ${b.email}`);
      isSame = false;
    }
  } else if (a.email) {
    messages.push(`email: > ${a.email} <`);
    isSame = false;
  } else if (b.email) {
    messages.push(`email: >< ${b.email}`);
    isSame = false;
  }
  // phone
  if (a.phone && b.phone) {
    if (a.phone !== b.phone) {
      messages.push(`phone: > ${a.phone} < ${b.phone}`);
      isSame = false;
    }
  } else if (a.phone) {
    messages.push(`phone: > ${a.phone} <`);
    isSame = false;
  } else if (b.phone) {
    messages.push(`phone: >< ${b.phone}`);
    isSame = false;
  }
  // volunteerPreferences
  if (a.volunteerPreferences && b.volunteerPreferences) {
    if (a.volunteerPreferences.length !== b.volunteerPreferences.length) {
      messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.volunteerPreferences.length; i++) {
        if ((a.volunteerPreferences[i].role !== b.volunteerPreferences[i].role) ||
          (a.volunteerPreferences[i]?.lastWorkDate !== b.volunteerPreferences[i]?.lastWorkDate)) {
          messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
          isSame = false;
        }
      }
    }
  } else if (a.volunteerPreferences) {
    messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} <`);
    isSame = false;
  } else if (b.volunteerPreferences) {
    messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
    messages.push(`volunteerPreferences: >< ${JSON.stringify(b.volunteerPreferences)}`);
    isSame = false;
  }
  // mmb
  if (a.mmb && b.mmb) {
    if (a.mmb !== b.mmb) {
      messages.push(`mmb: > ${a.mmb} < ${b.mmb}`);
      isSame = false;
    }
  } else if (a.mmb) {
    messages.push(`mmb: > ${a.mmb} <`);
    isSame = false;
  } else if (b.mmb) {
    messages.push(`mmb: >< ${b.mmb}`);
    isSame = false;
  }
  // paidThrough
  if (a.paidThrough && b.paidThrough) {
    if (a.paidThrough !== b.paidThrough) {
      messages.push(`paidThrough: > ${a.paidThrough} < ${b.paidThrough}`);
      isSame = false;
    }
  } else if (a.paidThrough) {
    messages.push(`paidThrough: > ${a.paidThrough} <`);
    isSame = false;
  } else if (b.paidThrough) {
    messages.push(`paidThrough: >< ${b.paidThrough}`);
    isSame = false;
  }
  // joined
  if (a.joined && b.joined) {
    if (a.joined !== b.joined) {
      messages.push(`joined: > ${a.joined} < ${b.joined}`);
      isSame = false;
    }
  } else if (a.joined) {
    messages.push(`joined: > ${a.joined} <`);
    isSame = false;
  } else if (b.joined) {
    messages.push(`joined: >< ${b.joined}`);
    isSame = false;
  }
  // remittances
  if (a.remittances && b.remittances) {
    if (a.remittances.length !== b.remittances.length) {
      messages.push(`remittances: > ${JSON.stringify(a.remittances)} < + ${JSON.stringify(b.remittances)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.remittances.length; i++) {
        if ((a.remittances[i].date !== b.remittances[i].date) ||
          (a.remittances[i].amount !== b.remittances[i].amount) ||
          (a.remittances[i].memo !== b.remittances[i].memo)) {
          messages.push(`remittances: > ${JSON.stringify(a.remittances)} < + ${JSON.stringify(b.remittances)}`);
          isSame = false;
        }
      }
    }
  } else if (a.remittances) {
    messages.push(`remittances: > ${JSON.stringify(a.remittances)} <`);
    isSame = false;
  } else if (b.remittances) {
    messages.push(`remittances: >< ${JSON.stringify(b.remittances)}`);
    isSame = false;
  }

  // notes
  if (a.notes && b.notes) {
    if (a.notes.length !== b.notes.length) {
      messages.push(`notes: > ${JSON.stringify(a.notes)} < + ${JSON.stringify(b.notes)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.notes.length; i++) {
        if ((a.notes[i].date !== b.notes[i].date) ||
          (a.notes[i].note !== b.notes[i].note)) {
          messages.push(`notes: > ${JSON.stringify(a.notes)} < + ${JSON.stringify(b.notes)}`);
          isSame = false;
        }
      }
    }
  } else if (a.notes) {
    messages.push(`notes: > ${JSON.stringify(a.notes)} <`);
    isSame = false;
  } else if (b.notes) {
    messages.push(`notes: >< ${JSON.stringify(b.notes)}`);
    isSame = false;
  }
  // dataEntryErrors
  if (a.dataEntryErrors && b.dataEntryErrors) {
    if (a.dataEntryErrors.length !== b.dataEntryErrors.length) {
      messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} < + ${JSON.stringify(b.dataEntryErrors)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.dataEntryErrors.length; i++) {
        if ((a.dataEntryErrors[i].date !== b.dataEntryErrors[i].date) ||
          (a.dataEntryErrors[i].note !== b.dataEntryErrors[i].note)) {
          messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} < + ${JSON.stringify(b.dataEntryErrors)}`);
          isSame = false;
        }
      }
    }
  } else if (a.dataEntryErrors) {
    messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} <`);
    isSame = false;
  } else if (b.dataEntryErrors) {
    messages.push(`>< ${JSON.stringify(b.dataEntryErrors)}`);
    isSame = false;
  }
  // lastUpdated
  if (a.lastUpdated && b.lastUpdated) {
    if (a.lastUpdated !== b.lastUpdated) {
      messages.push("lastUpdated: >" + a.lastUpdated + "<" + b.lastUpdated);
      isSame = false;
    }
  } else if (a.lastUpdated) {
    messages.push("lastUpdated: >" + a.lastUpdated + "<");
    isSame = false;
  } else if (b.lastUpdated) {
    messages.push("lastUpdated: ><" + b.lastUpdated);
    isSame = false;
  }

  return { same: isSame, messages: messages };
}

describe(`${fn()}: createMemberFromLoad`, function () {

  it('should return a newly constructed Member object hydrated with the supplied IMember (DAO) data', function () {
    const result = MemberService.createMemberFromLoad(getTestImember(), MemberViewStates.edit);
    expect(result).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;
    expect(result.id).not.to.equal("");
  });

  it('should return a newly constructed Member object without any data when mode is MemberViewStates.new', function () {
    const result = MemberService.createMemberFromLoad(getTestImember(), MemberViewStates.new);
    expect(result).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.id).to.equal("");
  });

});

describe(`${fn()}: getDuesRates`, function () {

  it('should return object that includes Life dues', function () {
    const result = MemberService.getDuesRates();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.LIFE_MEMBER_DUES).not.to.be.undefined;
  });

  it('should return object that includes Patron dues', function () {
    const result = MemberService.getDuesRates();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.PATRON_DUES).not.to.be.undefined;
  });

  it('should return object that includes Family dues', function () {
    const result = MemberService.getDuesRates();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.FAMILY_DUES).not.to.be.undefined;
  });
  it('should return object that includes Individual dues', function () {
    const result = MemberService.getDuesRates();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.INDIVIDUAL_DUES).not.to.be.undefined;
  });

  it('should return object that includes student/senior dues', function () {
    const result = MemberService.getDuesRates();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.SENIOR_STUDENT_DUES).not.to.be.undefined;
  });
});

// getNewMmbBundle
describe(`${fn()}: getNewMmbBundle`, function () {

  it('should return "LM" when the member object includes a Life dues remit', function () {
    const testMember = getTestMemberWithRemit({ amount: "100", date: new Date("2020-04-01"), memo: "dues" });
    console.log(`test member: ${JSON.stringify(testMember)}`)
    const { mmb, paidThroughDate, joined } = MemberService.getNewMmbBundle(testMember);
    console.log(`mmb: *${mmb}*, paidThrough: ${paidThroughDate && paidThroughDate?.toDateString().substring(0, 10)}, joined: ${joined && joined?.toDateString().substring(0, 10)}`);
    expect(mmb).to.be.equal("LM");
  });



  it('should return paidThrough === 1 year after remit date when the member object has not prior remit and includes a paid dues remit using a date older than 1 year', function () {
    const testMember = getTestMemberWithRemit({ amount: "100", date: new Date("2020-04-01"), memo: "dues" });
    console.log(JSON.stringify(testMember.remittances))
    const { mmb, paidThroughDate, joined } = MemberService.getNewMmbBundle(testMember);
    console.log(`mmb: *${mmb}*, paidThrough: ${paidThroughDate && paidThroughDate?.toISOString().substring(0, 10)}, joined: ${joined && joined?.toISOString().substring(0, 10)}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(paidThroughDate?.toISOString().substring(0, 10)).to.be.equal("2021-03-31")
  });

  it('should return paidThrough === 1 year after prior paid through when the member object has prior paid through after remit date', function () {
    const testMember = getTestMemberWithRemit({ amount: "100", date: new Date("2023-04-01"), memo: "dues" }, "2023-03-01", "2023-04-01");
    console.log(JSON.stringify(testMember.remittances))
    const { mmb, paidThroughDate, joined } = MemberService.getNewMmbBundle(testMember);
    console.log(`mmb: *${mmb}*, paidThrough: ${paidThroughDate && paidThroughDate?.toISOString().substring(0, 10)}, joined: ${joined && joined?.toISOString().substring(0, 10)}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(paidThroughDate?.toISOString().substring(0, 10)).to.be.equal("2024-03-31")
  });

  it('should return joined === remit date when the member object includes a dues remit and does not have a prior join', function () {
    const testMember = getTestMemberWithRemit({ amount: "100", date: new Date("2020-04-01"), memo: "dues" });
    console.log(JSON.stringify(testMember.remittances))
    const { mmb, paidThroughDate, joined } = MemberService.getNewMmbBundle(testMember);
    console.log(`mmb: *${mmb}*, paidThrough: ${paidThroughDate && paidThroughDate?.toISOString().substring(0, 10)}, joined: ${joined && joined?.toISOString().substring(0, 10)}`);
    expect(joined?.toISOString().substring(0, 10)).to.be.equal("2020-04-01")
  });

  it('should return joined === prior joined date when the member object includes a dues remit and does have a prior join', function () {
    const testMember = getTestMemberWithRemit({ amount: "100", date: new Date("2020-04-01"), memo: "dues" }, null, "2018-04-01");
    console.log(JSON.stringify(testMember.remittances))
    const { mmb, paidThroughDate, joined } = MemberService.getNewMmbBundle(testMember);
    console.log(`mmb: *${mmb}*, paidThrough: ${paidThroughDate && paidThroughDate?.toISOString().substring(0, 10)}, joined: ${joined && joined?.toISOString().substring(0, 10)}`);
    expect(joined?.toISOString().substring(0, 10)).to.be.equal("2018-04-01")
  });

  it('should return "P"yy (the 2 digit year for paidThrough) when the most recent dues entry on the member object is a Patron dues remit', function () {
    const testMember = getTestMemberWithRemit({ amount: "50", date: new Date("2020-04-01"), memo: "dues" });
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("P21");
  });


  it('should return "F"yy (the 2 digit year for paidThrough) when the most recent dues entry on the member object is a Family dues remit', function () {
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-05-01"), memo: "dues" });
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("F21");
  });


  it('should return yy (the 2 digit year for paidThrough) when the most recent dues entry on the member object is an Individual dues remit', function () {
    const testMember = getTestMemberWithRemit({ amount: "7", date: new Date("2022-05-01"), memo: "dues" });
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("23");
  });

  it('should return "S"yy (the 2 digit year for paidThrough) when the most recent dues entry on the member object is an Senior or Student dues remit', function () {
    const testMember = getTestMemberWithRemit({ amount: "2", date: new Date("2023-03-15"), memo: "dues" });
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("S24");
  });

  it('should return "VOL" when the member object does not contain a dues Entry', function () {
    const testMember = getTestMemberWithoutDuesEntry();
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("VOL");
  });

  it('should return undefined when the member object does not contain a dues Entry with a date', function () {
    const testMember = getTestMemberWithDamagedDuesEntry();
    const { mmb } = MemberService.getNewMmbBundle(testMember);
    expect(mmb).to.be.equal("VOL");
  });
});
// hasSameNames
describe(`${fn()}: hasSameNames`, function () {

  it('should return true when the Names array passed two empty arrays', function () {
    const same = MemberService.hasSameNames(
      [], []
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return true when the Names array contains sames names', function () {
    const same = MemberService.hasSameNames(
      [{ firstName: "Sam", lastName: "Spade" }], [{ firstName: "Sam", lastName: "Spade" }],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return false when the Names array contains different names', function () {
    const same = MemberService.hasSameNames(
      [{ firstName: "Sam", lastName: "Spade" }], [{ firstName: "Sam", lastName: "Jones" }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
});
// hasSameNotes
describe(`${fn()}: hasSameNotes`, function () {

  it('should return true when the Notes array passed two empty arrays', function () {
    const same = MemberService.hasSameNotes(
      [], []
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return true when the Notes array contains same notes', function () {
    const same = MemberService.hasSameNotes(
      [{ date: new Date(), note: "Spade" }], [{ date: new Date(), note: "Spade" }],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return false when the notes array contains different notes -- diff dates', function () {
    const same = MemberService.hasSameNotes(
      [{ date: new Date("2022-04-01"), note: "Spade" }], [{ date: new Date("2023-04-01"), note: "Spade" }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
  it('should return false when the notes array contains different notes -- diff notes', function () {
    const same = MemberService.hasSameNotes(
      [{ date: new Date("2022-04-01"), note: "Sam" }], [{ date: new Date("2022-04-01"), note: "Jon" }]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
});
// hasSameRemits
describe(`${fn()}: hasSameRemits`, function () {

  it('should return true when the Remits array passed two empty arrays', function () {
    const same = MemberService.hasSameRemits(
      [], []
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return true when the Remits array contains sames names', function () {
    const same = MemberService.hasSameRemits(
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Sam" }],
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Sam" }]
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return false when the Remits array contains different dates', function () {
    const same = MemberService.hasSameRemits(
      [{ date: new Date("2023-04-01"), amount: "10", memo: "Sam" }],
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Sam" }]
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
  it('should return false when the Remits array contains different amounts', function () {
    const same = MemberService.hasSameRemits(
      [{ date: new Date("2022-04-01"), amount: "2", memo: "Sam" }],
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Sam" }]
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
  it('should return false when the Remits array contains different memos', function () {
    const same = MemberService.hasSameRemits(
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Sam" }],
      [{ date: new Date("2022-04-01"), amount: "10", memo: "Jon" }]
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
});
// hasSameVolPrefs
describe(`${fn()}: hasSameVolPrefs`, function () {

  it('should return true when the VolPrefs array passed two empty arrays', function () {
    const same = MemberService.hasSameVolPrefs(
      [], []
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return true when the VolPrefs array contains sames roles', function () {
    const same = MemberService.hasSameVolPrefs(
      [{ role: "SALE" }, { role: "STORE" }],
      [{ role: "SALE" }, { role: "STORE" }],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return false when the VolPrefs array contains different roles', function () {
    const same = MemberService.hasSameVolPrefs(
      [{ role: "SALE" }, { role: "STORE" }],
      [{ role: "SALE" }, { role: "LUMACON" }],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.false;
  });
});

// postUnjournalledRemits
describe(`${fn()}: postUnjournalledRemits`, function () {
  it('should return a Member object that is same as the one passed if there is no remit date on the passed Member', function () {
    const testMember = MemberService.postUnjournalledRemits(MemberService.createMemberFromLoad(
      {} as IMember,
      MemberViewStates.new));
    const newMember = MemberService.postUnjournalledRemits(testMember);
    const { same } = compareMembers(testMember, newMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

  it('should return a Member object that has dues remit added to remittances if there is a dues remit on the passed Member', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });

  it('should return a Member object that has donation remit added to remittances if there is a donation remit on the passed Member', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDonation = "4";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("4");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("donation");
  });
  it('should return a Member object has MMB = "LM" when dues remit on the passed Member is greater than the LM amount', function () {
    // const testDate = new Date("2023-10-31");
    const testMember: Member = getFm4TestData();
    // const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // // suspense entry
    // testMember.remitDate = testDate;
    // testMember.remitDues = "100";
    console.log(`before:\n  ${JSON.stringify(testMember)}`)
    const newMember = MemberService.postUnjournalledRemits(testMember);
    console.log(`after: \n  ${JSON.stringify(newMember)}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.mmb).not.to.be.undefined;
    expect(newMember.mmb).to.be.equal("LM");
  });
  // brp
  // TODO
  it.skip('should return a Member object has MMB = "BEN" when dues remit on the passed Member is greater than the BEN amount', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });
  // TODO
  it.skip('should return a Member object has MMB = "Pyy" when dues remit on the passed Member is greater than the Patron amount', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });
  // TODO
  it.skip('should return a Member object has MMB = "Fyy" when dues remit on the passed Member is greater than the Family amount', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });
  // TODO
  it.skip('should return a Member object has MMB = "yy" when dues remit on the passed Member is greater than the Individual amount', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });
  // TODO
  it.skip('should return a Member object has MMB = "Syy" when dues remit on the passed Member is greater than the Senior/Student amount', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });
  // TODO
  it.skip('should return a Member object has MMB = "VOL" when dues remit on the passed Member is less than the lowest due rate', function () {
    const testDate = new Date("2023-10-31");
    const testMember = getTestMemberWithRemit({ amount: "10", date: new Date("2020-03-19"), memo: "dues" });
    // suspense entry
    testMember.remitDate = testDate;
    testMember.remitDues = "7";
    const expectArrLength = (testMember?.remittances?.length ? testMember?.remittances?.length : 0) + 1;
    const newMember = MemberService.postUnjournalledRemits(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(newMember.remittances).not.to.be.undefined;
    expect(newMember.remittances?.length).to.be.equal(expectArrLength);
    expect(newMember.remittances?.[expectArrLength - 1].date.valueOf()).to.be.equal(testDate.valueOf());
    expect(newMember.remittances?.[expectArrLength - 1].amount).to.be.equal("7");
    expect(newMember.remittances?.[expectArrLength - 1].memo).to.be.equal("dues");
  });

});

// addNote
describe(`${fn()} addNote`, function () {
  it(`should take a string and add a note to a Member`, function () {
    const noteText = "this is an added note"
    const testMember = getTestMemberWithoutErrors();
    const initialNotesLen = testMember.notes?.length ? testMember.notes?.length : 0;
    MemberService.addNote(testMember, noteText);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(testMember?.notes).not.to.be.undefined;
    const postAddLen = testMember.notes?.length;

    expect(postAddLen).to.be.equal(initialNotesLen + 1);
    expect(testMember?.notes?.[initialNotesLen].note).to.equal(noteText);
    expect(testMember?.notes?.[initialNotesLen].date.toISOString().substring(0, 10)).to.equal((new Date()).toISOString().substring(0, 10));
  })
})
// areAddressesTheSame
describe(`${fn()} areAddressesTheSame`, function () {
  it(`returns true if the address fields on the member obj match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborne";
    const state = "CA";
    const postalCode = "90099-1234";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr;
    testMember.unit = unit;
    testMember.city = city;
    testMember.state = state;
    testMember.postalCode = postalCode;
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });
  it(`returns false if the address field on the member obj does not match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborne";
    const state = "CA";
    const postalCode = "90099-1234";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr + '_';
    testMember.unit = unit;
    testMember.city = city;
    testMember.state = state;
    testMember.postalCode = postalCode;
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it(`returns false if the unit field on the member obj does not match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborne";
    const state = "CA";
    const postalCode = "90099-1234";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr;
    testMember.unit = "";
    testMember.city = city;
    testMember.state = state;
    testMember.postalCode = postalCode;
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it(`returns false if the city field on the member obj does not match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborn";
    const state = "CA";
    const postalCode = "90099-1234";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr;
    testMember.unit = unit;
    testMember.city = "Onyx";
    testMember.state = state;
    testMember.postalCode = postalCode;
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it(`returns false if the state field on the member obj does not match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborne";
    const state = "CA";
    const postalCode = "90099-1234";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr;
    testMember.unit = unit;
    testMember.city = city;
    testMember.state = "NV";
    testMember.postalCode = postalCode;
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it(`returns false if the postalCode field on the member obj does not match the passed address obj`, function () {
    const addr = "400 Fletcher Rd";
    const unit = "spc 12";
    const city = "Osborne";
    const state = "CA";
    const postalCode = "90099-1233";
    const testMember = getTestMemberWithoutErrors();
    testMember.address = addr;
    testMember.unit = unit;
    testMember.city = city;
    testMember.state = state;
    testMember.postalCode = "90099-1234";
    const compareAddr: IAddress = { address: addr, unit: unit, city: city, state: state, postalCode: postalCode };
    const check = MemberService.areAddressesSame(testMember, compareAddr);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
})

// clearMemberId
describe(`${fn()}  clearMemberId`, function () {
  it(`removes memberId from localStorage`, function () {
    localStorage.setItem('memberId', "dorf");
    MemberService.clearMemberId();
    const a = localStorage.getItem('memberId');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(a).to.be.null;
  })
})

// getDatePlus1Year
describe(`${fn()} getDatePlus1Year`, function () {
  it('should return the year end date from a given date', function () {
    const testDate = new Date("2020-03-19");
    const checkDate = MemberService.getDatePlus1Year(testDate);
    expect(checkDate?.toISOString().substring(0, 10)).to.be.equal("2021-03-18");
  })
})
// getFormattedPhoneNumber
describe(`${fn()} getFormattedPhoneNumber`, function () {
  it('should return formatted phone number for given member', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.phone = "415-555-1212";
    const checkPhone = MemberService.getFormattedPhoneNumber(testMember.phone);
    expect(checkPhone?.substring(0, 14)).to.be.equal("(415) 555-1212");
  })
})
// getMostRecentDuesEntry
describe(`${fn()} getMostRecentDuesEntry`, function () {
  it('should return most recent dues entry from remittances on member obj', function () {
    const testDateString = "2023-05-13";
    const testAmount = "10";
    const testMember = getTestMemberWithoutErrors();
    testMember.remitDate = new Date(testDateString);
    testMember.remitDues = testAmount;
    const checkMember = MemberService.postUnjournalledRemits(testMember);
    const checkRemit = MemberService.getMostRecentDuesEntry(checkMember);
    expect(checkRemit?.date?.toISOString()?.substring(0, 10)).to.be.equal(testDateString);
    expect(checkRemit?.amount).to.be.equal(testAmount);
    expect(checkRemit?.memo).to.be.equal("dues");
  })
})

// getNewJoinedRenewDate
// NOTE: tested in getNewMmbBundle


// getUspsValidAddress  // TODO future -- this will call USPS API
describe(`${fn()} getUspsValidAddress`, function () {
  it('should return the valid address for a member obj', function () {
    const testMember = getTestMemberWithoutErrors();
    const checkAddress = MemberService.getUspsValidAddress(testMember);
    expect(checkAddress?.address).to.be.equal("500 W Baker Ave");
  })
  it('should return the valid unit for a member obj', function () {
    const testMember = getTestMemberWithoutErrors();
    const checkAddress = MemberService.getUspsValidAddress(testMember);
    expect(checkAddress?.unit).to.be.equal("Ste 3");
  })
  it('should return the valid city for a member obj', function () {
    const testMember = getTestMemberWithoutErrors();
    const checkAddress = MemberService.getUspsValidAddress(testMember);
    expect(checkAddress?.city).to.be.equal("Arlington");
  })
  it('should return the valid state for a member obj', function () {
    const testMember = getTestMemberWithoutErrors();
    const checkAddress = MemberService.getUspsValidAddress(testMember);
    expect(checkAddress?.state).to.be.equal("VA");
  })
  it('should return the valid postalCode for a member obj', function () {
    const testMember = getTestMemberWithoutErrors();
    const checkAddress = MemberService.getUspsValidAddress(testMember);
    expect(checkAddress?.postalCode).to.be.equal("10200-2325");
  })
})
// getYyFromDate
describe(`${fn()} getYyFromDate`, function () {
  it('should return the yy for the year from a given date', function () {
    const testDate = new Date("2020-03-19");
    const checkDate = MemberService.getYyFromDate(testDate);
    expect(checkDate).to.be.equal("20");
  })
})
// hasProp
describe(`${fn()} hasProp`, function () {
  it('should return true when an object has the requested property', function () {
    const check = MemberService.hasProp({ foo: null }, 'foo');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  })

  it('should return false when an object does not have the requested property', function () {
    const check = MemberService.hasProp({ foo: null }, 'bar');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  })
})
// isDroppedMember
describe(`${fn()} isDroppedMember`, function () {
  it('returns false if the mmb is "LM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "LM";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns true if the mmb is "HLM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "HLM";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the mmb is "BEN"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "BEN";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Pyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "P24";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Fyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "F24";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "yy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "23";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Syy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "S23";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the mmb is "VOL"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "VOL";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns true if the mmb is "OUT"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "OUT";
    const check = MemberService.isDroppedMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });
});

// isEmptyObject
describe(`${fn()}isEmptyObject`, function () {
  it('returns true if the object does not contain any properties', function () {
    const check = MemberService.isEmptyObject({});
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });

  it('returns false if the object contains a property', function () {
    const check = MemberService.isEmptyObject({ foo: "bar" });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the object contains a method', function () {
    const check = MemberService.isEmptyObject({ foo() { return "bar"; } });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
});
// isLifeMember
describe(`${fn()} isLifeMember`, function () {
  it('returns true if the mmb is "LM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "LM";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });

  it('returns true if the mmb is "HLM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "HLM";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });

  it('returns false if the mmb is "BEN"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "BEN";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Pyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "P24";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Fyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "F24";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "yy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "23";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Syy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "S23";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the mmb is "VOL"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "VOL";
    const check = MemberService.isLifeMember(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
});

// isVolunteer
describe(`${fn()} isVolunteer`, function () {
  it('returns true if the mmb is "LM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "LM";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns true if the mmb is "HLM"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "HLM";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the mmb is "BEN"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "BEN";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Pyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "P24";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Fyy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "F24";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "yy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "23";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });
  it('returns false if the mmb is "Syy"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "S23";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.false;
  });

  it('returns false if the mmb is "VOL"', function () {
    const testMember = getTestMemberWithoutErrors();
    testMember.mmb = "VOL";
    const check = MemberService.isVolunteer(testMember);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(check).to.be.true;
  });
});

// retrieveMemberId
describe(`${fn()}  retrieveMemberId`, function () {
  it(`gets memberId from localStorage`, function () {
    const value = 'dorf';
    localStorage.setItem('memberId', value);
    const check = MemberService.retrieveMemberId();
    expect(check).to.be.equal(value);
  })
})

// saveMemberId
describe(`${fn()}  retrieveMemberId`, function () {
  it(`set memberId in localStorage`, function () {
    const value = 'dorf';
    MemberService.saveMemberId(value);
    const check = localStorage.getItem('memberId');
    expect(check).to.be.equal(value);
  })
})
