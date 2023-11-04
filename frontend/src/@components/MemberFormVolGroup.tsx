
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";
import { oldMemberStateToNew } from "./MemberFormBase";
import { VolunteerRoleMultiselect } from "./VolunteerRoleMultiselect";
import { Volunteer } from "packages/Volunteer";

const getDefaultValuesFromIterator = (itr: any) => {
  const newArr = new Array<String>();
  for (const s of itr) {
    newArr.push(s)
  }
  return newArr;
}

export const MemberFormVolGroup = (
  memberObj: Member,
  isDisabled: boolean = false,
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>,
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void) => {

  // const handleCheckboxClick = (e: any) => {
  //   console.log(` vol CheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
  //   switch (e.target.id) {
  //     case "volunteer-preference--book-sale":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookSale: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--book-store":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceBookStore: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--hospitality":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceHospitality: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--newsletter":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceNewsletter: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--publicity":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePublicity: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--schedule-volunteers":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceScheduleVolunteers: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--sort-books":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSortBooks: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--fund-raising":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceFundRaising: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--lumacon":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceLumacon: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--mend-books":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceMendBooks: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--pick-up-donations":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePickUpDonations: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--price-books":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferencePriceBooks: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--set-up-for-sales":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSetUpForSales: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--sales-signage":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceSalesSignage: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--stock-book-store":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceStockBookStore: e.target.value } as Partial<Member>)));
  //       break;
  //     case "volunteer-preference--other":
  //       setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferenceOther: e.target.value } as Partial<Member>)));
  //       break;
  //   }
  // }

  // const handleOtherVolFieldChange = (e: any) => {
  // }

  const handleVolunteerRoleChange = (e: any) => {
    if (e.target.id === "volunteer-roles") {
      if (e.target.value && (typeof e.target.value === 'object') && (e.target.value instanceof Array)) {
        const newVolPrefs: Volunteer[] = e.target.value.map((v: string) => ({ role: v }));
        const newVolRoles = new Map<String, Volunteer>();
        newVolPrefs.forEach(element => {
          newVolRoles.set(element.role, element);
        });
        setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _volunteerPreferences: newVolPrefs, _volunteerRoles: newVolRoles } as Partial<Member>)));
      }
    }

  }
  const newVolunteerUX: boolean = true;
  const valuesArr = getDefaultValuesFromIterator(memberObj.volunteerRoles.keys());


  if (memberObj) {
    const volGroup = (
      <>
        <Profiler id="MemberVol" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          {/* {!newVolunteerUX &&
            <div
              className="member-form--volunteer-preferences"
              data-testid="member-form--volunteer-preferences">
              <fieldset
                className="member-form--volunteer-preferences-fieldset"
                data-testid="member-form--volunteer-preferences-fieldset" >
                <legend>&nbsp;&nbsp;Volunteer preferences&nbsp;&nbsp;</legend>
                <ul
                  className="member-form--volunteer-preferences-list"
                  data-testid="member-form--volunteer-preferences-list">
                  <li><div
                    className="vol-role--book-sale--wrapper"
                    data-testid="vol-role--book-sale--wrapper">
                    <label
                      htmlFor="volunteer-preference--book-sale">Staff book sale</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--book-sale"
                      className="vol-role--book-sale--input"
                      data-testid="vol-role--book-sale--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--book-store--wrapper"
                    data-testid="vol-role--book-store--wrapper">
                    <label
                      htmlFor="volunteer-preference--book-store">Staff book store</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--book-store"
                      className="vol-role--bookstore--input"
                      data-testid="vol-role--bookstore--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--hospitality--wrapper"
                    data-testid="vol-role--hospitality--wrapper">
                    <label
                      htmlFor="volunteer-preference--hospitality">Hospitality</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--hospitality"
                      className="vol-role--hospitality--input"
                      data-testid="vol-role--hospitality--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--newsletter--wrapper"
                    data-testid="vol-role--newsletter--wrapper">
                    <label
                      htmlFor="volunteer-preference--newsletter">Newsletter</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--newsletter"
                      className="vol-role--newsletter--input"
                      data-testid="vol-role--newsletter--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--publicity--wrapper"
                    data-testid="vol-role--publicity--wrapper">
                    <label
                      htmlFor="volunteer-preference--publicity">Publicity</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--publicity"
                      className="vol-role--publicity--input"
                      data-testid="vol-role--publicity--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--schedule-volunteers--wrapper"
                    data-testid="vol-role--schedule-volunteers--wrapper">
                    <label
                      htmlFor="volunteer-preference--schedule-volunteers">Schedule volunteers</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--schedule-volunteers"
                      className="vol-role--schedule-volunteers--input"
                      data-testid="vol-role--schedule-volunteers--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--sort-books--wrapper"
                    data-testid="vol-role--sort-books--wrapper">
                    <label
                      htmlFor="volunteer-preference--sort-books">Sort books</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--sort-books"
                      className="vol-role--sort-books--input"
                      data-testid="vol-role--sort-books--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--fund-raising--wrapper"
                    data-testid="vol-role--fund-raising--wrapper">
                    <label
                      htmlFor="volunteer-preference--fund-raising">Fund raising</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--fund-raising"
                      className="vol-role--fund-raising--input"
                      data-testid="vol-role--fund-raising--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--lumacon--wrapper"
                    data-testid="vol-role--lumacon--wrapper">
                    <label
                      htmlFor="volunteer-preference--lumacon">Staff LUMACON</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--lumacon"
                      className="vol-role--lumacon--input"
                      data-testid="vol-role--lumacon--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--mend-books--wrapper"
                    data-testid="vol-role--mend-books--wrapper">
                    <label
                      htmlFor="volunteer-preference--mend-books">Mend books</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--mend-books"
                      className="vol-role--mend-books--input"
                      data-testid="vol-role--mend-books--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--pick-up-donations--wrapper"
                    data-testid="vol-role--pick-up-donations--wrapper">
                    <label
                      htmlFor="volunteer-preference--pick-up-donations">Pick up donations</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--pick-up-donations"
                      className="vol-role--pick-up-donations--input"
                      data-testid="vol-role--pick-up-donations--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--price-books--wrapper"
                    data-testid="vol-role--price-books--wrapper">
                    <label
                      htmlFor="volunteer-preference--price-books">Price books</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--price-books"
                      className="vol-role--price-books--input"
                      data-testid="vol-role--price-books--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--set-up-for-sales--wrapper"
                    data-testid="vol-role--set-up-for-sales--wrapper">
                    <label
                      htmlFor="volunteer-preference--set-up-for-sales">Set up for sales</label>
                    <input
                      type="checkbox" id="volunteer-preference--set-up-for-sales"
                      className="vol-role--set-up-for-sales--input"
                      data-testid="vol-role--set-up-for-sales--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--sales-signage--wrapper"
                    data-testid="vol-role--sales-signage--wrapper">
                    <label
                      htmlFor="volunteer-preference--sales-signage">Sales signage</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--sales-signage"
                      className="vol-role--sales-signage--input"
                      data-testid="vol-role--sales-signage--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--stock-book-store--wrapper"
                    data-testid="vol-role--stock-book-store--wrapper">
                    <label
                      htmlFor="volunteer-preference--stock-book-store">Stock book store</label>
                    <input
                      type="checkbox"
                      id="volunteer-preference--stock-book-store"
                      className="vol-role--stock-book-store--input"
                      data-testid="vol-role--stock-book-store--input"
                      onClick={handleCheckboxClick}
                      defaultChecked={false}
                    />
                  </div></li>
                  <li><div
                    className="vol-role--other--wrapper"
                    data-testid="vol-role--other--wrapper">
                    <label
                      htmlFor="volunteer-preference--other"
                      className="volunteer-preference--other-label"
                      data-testid="volunteer-preference--other-label">Other</label>
                    <input
                      type="text"
                      id="volunteer-preference--other"
                      className="vol-role--other--input"
                      data-testid="vol-role--other--input"
                      onChange={handleOtherVolFieldChange}
                      defaultChecked={false}
                      placeholder="Other volunteer role"
                    />
                  </div></li>
                </ul>
              </fieldset>
            </div>} */}
          {newVolunteerUX &&
            <div
              className='volunteer-roles--container'>

              <label
                htmlFor="volunteer-roles">Volunteer roles</label>
              <VolunteerRoleMultiselect
                className="volunteer-roles"
                id="volunteer-roles"
                handleChange={(e: any) => {
                  console.log(`MemberFormVolGroup got back: ${JSON.stringify(e)}`);
                  handleVolunteerRoleChange(e);
                }}
                defaultValue={valuesArr}
                isDisabled={isDisabled}
              />
            </div>
          }
        </Profiler>
      </>
    );
    console.log("vol group");
    return volGroup;
  } else {
    return <><p>No member object provided</p></>
  }
};
