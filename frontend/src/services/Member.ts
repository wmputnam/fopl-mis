import { Names } from "packages/Names";
import { Notes } from "packages/Notes";
import { Remittance } from "packages/Remittance";
import { IStatus } from "packages/IStatus";
import { Volunteer } from "packages/Volunteer";
import { IMember } from "packages/member-shared";
import { FormError } from "../@components/MemberFormBase";
import Status from "./Status";

interface MemberParams {
  memberId?: string;
}

export class Member {

  _id: string | undefined = undefined;
  public get id(): string | undefined {
    return this._id ? this._id : "";
  }
  public set id(value: string | undefined) {
    if (value && value !== "") {
      if (this._id && this._id !== "" && this._id !== value) {
        console.log(`setting _id to ${value} when has _id ${this._id} is not allowed`);
        return;
      }
      this._id = value;
    }
  }
  _firstName: string = "";
  public get firstName(): string {
    return this._firstName ? this._firstName : "";
  }
  public set firstName(value: string) {
    this._firstName = value;
  }
  _lastName: string = "";
  public get lastName(): string {
    return this._lastName ? this._lastName : "";
  }
  public set lastName(value: string) {
    this._lastName = value;
  }
  _names: Names[] | undefined = [];
  public get names(): Names[] | undefined {
    return this._names;
  }
  public set names(value: Names[] | undefined) {
    if (value !== undefined) {
      if (this._names === undefined) {
        this._names = Array<Names>();
      }
      for (let i = 0; i < value.length; i++)
        this._names.push(value[i]);
    }
  }
  _email: string | undefined = undefined;
  public get email(): string | undefined {
    return this._email ? this._email : "";
  }
  public set email(value: string | undefined) {
    this._email = value
  }
  _phone: string | undefined = undefined;
  public get phone(): string | undefined {
    return this._phone ? this._phone : "";
  }
  public set phone(value: string | undefined) {
    this._phone = value;
  }

