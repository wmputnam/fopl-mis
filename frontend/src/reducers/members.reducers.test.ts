/* eslint-disable jest/valid-expect */
import { expect } from "chai";
import { describe, it } from "mocha";
import { fileURLToPath } from "url";
import MembersReducers from "./members.reducers.js"

const __filename = fileURLToPath(import.meta.url)

const fn = () => `${__filename.split('/').pop()}`;

describe(`${fn()}: reduceMemberFullName`, function () {

  it('should return a fullname when given a firstName and lastName (no names array)', function () {
    const result = MembersReducers.reduceMemberFullName({ lastName: 'Smith', firstName: 'Chuck' });
    expect(result).to.be.equal('Chuck Smith');
  });

  it('should return a fullname using names array when given a firstName and lastName plus a names array)', function () {
    const result = MembersReducers.reduceMemberFullName({
      lastName: 'Smith', firstName: 'Chuck', names: [
        { firstName: 'Betty', lastName: 'Boop' }, { firstName: 'Foghorn', lastName: 'Leghorn' }
      ]
    });
    expect(result).to.be.equal('Betty Boop & Foghorn Leghorn');
  })

  it('should return "" when given no firstName and no lastName and no names array)', function () {
    const result = MembersReducers.reduceMemberFullName({});
    expect(result).to.be.equal('');
  })

});

describe(`${fn()}: reduceAddressForMemberList`, function () {

  it('should return a one line address when given address, unit, city, state, and postalcode', function () {
    const result = MembersReducers.reduceAddressForMemberList({
      address: '100 Fairgrounds Dr',
      unit: 'Friends of the Library',
      city: 'Petaluma',
      state: 'CA',
      postalCode: '95952-1234',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('100 Fairgrounds Dr Friends of the Library, Petaluma 95952');
  });

});

// reducePaidThroughForMemberList
describe(`${fn()}: reducePaidThroughForMemberList`, function () {

  it('should return "---" when member mmb is LM', function () {
    const result = MembersReducers.reducePaidThroughForMemberList({
      mmb: 'LM',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('---');
  });

  it('should return "---" when member mmb is HLM', function () {
    const result = MembersReducers.reducePaidThroughForMemberList({
      mmb: 'HLM',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('---');
  });

  it('should return "---" when member mmb is BEN', function () {
    const result = MembersReducers.reducePaidThroughForMemberList({
      mmb: 'BEN',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('---');
  });

  it('should return "---" when member mmb is VOL', function () {
    const result = MembersReducers.reducePaidThroughForMemberList({
      mmb: 'VOL',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('---');
  });

  it('should return "undefined" when member mmb is not one of [LM,HLM,BEN,VOL] and paidThrough is undefined', function () {
    const result = MembersReducers.reducePaidThroughForMemberList({
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('undefined');
  });

  it('should return first 10 chars of ISO date when member mmb is not one of [LM,HLM,BEN,VOL] and paidThrough is a Date', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reducePaidThroughForMemberList({
      paidThrough: new Date(),
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end

  });

  it('should return first 10 chars of provided date string when member mmb is not one of [LM,HLM,BEN,VOL] and paidThrough is a string', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reducePaidThroughForMemberList({
      paidThrough: '2023-04-01T13:31:22.999Z' as unknown as Date,
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end
  });

});

//reduceJoinedForMemberList
describe(`${fn()}: reduceJoinedForMemberList`, function () {

  it('should return "undefined" when member joined is not provided', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceJoinedForMemberList({
      mmb: 'LM',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('undefined');
    // jscpd:ignore-end
  });

  it('should return first 10 chars of ISO date when member joined is a Date', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceJoinedForMemberList({
      joined: new Date(),
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end
  });

  it('should return first 10 chars of provided date string when joined is a string', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceJoinedForMemberList({
      joined: '2023-04-01T13:31:22.999Z' as unknown as Date,
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end
  });

});

// reduceLastUpdatedForMemberList
describe(`${fn()}: reduceLastUpdatedForMemberList`, function () {

  it('should return "undefined" when member lastUpdated is not provided', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceLastUpdatedForMemberList({
      mmb: 'LM',
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.equal('undefined');
    // jscpd:ignore-end
  });

  it('should return first 10 chars of ISO date when member lastUpdated is a Date', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceLastUpdatedForMemberList({
      lastUpdated: new Date(),
      firstName: 'Billy',
      lastName: 'Budd'
    });
    
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end
  });

  it('should return first 10 chars of provided date string when lastUpdated is a string', function () {
    // jscpd:ignore-start
    const result = MembersReducers.reduceLastUpdatedForMemberList({
      lastUpdated: '2023-04-01T13:31:22.999Z' as unknown as Date,
      firstName: 'Billy',
      lastName: 'Budd'
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(result).to.be.a('string');
    expect(result.length).to.be.equal(10);
    // jscpd:ignore-end
  });
  //reducePhoneForMemberList
  describe(`${fn()}: reducePhoneForMemberList`, function () {

    it('should return provided number when it has format AC-PRE-LINE', function () {
      const result = MembersReducers.reducePhoneForMemberList({
        mmb: 'LM',
        firstName: 'Billy',
        lastName: 'Budd',
        phone: '707-555-1212'
      });
      expect(result).to.be.equal('707-555-1212');
    });

    it('should return provided phone when given AC-PRE-LINE and then cruft', function () {
      const result = MembersReducers.reducePhoneForMemberList({
        lastUpdated: new Date(),
        firstName: 'Billy',
        lastName: 'Budd',
        phone: '415-555-1212m'
      });
      expect(result).to.be.equal('415-555-1212');
    });

    it('should return provided phone when given +1 AC-PRE-LINE', function () {
      const result = MembersReducers.reducePhoneForMemberList({
        lastUpdated: '2023-04-01T13:31:22.999Z' as unknown as Date,
        firstName: 'Billy',
        lastName: 'Budd',
        phone: '+1 201-555-1212'
      });
      expect(result).to.be.equal('201-555-1212');
    });

    it.only('should return provided phone when given PRE-LINE', function () {
      const result = MembersReducers.reducePhoneForMemberList({
        lastUpdated: '2023-04-01T13:31:22.999Z' as unknown as Date,
        firstName: 'Billy',
        lastName: 'Budd',
        phone: '555-1212'
      });
      expect(result).to.be.equal('555-1212');
    });

    it('should return first 12 chars of provided date string when lastUpdated is a string', function () {
      const result = MembersReducers.reducePhoneForMemberList({
        lastUpdated: '2023-04-01T13:31:22.999Z' as unknown as Date,
        firstName: 'Billy',
        lastName: 'Budd',
        phone: '011 23 555 1212'
      });
      expect(result.length).to.be.equal('011 23 555 1212');
    });

  });
});