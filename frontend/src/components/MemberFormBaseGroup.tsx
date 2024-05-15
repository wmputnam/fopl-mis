
import React, { Profiler } from "react"
import { RenderCallBackI } from "../interfaces";
import { Member } from "fe-member";
import { oldMemberStateToNew } from "./MemberFormBase";
import { StateDropdown } from "./StateDropdown";

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
  if (memberObj.status !== null) {
    const memberActive = (memberObj.status && memberObj.status.isActive)
      ? "Active"
      : "OUT";
    return (
      <>
        <Profiler id="memberFormBase" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>

          <div className="member-form--name-group" data-testid="member-form--name-group" >
            <div
              className="member-form--firstName-wrapper">
              <div id="first-name-input-wrapper">
                <label
                  className="form-label"
                  id="first-name--label"
                  htmlFor="first-name">First name</label>
                <input type="text"
                  id="first-name"
                  className={"member--first-name width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                  data-testid="member--first-name"
                  placeholder="First name"
                  required={true}
                  value={memberObj.firstName}
                  onChange={handleFirstNameChange}
                  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('First name is required')}
                  onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                  readOnly={memberActive !== "Active"}
                /></div>
              <div id="first-name-error-wrapper">
                <label
                  className="form-label"
                  id="first-name--error-label"
                  htmlFor="first-name-error"></label>
                <div
                  id="first-name-error"
                  className="member--first-name-error red-text width-wide" data-testid="member--first-name-error">{memberObj.getFirstNameError()}</div>
              </div>
            </div>
            <div
              className="member-form--lastName-wrapper">
              <div id="last-name-input-wrapper">
                <label id="last-name--label"
                  className="form-label"
                  htmlFor="last-name">Last name</label>
                <input type="text"
                  id="last-name"
                  className={"member--last-name width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                  placeholder="Last name"
                  required={true}
                  value={memberObj.lastName}
                  onChange={handleLastNameChange}
                  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Last name is required')}
                  onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                  readOnly={memberActive !== "Active"}
                />
              </div>
              <div id="last-name-error-wrapper">
                <label
                  className="form-label"
                  id="last-name--error-label"
                  htmlFor="last-name-error"></label>
                <div className="member--last-name-error red-text width-wide" data-testid="member--last-name-error">{memberObj.getLastNameError()}
                </div>
              </div>
            </div>

          </div>
          <div className="member-form--address-group" data-testid="member-form--address-group" >
            <div className="member-form--address">
              <label
                className="form-label"
                id="address label" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className={"member--address width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                data-testid="member--address"
                placeholder="Address"
                value={memberObj.address}
                onChange={handleAddressChange}
                readOnly={memberActive !== "Active"}
              />
            </div /* member form address */>
            <div className="member-form--address-unit">
              <label
                className="form-label"
                id="address unit label" htmlFor="unit">Unit</label>
              <input
                type="text"
                id="unit"
                className={"member--unit width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                data-testid="member--unit"
                placeholder="Unit"
                value={memberObj.unit}
                onChange={handleUnitChange}
                readOnly={memberActive !== "Active"}
              />
            </div /* address unit */ >
          </div /* address group */ >
          <div className="member-form--region">
            <div className="member-form--address-city">
              <label
                className="form-label"
                id="address city label" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className={"member--city width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                data-testid="member--city"
                placeholder="City"
                value={memberObj.city}
                onChange={handleCityChange}
                readOnly={memberActive !== "Active"}
              />
            </div /* address city*/>
            <div className="member-from--state-zip">
              {memberActive && <div className="member-form--address-state">
                <label
                  className="form-label"
                  id="address state label"
                  htmlFor="state">State</label>
                <br />
                {memberObj.state && < StateDropdown
                  // className='us-states--dropdown'
                  className={"member--state" + (memberActive !== "Active" ? " readonly-input" : "")}
                  stateCode={memberObj.state}
                  id="state"
                  onChange={handleStateChange}
                  readOnly={memberActive !== "Active"}
                />}

                {/* <input
                  type="text"
                  id="state"
                  className={"member--state width-narrow" + (memberActive !== "Active" ? " readonly-input" : "")}
                  data-testid="member--state"
                  placeholder="State"
                  value={memberObj.state}
                  onChange={handleStateChange}
                  readOnly={memberActive !== "Active"}
                /> */}
              </div /* address state */>
              }
              {memberActive && <div className="member-form--address-zip">
                <label
                  className="form-label"
                  id="address zip label" htmlFor="postal-code">ZIP code</label>
                <input
                  type="text"
                  id="postal-code"
                  className={"member--postal-code width-medium" + (memberActive !== "Active" ? " readonly-input" : "")}
                  data-testid="member--postal-code"
                  placeholder="ZIP code"
                  value={memberObj.postalCode}
                  onChange={handlePostalCodeChange}
                  readOnly={memberActive !== "Active"}
                />
              </div /* address zip */>
              }
            </div /* member-from--state-zip */ >
          </div /* member form region */>
          <div className="member-form--contact-group" data-testid="member-form--contact-group" >
            <div className="member-form--phone">
              <label
                className="form-label"
                htmlFor="phone">Phone</label>
              <input
                type="telephone"
                id="phone"
                className={"member--phone width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                data-testid="member--phone"
                placeholder="Phone"
                value={memberObj.phone}
                onChange={handlePhoneChange}
                readOnly={memberActive !== "Active"}
              />
            </div /* member-form--phone*/ >
            <div className="member-form--email">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={"member--email width-wide" + (memberActive !== "Active" ? " readonly-input" : "")}
                data-testid="member--email"
                placeholder="Email"
                required={false}
                value={memberObj.email}
                onChange={handleEmailChange}
                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Email is required')}
                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                readOnly={memberActive !== "Active"}
              />
            </div /* member-form--email*/ >
          </div /* member-form--contact-group */ >
        </Profiler>
      </>)
  } else {
    return <><p>No member object provided</p></>
  }
};