  _address: string | undefined = undefined;
  public get address(): string | undefined {
    return this._address ? this._address : "";
  }
  public set address(value: string | undefined) {
    this._address = value;
  }
  _unit: string | undefined = undefined;
  public get unit(): string | undefined {
    return this._unit ? this._unit : "";
  }
  public set unit(value: string | undefined) {
    this._unit = value;
  }
  _city: string | undefined = undefined;
  public get city(): string | undefined {
    return this._city ? this._city : "";
  }
  public set city(value: string | undefined) {
    this._city = value;
  }
  _state: string | undefined = undefined;
  public get state(): string | undefined {
    return this._state ? this._state : "";
  }
  public set state(value: string | undefined) {
    this._state = value;
  }
  _postalCode: string | undefined = undefined;
  public get postalCode(): string | undefined {
    return this._postalCode ? this._postalCode : "";
  }
  public set postalCode(value: string | undefined) {
    this._postalCode = value;
  }
  _volunteerPreferences: Volunteer[] | undefined = [];
  public get volunteerPreferences(): Volunteer[] | undefined {
    // consolidate flattened prefs into the desired array
    const newVolArr = Array<Volunteer>();
    // volunteer-preference--book-sale
    if (this._volunteerPreferenceBookSale) {
      newVolArr.push({ role: "Book sale" } as Volunteer);
    }
    // volunteer-preference--book-store
    if (this._volunteerPreferenceBookStore) {
      newVolArr.push({ role: "Book store" } as Volunteer);
    }
    // volunteer-preference--hospitality
    if (this._volunteerPreferenceHospitality) {
      newVolArr.push({ role: "Hospitality" } as Volunteer);
    }
    // volunteer-preference--newsletter
    if (this._volunteerPreferenceNewsletter) {
      newVolArr.push({ role: "Newsletter" } as Volunteer);
    }
    // volunteer-preference--publicity
    if (this._volunteerPreferencePublicity) {
      newVolArr.push({ role: "Publicity" } as Volunteer);
    }
    // volunteer-preference--schedule-volunteers
    if (this._volunteerPreferenceScheduleVolunteers) {
      newVolArr.push({ role: "Schedule volunteers" } as Volunteer);
    }
    // volunteer-preference--sort-books
    if (this._volunteerPreferenceSortBooks) {
      newVolArr.push({ role: "Sort books" } as Volunteer);
    }
    // volunteer-preference--fund-raising
    if (this._volunteerPreferenceFundRaising) {
      newVolArr.push({ role: "Fund raising" } as Volunteer);
    }
    // volunteer-preference--lumacon
    if (this._volunteerPreferenceLumacon) {
      newVolArr.push({ role: "LUMACON" } as Volunteer);
    }
    // volunteer-preference--mend-books
    if (this._volunteerPreferenceMendBooks) {
      newVolArr.push({ role: "Mend books" } as Volunteer);
    }
    // volunteer-preference--pick-up-donations
    if (this._volunteerPreferencePickUpDonations) {
      newVolArr.push({ role: "Pick up donations" } as Volunteer);
    }
    // volunteer-preference--price-books
    if (this._volunteerPreferencePriceBooks) {
      newVolArr.push({ role: "Pricing" } as Volunteer);
    }
    // volunteer-preference--set-up-for-sales
    if (this._volunteerPreferenceSetUpForSales) {
      newVolArr.push({ role: "Set up" } as Volunteer);
    }
    // volunteer-preference--sales-signage
    if (this._volunteerPreferenceSalesSignage) {
      newVolArr.push({ role: "Signage" } as Volunteer);
    }
    // volunteer-preference--stock-book-store
    if (this._volunteerPreferenceStockBookStore) {
      newVolArr.push({ role: "Stock bookstore" } as Volunteer);
    }
    // volunteer-preference--other
    if (this._volunteerPreferenceOther) {
      newVolArr.push({ role: this._volunteerPreferenceOther } as Volunteer);
    }
    this._volunteerPreferences = newVolArr;
    return this._volunteerPreferences;
  }
  public set volunteerPreferences(value: Volunteer[] | undefined) {
    if (value !== undefined) {
      if (this._volunteerPreferences === undefined) {
        this._volunteerPreferences = Array<Volunteer>();
      }
      for (let i = 0; i < value.length; i++) {
        this._volunteerPreferences.push(value[i]);
      }
    }
  }
  _mmb: string | undefined = undefined;
  public get mmb(): string | undefined {
    return this._mmb ? this._mmb : "";
  }
  public set mmb(value: string | undefined) {
    this._mmb = value;
  }
  _paidThrough: Date | undefined = undefined;
  public get paidThrough(): Date | undefined {
    return this._paidThrough ? this._paidThrough : undefined;
  }
  public set paidThrough(value: Date | undefined) {
    this._paidThrough = value;
  }
  _hasPaidThroughDate() {  // TODO fix me
    return this._paidThrough !== undefined && this.paidThrough?.getDate !== undefined;
  }
  _joined: Date | undefined = undefined;
  public get joined(): Date | undefined {
    return this._joined ? this._joined : undefined;
  }
  public set joined(value: Date | undefined) {
    this._joined = value;
  }
  _hasJoinedDate() {
    return this._joined !== undefined && this._joined?.getDate !== undefined;
  }
  _lastUpdated: Date | undefined = undefined;
  public get lastUpdated(): Date | undefined {
    return this._lastUpdated ? this._lastUpdated : undefined;
  }
  public set lastUpdated(value: Date | undefined) {
    this._lastUpdated = value;
  }
  _remittances: Remittance[] | undefined = [];
  public get remittances(): Remittance[] | undefined {
    return this._remittances;
  }
  public set remittances(value: Remittance[] | undefined) {
    if (value !== undefined) {
      if (this._remittances === undefined) {
        this._remittances = Array<Remittance>();
      }
      for (let i = 0; i < value.length; i++) {
        this._remittances.push(value[i]);
      }
    }
  }

