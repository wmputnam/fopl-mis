import {
  IAddress,
  IMemberDocument,
  INames,
  INotes,
  IRemittance,
  IVolunteer
} from "../../../packages/member-document";
import { Member } from "./Member"
import {type IDuesRates} from "../@interfaces";
import { MemberViewStates } from "../@interfaces";
import { Status } from "../services";
import { SaveUpdate } from "../@components";
import { getServerUrl } from ".";


const isPropDefined = (imember: IMemberDocument, prop: string & keyof IMemberDocument) => imember?.[prop] !== undefined;

export interface MmbBundle {
  mmb: string;
  paidThroughDate?: Date;
  joined?: Date;
}
export class MemberService {
  public static createMemberFromLoad(loadedIMemberData: IMemberDocument, mode: MemberViewStates): Member {
    const newMember: Member = Member.create();
    if (mode === MemberViewStates.new) {
      if (!newMember.status) {
        newMember.status = new Status();
      }
      newMember.status.isActive = true;
      return newMember
    } else if (!loadedIMemberData) {
      return null as unknown as Member;
    } else {
      if (isPropDefined(loadedIMemberData, "_id")) newMember["_id"] = loadedIMemberData["_id"];
      if (isPropDefined(loadedIMemberData, "firstName")) newMember["firstName"] = loadedIMemberData["firstName"];
      if (isPropDefined(loadedIMemberData, "lastName")) newMember["lastName"] = loadedIMemberData["lastName"];
      if (isPropDefined(loadedIMemberData, "names")) {
        if (loadedIMemberData.names) {
          if (newMember.names === undefined) {
            newMember.names = Array<INames>();
          }
          for (let i = 0; i < loadedIMemberData.names.length; i++) {
            newMember["names"][i] = loadedIMemberData.names[i];
          }
        }
      }
      if (isPropDefined(loadedIMemberData, "email")) newMember["email"] = loadedIMemberData["email"];
      if (isPropDefined(loadedIMemberData, "phone")) newMember["phone"] = loadedIMemberData["phone"];
      if (isPropDefined(loadedIMemberData, "address")) newMember["address"] = loadedIMemberData["address"];
      if (isPropDefined(loadedIMemberData, "unit")) newMember["unit"] = loadedIMemberData["unit"];
      if (isPropDefined(loadedIMemberData, "city")) newMember["city"] = loadedIMemberData["city"];
      if (isPropDefined(loadedIMemberData, "state")) newMember["state"] = loadedIMemberData["state"];
      if (isPropDefined(loadedIMemberData, "postalCode") && loadedIMemberData["postalCode"]?.length === 10) {
        newMember["postalCode"] = loadedIMemberData["postalCode"]
      };
      if (isPropDefined(loadedIMemberData, "volunteer")) {
        for (let i = 0; i < (loadedIMemberData?.volunteer ? loadedIMemberData?.volunteer?.length : 0); i++) {
          if (newMember.volunteerPreferences === undefined) {
            newMember.volunteerPreferences = Array<IVolunteer>();
          }
          if (newMember.volunteerRoles === undefined) {
            newMember.volunteerRoles = new Map<String, IVolunteer>();
          }
          const vObj: IVolunteer | string | undefined = loadedIMemberData.volunteer?.[i];
          if (vObj !== undefined) {
            if (typeof vObj === 'string') {
              let newVolObj: IVolunteer = {
                role: loadedIMemberData.volunteer?.[i] as unknown as string,
              } as IVolunteer;
              newMember["volunteerPreferences"][i] = newVolObj
              newMember.volunteerRoles.set(newVolObj.role, newVolObj)
            } else if (typeof vObj === 'object') {
              newMember["volunteerPreferences"][i] = vObj;
              newMember.volunteerRoles.set(vObj.role, vObj)
            }
          }
        }
      }
      if (isPropDefined(loadedIMemberData, "mmb")) newMember["mmb"] = loadedIMemberData["mmb"];
      if (isPropDefined(loadedIMemberData, "joined")) newMember["joined"] = loadedIMemberData["joined"];
      if (isPropDefined(loadedIMemberData, "paidThrough")) newMember["paidThrough"] = loadedIMemberData["paidThrough"];
      if (isPropDefined(loadedIMemberData, "lastUpdated")) newMember["lastUpdated"] = loadedIMemberData["lastUpdated"];
      if (isPropDefined(loadedIMemberData, "remittances")) {
        if (newMember.remittances === undefined) {
          newMember.remittances = Array<IRemittance>();
        }
        for (let i = 0; i < (loadedIMemberData.remittances ? loadedIMemberData.remittances.length : 0); i++) {
          if (loadedIMemberData.remittances?.[i]) {
            newMember.remittances.push(loadedIMemberData.remittances?.[i]);
          }
        }
      }
      if (isPropDefined(loadedIMemberData, "notes")) {
        if (newMember.notes === undefined) {
          newMember.notes = Array<INotes>();
        }
        for (let i = 0; i < (loadedIMemberData.notes ? loadedIMemberData.notes.length : 0); i++) {
          if (loadedIMemberData.notes?.[i]) {
            newMember.notes.push(loadedIMemberData.notes?.[i]);
          }
        }
      }

      if (isPropDefined(loadedIMemberData, "isActive")
        || isPropDefined(loadedIMemberData, "validEmail")
        || isPropDefined(loadedIMemberData, "validPostMail")
        || isPropDefined(loadedIMemberData, "newsletterType")
        || isPropDefined(loadedIMemberData, "isNewMember")
      ) {
        if (newMember.status === undefined) {
          newMember.status = new Status();
        }
        if (loadedIMemberData.isActive !== undefined) {
          newMember.status.isActive = loadedIMemberData.isActive;
        }
        if (loadedIMemberData.validPostMail !== undefined) {
          newMember.status.validPostMail = loadedIMemberData.validPostMail;
        }
        if (loadedIMemberData.validEmail !== undefined) {
          newMember.status.validEmail = loadedIMemberData.validEmail;
        }
        if (loadedIMemberData.newsletterType !== undefined) {
          newMember.status.newsletterType = loadedIMemberData.newsletterType;
        }
        if (loadedIMemberData.isNewMember !== undefined) {
          newMember.status.isNewMember = loadedIMemberData.isNewMember;
        }
      }
      if (newMember._remitDate) { newMember["_remitDate"] = undefined };
    }

    return newMember;
  }

