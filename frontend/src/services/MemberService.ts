import { IMember } from "packages/member-shared";
import { Member } from "./Member"
import IDuesRates from "../@interfaces/DuesRates";
import { Remittance } from "packages/Remittance";
import { Volunteer } from "packages/Volunteer";
import { IAddress } from "packages/IAddress";
import { Names } from "packages/Names";
import { Notes } from "packages/Notes";
import { MemberViewStates } from "../@interfaces/enums";

const isPropDefined = (imember: IMember, prop: string & keyof IMember) => imember?.[prop] !== undefined;
export class MemberService {
  public static createMemberFromLoad(loadedIMemberData: IMember, mode: MemberViewStates): Member {
    const newMember: Member = Member.create();
    if (mode === MemberViewStates.new) {
      return newMember
    } else {
      if (isPropDefined(loadedIMemberData, "_id")) newMember["_id"] = loadedIMemberData["_id"];
      if (isPropDefined(loadedIMemberData, "firstName")) newMember["firstName"] = loadedIMemberData["firstName"];
      if (isPropDefined(loadedIMemberData, "lastName")) newMember["lastName"] = loadedIMemberData["lastName"];
      if (isPropDefined(loadedIMemberData, "names")) {
        if (loadedIMemberData.names) {
          if (newMember.names === undefined) {
            newMember.names = Array<Names>();
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
      if (isPropDefined(loadedIMemberData, "postalCode")) newMember["postalCode"] = loadedIMemberData["postalCode"];
      if (isPropDefined(loadedIMemberData, "volunteerPreferences")) {
        for (let i = 0; i < (loadedIMemberData?.volunteerPreferences ? loadedIMemberData?.volunteerPreferences?.length : 0); i++) {
          if (newMember.volunteerPreferences === undefined) {
            newMember.volunteerPreferences = Array<Volunteer>();
          }
          const vObj: Volunteer | string | undefined = loadedIMemberData.volunteerPreferences?.[i];
          if (vObj !== undefined) {
            if (typeof vObj === 'string') {
              let newVolObj: Volunteer = {
                role: loadedIMemberData.volunteerPreferences?.[i] as unknown as string,
              } as Volunteer;
              newMember["volunteerPreferences"][i] = newVolObj
            } else if (typeof vObj === 'object') {
              newMember["volunteerPreferences"][i] = vObj;
            }
          }
        }
      }
      if (isPropDefined(loadedIMemberData, "mmb")) newMember["mmb"] = loadedIMemberData["mmb"];
      if (isPropDefined(loadedIMemberData, "joined")) newMember["joined"] = loadedIMemberData["joined"];
      if (isPropDefined(loadedIMemberData, "lastUpdated")) newMember["lastUpdated"] = loadedIMemberData["lastUpdated"];
      if (isPropDefined(loadedIMemberData, "remittances")) {
        if (newMember.remittances === undefined) {
          newMember.remittances = Array<Remittance>();
        }
        for (let i = 0; i < (loadedIMemberData.remittances ? loadedIMemberData.remittances.length : 0); i++) {
          if (loadedIMemberData.remittances?.[i]) {
            newMember.remittances.push(loadedIMemberData.remittances?.[i]);
          }
        }
      }
      if (isPropDefined(loadedIMemberData, "notes")) {
        if (newMember.notes === undefined) {
          newMember.notes = Array<Notes>();
        }
        for (let i = 0; i < (loadedIMemberData.notes ? loadedIMemberData.notes.length : 0); i++) {
          if (loadedIMemberData.notes?.[i]) {
            newMember.notes.push(loadedIMemberData.notes?.[i]);
          }
        }
      }
      return newMember;
    }
  }

  public static createMemberFromLocalStorage(): Member {
    const newMember: Member = Member.create();
    const isLoaded = localStorage.getItem("loaded") !== null
    if (isLoaded) {
      newMember.id = localStorage.getItem("memberId") ? localStorage.getItem("memberId") as string : undefined;
      newMember.firstName = localStorage.getItem("firstName") ? localStorage.getItem("firstName") as string : "";
      newMember.lastName = localStorage.getItem("lastName") ? localStorage.getItem("lastName") as string : "";
      newMember.email = localStorage.getItem("email") ? localStorage.getItem("email") as string : "";
      newMember.phone = localStorage.getItem("phone") ? localStorage.getItem("phone") as string : "";
      newMember.address = localStorage.getItem("address") ? localStorage.getItem("address") as string : "";
      newMember.unit = localStorage.getItem("unit") ? localStorage.getItem("unit") as string : "";
      newMember.city = localStorage.getItem("city") ? localStorage.getItem("city") as string : "";
      newMember.state = localStorage.getItem("state") ? localStorage.getItem("state") as string : "";
      newMember.postalCode = localStorage.getItem("postalCode") ? localStorage.getItem("postalCode") as string : "";
      newMember.mmb = localStorage.getItem("mmb") ? localStorage.getItem("mmb") as string : "";
      newMember.joined = localStorage.getItem("joined") ? new Date(localStorage.getItem("joined") as string) : undefined;
      newMember.lastUpdated = localStorage.getItem("lastUpdated") ? new Date(localStorage.getItem("lastUpdated") as string) : undefined;
      const namesJSON: string = localStorage.getItem("names") as string;
      if (namesJSON != null) {
        const namesObj: Object = JSON.parse(namesJSON);
        newMember.names = namesObj as Array<Names>;
      }
      const notesJSON: string = localStorage.getItem("notes") as string;
      if (notesJSON != null) {
        const notesObj: Object = JSON.parse(notesJSON);
        newMember.notes = notesObj as Array<Notes>;
      }
      let remitsJSON: string = localStorage.getItem("remittances") as string;
      if (remitsJSON != null) {
        let remitsObj: Object = JSON.parse(namesJSON);
        newMember.remittances = remitsObj as Array<Remittance>;
      }
      let volsJSON: string = localStorage.getItem("volunteerPreferences") as string;
      if (volsJSON != null) {
        let volsObj: Object = JSON.parse(volsJSON);
        newMember.volunteerPreferences = volsObj as Array<Volunteer>;
      }
    }
    console.log(`returning member ${isLoaded ? "from local storage" : "new"}`)
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
    if (initialDate) {
      const futureDate = new Date();
      futureDate.setFullYear(initialDate.getFullYear() + 1)
      return futureDate;
    } else {
      return undefined;
    }
  }

  static getYyFromDate = (refDate: Date | undefined): string | undefined => (
    refDate && refDate instanceof Date
      ? refDate.getFullYear().toString().substring(2, 4)
      : undefined);  // get the year from the century-year

  public static getNewMmb(_memberObj: Member): string | undefined {
    const duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
    const newPaidThroughDate = MemberService.getNewPaidThroughDate(_memberObj);

    if (duesEntry !== undefined
      && duesEntry?.amount !== undefined
      && duesEntry?.date !== undefined
      && newPaidThroughDate !== undefined) {

      const { LIFE_MEMBER_DUES, PATRON_DUES, FAMILY_DUES, INDIVIDUAL_DUES, SENIOR_STUDENT_DUES } = MemberService.getDuesRates();

      const duesAmount = parseFloat(duesEntry.amount);

      const yy = MemberService.getYyFromDate(newPaidThroughDate);

      if (yy !== undefined && !Number.isNaN(duesAmount)) {
        if (duesAmount >= LIFE_MEMBER_DUES) {
          return "LM";
        } else if (duesAmount < LIFE_MEMBER_DUES && duesAmount >= PATRON_DUES) {
          return "P" + yy;
        } else if (duesAmount >= FAMILY_DUES && duesAmount < PATRON_DUES) {
          return "F" + yy;
        } else if (duesAmount >= INDIVIDUAL_DUES && duesAmount < FAMILY_DUES) {
          return "" + yy;
        } else if (duesAmount >= SENIOR_STUDENT_DUES && duesAmount < INDIVIDUAL_DUES) {
          return "S" + yy
        }
      } else {
        return undefined;
      }
    }
  };

  public static eliminateEmptyProperties = (memberData: IMember): IMember => {
    let oData = {} as any;
    for (const e in memberData) {
      if (memberData.hasOwnProperty(e) && memberData[e as keyof IMember] !== undefined) {
        console.log(`fe-member-service--elimEmptyProperties key: ${e} typeof: ${typeof memberData[e as keyof IMember]} value: ${memberData[e as keyof IMember]}`)
        if (typeof memberData[e as keyof IMember] === 'string') {
          if (memberData[e as keyof IMember] !== "") {
            oData[e as keyof IMember] = memberData[e as keyof IMember] as unknown as string;
          }
        } else if (memberData[e as keyof IMember] instanceof Array) {
          if ((memberData[e as keyof IMember] as Array<any>).length > 0) {
            oData[e as keyof IMember] = Array<any>();
            for (let indx = 0; indx < (memberData[e as keyof IMember] as Array<any>).length; indx++) {
              (oData[e as keyof IMember] as Array<any>).push(structuredClone((memberData[e as keyof IMember] as Array<any>)[indx]));
            }
          }
        } else if (memberData[e as keyof IMember] instanceof Date) {
          oData[e as keyof IMember] = new Date((memberData[e as keyof IMember] as Date).valueOf());
        }
      }
    }
    return oData;
  }

  public static findNewAndChanged = (iMemberRef: IMember | undefined, iMemberNew: Partial<IMember>, ikeys: Array<string> = []): Partial<IMember> => {
    if (iMemberRef) {
      let deltaIMember = {} as any;
      const searchKeys: Array<string> = ikeys.length > 0 ? ikeys : Object.keys(iMemberRef);

      for (const e in iMemberRef) {
        console.log(`fe-member-service--elimEmptyProperties key: ${e} typeof: ${typeof iMemberRef[e as keyof IMember]} value: ${iMemberRef[e as keyof IMember]}`)
        if (searchKeys.includes(e)) {
          if (iMemberRef.hasOwnProperty(e) && iMemberNew.hasOwnProperty(e) &&
            typeof iMemberRef[e as keyof IMember] === typeof iMemberNew[e as keyof IMember]) {
            if (typeof iMemberRef[e as keyof IMember] === "string" &&
              iMemberRef[e as keyof IMember] !== iMemberNew[e as keyof IMember]) {
              deltaIMember[e as keyof IMember] = iMemberNew[e as keyof IMember];
            } else if (typeof iMemberRef[e as keyof IMember] === "object" &&
              iMemberRef[e as keyof IMember] instanceof Date &&
              iMemberRef[e as keyof IMember]?.valueOf() !== iMemberNew[e as keyof IMember]?.valueOf()) {
              deltaIMember[e as keyof IMember] = new Date((iMemberNew[e as keyof IMember] as Date).valueOf());
            } else if (typeof iMemberRef[e as keyof IMember] === "object") {
              switch (e as keyof IMember as string) {
                case "names":
                  if (!MemberService.hasSameNames(iMemberRef[e as keyof IMember] as Array<Names>, iMemberNew[e as keyof IMember] as Array<Names>)) {
                    deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  }
                  break;
                case "remittances":
                  if (!MemberService.hasSameRemits(iMemberRef[e as keyof IMember] as Array<Remittance>, iMemberNew[e as keyof IMember] as Array<Remittance>)) {
                    deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  }
                  break;
                case "volunteerProferences":
                  if (!MemberService.hasSameVolPrefs(iMemberRef[e as keyof IMember] as Array<Volunteer>, iMemberNew[e as keyof IMember] as Array<Volunteer>)) {
                    deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  }
                  break;
                case "notes":
                  if (!MemberService.hasSameNotes(iMemberRef[e as keyof IMember] as Array<Notes>, iMemberNew[e as keyof IMember] as Array<Notes>)) {
                    deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  }
                  break;
              }
            }
          } else {
            if (typeof iMemberNew[e as keyof IMember] === 'string') {
              deltaIMember[e as keyof IMember] = iMemberNew[e as keyof IMember];
            } else if (typeof iMemberNew[e as keyof IMember] === "object" &&
              iMemberNew[e as keyof IMember] instanceof Date) {
              deltaIMember[e as keyof IMember] = new Date((iMemberNew[e as keyof IMember] as Date).valueOf());
            } else if (typeof iMemberNew[e as keyof IMember] === "object") {
              switch (e as keyof IMember as string) {
                case "names":
                  deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  break;
                case "remittances":
                  deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  break;
                case "volunteerProferences":
                  deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  break;
                case "notes":
                  deltaIMember[e as keyof IMember] = Array<any>(iMemberNew[e as keyof IMember] as Array<any>);
                  break;
              }
            }
          }
        }
      }
      return deltaIMember;
    } else {
      return iMemberNew;
    }
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

  public static getMostRecentDuesEntry = (_memberObj: Member): Remittance | undefined => {
    if (_memberObj?.remittances !== undefined && _memberObj?.remittances.length !== undefined) {
      const duesEntries = _memberObj.remittances.filter(({ date, amount, memo }) => memo === "dues");
      const duesDateValues = duesEntries.map((e) => e.date.valueOf());
      const maxDuesDateValue = Math.max(...duesDateValues);
      const MILLI_SEC_PER_DAY = 8.67e+7;
      const maxCurrentDuesDate: Date = new Date(maxDuesDateValue + MILLI_SEC_PER_DAY);
      let result: Remittance = { date: maxCurrentDuesDate, amount: "0", memo: "" } as Remittance;

      for (let i = 0; i <= _memberObj.remittances.length; i++) {
        let _remit: Remittance = _memberObj.remittances[i];
        if (_remit !== undefined && _remit.date !== undefined && _remit.memo !== undefined && _remit.memo === "dues" && _remit.amount !== undefined && parseFloat(_remit.amount) >= 0.0) {
          const _remitDate = new Date(_remit.date)
          if (_remitDate < result.date) {
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

  public static areAddressesSame = (_memberObj: Member, validatedAddress: IAddress): boolean => {
    const { address, unit, city, state, postalCode } = _memberObj;
    return (validatedAddress?.address?.valueOf() === address?.valueOf()) &&
      (validatedAddress?.unit?.valueOf() === unit?.valueOf()) &&
      (validatedAddress?.city?.valueOf() === city?.valueOf()) &&
      (validatedAddress?.state?.valueOf() === state?.valueOf()) &&
      (validatedAddress?.postalCode?.valueOf() === postalCode?.valueOf());
  }

  public static pushUniqToVolunteerPrefs = (_memberObj: Member, volunteerRole: string) => {
    if (!_memberObj?.volunteerPreferences?.map(({ role }) => role).includes(volunteerRole)) {
      _memberObj?.volunteerPreferences?.push({ role: volunteerRole });
    }
  }

  public static getNewRemittances = (
    remitDate: Date | undefined,
    remitDues: string | undefined,
    remitDonation: string | undefined): Remittance[] => {
    let result = Array<Remittance>();

    let _remitDues: Remittance | undefined = undefined;
    let _remitDonation: Remittance | undefined = undefined;
    if (remitDate !== undefined) {

      if (remitDues !== undefined) {
        _remitDues = { date: new Date(remitDate), amount: `${remitDues}`, memo: "dues" };
        result.push(_remitDues)
      }

      if (remitDonation !== undefined) {
        _remitDonation = { date: new Date(remitDate), amount: `${remitDonation}`, memo: "donation" };
        result.push(_remitDonation)
      }
    }
    return result;
  }

  public static getNewPaidThroughDate = (_memberObj: Member): Date | undefined => {
    const duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
    if (duesEntry !== undefined) {
      const duesPdThru: Date | undefined =
        duesEntry
          ? MemberService.getDatePlus1Year(duesEntry.date)
          : undefined;

      const priorPdThru: Date | undefined = _memberObj._hasPaidThroughDate()
        ? MemberService.getDatePlus1Year(_memberObj.paidThrough)
        : undefined;

      const newPaidThroughDate: Date | undefined =
        new Date(
          Math.max(
            duesPdThru !== undefined ? duesPdThru.valueOf() : 0,
            priorPdThru !== undefined ? priorPdThru.valueOf() : 0
          ));

      if (newPaidThroughDate.valueOf() === (new Date(0)).valueOf()) {
        return undefined;
      } else {
        return newPaidThroughDate;
      }
    } else {
      return undefined;
    }
  }

  public static getNewJoinedRenewDate = (_memberObj: Member): Date | undefined => {
    const duesEntry = MemberService.getMostRecentDuesEntry(_memberObj);
    return duesEntry ? duesEntry.date : undefined;
  }

  static hasSameNames(refArr: Array<Names>, newArr: Array<Names>): boolean {
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

  static hasSameRemits(refArr: Array<Remittance>, newArr: Array<Remittance>): boolean {
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

  static hasSameVolPrefs(refArr: Array<Volunteer>, newArr: Array<Volunteer>): boolean {
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

  static hasSameNotes(refArr: Array<Notes>, newArr: Array<Notes>): boolean {
    if (refArr.length !== newArr.length) {
      return false;
    } else {
      for (let i = 0; i < refArr.length; i++) {
        if (refArr[i].date.valueOf() !== newArr[i].date.valueOf() || refArr[i].note !== newArr[i].note) {
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

  static newMemberObjWithFormInput = (_memberObj: Member | undefined, inTarget: string, inValue: string): Member | undefined => {
    if (_memberObj) {
      const resMemberObj = _memberObj.deepClone();
      if (resMemberObj) {
        switch (inTarget) {
          case "first-name":
            resMemberObj.firstName = inValue;
            break;
          case "last-name":
            resMemberObj.lastName = inValue;
            break;
          case "names":
            // TODO
            break;
          case "email":
            resMemberObj.email = inValue;
            break;
          case "phone":
            let p = MemberService.getFormattedPhoneNumber(inValue);
            resMemberObj.phone = p;
            break;
          case "address":
            resMemberObj.address = inValue;
            break;
          case "unit":
            resMemberObj.unit = inValue;
            break;
          case "city":
            resMemberObj.city = inValue;
            break;
          case "state":
            resMemberObj.state = inValue;
            break;
          case "postal-code":
            resMemberObj.postalCode = inValue;
            break;
          case "mmb":
            resMemberObj.mmb = inValue;
            break;
          case "paid-through":
            resMemberObj.paidThrough = new Date(inValue);
            break;
          case "joined":
            resMemberObj.joined = new Date(inValue);
            break;
          case "volunteer-preference--book-sale":
            const BOOK_SALE = "Book sale";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, BOOK_SALE);
            break;
          case "volunteer-preference--book-store":
            const BOOK_STORE = "Book store";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, BOOK_STORE);
            break;
          case "volunteer-preference--hospitality":
            const HOSPITALITY = "Hospitality";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, HOSPITALITY);
            break;
          case "volunteer-preference--newsletter":
            const NEWSLETTER = "Newsletter";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, NEWSLETTER);
            break;
          case "volunteer-preference--publicity":
            const PUBLICITY = "Publicity";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, PUBLICITY);
            break;
          case "volunteer-preference--schedule-volunteers":
            const SCHED_VOLUNTEERS = "Schedule volunteers";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, SCHED_VOLUNTEERS);
            break;
          case "volunteer-preference--sort-books":
            const SORT_BOOKS = "Sort books";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, SORT_BOOKS);
            break;
          case "volunteer-preference--fund-raising":
            const FUNDRAISING = "Fund raising";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, FUNDRAISING);
            break;
          case "volunteer-preference--lumacon":
            const LUMACON = "LUMACON";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, LUMACON);
            break;
          case "volunteer-preference--mend-books":
            const MEND_BOOKS = "Mend books";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, MEND_BOOKS);
            break;
          case "volunteer-preference--pick-up-donations":
            const PICKUP_DONATIONS = "Pick up donations";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, PICKUP_DONATIONS);
            break;
          case "volunteer-preference--price-books":
            const PRICE_BOOKS = "Price books";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, PRICE_BOOKS);
            break;
          case "volunteer-preference--set-up-for-sales":
            const SETUP_SALES = "Set up for sales";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, SETUP_SALES);
            break;
          case "volunteer-preference--sales-signage":
            const SALES_SIGNAGE = "Sales signage";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, SALES_SIGNAGE);
            break;
          case "volunteer-preference--stock-book-store":
            const STOCK_STORE = "Stock store";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, STOCK_STORE);
            break;
          case "volunteer-preference--other":
            const OTHER = "Other: ";
            MemberService.pushUniqToVolunteerPrefs(resMemberObj, OTHER + inValue);
            break;
        }
        resMemberObj.lastUpdated = new Date();
      }
      return resMemberObj;
    }
    return undefined;
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
              output += " - ";
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

  static persistMemberDataToLocalStorage = (rawData: Array<any>, force = false) => {
    console.log("persist to local storage?")
    const ignore = localStorage.getItem("loaded");
    if (!ignore || force) {
      // 1. does rawData have anything to process?
      if (rawData && rawData.length && rawData.length === 3 && rawData[0]['data']) {
        // 2. does rawData contain single member data (IMember)  vs list of members
        if (typeof rawData[0]['data'] === 'object') {
          if (rawData[0]['data'] instanceof Array) {
            console.log(`data load returned array (likely list of member)`)
          } else if (rawData[0]['data']['_id'] && rawData[0]['data']['firstName'] && rawData[0]['data']['lastName']) {
            console.log(`loaded data looks like an IMember -- persisting values to local storage`);
            localStorage.setItem("memberId", rawData[0]['data']['_id']);
            localStorage.setItem("firstName", rawData[0]['data']['firstName']);
            localStorage.setItem("lastName", rawData[0]['data']['lastName']);
            if (rawData[0]['data']['names'] && rawData[0]['data']['names'].length) {
              localStorage.setItem("names", JSON.stringify(rawData[0]['data']['names']));
            }
            if (rawData[0]['data']["email"]) {
              localStorage.setItem("email", rawData[0]['data']["email"]);
            }
            if (rawData[0]['data']["phone"]) {
              localStorage.setItem("phone", rawData[0]['data']["phone"]);
            }
            if (rawData[0]['data']["address"]) {
              localStorage.setItem("address", rawData[0]['data']["address"]);
            }
            if (rawData[0]['data']["unit"]) {
              localStorage.setItem("unit", rawData[0]['data']["unit"]);
            }
            if (rawData[0]['data']["city"]) {
              localStorage.setItem("city", rawData[0]['data']["city"]);
            }
            if (rawData[0]['data']["state"]) {
              localStorage.setItem("state", rawData[0]['data']["state"]);
            }
            if (rawData[0]['data']["postalCode"]) {
              localStorage.setItem("postalCode", rawData[0]['data']["postalCode"]);
            }
            if (rawData[0]['data']["mmb"]) {
              localStorage.setItem("mmb", rawData[0]['data']["mmb"]);
            }
            if (rawData[0]['data']["joined"]) {
              localStorage.setItem("joined", rawData[0]['data']["joined"]);
            }
            if (rawData[0]['data']["lastUpdated"]) {
              localStorage.setItem("lastUpdated", rawData[0]['data']["lastUpdated"]);
            }
            if (rawData[0]['data']["volunteerPreferences"] && rawData[0]['data']["volunteerPreferences"].length) {
              localStorage.setItem("volunteerPreferences", JSON.stringify(rawData[0]['data']['volunteerPreferences']));
            }
            if (rawData[0]['data']["remittances"] && rawData[0]['data']["remittances"].length) {
              localStorage.setItem("remittances", JSON.stringify(rawData[0]['data']['remittances']));
            }
            if (rawData[0]['data']["notes"] && rawData[0]['data']["notes"].length) {
              localStorage.setItem("notes", JSON.stringify(rawData[0]['data']['notes']));
            }
            localStorage.setItem("loaded", "true");
          }
        } else {
          console.log(`loaded data is not recognized - expected IMember -- nothing persisted`)
        }
      }
    } else {
      console.log("ignoring call to persist and overwrite local storage")
    }
  }
  static persistMemberObjToLocalStorage = (memberObj: Member) => {
    if (memberObj) {
      memberObj.id && localStorage.setItem("memberId", memberObj.id as string);
      memberObj.firstName && localStorage.setItem("firstName", memberObj.firstName as string);
      memberObj.lastName && localStorage.setItem("lastName", memberObj.lastName as string);
      memberObj.email && localStorage.setItem("email", memberObj.email as string);
      memberObj.phone && localStorage.setItem("phone", memberObj.phone as string);
      memberObj.address && localStorage.setItem("address", memberObj.address as string);
      memberObj.unit && localStorage.setItem("unit", memberObj.unit as string);
      memberObj.city && localStorage.setItem("city", memberObj.city as string);
      memberObj.state && localStorage.setItem("state", memberObj.state as string);
      memberObj.postalCode && localStorage.setItem("postalCode", memberObj.postalCode as string);
      memberObj.mmb && localStorage.setItem("mmb", memberObj.mmb as string);
      memberObj.joined && localStorage.setItem("joined", memberObj?.joined?.toISOString());
      memberObj.lastUpdated && localStorage.setItem("lastUpdated", memberObj.lastUpdated.toISOString());
      memberObj.names && localStorage.setItem("names", JSON.stringify(memberObj.names));
      memberObj.volunteerPreferences && localStorage.setItem("volunteerPreferences", JSON.stringify(memberObj.volunteerPreferences));
      memberObj.remittances && localStorage.setItem("remittances", JSON.stringify(memberObj.remittances));
      memberObj.notes && localStorage.setItem("notes", JSON.stringify(memberObj.notes));
      localStorage.setItem("loaded", "true");
    }
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
    localStorage.setItem("memberId", value);
  }

  static clearMemberId = (failOnEmpty: boolean = false) => {
    localStorage.removeItem("memberId");
  }
}