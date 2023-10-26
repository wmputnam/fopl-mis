import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

// states data from --- https://allstateabbreviations.com/ 


const options: SelectOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "Dist of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "UM", label: "Minor Outlying Islands" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "VI", label: "U.S. Virgin Islands" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOptionByLabel = (label: string): SelectOption => {
  let result = null as unknown as SelectOption;

  for (let i = 0; i < options.length; i++) {
    if (options[i].label === label) {
      return options[i];
    }
  }
  return result;
}

const getOptionByValue = (value: string): SelectOption => {
  let result = null as unknown as SelectOption;

  if (value) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        console.log(` getOptionByValue: got "${value}" returning ${JSON.stringify(options[i])} `)
        return options[i];
      }
    }
  }
  return result;
}
export function StateDropdown(props: any) {
  const className = props.className
    ? props.className
    : "state--dd";

  const id = props.id
    ? props.id
    : "state";

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByValue(props.stateCode) as unknown as SelectOption);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (option: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    console.log(`change to new option: ${JSON.stringify(option)}`)
    setSelectedOption(option as SelectOption);
    if (props.onChange && typeof props.onChange == 'function') {
      props.onChange({ target: { id: id, value: option?.value } });
    }
  }

  return (
    <Select
      className={className}
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
      id={id}
    />
  )
}