  public static getDuesRates(): IDuesRates {
    return {
      LIFE_MEMBER_DUES: 100.00,    // TODO -- get these values from a configuration
      PATRON_DUES: 25.00,
      FAMILY_DUES: 10.00,
      INDIVIDUAL_DUES: 5.00,
      SENIOR_STUDENT_DUES: 2.00,
    };
  }

  public static getDatePlus1Year = (initialDate: Date | undefined): Date | undefined => {
    const DAY_IN_MILLISEC = 86400000;
    if (initialDate) {
      const futureDate = new Date(initialDate.valueOf() - DAY_IN_MILLISEC);
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      return futureDate;
    } else {
      return undefined;
    }
  }

  static getYyFromDate = (refDate: Date | undefined): string | undefined => (
    refDate && refDate instanceof Date
      ? refDate.getFullYear().toString().substring(2, 4)
      : undefined);  // get the year from the century-year


  static getNewMmbBundle(_memberObj: Member): MmbBundle {
    let mmb: string = "VOL";
    let joined: Date | undefined = undefined;

    const duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
    const newPaidThroughDate = MemberService.getNewPaidThroughDate(_memberObj);
    if (duesEntry !== undefined
      && duesEntry?.amount !== undefined
      && duesEntry?.date !== undefined
      && newPaidThroughDate !== undefined) {

      if (_memberObj.joined) {
        joined = _memberObj.joined
      } else {
        joined = duesEntry.date;
      }

      const { LIFE_MEMBER_DUES, PATRON_DUES, FAMILY_DUES, INDIVIDUAL_DUES, SENIOR_STUDENT_DUES } = MemberService.getDuesRates();

      const duesAmount = parseFloat(duesEntry.amount);

      const yy = MemberService.getYyFromDate(newPaidThroughDate);

      if (yy !== undefined && !Number.isNaN(duesAmount)) {
        if (duesAmount >= LIFE_MEMBER_DUES) {
          mmb = "LM";
        } else if (duesAmount < LIFE_MEMBER_DUES && duesAmount >= PATRON_DUES) {
          mmb = "P" + yy;
        } else if (duesAmount >= FAMILY_DUES && duesAmount < PATRON_DUES) {
          mmb = "F" + yy;
        } else if (duesAmount >= INDIVIDUAL_DUES && duesAmount < FAMILY_DUES) {
          mmb = "" + yy;
        } else if (duesAmount >= SENIOR_STUDENT_DUES && duesAmount < INDIVIDUAL_DUES) {
          mmb = "S" + yy
        }
      }
      if (joined) {
        return { mmb: mmb, paidThroughDate: newPaidThroughDate, joined: joined };
      } else {
        return { mmb: mmb, paidThroughDate: newPaidThroughDate };
      }
    }
    return { mmb: mmb }
  }
  public static postUnjournalledRemits(_memberObj: Member): Member {
    // add any entered (suspense) remit information to the remittances array 
    const newMember: Member | undefined = _memberObj.deepClone();
    if (newMember) {
      if (newMember.remitDate) {

        if (newMember.remitDues) {
          const remitDuesClean = newMember.remitDues.indexOf("$") >= 0
            ? newMember.remitDues.substring(1)
            : newMember.remitDues;
          newMember._remittances?.push({ date: newMember.remitDate, amount: remitDuesClean, memo: "dues" });
          console.log(`newMember: \n${JSON.stringify(newMember)}`);
          if (newMember.mmb !== "LM") {
            const { mmb, paidThroughDate, joined }: MmbBundle =
              MemberService.getNewMmbBundle(newMember);
            console.log(`get new mmb bundle: ${mmb},${paidThroughDate},${joined} `);
            if (mmb) {
              newMember.mmb = mmb;
            }
            if (paidThroughDate) {
              newMember.paidThrough = paidThroughDate;
            }
            if (joined) {
              newMember.joined = joined;
            }
          }

        }

        if (newMember.remitDonation) {
          newMember._remittances?.push({ date: newMember.remitDate, amount: newMember.remitDonation, memo: "donation" });
        }
      }
      return newMember;
    }
    return _memberObj;
  }