  _remitDate: Date | undefined = undefined;
  public get remitDate(): Date | undefined {
    return this._remitDate ? this._remitDate : undefined;
  }
  public set remitDate(value: Date | undefined) {
    this._remitDate = value;
  }
  _remitDues: string | undefined = undefined;
  public get remitDues(): string {
    return this._remitDues ? this._remitDues : "";
  }
  public set remitDues(value: string | undefined) {
    this._remitDues = value;
  }
  _remitDonation: string | undefined = undefined;
  public get remitDonation(): string {
    return this._remitDonation ? this._remitDonation : "";
  }
  public set remitDonation(value: string | undefined) {
    this._remitDonation = value;
  }
  _remitError: string | undefined = undefined;
  public get remitError(): string {
    return this._remitError ? this._remitError : "";
  }
  public set remitError(value: string | undefined) {
    this._remitError = value;
  }
  _remitWarn: string | undefined = undefined;
  public get remitWarn(): string {
    return this._remitWarn ? this._remitWarn : "";
  }
  public set remitWarn(value: string | undefined) {
    this._remitWarn = value;
  }
  _notes: Notes[] | undefined = [];
  public get notes(): Notes[] | undefined {
    return this._notes;
  }
  public set notes(value: Notes[] | undefined) {
    if (value !== undefined) {
      if (this._notes === undefined) {
        this._notes = Array<Notes>();
      }
      for (let i = 0; i < value.length; i++) {
        this._notes.push(value[i]);
      }
    }
  }
  // volunteer-preference--book-sale
  _volunteerPreferenceBookSale: boolean | undefined = undefined;
  public get volunteerPreferenceBookSale(): boolean | undefined {
    return this._volunteerPreferenceBookSale ? this._volunteerPreferenceBookSale : false;
  }
  public set volunteerPreferenceBookSale(value: boolean | undefined) {
    this._volunteerPreferenceBookSale = value;
  }
  // volunteer-preference--book-store
  _volunteerPreferenceBookStore: boolean | undefined = undefined;
  public get volunteerPreferenceBookStore(): boolean | undefined {
    return this._volunteerPreferenceBookStore ? this._volunteerPreferenceBookStore : false;
  }
  public set volunteerPreferenceBookStore(value: boolean | undefined) {
    this._volunteerPreferenceBookStore = value;
  }
  // volunteer-preference--hospitality
  _volunteerPreferenceHospitality: boolean | undefined = undefined;
  public get volunteerPreferenceHospitality(): boolean | undefined {
    return this._volunteerPreferenceHospitality ? this._volunteerPreferenceHospitality : false;
  }
  public set volunteerPreferenceHospitality(value: boolean | undefined) {
    this._volunteerPreferenceHospitality = value;
  }
  // volunteer-preference--newsletter
  _volunteerPreferenceNewsletter: boolean | undefined = undefined;
  public get volunteerPreferenceNewsletter(): boolean | undefined {
    return this._volunteerPreferenceNewsletter ? this._volunteerPreferenceNewsletter : false;
  }
  public set volunteerPreferenceNewsletter(value: boolean | undefined) {
    this._volunteerPreferenceNewsletter = value;
  }
  // volunteer-preference--publicity
  _volunteerPreferencePublicity: boolean | undefined = undefined;
  public get volunteerPreferencePublicity(): boolean | undefined {
    return this._volunteerPreferencePublicity ? this._volunteerPreferencePublicity : false;
  }
  public set volunteerPreferencePublicity(value: boolean | undefined) {
    this._volunteerPreferencePublicity = value;
  }
  // volunteer-preference--schedule-volunteers
  _volunteerPreferenceScheduleVolunteers: boolean | undefined = undefined;
  public get volunteerPreferenceScheduleVolunteers(): boolean | undefined {
    return this._volunteerPreferenceScheduleVolunteers ? this._volunteerPreferenceScheduleVolunteers : false;
  }
  public set volunteerPreferenceScheduleVolunteers(value: boolean | undefined) {
    this._volunteerPreferenceScheduleVolunteers = value;
  }
  // volunteer-preference--sort-books
  _volunteerPreferenceSortBooks: boolean | undefined = undefined;
  public get volunteerPreferenceSortBooks(): boolean | undefined {
    return this._volunteerPreferenceSortBooks ? this._volunteerPreferenceSortBooks : false;
  }
  public set volunteerPreferenceSortBooks(value: boolean | undefined) {
    this._volunteerPreferenceSortBooks = value;
  }
  // volunteer-preference--fund-raising
  _volunteerPreferenceFundRaising: boolean | undefined = undefined;
  public get volunteerPreferenceFundRaising(): boolean | undefined {
    return this._volunteerPreferenceFundRaising ? this._volunteerPreferenceFundRaising : false;
  }
  public set volunteerPreferenceFundRaising(value: boolean | undefined) {
    this._volunteerPreferenceFundRaising = value;
  }
  // volunteer-preference--lumacon
  _volunteerPreferenceLumacon: boolean | undefined = undefined;
  public get volunteerPreferenceLumacon(): boolean | undefined {
    return this._volunteerPreferenceLumacon ? this._volunteerPreferenceLumacon : false;
  }
  public set volunteerPreferenceLumacon(value: boolean | undefined) {
    this._volunteerPreferenceLumacon = value;
  }
  // volunteer-preference--mend-books
  _volunteerPreferenceMendBooks: boolean | undefined = undefined;
  public get volunteerPreferenceMendBooks(): boolean | undefined {
    return this._volunteerPreferenceMendBooks ? this._volunteerPreferenceMendBooks : false;
  }
  public set volunteerPreferenceMendBooks(value: boolean | undefined) {
    this._volunteerPreferenceMendBooks = value;
  }
  // volunteer-preference--pick-up-donations
  _volunteerPreferencePickUpDonations: boolean | undefined = undefined;
  public get volunteerPreferencePickUpDonations(): boolean | undefined {
    return this._volunteerPreferencePickUpDonations ? this._volunteerPreferencePickUpDonations : false;
  }
  public set volunteerPreferencePickUpDonations(value: boolean | undefined) {
    this._volunteerPreferencePickUpDonations = value;
  }
  // volunteer-preference--price-books
  _volunteerPreferencePriceBooks: boolean | undefined = undefined;
  public get volunteerPreferencePriceBooks(): boolean | undefined {
    return this._volunteerPreferencePriceBooks ? this._volunteerPreferencePriceBooks : false;
  }
  public set volunteerPreferencePriceBooks(value: boolean | undefined) {
    this._volunteerPreferencePriceBooks = value;
  }
  // volunteer-preference--set-up-for-sales
  _volunteerPreferenceSetUpForSales: boolean | undefined = undefined;
  public get volunteerPreferenceSetUpForSales(): boolean | undefined {
    return this._volunteerPreferenceSetUpForSales ? this._volunteerPreferenceSetUpForSales : false;
  }
  public set volunteerPreferenceSetUpForSales(value: boolean | undefined) {
    this._volunteerPreferenceSetUpForSales = value;
  }
  // volunteer-preference--sales-signage
  _volunteerPreferenceSalesSignage: boolean | undefined = undefined;
  public get volunteerPreferenceSalesSignage(): boolean | undefined {
    return this._volunteerPreferenceSalesSignage ? this._volunteerPreferenceSalesSignage : false;
  }
  public set volunteerPreferenceSalesSignage(value: boolean | undefined) {
    this._volunteerPreferenceSalesSignage = value;
  }
  // volunteer-preference--stock-book-store
  _volunteerPreferenceStockBookStore: boolean | undefined = undefined;
  public get volunteerPreferenceStockBookStore(): boolean | undefined {
    return this._volunteerPreferenceStockBookStore ? this._volunteerPreferenceStockBookStore : false;
  }
  public set volunteerPreferenceStockBookStore(value: boolean | undefined) {
    this._volunteerPreferenceStockBookStore = value;
  }
  // volunteer-preference--other
  _volunteerPreferenceOther: string | undefined = undefined;
  public get volunteerPreferenceOther(): string | undefined {
    return this._volunteerPreferenceOther ? this._volunteerPreferenceOther : "";
  }
  public set volunteerPreferenceOther(value: string | undefined) {
    this._volunteerPreferenceOther = value;
  }

