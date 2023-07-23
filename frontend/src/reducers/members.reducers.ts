import { AllMemberProps } from "../@interfaces/MemberProps";

class MembersReducers {
  reduceMemberFullName( m:AllMemberProps):string {
    // console.log?.(JSON.stringify(m))
    let fullname = "";
    // precedence rule for this poorly designed interface
    // if there is a names:Array<{lastName:string,firstName:string}>
    // then return the fullnames:Array<string> = names.map( item => item.firstName + " "+ item.lastName)
    //                 fullname = fullnames.join(" & ")
    // else if there are lastName and firstName properties
    // then fullname = m.firstName + " " + m.lastName
    // else if there is a name property
    // then fullname = name
    // else fullname = ""
    if ( m.hasOwnProperty("names") ) {
      const fullnames:Array<string> = m?.names?.map( item => item?.firstName + " " + item?.lastName ) as Array<string>;
      fullname = fullnames.join(" & ");
    } else if (m.hasOwnProperty("lastName") || m.hasOwnProperty("firstName")) {
      fullname = m?.firstName + " " + m?.lastName;
    } else if (m.hasOwnProperty("name")) {
      fullname = m?.name === undefined ? "" : m.name;
    }
    return fullname;
  }
  reduceAddressForMemberList(m:AllMemberProps):string {
    //
    let reducer_address:string;
    let reducer_unit:string;
    let reducer_city:string;
    let reducer_zip:string;
    if ( m?.address === undefined ) {
      reducer_address = "";
    } else {
      reducer_address = m.address;
    }
    if ( m?.unit === undefined ) {
      reducer_unit = "";
    } else {
      reducer_unit = " " + m.unit;
    }
    if ( m?.city === undefined ) {
      reducer_city = "";
    } else {
      reducer_city = ", " + m.city;
    }
    if ( m?.postalCode === undefined ) {
      reducer_zip = "";
    } else {
      reducer_zip = " " + m.postalCode.substring(0,5);
    }
    // let address = m?.address + " " + m?.unit !== undefined ? m.unit + " " : "" + m?.postalCode;
    return reducer_address + reducer_unit + reducer_city + reducer_zip;
  }
  // reduceAddressForMemberList2(m:AllMemberProps):string {
  //   let reduced_result = { address: "", unit: "", postal_code: "" };
  //   for ( let key in Object.keys(reduced_result)){
  //     const propName = key;
  //     let value:string = (m as any)[propName];
  //     if ( value ) {
  //       (reduced_result as any)[propName] = propName !== "address" ? value : " " + value;
  //     } 
  //   }
  //   return reduced_result.address + reduced_result.unit + reduced_result.postal_code;
  // }
reducePaidThroughForMemberList(m:AllMemberProps):string {
  const lifeMembershipCodes = ["LM","HLM","BEN"];
  const volunteerCodes = ["VOL"];
  const allNopayCodes = lifeMembershipCodes.concat(volunteerCodes);

  if ( m?.mmb !== undefined && allNopayCodes.includes(m.mmb)) {
    return "---" as string;
  } else if ( m?.paidThrough !== undefined) {
    return m.paidThrough.substring(0,10);
  } else {
    return "unknown";
  }
}
reduceJoinedForMemberList(m:AllMemberProps):string {
  if ( m?.joined !== undefined ) {
    return m.joined.substring(0,10);
  } else {
    return "---";
  }
}
reduceLastUpdatedForMemberList(m:AllMemberProps):string {
  if ( m?.lastUpdated !== undefined ) {
    return m.lastUpdated.substring(0,10);
  } else {
    return "---";
  }
}

// reducePaidThroughForMemberForm(d:AllMemberProps):string {
//   data?.hasOwnProperty("paidThrough")?data.paidThrough:""
// }
}
export default new MembersReducers();