import { IMember } from "packages";

interface ParsedPhone {
  ituCode: string;
  naAreaCode: string;
  naPrefix: string;
  naLine: string;
  phOther: string;
};
class MembersReducers {
  static reduceMemberFullName(m: Partial<IMember>): string {
    let fullname = "";
    // precedence rule for this (poorly designed) interface
    // if there is a names:Array<{lastName:string,firstName:string}>
    // then return the fullnames:Array<string> = names.map( item => item.firstName + " "+ item.lastName)
    //                 fullname = fullnames.join(" & ")
    // else if there are lastName and firstName properties
    // then fullname = m.firstName + " " + m.lastName
    // else if there is a name property
    // then fullname = name
    // else fullname = ""
    if (m.hasOwnProperty("names") && m?.names && m.names?.length > 0) {
      const fullnames: Array<string> = m?.names?.map(item => item?.firstName + " " + item?.lastName) as Array<string>;
      fullname = fullnames.join(" & ");
    } else if (m.hasOwnProperty("firstName") || m.hasOwnProperty("lastName")) {
      fullname = m?.firstName + " " + m?.lastName;
    }
    return fullname;
  }

  static reduceAddressForMemberList(m: Partial<IMember>): string {
    let reducer_address: string;
    let reducer_unit: string;
    let reducer_city: string;
    let reducer_zip: string;
    if (m?.address === undefined) {
      reducer_address = "";
    } else {
      reducer_address = m.address;
    }
    if (m?.unit === undefined) {
      reducer_unit = "";
    } else {
      reducer_unit = " " + m.unit;
    }
    if (m?.city === undefined) {
      reducer_city = "";
    } else {
      reducer_city = ", " + m.city;
    }
    if (m?.postalCode === undefined) {
      reducer_zip = "";
    } else {
      reducer_zip = " " + m.postalCode.substring(0, 5);
    }
    return reducer_address + reducer_unit + reducer_city + reducer_zip;
  }

  static reducePaidThroughForMemberList(m: Partial<IMember>): string {
    const lifeMembershipCodes = ["LM", "HLM", "BEN"];
    const volunteerCodes = ["VOL"];
    const allNopayCodes = lifeMembershipCodes.concat(volunteerCodes);

    if (m?.mmb !== undefined && allNopayCodes.includes(m.mmb)) {
      return "---" as string;
    } else if (m?.paidThrough !== undefined) {
      let computedType: string = ({}).toString.call(m.paidThrough).toLowerCase();
      if (computedType === '[object date]') {
        return m.paidThrough.toISOString().substring(0, 10);
      } else if (computedType === '[object string]') {
        return (m.paidThrough as unknown as string).substring(0, 10);
      } else {
        return "unknown";
      }
    } else {
      return "undefined"
    }
  }

  static reduceJoinedForMemberList(m: Partial<IMember>): string {
    if (m?.joined !== undefined) {
      let computedType: string = ({}).toString.call(m.joined).toLowerCase();
      console.log(`fe-members-reducers.reduceJoiedForMemberList: computed type is ${computedType}`);
      if (computedType === '[object date]') {
        return m.joined.toISOString().substring(0, 10);
      } else if (computedType === '[object string]') {
        return (m.joined as unknown as string).substring(0, 10);
      } else {
        return "unknown";
      }
    } else {
      return "undefined"
    }
  }

  static reduceLastUpdatedForMemberList(m: Partial<IMember>): string {
    if (m?.lastUpdated !== undefined) {
      let computedType: string = ({}).toString.call(m.lastUpdated).toLowerCase();
      console.log(`fe-members-reducers.reduceUpdatedForMemberList: computed type is ${computedType}`);
      if (computedType === '[object date]') {
        return m.lastUpdated.toISOString().substring(0, 10);
      } else if (computedType === '[object string]') {
        return (m.lastUpdated as unknown as string).substring(0, 10);
      } else {
        return "unknown";
      }
    } else {
      return "undefined"
    }
  }

  static reducePhoneForMemberList(m: Partial<IMember>): string {
    let displayPhone = "undefined";
    if (m?.phone !== undefined) {
      displayPhone = "";
      // phone number coding:
      //   exit code for US +1 or 011
      //   country code (US is 1)
      //   NA area code
      //   NA prefix
      //   NA line
      const parsedPhone = MembersReducers.parsePhone(m.phone);
      console.log(`itu code: ${parsedPhone.ituCode}, ac:${parsedPhone.naAreaCode}, pre:${parsedPhone.naPrefix}, line:${parsedPhone.naLine}, oth:${parsedPhone.phOther}`)
      if (parsedPhone.ituCode) {
        switch (parsedPhone.ituCode) {
          case "NA":
            displayPhone = `${parsedPhone.naAreaCode}-${parsedPhone.naPrefix}-${parsedPhone.naLine}`;
            break;
          case "I":
            displayPhone = `${parsedPhone.phOther}`;
            break;
          default:
            displayPhone = `${parsedPhone.phOther}`;
            break;
        }
      }
    }
    console.log(`returning phone ${displayPhone}`)
    return displayPhone;
  }



  static parsePhone(phone: string): ParsedPhone {
    let result: ParsedPhone = {
      ituCode: "unknown",
      naAreaCode: "",
      naPrefix: "",
      naLine: "",
      phOther: phone
    };
    const phoneRegex = /(?<international>011[\d\s+]+)|((?<USCode>\+1){0,1}[\s-]*(?<naAreaCode>\d\d\d)-(?<naPrefix>\d\d\d)-(?<naLine>\d\d\d\d))(?<rest>.*)/;
    const phRegex = new RegExp(phoneRegex);
    const matches = phRegex.exec(phone);
    if (matches !== null) {
      if (matches.groups && matches.groups.naAreaCode && matches.groups.naPrefix && matches.groups.naLine) {
        result = {
          ituCode: "NA",
          naAreaCode: matches.groups.naAreaCode,
          naPrefix: matches.groups.naPrefix,
          naLine: matches.groups.naLine,
          phOther: matches.groups?.rest
        }
      } else if (matches.groups && matches.groups.international) {
        result = {
          ituCode: "I",
          naAreaCode: "",
          naPrefix: "",
          naLine: "",
          phOther: matches.groups.international
        }
      }
    }
    return result;
  }
}
export default MembersReducers;