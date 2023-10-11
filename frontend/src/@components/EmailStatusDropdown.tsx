import React from "react";
import Select, {SingleValue,ActionMeta} from "react-select";

interface SelectOption {
  label:string;
  value:string;
}
const options:SelectOption[] = [
  { label: "Unchecked", value: "unchecked" },
  { label: "Bounced", value: "bounced" },
  { label: "None", value: "none" },
  { label: "Verified", value: "verified" }
]

export function EmailStatusDropdown(props: any) {

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(null as unknown as SelectOption);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (option: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SingleValue<SelectOption>>|null) => {
    setSelectedOption(option as SelectOption);
  }

  return ( 
    <Select
    className="email-status--dd"
    defaultValue={selectedOption}
    onChange={onChange}
    options={options}
    />
  )
}