  /*
  target: string,
  message: string,
  level: "error" | "warn" | "info"
  */
  _dataEntryErrors: Array<FormError> = [];
  set dataEntryErrors(value: any) {
    console.log(value);
    this._dataEntryErrors = value;
  }
  public findError(targetField: string) {
    let existingErr = this._dataEntryErrors.find((e) => e.target === targetField);
    if (existingErr) {
      return existingErr;// { target: targetField, message: "no one here but us chickens", level: "info" };
    }
  }
  public isThereAnyErrorOn(targetField: string): boolean {
    let existingErrIndx = this._dataEntryErrors.findIndex((e) => e.target === targetField);
    return existingErrIndx !== -1;
  }
  public existingFirstNameError() {
    return this.isThereAnyErrorOn("first-name");
  }
  public getFirstNameError() {
    return this.findError("first-name")?.message;
  }
  public existingLastNameError() {
    return this.isThereAnyErrorOn("last-name");
  }
  public getLastNameError() {
    return this.findError("last-name")?.message;
  }
  public existingRemitDateError() {
    return this.isThereAnyErrorOn("money-date");
  }
  public getRemitDateError() {
    return this.findError("money-date")?.message;
  }
  public existingRemitAmountWarn() {
    return this.isThereAnyErrorOn("money-donation");
  }
  public getRemitAmountWarn() {
    return this.findError("money-donation")?.message;
  }
  public getErrorsWithout(targetField: string) {
    let existingErrIndx = this._dataEntryErrors.findIndex((e) => e.target === targetField);
    if (existingErrIndx !== -1) {
      const newArr = Array<FormError>();
      for (let i = 0; i < existingErrIndx; i++) {
        newArr[i] = structuredClone(this._dataEntryErrors[i]);
      }
      for (let i = existingErrIndx + 1; i < this._dataEntryErrors.length; i++) {
        newArr[i - 1] = structuredClone(this._dataEntryErrors[i]);
      }
      return newArr;
    }
  }
  public getErrorsAdding(targetField: string, message: string, level: ("error" | "warn" | "info") = "error") {
    const newArr = Array<FormError>();
    for (let i = 0; i < this._dataEntryErrors.length; i++) {
      newArr[i] = structuredClone(this._dataEntryErrors[i]);
    }
    newArr.push({ target: targetField, message: message, level: level })
    return newArr;
  }
  public get dataEntryErrors() {
    const newArr = Array<FormError>();
    for (let i = 0; i < this._dataEntryErrors.length; i++) {
      newArr[i] = structuredClone(this._dataEntryErrors[i]);
    }
    return newArr;
  }

