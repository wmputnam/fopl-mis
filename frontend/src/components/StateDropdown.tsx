import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

// states data from --- https://allstateabbreviations.com/ 


const options: SelectOption[] = [
  { value: "AL", label: "ALABAMA" },
  { value: "AK", label: "ALASKA" },
  { value: "AS", label: "AMERICAN SAMOA" },
  { value: "AZ", label: "ARIZONA" },
  { value: "AR", label: "ARKANSAS" },
  { value: "CA", label: "CALIFORNIA" },
  { value: "CO", label: "COLORADO" },
  { value: "CT", label: "CONNECTICUT" },
  { value: "DE", label: "DELAWARE" },
  { value: "DC", label: "DIST OF COLUMBIA" },
  { value: "FL", label: "FLORIDA" },
  { value: "GA", label: "GEORGIA" },
  { value: "GU", label: "GUAM" },
  { value: "HI", label: "HAWAII" },
  { value: "ID", label: "IDAHO" },
  { value: "IL", label: "ILLINOIS" },
  { value: "IN", label: "INDIANA" },
  { value: "IA", label: "IOWA" },
  { value: "KS", label: "KANSAS" },
  { value: "KY", label: "KENTUCKY" },
  { value: "LA", label: "LOUISIANA" },
  { value: "ME", label: "MAINE" },
  { value: "MD", label: "MARYLAND" },
  { value: "MA", label: "MASSACHUSETTS" },
  { value: "MI", label: "MICHIGAN" },
  { value: "MN", label: "MINNESOTA" },
  { value: "UM", label: "MINOR OUTLYING ISLANDS" },
  { value: "MS", label: "MISSISSIPPI" },
  { value: "MO", label: "MISSOURI" },
  { value: "MT", label: "MONTANA" },
  { value: "NE", label: "NEBRASKA" },
  { value: "NV", label: "NEVADA" },
  { value: "NH", label: "NEW HAMPSHIRE" },
  { value: "NJ", label: "NEW JERSEY" },
  { value: "NM", label: "NEW MEXICO" },
  { value: "NY", label: "NEW YORK" },
  { value: "NC", label: "NORTH CAROLINA" },
  { value: "ND", label: "NORTH DAKOTA" },
  { value: "MP", label: "NORTHERN MARIANA ISLANDS" },
  { value: "OH", label: "OHIO" },
  { value: "OK", label: "OKLAHOMA" },
  { value: "OR", label: "OREGON" },
  { value: "PA", label: "PENNSYLVANIA" },
  { value: "PR", label: "PUERTO RICO" },
  { value: "RI", label: "RHODE ISLAND" },
  { value: "SC", label: "SOUTH CAROLINA" },
  { value: "SD", label: "SOUTH DAKOTA" },
  { value: "TN", label: "TENNESSEE" },
  { value: "TX", label: "TEXAS" },
  { value: "UT", label: "UTAH" },
  { value: "VT", label: "VERMONT" },
  { value: "VA", label: "VIRGINIA" },
  { value: "VI", label: "U.S. VIRGIN ISLANDS" },
  { value: "WA", label: "WASHINGTON" },
  { value: "WV", label: "WEST VIRGINIA" },
  { value: "WI", label: "WISCONSIN" },
  { value: "WY", label: "WYOMING" },
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
