/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
// import axios from "axios";
import CurrencyFormat from "react-currency-format";

import { AllMemberProps, EditMemberProps, ViewStateProps } from "../@interfaces/MemberProps";
import CancelBtn from "./CancelBtn";
import SaveBtn from "./SaveBtn";

// import { CurrentMemberContext, ServerContext } from "../App"
import loadData from "./DataLoader"
import { MemberViewStates } from "../@interfaces/enums";
// import { SaveResponse } from "../@interfaces/SaveResponse";
import MembersReducers from "../reducers/members.reducers"
import Save from "./DataUpdater";
import { CurrentMemberContext, ServerContext } from "../App";
import { flatten, unflatten } from "flat";
import { Volunteer } from "packages/Volunteer";
import { stripVTControlCharacters } from "util";
import { Remittance } from "packages/Remittance";
import { nanoid } from "nanoid";

interface FormAction {
  type: string,
  rawValue?: string | Date | number,
}
interface FormError {
  target: string,
  errors: string[]
}

const hasProp = ((obj: Object, prop: string) => obj.hasOwnProperty.call(obj, prop));
const MemberFormBase = ({ updateViewState, mode }: EditMemberProps) => {
  const [hasErrors, setHasErrors] = React.useState(false);
  const formErrors = React.useRef([] as FormError[]);
  const { serverURL } = React.useContext(ServerContext);
  const serverUrl = serverURL === undefined ? "http://localhost:3030" : serverURL;
  const memberId = React.useContext(CurrentMemberContext);
  const memberID = memberId === undefined ? "" : memberId;
  console.log(`member-form mode: ${mode}`)

  function isEmptyObject(obj: Object) {
    for (let i in obj) return false;
    return true;
  }
  const dataInitial: any = React.useRef({});
  React.useEffect(() => {
    memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
    if (isEmptyObject(dataInitial.cuurent)) {
      loadData(serverUrl, memberId, mode ? mode : "")
        .then((loadRes: any) => {
          if ([200, 201].includes(loadRes.status)) {
            console.log("successful load")
            // setHasErrors(false);
            dataInitial.current = flatten(loadRes.body);
            setMemberData(dataInitial.current)
          }
        })
        .catch((fault) => {
          return { status: 500, error: `fault occured: ${JSON.stringify(fault)}` };
        });
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);


  // })
  // const { status } = savRes ? savRes : { status: undefined };
  // const errors = savRes?.body?.errors;
  //     const statusText = savRes?.statusText;
  //     const errMsg = statusText + " -- " + errors
  //     console.log(`member-form--dataIntiial load data status -- ${status}, errors: ${errMsg}`)
  //     const resultObj = { status: status, error: errMsg };
  //       flatInitial = isEmptyObject(dataInitial.current);
  //         ? flatten(dataInitial.current) as AllMemberProps
  //         : {} as AllMemberProps;
  //     } else {
  //       formErrors.current[0] = { target: "any", errors: [resultObj.error] };
  //       setHasErrors(true);
  //     }
  //     return savRes.body;


  let flatInitial: AllMemberProps;
  // console.log(`fe-member-form: flatInitial ${JSON.stringify(flatInitial)}`)
  interface UpdateMember {
    target: string,
    value: string
  }

  function mapUxToData(inTarget: string, inValue: string): UpdateMember[] {
    // map any targets
    let outTarget: string[] = [];
    let outValue: string[] = [];
    outValue[0] = inValue;
    switch (inTarget) {
      case "first-name":
        outTarget[0] = "firstName"; break;
      case "last-name":
        outTarget[0] = "lastName"; break;
      case "postal-code":
        outTarget[0] = "postalCode"; break;

      // these money elements will require validation and restructuring before save
      case "money-date":
        outTarget[0] = "remittances.0.date"; // TODO clean out any extra later
        outTarget[1] = "remittances.1.date";
        outValue[1] = inValue;
        break;
      case "money-dues-amount":
        outTarget[0] = "remittances.0.amount";
        outTarget[1] = "remittances.0.memo";
        outValue[1] = "dues";
        break;
      case "money-donation-amount":
        outTarget[0] = "remittances.1.amount";
        outTarget[1] = "remittances.1.memo";
        outValue[1] = "donation";
        break;

      // these volunteer preference elements will require restructuring before save
      case "volunteer-preference--book-sale":
        outTarget[0] = "volunteerPreferences.0.role";
        outValue[0] = "Book sale";
        break;
      case "volunteer-preference--book-store":
        outTarget[0] = "volunteerPreferences.1.role";
        outValue[0] = "Book store";
        break;
      case "volunteer-preference--hospitality":
        outTarget[0] = "volunteerPreferences.2.role";
        outValue[0] = "Hospitality";
        break;
      case "volunteer-preference--newsletter":
        outTarget[0] = "volunteerPreferences.3.role";
        outValue[0] = "Newsletter";
        break;
      case "volunteer-preference--publicity":
        outTarget[0] = "volunteerPreferences.4.role";
        outValue[0] = "Publicity";
        break;
      case "volunteer-preference--schedule-volunteers":
        outTarget[0] = "volunteerPreferences.5.role";
        outValue[0] = "Schedule volunteers";
        break;
      case "volunteer-preference--sort-books":
        outTarget[0] = "volunteerPreferences.6.role";
        outValue[0] = "Sort books";
        break;
      case "volunteer-preference--fund-raising":
        outTarget[0] = "volunteerPreferences.7.role";
        outValue[0] = "Fund raising";
        break;
      case "volunteer-preference--lumacon":
        outTarget[0] = "volunteerPreferences.8.role";
        outValue[0] = "LUMACON";
        break;
      case "volunteer-preference--mend-books":
        outTarget[0] = "volunteerPreferences.9.role";
        outValue[0] = "Mend books";
        break;
      case "volunteer-preference--pick-up-donations":
        outTarget[0] = "volunteerPreferences.10.role";
        outValue[0] = "Pick up donations";
        break;
      case "volunteer-preference--price-books":
        outTarget[0] = "volunteerPreferences.11.role";
        outValue[0] = "Price books";
        break;
      case "volunteer-preference--set-up-for-sales":
        outTarget[0] = "volunteerPreferences.12.role";
        outValue[0] = "Set up for sales";
        break;
      case "volunteer-preference--sales-signage":
        outTarget[0] = "volunteerPreferences.13.role";
        outValue[0] = "Sales signage";
        break;
      case "volunteer-preference--stock-book-store":
        outTarget[0] = "volunteerPreferences.14.role";
        outValue[0] = "Stock store";
        break;
      case "volunteer-preference--other":
        outTarget[0] = "volunteerPreferences.99.role";
        break;
      default:
        outTarget[0] = inTarget; break;
    }
    outTarget.map((t, indx) => console.log(`fe-member-form.reducer:  target${indx}: ${inTarget} => ${outTarget[indx]}, value: ${outValue[indx]}`));
    return outTarget.map((t, indx) => ({ target: t, value: outValue[indx] }));
  }
  const updateMemberData = (update: UpdateMember[]) => {
    let newData: Partial<AllMemberProps> = {};
    update.map((item) => Object.assign(newData, { [item.target]: item.value }));
    Object.assign(newData, { lastUpdated: new Date(Date.now()) });

    console.log(`fe-member-form--update-member-data\n   ${JSON.stringify({ ...memberData })}`);
    console.log(`fe-member-form--update-member-data\n   ${JSON.stringify({ ...newData })}`);
    setMemberData((oldData) => ({ ...oldData, ...newData }));
  }

  const [memberData, setMemberData] = React.useState(dataInitial.current as AllMemberProps);

  // React.useEffect(() => {
  //   if (flatInitial && hasProp(flatInitial, 'firstName') && !memberData) {
  //     setMemberData(flatInitial);
  //     console.log(`fe-member-form 0 : memberData ${JSON.stringify(memberData)}`)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // // React.useEffect(() => {
  //   if (flatInitial && flatInitial?.firstName !== undefined && !memberData) {
  //     setMemberData(flatInitial);
  //     console.log(`fe-member-form 0 : memberData ${JSON.stringify(memberData)}`)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flatInitial]);

  React.useEffect(() => {
    memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
  }, [memberData]);

  React.useEffect(() => {
    formErrors.current && console.log(`fe-member-form: formErrors ${JSON.stringify(formErrors.current)}`)
  }, [hasErrors]);

  const inputValues: InputValuesI = createInputValues(memberData);
  console.log(`fe-member-form: inputValues ${JSON.stringify(inputValues)}`);

  function handleInvalid() {

  }

  const commonFormsComponents =
    <>
      <div className="member-form--name-group">
        <label htmlFor="first-name">First name</label>
        <input type="text" id="first-name" className="new-member--first-name width-wide" placeholder="First name"
          required={false} {...inputValues.firstName}
          onChange={handleFieldChange}
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('First name is required')}
          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <label htmlFor="last-name">Last name</label>
        <input type="text" id="last-name" className="new-member--last-name width-wide" placeholder="Last name"
          required={true}
          {...inputValues.lastName}
          onChange={handleFieldChange}
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Last name is required')}
          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
        />
      </div>
      <div className="member-form--address-group" >
        <label htmlFor="address">Address</label>
        <input type="text" id="address" className="new-member--address width-wide" placeholder="Address"  {...inputValues.address} onChange={handleFieldChange} />
        <label htmlFor="unit">Unit</label>
        <input type="text" id="unit" className="new-member--unit width-wide" placeholder="Unit"  {...inputValues.unit} onChange={handleFieldChange} />
        <br />
        <label htmlFor="city">City</label>
        <input type="text" id="city" className="new-member--city width-wide" placeholder="City"  {...inputValues.city} onChange={handleFieldChange} />
        <label htmlFor="state">State</label>
        <input type="text" id="state" className="new-member--state width-narrow" placeholder="State"  {...inputValues.state} onChange={handleFieldChange} />
        <label htmlFor="postal-code">ZIP code</label>
        <input type="text" id="postal-code" className="new-member--postal-code  width-medium" placeholder="ZIP code"  {...inputValues.postalCode} onChange={handleFieldChange} />
      </div>
      <div className="member-form--contact-group">
        <label htmlFor="phone">Phone</label>
        <input type="telephone" id="phone" className="new-member--phone width-phone" placeholder="Phone"  {...inputValues.phone} onChange={handleFieldChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="new-member--email width-phone" placeholder="Email"
          required={true}
          {...inputValues.email}
          onChange={handleFieldChange}
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Email is required')}
          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
        />
      </div>
    </>;


  const moneyFormGroupComponent =
    <>
      <div className="member-form--money-group">
        <label htmlFor="money-date">Date</label>
        <input type="date" id="money-date" className="new-member--money-date width-date"
          onChange={handleFieldChange}
        />
        <label htmlFor="money-dues-amount">Dues</label>
        <CurrencyFormat id="money-dues-amount"
          prefix={"$"} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}
          className="new-member--dues-amount width-money" placeholder="Dues amount"
          onChange={handleFieldChange}
        />
        <label htmlFor="money-donation-amount">Donation</label>
        <CurrencyFormat id="money-donation-amount"
          prefix={"$"} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}
          className="new-member--donation-amount width-money" placeholder="Donation amount"
          onChange={handleFieldChange}
        />
      </div>
    </>;

  const mmbFormGroupComponent =
    <>
      <div className="member-form--mmb-group">
        <div className="existing-member--mmb">
          <label htmlFor="mmb">Mmb </label>
          <input
            type="text"
            maxLength={10}
            readOnly={true}
            id="mmb"
            className="width-mmb readonly-input"
            {...inputValues.mmb} />
        </div>
        <div className="existing-member--paid-through">
          <label htmlFor="paidThrough" >Paid through </label>
          <input
            id="paidThrough"
            type="text"
            readOnly={true}
            className="form-paid-through width-date readonly-input"
            {...inputValues.paidThrough} />
        </div>
        <div className="existing-member--joined">
          <label htmlFor="joined">Joined </label>
          <input
            type="text"
            readOnly={true}
            id="joined"
            className="form--joined width-date readonly-input"
            {...inputValues.joined} />
        </div>
        <div className="existing-member--last-updated">
          <label htmlFor="last-updated">Last updated </label>
          <input
            type="text"
            readOnly={true}
            id="last-updated"
            className="form--last-updated width-date readonly-input"
            {...inputValues.lastUpdated} />
        </div>

      </div>
    </>;

  const volunteerPrefencesComponent =
    <>
      <div className="member-form--volunteer-preferences">
        <fieldset className="group" >
          <legend>&nbsp;&nbsp;Volunteer preferences&nbsp;&nbsp;</legend>
          <ul className="member-form--volunteer-preferences-list">
            <li><div className="new-member--book-sale">
              <label htmlFor="volunteer-preference--book-sale">Staff book sale</label>
              <input type="checkbox" id="volunteer-preference--book-sale" className="form--book-sale"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--book-store">
              <label htmlFor="volunteer-preference--book-store">Staff book store</label>
              <input type="checkbox" id="volunteer-preference--book-store" className="form--bookstore"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--hospitality">
              <label htmlFor="volunteer-preference--hospitality">Hospitality</label>
              <input type="checkbox" id="volunteer-preference--hospitality" className="form--hospitality"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--newsletter">
              <label htmlFor="volunteer-preference--newsletter">Newsletter</label>
              <input type="checkbox" id="volunteer-preference--newsletter" className="form--newsletter"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--publicity">
              <label htmlFor="volunteer-preference--publicity">Publicity</label>
              <input type="checkbox" id="volunteer-preference--publicity" className="form--publicity"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--schedule-volunteers">
              <label htmlFor="volunteer-preference--schedule-volunteers">Schedule volunteers</label>
              <input type="checkbox" id="volunteer-preference--schedule-volunteers" className="form--schedule-volunteers"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--sort-books">
              <label htmlFor="volunteer-preference--sort-books">Sort books</label>
              <input type="checkbox" id="volunteer-preference--sort-books" className="form--sort-books"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--fund-raising">
              <label htmlFor="volunteer-preference--fund-raising">Fund raising</label>
              <input type="checkbox" id="volunteer-preference--fund-raising" className="form--fund-raising"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--lumacon">
              <label htmlFor="volunteer-preference--lumacon">Staff LUMACON</label>
              <input type="checkbox" id="volunteer-preference--lumacon" className="form--lumacon"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--mend-books">
              <label htmlFor="volunteer-preference--mend-books">Mend books</label>
              <input type="checkbox" id="volunteer-preference--mend-books" className="form--mend-books"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--pick-up-donations">
              <label htmlFor="volunteer-preference--pick-up-donations">Pick up donations</label>
              <input type="checkbox" id="volunteer-preference--pick-up-donations" className="form--pick-up-donations"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--price-books">
              <label htmlFor="volunteer-preference--price-books">Price books</label>
              <input type="checkbox" id="volunteer-preference--price-books" className="form--price-books"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--set-up-for-sales">
              <label htmlFor="volunteer-preference--set-up-for-sales">Set up for sales</label>
              <input type="checkbox" id="volunteer-preference--set-up-for-sales" className="form--set-up-for-sales"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--sales-signage">
              <label htmlFor="volunteer-preference--sales-signage">Sales signage</label>
              <input type="checkbox" id="volunteer-preference--sales-signage" className="form--sales-signage"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--stock-book-store">
              <label htmlFor="volunteer-preference--stock-book-store">Stock book store</label>
              <input type="checkbox" id="volunteer-preference--stock-book-store" className="form--stock-book-store"
                onClick={handleCheckboxClick}
              />
            </div></li>
            <li><div className="new-member--other">
              <label htmlFor="volunteer-preference--other" className="form--other-label">Other</label>
              <input type="text" id="volunteer-preference--other" className="form--other"
                onChange={handleFieldChange}
              />
            </div></li>
          </ul>
        </fieldset>
      </div>
    </>;

  function handleFieldChange(e: any) {
    console.log(
      `member-form--handleFieldChange: target: ${e.target.id}, value: ${e.target.value}`);
    updateMemberData(mapUxToData(e.target.id, e.target.value));
  }
  function handleCheckboxClick(e: any) {
    console.log(`member-form--handleCheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
    updateMemberData(mapUxToData(e.target.id, e.target.checked));
  }
  interface PropsValue {
    value: string;
  }
  type ValuePropNamesType = "firstName" | "lastName" | "address" | "unit" | "city" | "state" | "postalCode" | "phone" | "email" | "mmb" | "paidThrough" | "joined" | "lastUpdated"

  interface InputValuesI extends Partial<Record<ValuePropNamesType, PropsValue>> {
    "firstName": PropsValue;
    "lastName": PropsValue;
    "address": PropsValue;
    "unit": PropsValue;
    "city": PropsValue;
    "state": PropsValue;
    "postalCode": PropsValue;
    "phone": PropsValue;
    "email": PropsValue;
    "mmb": PropsValue;
    "paidThrough": PropsValue;
    "joined": PropsValue;
    "lastUpdated": PropsValue
  };

  function getPropFromAllMemberProps(d: AllMemberProps, k: string): string | undefined {
    switch (k) {
      case "firstName": return d?.firstName ? d.firstName as string : "";
      case "lastName": return d?.lastName ? d.lastName : "";
      case "address": return d?.address ? d.address : "";
      case "unit": return d?.unit ? d.unit : "";
      case "city": return d?.city ? d.city : "";
      case "state": return d?.state ? d.state : "";
      case "postalCode": return d?.postalCode ? d.postalCode : "";
      case "phone": return d?.phone ? d.phone : "";
      case "email": return d?.email ? d.email : "";
      case "mmb": return d?.mmb ? d.mmb : "";
      case "paidThrough": return MembersReducers.reducePaidThroughForMemberList(d);
      case "joined": return MembersReducers.reduceJoinedForMemberList(d);
      case "lastUpdated": return MembersReducers.reduceLastUpdatedForMemberList(d);
      default: return "";
    }
  }
  function createInputValues(d: AllMemberProps): InputValuesI {
    const ValuePropNames = [
      "firstName",
      "lastName",
      "address",
      "unit",
      "city",
      "state",
      "postalCode",
      "phone",
      "email",
      "mmb",
      "paidThrough",
      "joined",
      "lastUpdated"
    ] as const;
    let result: Record<string, PropsValue> = {};
    console.log(`d ready? ${hasProp(d, 'firstName')}`)
    if (d && hasProp(d, 'firstName')) {
      const x = ValuePropNames
        .map((s: keyof typeof result) => result[s] = { value: getPropFromAllMemberProps(d, s) as string } as PropsValue);
      console.log(`fe- member-form--createInputValues: result\n    ${JSON.stringify(result)}`)
    } else {
      const x = ValuePropNames
        .map((s: keyof typeof result) => result[s] = { value: '' as string } as PropsValue);
      console.log("fe- member-form--createInputValues: no initial data -- using space")
    }
    // @ts-ignore
    return result;
  }
  function handleSave(a: string): any {
    console.log(`Saving changes for ${memberId === "" ? "NEW MEMBER" : memberId}`)
    // the new member memberData object is not ready for commit -- remittance and volunteer preferences need restructuring 
    const memberDataToSave = memberId === "" ? newMemberDataReducer(memberData) : memberData;
    Save(serverUrl, memberDataToSave, memberID)
      .then((savRes) => {
        console.log(`member-form--handlesave status -- ${savRes.status}, errors: ${savRes?.body?.error}`)
        if ([200, 201, 204].includes(savRes.status)) {
          console.log("successful save")
          setHasErrors(false);
          updateViewState(MemberViewStates.list);
        } else {
          formErrors.current[0] = { target: "any", errors: [savRes?.body?.error] };
          setHasErrors(true);
        }
      }).catch((fault) => {
        return { status: 900, error: `fault occured: ${JSON.stringify(fault)}` };
      });

    // savRes && savRes
    //   .then((result: any) => {
    //   })
    //   .catch((err: any) => {
    //     let formErrs = [];
    //     if (err) {
    //       let errorsArr = err.split(",");
    //       for (let i = 0; i < errorsArr.length; i++) {
    //         console.log(errorsArr[i]);
    //         let theError = errorsArr[i].split(" -- ");
    //         formErrs.push({ target: theError[1], errors: theError[0] })
    //       }
    //       formErrors.current = formErrors as unknown as FormError[];
    //       console.log(`formErrors:\n    ${formErrors}`)
    //     }
    //   }
    //   );
  }

  function newMemberDataReducer(data: AllMemberProps): AllMemberProps {
    console.log(`fe-member-form.unflatten input\n   ${JSON.stringify(unflatten(data))}`)
    const structuredData: AllMemberProps = unflatten(data);
    const volArr: Volunteer[] = structuredData
      ? structuredData.volunteerPreferences as Volunteer[]
      : [] as Volunteer[];
    const newVolArr: Volunteer[] = volArr
      ? volArr.filter(item => item !== null) as Volunteer[]
      : [] as Volunteer[];
    const remitArr: Remittance[] = structuredData
      ? structuredData.remittances as Remittance[]
      : [] as Remittance[];
    const newRemitArr: Remittance[] = remitArr
      ? remitArr.filter(item => hasProp(item, "amount")) as Remittance[]
      : [] as Remittance[];
    const restructedData: AllMemberProps = {
      _id: nanoid(),
      ...structuredData,
      volunteerPreferences: [...newVolArr],
      remittances: [...newRemitArr]
    } as AllMemberProps
    console.log(`fe-member-form.unflatten result\n   ${JSON.stringify(unflatten(restructedData))}`)
    return restructedData;
  }

  function restructureRemittance(data: AllMemberProps): Partial<AllMemberProps> {
    // new member form creates these results that are not in database form:
    //    remittance.date
    //    remittance.duesAmount
    //    remittance.donationAmount
    // the result is to strip those and return data item with
    //    payment history: [
    //        { date:remittance.date, amount: remittance.duesAmount, memo:"dues"},
    //        { date:remittance.date, amount: remittance.donationAmount, memo:"donation"},
    //    ]
    // where there is an appropriate dues and or donation recorded
    return data;
  }
  function restructureVolunteerPrefs(data: AllMemberProps): Partial<AllMemberProps> {
    // new member form creates these results that are not in database form:
    //    volunteer-preference.bookSales
    //    volunteer-preference. ...
    // the result is to strip those and return data item with
    //    volunteer: [ "BOOK SALES", "...." ]
    // representing the items checked
    return data;
  }


  function resolve(path: string, obj: any) {
    return path.split('.').reduce(function (prev, curr: string) {
      return prev ? prev[curr] : null;
      // eslint-disable-next-line no-restricted-globals
    }, obj || self)
  }

  return (
    <>
      <form className="member-form">
        {commonFormsComponents}
        {(mode === MemberViewStates.new || mode === MemberViewStates.renew) && moneyFormGroupComponent}
        {mode !== MemberViewStates.new && mmbFormGroupComponent}
        {mode === MemberViewStates.new && volunteerPrefencesComponent}
        <div><br></br></div>
        <div className="member-form--controls">
          <SaveBtn updateViewState={updateViewState} updateCurrentMember={(async () => await handleSave("save"))} />
          <CancelBtn updateViewState={updateViewState} />
        </div>
      </form>

    </>);


}
export default MemberFormBase;
