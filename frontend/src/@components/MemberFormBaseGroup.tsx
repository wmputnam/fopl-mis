
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";

export interface FormBaseComponentGroupI {
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void;
  memberObj: Member;
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>;
}

const oldToNew = (oldObj: Member, chgObj: Partial<Member>) => {
  const newMemberObj = Member.create();
  const lupdt = new Date().valueOf();

  const someObj = { ...oldObj, ...chgObj, lastUpdated: new Date(lupdt) }
  for (const k in someObj) {
    if (Object.hasOwn(newMemberObj, k)) {
      newMemberObj[k as keyof Member] = someObj[k as keyof Member];
    }
  }
  return newMemberObj;
}

export const MemberFormBaseGroup = (
  {
    onRenderCallback,
    memberObj,
    setMemberObj,
  }: FormBaseComponentGroupI) => {
  function handleFirstNameChange(e: any) {
    if (memberObj && e.target.id === "first-name") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _firstName: e.target.value } as Partial<Member>)));
    }
  }
  function handleLastNameChange(e: any) {
    if (memberObj && e.target.id === "last-name") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _lastName: e.target.value } as Partial<Member>)));
    }
  }
  function handleAddressChange(e: any) {
    if (memberObj && e.target.id === "address") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _address: e.target.value } as Partial<Member>)));
    }
  }
  function handleUnitChange(e: any) {
    if (memberObj && e.target.id === "unit") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _unit: e.target.value } as Partial<Member>)));
    }
  }
  function handleCityChange(e: any) {
    if (memberObj && e.target.id === "city") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _city: e.target.value } as Partial<Member>)));
    }
  }
  function handleStateChange(e: any) {
    if (memberObj && e.target.id === "state") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _state: e.target.value } as Partial<Member>)));
    }
  }
  function handlePostalCodeChange(e: any) {
    if (memberObj && e.target.id === "postal-code") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _postalCode: e.target.value } as Partial<Member>)));
    }
  }
  function handlePhoneChange(e: any) {
    if (memberObj && e.target.id === "phone") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _phone: e.target.value } as Partial<Member>)));
    }
  }
  function handleEmailChange(e: any) {
    if (memberObj && e.target.id === "email") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _email: e.target.value } as Partial<Member>)));
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
            <div className="new-member--first-name-error red-text width-wide">{memberObj.getFirstNameError()}</div>
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" className="new-member--last-name width-wide" placeholder="Last name"
              required={true}
              value={memberObj.lastName}
              onChange={handleLastNameChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Last name is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <div className="new-member--last-name-error red-text width-wide">{memberObj.getLastNameError()}</div>
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

