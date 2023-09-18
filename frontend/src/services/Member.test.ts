/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import { Member } from "./Member";
import shortid from "shortid";

const getTestImember = () => ({
  lastName: "Wang",
  firstName: "Xiaowei",
  _id: shortid()
});

const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

const getTestMember = (): Member => {
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
  member.dataEntryErrors = [{ target: "test", message: "i am a test", level: "info" }];
  member.lastUpdated = new Date();
  return member;
};

const getTestMemberWithErrors = (): Member => {
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
    { target: "first-name", message: "i am a first-name error test", level: "error" },
    { target: "last-name", message: "i am a last-name error test", level: "error" },
    { target: "money-donation", message: "i am a remit amount (money-donation) warn test", level: "warn" },
    { target: "money-date", message: "i am a remit date (money-date) error test", level: "error" },
  ];
  member.lastUpdated = new Date();
  return member;
};

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
  // remit suspense values on Member that are not on iMember
  // remitDate
  if (a.remitDate && b.remitDate) {
    if (a.remitDate !== b.remitDate) {
      messages.push("remitDate: >" + a.remitDate + "<" + b.remitDate);
      isSame = false;
    }
  } else if (a.remitDate) {
    messages.push("remitDate: >" + a.remitDate + "<");
    isSame = false;
  } else if (b.remitDate) {
    messages.push("remitDate: ><" + b.remitDate);
    isSame = false;
  }
  // remitDues
  if (a.remitDues && b.remitDues) {
    if (a.remitDues !== b.remitDues) {
      messages.push("remitDues: >" + a.remitDues + "<" + b.remitDues);
      isSame = false;
    }
  } else if (a.remitDues) {
    messages.push("remitDues: >" + a.remitDues + "<");
    isSame = false;
  } else if (b.remitDues) {
    messages.push("remitDues: ><" + b.remitDues);
    isSame = false;
  }
  // remitDonation
  if (a.remitDonation && b.remitDonation) {
    if (a.remitDonation !== b.remitDonation) {
      messages.push("remitDonation: >" + a.remitDonation + "<" + b.remitDonation);
      isSame = false;
    }
  } else if (a.remitDonation) {
    messages.push("remitDonation: >" + a.remitDonation + "<");
    isSame = false;
  } else if (b.remitDonation) {
    messages.push("remitDonation: ><" + b.remitDonation);
    isSame = false;
  }

  return { same: isSame, messages: messages };
}

describe(`${fn()}: create`, function () {

  it('should return a newly constructed Member object with id "" when call without a memberId param', function () {
    const result = Member.create();
    expect(result).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.id).to.equal("");
  });

  it('should return a newly constructed Member object with id supplied by param', function () {
    const randString = shortid();
    const result = Member.create(randString);
    expect(result).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.id).to.equal(randString);
  });

});

describe(`${fn()}: createFromIMember`, function () {
  // IMember is the member DTO

  it('should return undefined when imember is undefined', function () {
    const result = Member.createFromIMember(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.undefined;
  });

  it('should return a hydrated Member when imember has data', function () {
    const testImember = getTestImember();
    const result = Member.createFromIMember(testImember);
    expect(result).to.be.an('object');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;
  });
});

// deepClone
describe(`${fn()}: deepClone`, function () {

  it('should return a fully replicated and hydrated copy if **this** Member', function () {
    const member = getTestMember();
    member.remitDate = new Date();
    member.remitDues = "2";
    member.remitDonation = "3";
    const clonedMember = member.deepClone();
    const { same, messages } = compareMembers(member as Partial<Member>, clonedMember as Partial<Member>);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (messages && messages.length > 0) {
      console.log(`*** ${messages.length} error messages:`)
      for (let i = 0; i < messages.length; i++) {
        console.log(messages[i]);
      }
      console.log(`***`)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(same).to.be.true;
  });

});

// existingFirstNameError
describe(`${fn()}: existingFirstNameError`, function () {

  it(`should return true when the member has an error on the firstName data entry`, function () {
    const member = getTestMemberWithErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingFirstNameError()).to.be.true;

  })
  it(`should return false when the member has no error on the firstName data entry`, function () {
    const member = getTestMemberWithoutErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingFirstNameError()).to.be.false;
  })
});

// existingLastNameError
describe(`${fn()}: existingLastNameError`, function () {

  it(`should return true when the member has an error on the laststName data entry`, function () {
    const member = getTestMemberWithErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingLastNameError()).to.be.true;
  })
  it(`should return false when the member has no error on the laststName data entry`, function () {
    const member = getTestMemberWithoutErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingLastNameError()).to.be.false;
  })
});

// existingRemitAmountWarn
describe(`${fn()}: existingRemitAmountWarn`, function () {

  it(`should return true when the member has a warn on the remit amount data entry`, function () {
    const member = getTestMemberWithErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingRemitAmountWarn()).to.be.true;
  })
  it(`should return false when the member has no warn on the remit amount data entry`, function () {
    const member = getTestMemberWithoutErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingRemitAmountWarn()).to.be.false;

  })
});

