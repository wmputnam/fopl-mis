import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";

interface SelectOption {
  label: string;
  value: boolean;
}
const options: SelectOption[] = [
  { label: "Valid", value: true },
  { label: "Returned mail", value: false }
]

export function PostMailStatusDropdown(props: any) {

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(null as unknown as SelectOption);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (
    option: SingleValue<SelectOption> | null,
    actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    setSelectedOption(option as SelectOption);
  }

  return (
    <Select
      className="post-mail-status-dd"
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
    />
  )
}