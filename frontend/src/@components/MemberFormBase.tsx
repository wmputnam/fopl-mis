/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { EditMemberProps, AllMemberProps } from "../@interfaces/MemberProps";
import { CurrentMemberContext } from "../App"
import useAxios from "axios-hooks";
import membersReducers from "../reducers/members.reducers";
import { MemberViewStates } from "../@interfaces/enums";
import CurrencyFormat from "react-currency-format";


const MemberFormBase = ({ updateViewState, updateCurrentMember, mode }: EditMemberProps) => {
  let memberId = React.useContext(CurrentMemberContext);
  const [{ data, error, loading }] =  useAxios<AllMemberProps>({ 
      baseURL: "http://localhost:3030", 
      url: `/members/${memberId}` }, 
      {  
        manual: false, 
        useCache: false });

  data ? console.log(`data:\n${JSON.stringify(data)}`) : console.log("no data");

  const inputValues:InputValuesI = createInputValues(data as AllMemberProps);
  console.log(JSON.stringify(inputValues));
  // const inputValues = { 
  //   firstName:    goo.firstName,
  //   lastName:     goo.lastName
  // }
  // inputValues && inputValues.firstName && inputValues.firstName.value && console.log(inputValues.firstName.value);
    // let lastNameValue = {value: "" as any};
  // if (data) {
  //   // firstNameValue = { value: data?.firstName }
  //   lastNameValue = { value: data?.lastName }
  // }
  const allFormsComponents = 
    <>
    <div className="member-form--name-group">
      <label htmlFor="first-name">First name</label>
      <input type="text" id="first-name" className="new-member--first-name width-wide" placeholder="First name" {...inputValues.firstName} onChange={handleFieldChange}/>
      <label htmlFor="last-name">Last name</label>
      <input type="text" id="last-name" className="new-member--last-name width-wide" placeholder="Last name" {...inputValues.lastName}  onChange={handleFieldChange}/>
    </div>
    <div className="member-form--address-group" >
      <label htmlFor="address">Address</label>
      <input type="text" id="address" className="new-member--address width-wide" placeholder="Address"  {...inputValues.address}  onChange={handleFieldChange} />
      <label htmlFor="unit">Unit</label>
      <input type="text" id="unit" className="new-member--unit width-wide" placeholder="Unit"  {...inputValues.unit}  onChange={handleFieldChange}/>
      <br />
      <label htmlFor="city">City</label>
      <input type="text" id="city" className="new-member--city width-wide" placeholder="City"  {...inputValues.city}  onChange={handleFieldChange}/>
      <label htmlFor="state">State</label>
      <input type="text" id="state" className="new-member--state width-narrow" placeholder="State"  {...inputValues.state}  onChange={handleFieldChange}/>
      <label htmlFor="postal-code">ZIP code</label>
      <input type="text" id="postal-code" className="new-member--postal-code  width-medium" placeholder="ZIP code"  {...inputValues.postalCode}  onChange={handleFieldChange}/>
    </div>
    <div className="member-form--contact-group">
      <label htmlFor="phone">Phone</label>
      <input type="telephone" id="phone" className="new-member--phone width-wide" placeholder="Phone"  {...inputValues.phone}  onChange={handleFieldChange}/>
      </div>
      </>;
  const moneyFormGroupComponent = 
        <>
          <div className="member-form--money-group">
            <label htmlFor="money-date">Date</label>
            <input type="date" id="money-date" className="new-member--money-date width-date" />
            <label htmlFor="money-dues-amount">Dues</label>
            <CurrencyFormat prefix={"$"} thousandSeparator={true} id="money-dues-amount" className="new-member--dues-amount width-money" placeholder="Dues amount"/>
            <label htmlFor="money-donation-amount">Donation</label>
            <CurrencyFormat prefix={"$"} thousandSeparator={true} id="money-donation-amount" className="new-member--donation-amount width-money" placeholder="Donation amount"/>
          </div>
        </>;
    const mmbFormGroupComponent =
      <>
          <div className="member-form--mmb-group">
            <div className="existing-member--mmb">
              <label htmlFor="mmb">Mmb </label>
              <div id="mmb" className="data-box width-wide">{data?.hasOwnProperty("mmb") ? data.mmb : ""}</div>
            </div>
            <div className="existing-member--paid-through">
              <label htmlFor="paidThrough" >Paid through </label>
              <div id="paidThrough" className="data-box width-wide">{membersReducers.reducePaidThroughForMemberList(data as AllMemberProps)}</div>
            </div>
            <div className="existing-member--joined">
              <label htmlFor="joined">Joined </label>
              <div id="joined" className="data-box width-wide">{membersReducers.reduceJoinedForMemberList(data as AllMemberProps)}</div>
            </div>
            <div className="existing-member--last-updated">
              <label htmlFor="joined">Last updated </label>
              <div id="joined" className="data-box width-wide">{membersReducers.reduceLastUpdatedForMemberList(data as AllMemberProps)}</div>
            </div>
          </div>

      </>;
  function handleFieldChange(){}
  return (
      <>
        <form className="member-form">
          {allFormsComponents}
          {mode === MemberViewStates.new && moneyFormGroupComponent}
          {mode !== MemberViewStates.new && mmbFormGroupComponent}
        </form>
      </>);
interface PropsValue {
   value:string;
}
type ValuePropNamesType = "firstName" | "lastName" | "address" | "unit" | "city" | "state" | "postalCode" | "phone" | "email" | "mmb" | "paidThrough" | "joined" | "lastUpdated"

interface InputValuesI extends Partial<Record<ValuePropNamesType,PropsValue>> {
  "firstName":   PropsValue;
  "lastName":    PropsValue;
  "address":     PropsValue;
  "unit":        PropsValue;
  "city":        PropsValue;
  "state":       PropsValue;
  "postal":      PropsValue;
  "phone":       PropsValue;
  "email":       PropsValue;
  "mmb":         PropsValue;
  "paidThrough": PropsValue;
  "joined":      PropsValue;
  "lastUpdated":  PropsValue
};

function getPropFromAllMemberProps (d:AllMemberProps,k:string):string|undefined {
  switch (k) {
    case "firstName":     return d?.firstName; 
    case "lastName":      return d?.lastName; 
    case "address":       return d?.address; 
    case "unit":          return d?.unit; 
    case "city":          return d?.city; 
    case "state":         return d?.state; 
    case "postal":        return d?.postalCode; 
    case "phone":         return d?.phone; 
    case "email":         return d?.email; 
    case "mmb":           return d?.mmb; 
    case "paidThrough":   return d?.paidThrough; 
    case "joined":        return d?.joined; 
    case "lastUpdated":   return d?.lastUpdated;
    default:              return "";   
  }
}
function createInputValues(d:AllMemberProps):InputValuesI {
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
  let result:Record<string,PropsValue> = {};
  d && d.hasOwnProperty('firstName') ? console.log(`d may be mappable`) : console.log("d is not mappable");
  if (d && d.hasOwnProperty('firstName')) {
    const x = ValuePropNames.map( (s: keyof typeof result) => result[s] = { value: getPropFromAllMemberProps(d,s) as string } as PropsValue);
  }
  result.hasOwnProperty('firstName') ? console.log(`result:\n ${JSON.stringify(result)}`) : console.log("no result");
    // @ts-ignore
  return result;
}

}
export default MemberFormBase;