// existingRemitDateError
describe(`${fn()}: existingRemitDateError`, function () {

  it(`should return true when the member has an error on the remittance date data entry`, function () {
    const member = getTestMemberWithErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingRemitDateError()).to.be.true;
  })
  it(`should return false when the member has no error on the remittance date data entry`, function () {
    const member = getTestMemberWithoutErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.existingRemitDateError()).to.be.false;
  })
});

// findError
describe(`${fn()}: findError`, function () {

  it(`should return FormError when the member has an error on the specified target field`, function () {
    const member = getTestMemberWithErrors();
    expect(member.findError('first-name')).to.deep.be.equal({ target: "first-name", message: "i am a first-name error test", level: "error" });
  })
  it(`should return nothing when the member has no error on the specified target field`, function () {
    const member = getTestMemberWithErrors();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(member.findError('duncell')).to.deep.be.undefined;
  })
});
// getErrorsAdding
describe(`${fn()}: getErrorsAdding`, function () {

  it(`should return FormError[] containing prior errors recorded plus the supplied FormError`, function () {
    const member = getTestMemberWithOnlyLastNameErrors();
    const errorArray = member.getErrorsAdding("first-name", "this is a test", "warn");
    expect(errorArray).to.deep.include({ target: "first-name", message: "this is a test", level: "warn" });
  });
});
// getErrorsWithout
describe(`${fn()}: getErrorsWithout`, function () {

  it(`should return FormError[] containing prior errors recorded except one for the supplied target`, function () {
    const member = getTestMemberWithErrors();
    const errorArray = member.getErrorsWithout("first-name");
    expect(errorArray).not.to.deep.include({ target: "first-name", message: "i am a test", level: "error" });
    expect(errorArray).to.deep.include({ target: "last-name", message: "i am a last-name error test", level: "error" });
  });
});
// getFirstNameError
describe(`${fn()}: getFirstNameError`, function () {

  it(`should return FormError message when the member has an error on the firstName field`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.getFirstNameError();
    expect(formErr).to.equal("i am a first-name error test");
  });

  it(`should return undefined when the member has no error on the firstName field`, function () {
    const member = getTestMemberWithoutErrors();
    const formErr = member.getFirstNameError();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.undefined;
  });
});
// getLastNameError
describe(`${fn()}: getLastNameError`, function () {

  it(`should return lastName FormError when the member has one`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.getLastNameError();
    expect(formErr).to.equal("i am a last-name error test");
  });

  it(`should return undefined when the member has no error on the lastName field`, function () {
    const member = getTestMemberWithoutErrors();
    const formErr = member.getLastNameError();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.undefined;
  });

});
// getRemitAmountWarn
describe(`${fn()}: getRemitAmountWarn`, function () {

  it(`should return remit amount warn FormError when the member has one`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.getRemitAmountWarn();
    expect(formErr).to.equal("i am a remit amount (money-donation) warn test");
  });

  it(`should return undefined when the member has no remit amount warn`, function () {
    const member = getTestMemberWithoutErrors();
    const formErr = member.getRemitAmountWarn();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.undefined;
  });
});
// getRemitDateError
describe(`${fn()}: getRemitDateError`, function () {

  it(`should return remit date FormError when the member has one`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.getRemitDateError();
    expect(formErr).to.equal("i am a remit date (money-date) error test");
  });

  it(`should return undefined when the member has no remit date error`, function () {
    const member = getTestMemberWithoutErrors();
    const formErr = member.getRemitDateError();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.undefined;
  });

});
// isThereAnyErrorOn
describe(`${fn()}: isThereAnyErrorOn`, function () {

  it(`should return true when the member has data entry error supplied target field`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.isThereAnyErrorOn('first-name');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.true;
  });

  it(`should return false when the member has no data entry error supplied target field`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.isThereAnyErrorOn('dorf');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(formErr).to.be.false;

  })
});
// getFormErrorsForDisplay
describe(`${fn()}: getFormErrorsForDisplay`, function () {

  it(`should return a string of <br> separated text of error messages when the member has one or more`, function () {
    const member = getTestMemberWithErrors();
    const formErr = member.getFormErrorsForDisplay();
    expect(formErr).to.be.equal("i am a first-name error test<br>i am a last-name error test<br>i am a remit amount (money-donation) warn test<br>i am a remit date (money-date) error test");

  })
  it(`should return "" when the member has no errors`, function () {
    const member = getTestMemberWithoutErrors();
    const formErr = member.getFormErrorsForDisplay();
    expect(formErr).to.be.equal("");
  })
});
// brp
// TODO
// toIMember
describe(`${fn()}: toIMember`, function () {

  it('should return an IMember (DTO) with same MMB for the Member object when value is "VOL"', function () {
    const testMember: Member = getTestMember();
    const testImember = testMember.toIMember()
    expect(testImember.mmb).to.be.equal("VOL");
  });

  it('should return an IMember (DTO) with same MMB for the Member object when value is "LM"', function () {
    const testMember: Member = getTestMember();
    testMember.mmb = "LM"
    const testImember = testMember.toIMember()
    expect(testImember.mmb).to.be.equal("LM");
  });


});
