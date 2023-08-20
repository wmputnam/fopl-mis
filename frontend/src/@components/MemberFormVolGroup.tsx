
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";
import { oldMemberStateToNew } from "./MemberFormBase";

export const MemberFormVolGroup = (
  memberObj: Member,
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>,
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void) => {

  const handleCheckboxClick = (e: any) => {
    console.log(` vol CheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
    switch (e.target.id) {
      case "volunteer-preference--book-sale":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookSale: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--book-store":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookStore: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--hospitality":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceHospitality: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--newsletter":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceNewsletter: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--publicity":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePublicity: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--schedule-volunteers":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceScheduleVolunteers: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--sort-books":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSortBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--fund-raising":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceFundRaising: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--lumacon":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceLumacon: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--mend-books":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceMendBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--pick-up-donations":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePickUpDonations: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--price-books":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePriceBooks: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--set-up-for-sales":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSetUpForSales: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--sales-signage":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSalesSignage: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--stock-book-store":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceStockBookStore: e.target.value } as Partial<Member>)));
        break;
      case "volunteer-preference--other":
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceOther: e.target.value } as Partial<Member>)));
        break;
    }
  }

  const handleOtherVolFieldChange = (e: any) => {
    if (e.target.id === "volunteer-preference--other") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceOther: e.target.value } as Partial<Member>)));
    }
  }

  if (memberObj) {
    const volGroup = (
      <>
        <Profiler id="MemberVol" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <div className="member-form--volunteer-preferences" data-testid="member-form--volunteer-preferences">
            <fieldset className="member-form--volunteer-preferences-fieldset" data-testid="member-form--volunteer-preferences-fieldset" >
              <legend>&nbsp;&nbsp;Volunteer preferences&nbsp;&nbsp;</legend>
              <ul className="member-form--volunteer-preferences-list" data-testid="member-form--volunteer-preferences-list">
                <li><div className="new-member--book-sale" data-testid="new-member--book-sale">
                  <label htmlFor="volunteer-preference--book-sale">Staff book sale</label>
                  <input type="checkbox" id="volunteer-preference--book-sale" className="form--book-sale" data-testid="form--book-sale"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--book-store" data-testid="new-member--book-store">
                  <label htmlFor="volunteer-preference--book-store">Staff book store</label>
                  <input type="checkbox" id="volunteer-preference--book-store" className="form--bookstore" data-testid="form--bookstore"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--hospitality" data-testid="new-member--hospitality">
                  <label htmlFor="volunteer-preference--hospitality">Hospitality</label>
                  <input type="checkbox" id="volunteer-preference--hospitality" className="form--hospitality" data-testid="form--hospitality"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--newsletter" data-testid="new-member--newsletter">
                  <label htmlFor="volunteer-preference--newsletter">Newsletter</label>
                  <input type="checkbox" id="volunteer-preference--newsletter" className="form--newsletter" data-testid="form--newsletter"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--publicity" data-testid="new-member--publicity">
                  <label htmlFor="volunteer-preference--publicity">Publicity</label>
                  <input type="checkbox" id="volunteer-preference--publicity" className="form--publicity" data-testid="form--publicity"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--schedule-volunteers" data-testid="new-member--schedule-volunteers">
                  <label htmlFor="volunteer-preference--schedule-volunteers">Schedule volunteers</label>
                  <input type="checkbox" id="volunteer-preference--schedule-volunteers" className="form--schedule-volunteers" data-testid="form--schedule-volunteers"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--sort-books" data-testid="new-member--sort-books">
                  <label htmlFor="volunteer-preference--sort-books">Sort books</label>
                  <input type="checkbox" id="volunteer-preference--sort-books" className="form--sort-books" data-testid="form--sort-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--fund-raising" data-testid="new-member--fund-raising">
                  <label htmlFor="volunteer-preference--fund-raising">Fund raising</label>
                  <input type="checkbox" id="volunteer-preference--fund-raising" className="form--fund-raising" data-testid="form--fund-raising"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--lumacon" data-testid="new-member--lumacon">
                  <label htmlFor="volunteer-preference--lumacon">Staff LUMACON</label>
                  <input type="checkbox" id="volunteer-preference--lumacon" className="form--lumacon" data-testid="form--lumacon"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--mend-books" data-testid="new-member--mend-books">
                  <label htmlFor="volunteer-preference--mend-books">Mend books</label>
                  <input type="checkbox" id="volunteer-preference--mend-books" className="form--mend-books" data-testid="form--mend-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--pick-up-donations" data-testid="new-member--pick-up-donations">
                  <label htmlFor="volunteer-preference--pick-up-donations">Pick up donations</label>
                  <input type="checkbox" id="volunteer-preference--pick-up-donations" className="form--pick-up-donations" data-testid="form--pick-up-donations"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--price-books" data-testid="new-member--price-books">
                  <label htmlFor="volunteer-preference--price-books">Price books</label>
                  <input type="checkbox" id="volunteer-preference--price-books" className="form--price-books" data-testid="form--price-books"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--set-up-for-sales" data-testid="new-member--set-up-for-sales">
                  <label htmlFor="volunteer-preference--set-up-for-sales">Set up for sales</label>
                  <input type="checkbox" id="volunteer-preference--set-up-for-sales" className="form--set-up-for-sales" data-testid="form--set-up-for-sales"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--sales-signage" data-testid="new-member--sales-signage">
                  <label htmlFor="volunteer-preference--sales-signage">Sales signage</label>
                  <input type="checkbox" id="volunteer-preference--sales-signage" className="form--sales-signage" data-testid="form--sales-signage"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--stock-book-store" data-testid="new-member--stock-book-store">
                  <label htmlFor="volunteer-preference--stock-book-store">Stock book store</label>
                  <input type="checkbox" id="volunteer-preference--stock-book-store" className="form--stock-book-store" data-testid="form--stock-book-store"
                    onClick={handleCheckboxClick}
                    defaultChecked={false}
                  />
                </div></li>
                <li><div className="new-member--other" data-testid="new-member--other">
                  <label htmlFor="volunteer-preference--other" className="form--other-label" data-testid="form--other-label">Other</label>
                  <input type="text" id="volunteer-preference--other" className="form--other" data-testid="form--other"
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