  public getFormErrorsForDisplay() {
    if (this.dataEntryErrors && this.dataEntryErrors.length && this.dataEntryErrors.length > 0) {
      return this._dataEntryErrors.map((fe: FormError) => `${fe.message}`).join("<br>");
    } else {
      return "";
    }
  }

  _status: IStatus | undefined = undefined;
  public get status(): IStatus | undefined {
    return this._status;
  }
  public set status(value: IStatus | undefined) {
    if (this._status === undefined) {
      this._status = {} as IStatus;
    }
    if (this.status && value) {
      if (value.isActive !== undefined) {
        this._status.isActive = value.isActive;
      }
      if (value.validPostMail !== undefined) {
        this._status.validPostMail = value.validPostMail;
      }
      if (value.validEmail !== undefined) {
        this._status.validEmail = value.validEmail;
      }
      if (value.newsletterType !== undefined) {
        this._status.newsletterType = value.newsletterType;
      }
    }
  }


  constructor(params: MemberParams = {} as MemberParams) {
    let { memberId = undefined } = params;
    this._id = memberId;
  }

  public static create(memberId: string | undefined = undefined): Member {
    if (memberId) {
      const m: Member = new Member({ memberId: memberId });
      return m;
    } else {
      const m: Member = new Member();
      m.city = 'Petaluma';
      m.state = 'CA';
      m.postalCode='94952-'
      m.remitDate=new Date();
      m.status = new Status();
      m.status.isActive = true;
      m.status.validEmail = 'unchecked';
      m.status.validPostMail = true;
      m.status.newsletterType = 'email';
      return m;
    }
  }

  private static _isDefined = (m: IMember, p: string & keyof IMember) => m?.[p] !== undefined;

