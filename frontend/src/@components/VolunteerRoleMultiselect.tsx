import React from "react";
import Select, { MultiValue, ActionMeta } from "react-select";

interface SelectOption {
  label: string;
  value: string;
}
const options: SelectOption[] = [
   { label: "Book sale", value: "volunteer-preference--book-sale"},
   { label: "Book store", value: "volunteer-preference--book-store"},
   { label: "Hospitality", value: "volunteer-preference--hospitality"},
   { label: "Newsletter", value: "volunteer-preference--newsletter"},
   { label: "Publicity", value: "volunteer-preference--publicity"},
   { label: "Schedule volunteers", value: "volunteer-preference--schedule-volunteers"},
   { label: "Sort books", value: "volunteer-preference--sort-books"},
   { label: "Fund raising", value: "volunteer-preference--fund-raising"},
   { label: "LUMACON", value: "volunteer-preference--lumacon"},
   { label: "Mend books", value: "volunteer-preference--mend-books"},
   { label: "Pick up donations", value: "volunteer-preference--pick-up-donations"},
   { label: "Price books", value: "volunteer-preference--price-books"},
   { label: "Set up for sales", value: "volunteer-preference--set-up-for-sales"},
   { label: "Sales signage", value: "volunteer-preference--sales-signage"},
   { label: "Stock book store", value: "volunteer-preference--stock-book-store"},
   { label: "Other", value: "volunteer-preference--other"},
]

export function VolunteerRoleMultiselect(props: any) {

  const [selectedOption, setSelectedOption] = React.useState<any>(null);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (option:any) => {//: MultiValue<SelectOption> | null, actionMeta: ActionMeta<MultiValue<SelectOption>> | null) => {
    setSelectedOption(option); // as MultiValue<SelectOption>);
  }

  return (
    <Select
      className="volunteer-roles--select"
      defaultValue={selectedOption}
      isMulti={true}
      onChange={onChange}
      options={options}
    />
  )
}
/*
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
*/