
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";
import { oldMemberStateToNew } from "./MemberFormBase";

export interface FormBaseComponentGroupI {
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void;
  memberObj: Member;
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>;
}

export const MemberFormBaseGroup = (
  {
    onRenderCallback,
    memberObj,
    setMemberObj,
  }: FormBaseComponentGroupI) => {
  function handleFirstNameChange(e: any) {
    if (memberObj && e.target.id === "first-name") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _firstName: e.target.value } as Partial<Member>)));
    }
  }
  function handleLastNameChange(e: any) {
    if (memberObj && e.target.id === "last-name") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _lastName: e.target.value } as Partial<Member>)));
    }
  }
  function handleAddressChange(e: any) {
    if (memberObj && e.target.id === "address") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _address: e.target.value } as Partial<Member>)));
    }
  }
  function handleUnitChange(e: any) {
    if (memberObj && e.target.id === "unit") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _unit: e.target.value } as Partial<Member>)));
    }
  }
  function handleCityChange(e: any) {
    if (memberObj && e.target.id === "city") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _city: e.target.value } as Partial<Member>)));
    }
  }
  function handleStateChange(e: any) {
    if (memberObj && e.target.id === "state") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _state: e.target.value } as Partial<Member>)));
    }
  }
  function handlePostalCodeChange(e: any) {
    if (memberObj && e.target.id === "postal-code") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _postalCode: e.target.value } as Partial<Member>)));
    }
  }
  function handlePhoneChange(e: any) {
    if (memberObj && e.target.id === "phone") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _phone: e.target.value } as Partial<Member>)));
    }
  }
  function handleEmailChange(e: any) {
    if (memberObj && e.target.id === "email") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _email: e.target.value } as Partial<Member>)));
    }
  }
  if (memberObj) {
    return (
      <>
        <Profiler id="memberFormBase" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <div className="member-form--name-group" data-testid="member-form--name-group" >
            <label htmlFor="first-name">First name</label>
            <input type="text" 
              id="first-name" 
              className="member--first-name width-wide" 
              data-testid="member--first-name"
              placeholder="First name"
              required={true}
              value={memberObj.firstName}
              onChange={handleFirstNameChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('First name is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <div className="member--first-name-error red-text width-wide" data-testid="member--first-name-error">{memberObj.getFirstNameError()}</div>
            <label htmlFor="last-name">Last name</label>
            <input type="text" 
              id="last-name" 
              className="member--last-name width-wide" data-testid="member--last-name"
              placeholder="Last name"
              required={true}
              value={memberObj.lastName}
              onChange={handleLastNameChange}
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Last name is required')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <div className="member--last-name-error red-text width-wide" data-testid="member--last-name-error">{memberObj.getLastNameError()}</div>
          </div>
          <div className="member-form--address-group" data-testid="member-form--address-group" >
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="member--address width-wide"
              data-testid="member--address"
              placeholder="Address"
              value={memberObj.address}
              onChange={handleAddressChange}
            />
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              className="member--unit width-wide"
              data-testid="member--unit"
              placeholder="Unit"
              value={memberObj.unit}
              onChange={handleUnitChange}
            />
            <br />
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="member--city width-wide"
              data-testid="member--city"
              placeholder="City"
              value={memberObj.city}
              onChange={handleCityChange}
            />
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              className="member--state width-narrow"
              data-testid="member--state"
              placeholder="State"
              value={memberObj.state}
              onChange={handleStateChange}
            />
            <label htmlFor="postal-code">ZIP code</label>
            <input
              type="text"
              id="postal-code"
              className="member--postal-code  width-medium" data-testid="member--postal-code"
              placeholder="ZIP code"
              value={memberObj.postalCode}
              onChange={handlePostalCodeChange}
            />
          </div>
          <div className="member-form--contact-group" data-testid="member-form--contact-group" >
            <label htmlFor="phone">Phone</label>
            <input
              type="telephone"
              id="phone"
              className="member--phone width-phone"
              data-testid="member--phone"
              placeholder="Phone"
              value={memberObj.phone}
              onChange={handlePhoneChange} />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="member--email width-phone"
              data-testid="member--email"
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

