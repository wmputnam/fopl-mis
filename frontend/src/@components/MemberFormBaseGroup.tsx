
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";

export interface FormBaseComponentGroupI {
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void;
  memberObj: Member;
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>;
  handleFieldChange(e: any): void;
  firstNameError: string | undefined;
  lastNameError: string | undefined;
}

export const MemberFormBaseGroup = (
  {
    onRenderCallback,
    memberObj,
    setMemberObj,
    handleFieldChange,
    firstNameError,
    lastNameError }: FormBaseComponentGroupI) => {
  function handleFirstNameChange(e: any) {
    if (memberObj && e.target.id === "first-name") {
      setMemberObj((oldObj) => ({ ...oldObj, firstName: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleLastNameChange(e: any) {
    if (memberObj && e.target.id === "last-name") {
      setMemberObj((oldObj) => ({ ...oldObj, lastName: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleAddressChange(e: any) {
    if (memberObj && e.target.id === "addess") {
      setMemberObj((oldObj) => ({ ...oldObj, address: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleUnitChange(e: any) {
    if (memberObj && e.target.id === "unit") {
      setMemberObj((oldObj) => ({ ...oldObj, unit: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleCityChange(e: any) {
    if (memberObj && e.target.id === "city") {
      setMemberObj((oldObj) => ({ ...oldObj, city: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleStateChange(e: any) {
    if (memberObj && e.target.id === "state") {
      setMemberObj((oldObj) => ({ ...oldObj, state: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handlePostalCodeChange(e: any) {
    if (memberObj && e.target.id === "postal-code") {
      setMemberObj((oldObj) => ({ ...oldObj, postalCode: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handlePhoneChange(e: any) {
    if (memberObj && e.target.id === "phone") {
      setMemberObj((oldObj) => ({ ...oldObj, phone: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  function handleEmailChange(e: any) {
    if (memberObj && e.target.id === "unit") {
      setMemberObj((oldObj) => ({ ...oldObj, email: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  if (memberObj) {
    console.log(`value of unit is "${(memberObj && memberObj.unit) ? memberObj.unit : ""}"`)
    return (
      <>
        <Profiler id="memberFormBase" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <div className="member-form--name-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" className="new-member--first-name width-wide" placeholder="First name"
              required={true}
              value={memberObj.firstName}
              onChange={handleFirstNameChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('First name is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <div className="new-member--first-name-error">{firstNameError}</div>
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" className="new-member--last-name width-wide" placeholder="Last name"
              required={true}
              value={memberObj.lastName}
              onChange={handleLastNameChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Last name is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <div className="new-member--last-name-error">{lastNameError}</div>
          </div>
          <div className="member-form--address-group" >
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="new-member--address width-wide"
              placeholder="Address"
              value={memberObj.address}
              onChange={handleAddressChange}
            />
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              className="new-member--unit width-wide"
              placeholder="Unit"
              value={memberObj.unit}
              onChange={handleUnitChange}
            />
            <br />
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="new-member--city width-wide"
              placeholder="City"
              value={memberObj.city}
              onChange={handleCityChange}
            />
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              className="new-member--appState width-narrow"
              placeholder="State"
              value={memberObj.state}
              onChange={handleStateChange}
            />
            <label htmlFor="postal-code">ZIP code</label>
            <input
              type="text"
              id="postal-code"
              className="new-member--postal-code  width-medium"
              placeholder="ZIP code"
              value={memberObj.postalCode}
              onChange={handlePostalCodeChange}
            />
          </div>
          <div className="member-form--contact-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="telephone"
              id="phone"
              className="new-member--phone width-phone"
              placeholder="Phone"
              value={memberObj.phone}
              onChange={handlePhoneChange} />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="new-member--email width-phone"
              placeholder="Email"
              required={false}
              value={memberObj.email}
              onChange={handleEmailChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Email is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
        </Profiler>
      </>)
  } else {
    return <><p>No member object provided</p></>
  }
};

