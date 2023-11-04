import React from "react";
import Select from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

const options: SelectOption[] = [
  { label: "Book sale", value: "book-sale" },
  { label: "Book sale setup", value: "book-sale--setup" },
  { label: "Book sale signage", value: "book-sale--signage" },
  { label: "Book sale AV", value: "book-sale--AV" },
  { label: "Book store", value: "book-store" },
  { label: "Consultant", value: "consultant" },
  { label: "Dealer", value: "dealer" },
  { label: "Fund raising", value: "fund-raising" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Librarian", value: "librarian" },
  { label: "LUMACON", value: "LUMACON" },
  { label: "Mend books", value: "mend-books" },
  { label: "Newsletter", value: "newsletter" },
  { label: "Pick up donations", value: "pickup-donations" },
  { label: "Price donations", value: "price-donations" },
  { label: "Publicity", value: "publicity" },
  { label: "Schedule volunteers", value: "schedule-volunteers" },
  { label: "Sort books", value: "sort-books" },
  { label: "Speaker", value: "speaker" },
  { label: "Woodwork", value: "woodwork" },
  { label: "Other", value: "other--" },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOptionByLabel = (label: string[]): SelectOption[] => {
  let result: SelectOption[] = []
  if (label) {
    for (let v = 0; v < label.length; v++) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === label[v]) {
          console.log(` getOptionByValues: match "${label[v]}" with *${JSON.stringify(options[i])}*`)
          result.push(options[i]);
          break;
        }
      }
    }
  }
  return result;
}

const getOptionsByValues = (currentValues: string[]): SelectOption[] => {
  let result: SelectOption[] = []
  if (currentValues) {
    for (let v = 0; v < currentValues.length; v++) {
      let found = false;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === currentValues[v]) {
          console.log(` getOptionByValues: match "${currentValues[v]}" with *${JSON.stringify(options[i])}*`)
          result.push(options[i]);
          found = true;
          break;
        }
      }
      if (!found) {
        result.push({ label: currentValues[v], value: currentValues[v] })
      }
    }
  }
  return result;
}

export const resultingOptionsChange = (oldOpts: SelectOption[], newOpts: SelectOption[]): SelectOption[] => {

  let oldMap = new Map<String, SelectOption>();
  oldOpts.forEach(element => {
    oldMap.set(element.value, element)
  });
  let newMap = new Map<String, SelectOption>();
  newOpts.forEach(element => {
    newMap.set(element.value, element)
  });
  if (oldMap.size === newMap.size) {
    console.log(`expect to be same *${JSON.stringify(oldMap)}*\nand                *${JSON.stringify(newMap)}*\nsince we get noticed on each change`);
    return oldOpts;
  } else if (oldMap.size < newMap.size) {
    const oldDorf = JSON.stringify(oldMap);
    const newDorf = JSON.stringify(newMap);

    console.log(`find entry added to *${oldDorf}*\nin                  *${newDorf}*`);
    const newMapIter = newMap.keys();
    for (let n = newMapIter.next(); !n.done; n = newMapIter.next()) {
      const keyStr = n.value;
      if (!oldMap.has(keyStr)) {
        const newOption: SelectOption | undefined = newMap.get(keyStr) as SelectOption | undefined;
        if (newOption) {
          console.log(`added ${JSON.stringify(newOption)}`);
          const newArrRes = new Array(...oldOpts);
          newArrRes.push(newOption);
          return newArrRes;
          // break;
        } else return oldOpts;
      }
    }
  } else {
    console.log(`find entry removed from *${JSON.stringify(oldMap.keys())}*\nin                       *${JSON.stringify(newMap.keys())}*`);
    const oldMapIter = oldMap.keys();
    for (let n = oldMapIter.next(); !n.done; n = oldMapIter.next()) {
      if (!newMap.has(n.value)) {
        const removedOption: SelectOption | undefined = oldMap.get(n.value);
        if (removedOption) {
          const whereIn = oldOpts.indexOf(removedOption);
          const newArr = [...oldOpts];
          newArr.splice(whereIn, 1);
          return newArr;
        }
      }
    }
  }
  return oldOpts;
  // as MultiValue<SelectOption>);
}

const valuesArrayForCaller = (selectedOption: SelectOption[]): String[] => {
  const valuesArr = selectedOption.map((optionObj: any) => optionObj.value);
  return valuesArr;
}

export function VolunteerRoleMultiselect(props: any) {

  const id = props.id && props.id !== "" ? props.id : 'volunteer-roles';

  const className = props.className && props.className !== "" ? props.className : 'member-form--volunteer-roles';

  const isDisabled = props.isDisabled ? props.isDisabled : false;


  const [selectedOption, setSelectedOption] = React.useState<any>(getOptionsByValues(props.defaultValue));
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (newValue: any/*MultiValue<SelectOption>*/ | null, actionMeta: any/*ActionMeta<MultiValue<SelectOption>>*/ | null) => {
    console.log(`id: "${id}", multivalue: *${JSON.stringify(newValue)}*`)
    if (newValue) {
      const optionArr: SelectOption[] = [...newValue];
      setSelectedOption((oldOptions: SelectOption[]) => {
        const newOpts = resultingOptionsChange(oldOptions, optionArr);
        return newOpts;
      }); // as MultiValue<SelectOption>);
    }
  }

  React.useEffect(() => {
    // if (props.onChange && typeof props.onChange == 'function') {
    //   props.onChange({ target: { id: id, value: [...valuesArr] } });
    // }
    if (props.handleChange && typeof props.handleChange === 'function') {
      const valuesArr = valuesArrayForCaller(selectedOption);
      console.log(`{ target: { id: ${id}, value: [${[...valuesArr]}] } }`)
      props.handleChange({ target: { id: id, value: [...valuesArr] } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [selectedOption]);

  return (
    <Select
      className={className}
      id={id}
      defaultValue={selectedOption}
      isMulti={true}
      onChange={onChange}
      options={options}
      isDisabled={isDisabled}
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