  public static hasProp = ((obj: Object, prop: string) => obj.hasOwnProperty.call(obj, prop));

  public static isEmptyObject = (obj: Object) => {
    for (let i in obj) return false;
    return true;
  }

  public static isLifeMember = (_memberInfo: Member | string | undefined) => {
    const LIFE_MEMBER_MMB = ["LM", "HLM"];
    if (_memberInfo) {
      if (_memberInfo instanceof Member) {
        let _mmb = _memberInfo?.mmb === undefined ? "" : _memberInfo.mmb;
        return LIFE_MEMBER_MMB.includes(_mmb);
      } else if (typeof _memberInfo === 'string') {
        return LIFE_MEMBER_MMB.includes(_memberInfo);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static isVolunteer = (_memberInfo: Member | string | undefined) => {
    const VOLUNTEER_MMB = ["VOL"];
    if (_memberInfo) {
      if (_memberInfo instanceof Member) {
        let _mmb = _memberInfo?.mmb === undefined ? "" : _memberInfo.mmb;
        return VOLUNTEER_MMB.includes(_mmb);
      } else if (typeof _memberInfo === 'string') {
        return VOLUNTEER_MMB.includes(_memberInfo);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  public static isDroppedMember = (_memberInfo: Member | string | undefined) => {
    const DROPPED_MEMBER_MMB = ["OUT"];
    if (_memberInfo) {
      if (_memberInfo instanceof Member) {
        let _mmb = _memberInfo?.mmb === undefined ? "" : _memberInfo.mmb;
        return DROPPED_MEMBER_MMB.includes(_mmb);
      } else if (typeof _memberInfo === 'string') {
        return DROPPED_MEMBER_MMB.includes(_memberInfo);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static getMostRecentDuesEntry = (_memberObj: Member): IRemittance | undefined => {
    if (_memberObj?.remittances !== undefined && _memberObj?.remittances.length !== undefined) {
      const duesEntries = _memberObj.remittances.filter(({ date, amount, memo }) => memo === "dues");
      const duesDateValues = duesEntries.map((e) => e.date.valueOf());
      const minDuesDateValue = Math.min(...duesDateValues);
      const MILLI_SEC_PER_DAY = 8.67e+7;
      const minDuesDate: Date = new Date(minDuesDateValue - MILLI_SEC_PER_DAY);
      let result: IRemittance = { date: minDuesDate, amount: "0", memo: "" } as IRemittance;

      for (let i = 0; i <= _memberObj.remittances.length; i++) {
        let _remit: IRemittance = _memberObj.remittances[i];
        if (_remit !== undefined && _remit.date !== undefined && _remit.memo !== undefined && _remit.memo === "dues" && _remit.amount !== undefined && parseFloat(_remit.amount) >= 0.0) {
          const _remitDate = new Date(_remit.date)
          if (_remitDate > result.date) {
            result.date = _remitDate;
            result.amount = _remit.amount;
            result.memo = _remit.memo
          }
        }
      }
      if (result.memo === "dues") {
        return result;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  public static getUspsValidAddress = (_memberObj: Member | undefined): IAddress | undefined => {
    // TODO call USPS validation here 
    if (_memberObj) {
      let iAddress = Object.create({});
      if (_memberObj.address) { iAddress["address"] = _memberObj.address; }
      if (_memberObj.unit) { iAddress["unit"] = _memberObj.unit; }
      if (_memberObj.city) { iAddress["city"] = _memberObj.city; }
      if (_memberObj.state) { iAddress["state"] = _memberObj.state; }
      if (_memberObj.postalCode) { iAddress["postalCode"] = _memberObj.postalCode; }
      return iAddress;
    } else {
      return undefined;
    }
  }
  static areAddressesSame = (_memberObj: Member, validatedAddress: IAddress): boolean => {
    const { address, unit, city, state, postalCode } = _memberObj;
    return (validatedAddress?.address === address) &&
      (validatedAddress?.unit === unit) &&
      (validatedAddress?.city === city) &&
      (validatedAddress?.state === state) &&
      (validatedAddress?.postalCode === postalCode);
  }

  public static getNewPaidThroughDate = (_memberObj: Member): Date | undefined => {
    const duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
    if (duesEntry !== undefined) {
      console.log(`most recent dues remit ${JSON.stringify(duesEntry)}`)
      const duesPdThru: Date | undefined =
        duesEntry
          ? MemberService.getDatePlus1Year(duesEntry.date)
          : undefined;
      duesPdThru && console.log(`duesPdThru ${JSON.stringify(duesPdThru?.toISOString().substring(0, 10))}`)

      const priorPdThru: Date | undefined = _memberObj._hasPaidThroughDate()
        ? MemberService.getDatePlus1Year(_memberObj.paidThrough)
        : undefined;
      console.log(`most recent dues remit ${JSON.stringify(duesEntry)}`)

      const newPaidThroughDate: Date | undefined =
        new Date(
          Math.max(
            duesPdThru !== undefined ? duesPdThru.valueOf() : 0,
            priorPdThru !== undefined ? priorPdThru.valueOf() : 0
          ));
      console.log(`most recent dues remit ${JSON.stringify(duesEntry)}`)

      if (newPaidThroughDate.valueOf() === (new Date(0)).valueOf()) {
        return undefined;
      } else {
        return newPaidThroughDate;
      }
    } else {
      return undefined;
    }
  }

  static hasSameNames(refArr: Array<INames>, newArr: Array<INames>): boolean {
    if (refArr.length !== newArr.length) {
      return false;
    } else {
      for (let i = 0; i < refArr.length; i++) {
        if (refArr[i].firstName !== newArr[i].firstName || refArr[i].lastName !== newArr[i].lastName) {
          return false;
        }
      }
    }
    return true;
  }

  static hasSameRemits(refArr: Array<IRemittance>, newArr: Array<IRemittance>): boolean {
    if (refArr.length !== newArr.length) {
      return false;
    } else {
      for (let i = 0; i < refArr.length; i++) {
        if (refArr[i].date.valueOf() !== newArr[i].date.valueOf() || refArr[i].amount !== newArr[i].amount || refArr[i].memo !== newArr[i].memo) {
          return false;
        }
      }
    }
    return true;
  }

  static hasSameVolPrefs(refArr: Array<IVolunteer>, newArr: Array<IVolunteer>): boolean {
    if (refArr.length !== newArr.length) {
      return false;
    } else {
      for (let i = 0; i < refArr.length; i++) {
        if (refArr[i].role !== newArr[i].role) {
          return false;
        }
      }
    }
    return true;
  }

  static hasSameNotes(refArr: Array<INotes>, newArr: Array<INotes>): boolean {
    if (refArr.length !== newArr.length) {
      return false;
    } else {
      for (let i = 0; i < refArr.length; i++) {
        if ((refArr[i].date.valueOf() !== newArr[i].date.valueOf()) ||
          (refArr[i].note !== newArr[i].note)) {
          return false;
        }
      }
    }
    return true;
  }
  static addNote = (_memberObj: Member, note: string) => {
    _memberObj?.notes?.push({
      date: new Date(),
      note: note
    });
  }

  static PHONE_RE = /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/;
  static getFormattedPhoneNumber = (input: string): any => {
    return input.replace(MemberService.PHONE_RE, (substring: string, g1: any, g2: any, g3: any): string => {
      let output: string = "(";
      if (g1.length) {
        output += g1;
        if (g1.length === 3) {
          output += ")";
          if (g2.length) {
            output += " " + g2;
            if (g2.length === 3) {
              output += "-";
              if (g3.length) {
                output += g3;
              }
            }
          }
        }
      }
      return output;
    });
  }

  static retrieveMemberId = (failOnEmpty: boolean = false) => {
    const lsMemberId: string | undefined = localStorage.getItem("memberId") !== null ? localStorage.getItem("memberId") as string : undefined;
    if (lsMemberId) {
      return lsMemberId;
    } else if (failOnEmpty) {
      throw Error(`expected member id to be available`);
    } else {
      return "";
    }
  }
  static saveMemberId = (value: string) => {
    if (window !== undefined) {
      localStorage.setItem("memberId", value);
    }
  }

  static clearMemberId = (failOnEmpty: boolean = false) => {
    if (window !== undefined) {
      localStorage.removeItem("memberId");
    }
  }

  static setMemberStatusToActive = (memberObj: Member) => {
    return this.changeIsActive(memberObj, true);
  }

  static changeMemberStatusToInactive = (memberObj: Member) => {
    return this.changeIsActive(memberObj, false);
  }

  static changeIsActive = (memberObj: Member, nextState: boolean) => {
    if (memberObj) {
      const memberOutObj: Member | undefined = memberObj.deepClone();
      if (memberOutObj) {
        if (memberObj.status) {
          memberOutObj.status = { ...memberObj.status, isActive: nextState }
        } else {
          memberOutObj.status = new Status();
          memberOutObj.status.isActive = nextState;
        }
        return memberOutObj;
      }
    }
    return memberObj;
  }

  static setMemberEmailStatus = (memberObj: Member, newStatus: 'verified' | 'bounced' | 'unchecked' | 'none' = 'unchecked') => {
    if (memberObj) {
      const memberOutObj: Member | undefined = memberObj.deepClone();
      if (memberOutObj) {
        if (memberObj.status) {
          memberOutObj.status = { ...memberObj.status, validEmail: newStatus }
        } else {
          memberOutObj.status = new Status();
          memberOutObj.status.validEmail = newStatus;
        }
        return memberOutObj;
      }
    }
    return memberObj;
  }

  static setMemberPostalStatus = (memberObj: Member, newStatus: 'valid' | 'returned mail' | 'none' = 'none') => {
    if (memberObj) {
      const memberOutObj: Member | undefined = memberObj.deepClone();
      if (memberOutObj) {
        if (memberObj.status) {
          console.log(`MemberService.setMemberPostalStatus setting postMail to ${newStatus}`)
          memberOutObj.status = { ...memberObj.status, validPostMail: newStatus }
        } else {
          memberOutObj.status = new Status();
          console.log(`MemberService.setMemberPostalStatus setting new status postMail to ${newStatus}`)
          memberOutObj.status.validPostMail = newStatus;
        }
        return memberOutObj;
      }
    }
    return memberObj;
  }

  static setMemberNewsletterStatus = (memberObj: Member, newStatus: 'email' | 'post' | 'none' = 'email') => {
    if (memberObj) {
      const memberOutObj: Member | undefined = memberObj.deepClone();
      if (memberOutObj) {
        if (memberObj.status) {
          memberOutObj.status = { ...memberObj.status, newsletterType: newStatus }
        } else {
          memberOutObj.status = new Status();
          memberOutObj.status.newsletterType = newStatus;
        }
        return memberOutObj;
      }
    }
    return memberObj;
  }

  static deactivateMemberAction = async (memberId: string) => {
    await MemberService.updateMemberIsActiveInDatabase(memberId, false);
  }

  static setReturnedMailMemberAction = async (memberId: string) => {
    await MemberService.updateMemberValidPostMailInDatabase(memberId, false);
  }

  static setBouncedEmailMemberAction = async (memberId: string) => {
    await MemberService.updateMemberValidEmailInDatabase(memberId, 'bounced');
  }

  static setVerifiedEmailMemberAction = async (memberId: string) => {
    await MemberService.updateMemberValidEmailInDatabase(memberId, 'verified');
  }

  static setNewMemberOrientedAction = async (memberId: string) => {
    await MemberService.updateIsNewMemberInDatabase(memberId, true);
  }

  static updateMemberIsActiveInDatabase = async (memberId: string, newIsActive: boolean = false) => {
    const payload = { isActive: newIsActive };
    await SaveUpdate(getServerUrl(), payload, memberId)
  }

  static updateMemberValidPostMailInDatabase = async (memberId: string, newValidPostMailStatus: boolean = false) => {
    const payload = { validPostMail: newValidPostMailStatus };
    await SaveUpdate(getServerUrl(), payload, memberId)
  }

  static updateMemberValidEmailInDatabase = async (memberId: string, newValidEmailStatus: ('verified' | 'bounced' | 'unchecked' | 'none') = 'bounced') => {
    const payload = { validEmail: newValidEmailStatus };
    await SaveUpdate(getServerUrl(), payload, memberId)
  }

  static updateIsNewMemberInDatabase = async (memberId: string, newIsNewMember: boolean = false) => {
    const payload = { isNewMember: newIsNewMember };
    await SaveUpdate(getServerUrl(), payload, memberId)
  }
}