/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "node:url";
import { compareMembers } from "./CompareMembers.js";
import { Member } from "./Member.js";
import { setSourceMapsEnabled } from "node:process";


const __filename = fileURLToPath(import.meta.url);

const fn = () => `${__filename.split('/').pop()}`;

describe.only(`${fn()}: compareMembers`, function () {

  it('should return no errors when both member objects are empty', function () {
    const testMember1 = {} as Member;
    const testMember2 = {} as Member;

    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(true);
    expect(typeof messages).to.equal('object');
    expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('id: undefined');

  });

  it('should return error when id values do not match', function () {
    const objIdString1 = "303030303030303030303031";
    const objIdString2 = "303030303030303030303032";

    const testMember1 = Member.create(objIdString1);
    const testMember2 = Member.create(objIdString2);
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('id: > 303030303030303030303031 < 303030303030303030303032');
  });

  it('should return error when firstName values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.firstName = "Jimmy";
    const testMember2 = Member.create(objIdString);
    testMember2.firstName = "James"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('firstName: > Jimmy < James');
  });

  it('should return error when lastName values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.lastName = "Smith";
    const testMember2 = Member.create(objIdString);
    testMember2.lastName = "Jones"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('lastName: > Smith < Jones');
  });

  it('should return error when address values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.address = "113 MAIN ST";
    const testMember2 = Member.create(objIdString);
    testMember2.address = "1132 MAIN ST"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('address: > 113 MAIN ST < 1132 MAIN ST');
  });

  it('should return error when unit values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.unit = "STE 3";
    const testMember2 = Member.create(objIdString);
    testMember2.unit = "APT 3"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal('unit: > STE 3 < APT 3');
  });

  it('should return error when city values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.city = "PENNGROVE";
    const testMember2 = Member.create(objIdString);
    testMember2.city = "PETALUMA"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`city: > ${testMember1.city} < ${testMember2.city}`);
  });

  it('should return error when state values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.state = "CA";
    const testMember2 = Member.create(objIdString);
    testMember2.state = "WA"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`state: > ${testMember1.state} < ${testMember2.state}`);
  });

  it('should return error when postalCode values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.postalCode = "94954-";
    const testMember2 = Member.create(objIdString);
    testMember2.postalCode = "94952-"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`postalCode: > ${testMember1.postalCode} < ${testMember2.postalCode}`);
  });

  it('should return error when email values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.email = "cindylou@whoville.ca";
    const testMember2 = Member.create(objIdString);
    testMember2.email = "cindy.lou@whoville.ca"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`email: > ${testMember1.email} < ${testMember2.email}`);
  });

  it('should return error when phone values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.phone = "707-322-0985";
    const testMember2 = Member.create(objIdString);
    testMember2.phone = "707-322-0985h"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`phone: > ${testMember1.phone} < ${testMember2.phone}`);
  });

  it('should return error when volunteerPreferences values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.volunteerPreferences = [{ role: "707-322-0985" }];
    const testMember2 = Member.create(objIdString);
    testMember2.volunteerPreferences = [{ role: "707-322-0985h" }]
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`volunteerPreferences: > ${JSON.stringify(testMember1.volunteerPreferences)} < ${JSON.stringify(testMember2.volunteerPreferences)}`);
  });

  it('should return error when mmb values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.mmb = "S22";
    const testMember2 = Member.create(objIdString);
    testMember2.mmb = "VOL"
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`mmb: > ${testMember1.mmb} < ${testMember2.mmb}`);
  });

  it('should return error when paidThrough values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.paidThrough = new Date(2024, 2, 15);
    const testMember2 = Member.create(objIdString);
    testMember2.paidThrough = new Date(2024, 3, 15)
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`paidThrough: > ${testMember1.paidThrough} < ${testMember2.paidThrough}`);
  });


  it('should return error when joined values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.joined = new Date(2024, 2, 15);
    const testMember2 = Member.create(objIdString);
    testMember2.joined = new Date(2024, 3, 15)
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`joined: > ${testMember1.joined} < ${testMember2.joined}`);
  });

  it('should return error when remittances values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.remittances = [{ date: new Date(2024, 2, 15), amount: "5", "memo": "dues" }];
    const testMember2 = Member.create(objIdString);
    testMember2.remittances = [{ date: new Date(2024, 3, 15), amount: "5", "memo": "dues" }];
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`remittances: > ${JSON.stringify(testMember1.remittances)} < ${JSON.stringify(testMember2.remittances)}`);
  });

  it('should return error when notes values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.notes = [{ date: new Date(2024, 2, 15), note: "dues" }];
    const testMember2 = Member.create(objIdString);
    testMember2.notes = [{ date: new Date(2024, 3, 15), note: "dues" }];
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`notes: > ${JSON.stringify(testMember1.notes)} < ${JSON.stringify(testMember2.notes)}`);
  });

  it('should return error when dataEntryErrors values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.dataEntryErrors = [{ target: "A", message: "A", level: "info" }];
    const testMember2 = Member.create(objIdString);
    testMember2.dataEntryErrors = [{ target: "B", message: "A", level: "info" }];
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`dataEntryErrors: > ${JSON.stringify(testMember1.dataEntryErrors)} < ${JSON.stringify(testMember2.dataEntryErrors)}`);
  });

  it('should return error when lastUpdated values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.lastUpdated = new Date(2024, 2, 15);
    const testMember2 = Member.create(objIdString);
    testMember2.lastUpdated = new Date(2024, 3, 15)
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`lastUpdated: > ${testMember1.lastUpdated} < ${testMember2.lastUpdated}`);
  });

  it('should return error when remitDate values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.remitDate = new Date(2024, 2, 15);
    const testMember2 = Member.create(objIdString);
    testMember2.remitDate = new Date(2024, 3, 15)
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`remitDate: > ${testMember1.remitDate} < ${testMember2.remitDate}`);
  });

  it('should return error when remitDues values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.remitDues = "20";
    const testMember2 = Member.create(objIdString);
    testMember2.remitDues = "10";
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`remitDues: > ${testMember1.remitDues} < ${testMember2.remitDues}`);
  });

  it('should return error when remitDonation values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.remitDonation = "20";
    const testMember2 = Member.create(objIdString);
    testMember2.remitDonation = "10";
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`remitDonation: > ${testMember1.remitDonation} < ${testMember2.remitDonation}`);
  });

  it('should return error when status.isActive values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.status = { isActive: true };
    const testMember2 = Member.create(objIdString);
    testMember2.status = { isActive: false };
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`status.isActive: > ${testMember1.status.isActive} < ${testMember2.status.isActive}`);
  });

  it('should return error when status.isNewMember values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.status = { isActive: true, isNewMember: true };
    const testMember2 = Member.create(objIdString);
    testMember2.status = { isActive: true, isNewMember: false };
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`status.isNewMember: > ${testMember1.status.isNewMember} < ${testMember2.status.isNewMember}`);
  });

  it('should return error when status.validPostMail values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.status = { isActive: true, validPostMail: 'none' };
    const testMember2 = Member.create(objIdString);
    testMember2.status = { isActive: true, validPostMail: 'returned mail' };
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`status.validPostMail: > ${testMember1.status.validPostMail} < ${testMember2.status.validPostMail}`);
  });

  it('should return error when status.validPostMail values do not match', function () {
    const objIdString = "303030303030303030303031";

    const testMember1 = Member.create(objIdString);
    testMember1.status = { isActive: true, newsletterType: 'email' };
    const testMember2 = Member.create(objIdString);
    testMember2.status = { isActive: true, newsletterType: 'post' };
    const { same, messages } = compareMembers(testMember1, testMember2);

    expect(same).to.equal(false);
    // expect(typeof messages).to.equal('object');
    // expect(messages instanceof Array).to.be.true;
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.equal(`status.newsletterType: > ${testMember1.status.newsletterType} < ${testMember2.status.newsletterType}`);
  });

});
