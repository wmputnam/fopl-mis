/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "node:url";
import { Member } from "./Member.js";
import Status from "./Status.js";
import { TEST_OBJECT_ID_1 } from "test-helpers";
import { compareMembers } from "./CompareMembers.js";
import type { IMemberDocument } from "member-document"


const getTestImember = () => ({
  lastName: "Wang",
  firstName: "Xiaowei",
  _id: TEST_OBJECT_ID_1()
} as IMemberDocument);

const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

const getTestMember = (): Member => {
  const member = Member.create();
  member.firstName = "Oliver";
  member.lastName = "North";
  member.address = "500 W Baker Ave";
  member.unit = "Ste 3";
  member.city = "Arlington";
  member.state = "VA";
  member.postalCode = "10200-2325";
  member.email = "test@test.it";
  member.phone = "707-555-1212 x432";
  member.status = new Status();
  member.status.isActive = true;
  member.status.isNewMember = false;
  member.status.validEmail = 'verified';
  member.status.validPostMail = "valid";
  member.status.newsletterType = 'email';
  member.volunteerPreferences = [{ role: "SALE" }, { role: "LUMACON", lastWorkDate: new Date("2023-01-28") }];
  member.mmb = "S91";
  member.paidThrough = new Date("2020-04-01");
  member.joined = new Date("1990-01-01");
  member.remittances = [{ date: new Date("1990-01-01"), amount: "2", memo: "dues" }];
  member.notes = [{ date: new Date(), note: "this is a test" }];
  member.dataEntryErrors = [{ target: "test", message: "i am a test", level: "info" }];
  member.lastUpdated = new Date();
  return member;
};

const getTestMemberWithErrors = (): Member => {
  const member = getTestMember();
  member.dataEntryErrors = [
    { target: "first-name", message: "i am a first-name error test", level: "error" },
    { target: "last-name", message: "i am a last-name error test", level: "error" },
    { target: "money-donation", message: "i am a remit amount (money-donation) warn test", level: "warn" },
    { target: "money-date", message: "i am a remit date (money-date) error test", level: "error" },
  ];
  return member;
};

const getTestMemberWithOnlyLastNameErrors = (): Member => {
  const member = getTestMember();
  member.dataEntryErrors = [
    { target: "last-name", message: "i am a test", level: "error" },
  ];
  return member;
};

const getTestMemberWithoutErrors = (): Member => {
  const member = getTestMember();
  member.dataEntryErrors = [];
  return member;
};

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
    const objIdString = "303030303030303030303031"
      ;

    const result = Member.create(objIdString);

    expect(result).to.be.an('object');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result instanceof Member).to.be.true;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result.id).to.equal(objIdString);
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

    const { same } = compareMembers(member as Partial<Member>, clonedMember as Partial<Member>);

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
