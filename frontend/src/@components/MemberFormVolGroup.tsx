
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";

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

export const MemberFormVolGroup = (
  memberObj: Member,
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>,
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void) => {

  const handleCheckboxClick = (e: any) => {
    console.log(` vol CheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
    switch (e.target.id) {
      case "volunteer-preference--book-sale":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceBookSale: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--book-store":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceBookStore: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--hospitality":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceHospitality: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--newsletter":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceNewsletter: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--publicity":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferencePublicity: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--schedule-volunteers":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceScheduleVolunteers: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--sort-books":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceSortBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--fund-raising":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceFundRaising: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--lumacon":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceLumacon: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--mend-books":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceMendBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--pick-up-donations":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferencePickUpDonations: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--price-books":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferencePriceBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--set-up-for-sales":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceSetUpForSales: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--sales-signage":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceSalesSignage: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--stock-book-store":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceStockBookStore: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--other":
        setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceOther: e.target.value } as Partial<Member>)));
        break;
    }
  }

  const handleOtherVolFieldChange = (e: any) => {
    if (e.target.id === "volunteer-preference--other") {
      setMemberObj((oldObj) => (oldToNew(oldObj, { _volunteerPreferenceOther: e.target.value } as Partial<Member>)));
    }
  }

  if (memberObj) {
    const volGroup = (
      <>
        <Profiler id="MemberVol" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <div className="member-form--volunteer-preferences">
            <fieldset className="group" >
              <legend>&nbsp;&nbsp;Volunteer preferences&nbsp;&nbsp;</legend>
              <ul className="member-form--volunteer-preferences-list">
                <li><div className="new-member--book-sale">
                  <label htmlFor="volunteer-preference--book-sale">Staff book sale</label>
                  <input type="checkbox" id="volunteer-preference--book-sale" className="form--book-sale"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--book-store">
                  <label htmlFor="volunteer-preference--book-store">Staff book store</label>
                  <input type="checkbox" id="volunteer-preference--book-store" className="form--bookstore"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--hospitality">
                  <label htmlFor="volunteer-preference--hospitality">Hospitality</label>
                  <input type="checkbox" id="volunteer-preference--hospitality" className="form--hospitality"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--newsletter">
                  <label htmlFor="volunteer-preference--newsletter">Newsletter</label>
                  <input type="checkbox" id="volunteer-preference--newsletter" className="form--newsletter"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--publicity">
                  <label htmlFor="volunteer-preference--publicity">Publicity</label>
                  <input type="checkbox" id="volunteer-preference--publicity" className="form--publicity"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--schedule-volunteers">
                  <label htmlFor="volunteer-preference--schedule-volunteers">Schedule volunteers</label>
                  <input type="checkbox" id="volunteer-preference--schedule-volunteers" className="form--schedule-volunteers"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--sort-books">
                  <label htmlFor="volunteer-preference--sort-books">Sort books</label>
                  <input type="checkbox" id="volunteer-preference--sort-books" className="form--sort-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--fund-raising">
                  <label htmlFor="volunteer-preference--fund-raising">Fund raising</label>
                  <input type="checkbox" id="volunteer-preference--fund-raising" className="form--fund-raising"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--lumacon">
                  <label htmlFor="volunteer-preference--lumacon">Staff LUMACON</label>
                  <input type="checkbox" id="volunteer-preference--lumacon" className="form--lumacon"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--mend-books">
                  <label htmlFor="volunteer-preference--mend-books">Mend books</label>
                  <input type="checkbox" id="volunteer-preference--mend-books" className="form--mend-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--pick-up-donations">
                  <label htmlFor="volunteer-preference--pick-up-donations">Pick up donations</label>
                  <input type="checkbox" id="volunteer-preference--pick-up-donations" className="form--pick-up-donations"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--price-books">
                  <label htmlFor="volunteer-preference--price-books">Price books</label>
                  <input type="checkbox" id="volunteer-preference--price-books" className="form--price-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--set-up-for-sales">
                  <label htmlFor="volunteer-preference--set-up-for-sales">Set up for sales</label>
                  <input type="checkbox" id="volunteer-preference--set-up-for-sales" className="form--set-up-for-sales"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--sales-signage">
                  <label htmlFor="volunteer-preference--sales-signage">Sales signage</label>
                  <input type="checkbox" id="volunteer-preference--sales-signage" className="form--sales-signage"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--stock-book-store">
                  <label htmlFor="volunteer-preference--stock-book-store">Stock book store</label>
                  <input type="checkbox" id="volunteer-preference--stock-book-store" className="form--stock-book-store"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--other">
                  <label htmlFor="volunteer-preference--other" className="form--other-label">Other</label>
                  <input type="text" id="volunteer-preference--other" className="form--other"
                    onChange={handleOtherVolFieldChange}
                    defaultChecked={false}
                  />
                </div></li>
              </ul>
            </fieldset>
          </div>
        </Profiler>
      </>
    );
    console.log("vol group");
    return volGroup;
  } else {
    return <><p>No member object provided</p></>
  }
};
