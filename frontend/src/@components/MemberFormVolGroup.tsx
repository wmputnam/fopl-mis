
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";

export const MemberFormVolGroup = (
  memberObj: Member,
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>,
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void) => {
  const handleCheckboxClick = (e: any) => {
    console.log(` vol CheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
    switch (e.target.id) {
      case "volunteer-preference--book-sale":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceBookSale: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--book-store":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceBookStore: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--hospitality":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceHospitality: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--newsletter":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceNewsletter: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--publicity":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferencePublicity: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--schedule-volunteers":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceScheduleVolunteers: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--sort-books":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceSortBooks: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--fund-raising":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceFundRaising: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--lumacon":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceLumacon: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--mend-books":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceMendBooks: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--pick-up-donations":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferencePickUpDonations: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--price-books":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferencePriceBooks: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--set-up-for-sales":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceSetUpForSales: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--sales-signage":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceSalesSignage: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--stock-book-store":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceStockBookStore: e.target.value, lastUpdated: new Date() } as Member));
        break;
      case "volunteer-preference--other":
        setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceOther: e.target.value, lastUpdated: new Date() } as Member));
        break;
    }
  }
  const handleOtherVolFieldChange = (e: any) => {
    if (e.target.id === "volunteer-preference--other") {
      setMemberObj((oldObj) => ({ ...oldObj, volunteerPreferenceOther: e.target.value, lastUpdated: new Date() } as Member));
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