  public static createFromIMember(imember: IMember | undefined): Member | undefined {
    if (imember) {
      let id = Member._isDefined(imember, "_id") ? imember._id : "";
      const member = Member.create(id);
      Member._isDefined(imember, "_id") && (member.id = imember._id);
      Member._isDefined(imember, "firstName") && (member.firstName = imember.firstName);
      Member._isDefined(imember, "lastName") && (member.lastName = imember.lastName);
      Member._isDefined(imember, "names") && (member.names = imember.names);
      Member._isDefined(imember, "email") && (member.email = imember.email);
      Member._isDefined(imember, "phone") && (member.phone = imember.phone);
      Member._isDefined(imember, "address") && (member.address = imember.address);
      Member._isDefined(imember, "unit") && (member.unit = imember.unit);
      Member._isDefined(imember, "city") && (member.city = imember.city);
      Member._isDefined(imember, "state") && (member.state = imember.state);
      Member._isDefined(imember, "postalCode") && (member.postalCode = imember.postalCode);
      Member._isDefined(imember, "volunteerPreferences") && (member.volunteerPreferences = imember.volunteerPreferences);
      Member._isDefined(imember, "mmb") && (member.mmb = imember.mmb);
      Member._isDefined(imember, "paidThrough") && (member.paidThrough = imember.paidThrough);
      Member._isDefined(imember, "joined") && (member.joined = imember.joined);
      Member._isDefined(imember, "remittances") && (member.remittances = imember.remittances);
      Member._isDefined(imember, "notes") && (member.notes = imember.notes);
      Member._isDefined(imember, "lastUpdated") && (member.lastUpdated = imember.lastUpdated);
      if (!member.status) {
        member.status = new Status();
      }
      Member._isDefined(imember, "isActive") && (member.status.isActive = imember.isActive);
      Member._isDefined(imember, "isNewMember") && (member.status.isNewMember = imember.isNewMember);
      Member._isDefined(imember, "newsletterType") && (member.status.newsletterType = imember.newsletterType);
      Member._isDefined(imember, "validEmail") && (member.status.validEmail = imember.validEmail);
      Member._isDefined(imember, "validPostMail") && (member.status.validPostMail = imember.validPostMail);
      return member;
    } else {
      return undefined;
    }
  }

  public toIMember(): IMember {
    let imember: IMember = Object.create({});
    if (this.id) { imember["_id"] = this.id; }
    if (this.firstName) { imember["firstName"] = this.firstName; }
    if (this.lastName) { imember["lastName"] = this.lastName; }
    if (this.names) { imember["names"] = this.names; }
    if (this.email) { imember["email"] = this.email; }
    if (this.phone) { imember["phone"] = this.phone; }
    if (this.address) { imember["address"] = this.address; }
    if (this.unit) { imember["unit"] = this.unit; }
    if (this.city) { imember["city"] = this.city; }
    if (this.state) { imember["state"] = this.state; }
    if (this.postalCode) { imember["postalCode"] = this.postalCode; }
    if (this.volunteerPreferences) { imember["volunteerPreferences"] = this.volunteerPreferences; }
    if (this.mmb) { imember["mmb"] = this.mmb; }
    if (this.paidThrough) { imember["paidThrough"] = this.paidThrough; }
    if (this.joined) { imember["joined"] = this.joined; }
    if (this.remittances) { imember["remittances"] = this.remittances; }
    if (this.notes) { imember["notes"] = this.notes; }
    if (this.lastUpdated) { imember["lastUpdated"] = this.lastUpdated; }
    if (this.status) {
      if (this.status.isActive !== undefined) {
        imember["isActive"] = this.status.isActive;
      }
      if (this.status.isNewMember !== undefined) {
        imember["isNewMember"] = this.status.isNewMember;
      }
      if (this.status.validEmail !== undefined) {
        imember["validEmail"] = this.status.validEmail;
      }
      if (this.status.validPostMail !== undefined) {
        imember["validPostMail"] = this.status.validPostMail;
      }
      if (this.status.newsletterType !== undefined) {
        imember["newsletterType"] = this.status.newsletterType;
      }
    }
    return imember
  }

  public deepClone(): Member | undefined {
    const currImember: IMember = this.toIMember();
    console.log(`this.id: ${this.id}, currImamber._id: ${currImember._id}`);
    let cloneMember: Member | undefined = currImember ? Member.createFromIMember(currImember) : undefined;
    if (cloneMember) {
      console.log(`clone.id: ${cloneMember.id}`);
    }
    if (this.status && cloneMember) {
      cloneMember.status = this.status;
    }
    if (this.dataEntryErrors && cloneMember) {
      cloneMember.dataEntryErrors = this.dataEntryErrors;
    }
    if (this.remitDate && cloneMember) {
      cloneMember.remitDate = this.remitDate;
    }
    if (this.remitDues && cloneMember) {
      cloneMember.remitDues = this.remitDues;
    }
    if (this.remitDonation && cloneMember) {
      cloneMember.remitDonation = this.remitDonation;
    }
    return cloneMember;
  }
}