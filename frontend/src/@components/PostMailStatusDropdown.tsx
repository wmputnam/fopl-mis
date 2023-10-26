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
const getOptionByLabel = (label: string): SelectOption => {
  let result = null as unknown as SelectOption;

  if (label) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].label.toLowerCase() === label.toLowerCase()) {
        console.log(` getOptionByLabel: got "${label}" returning ${JSON.stringify(options[i])} `)
        return options[i];
      }
    }
  }
  return result;
}

export function PostMailStatusDropdown(props: any) {

  const id = props.id && props.id !== "" ? props.id : 'post-mail--status';

  const className = props.className && props.className !== "" ? props.className : 'post-mail--status';

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByLabel(props.defaultValue) as unknown as SelectOption);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (
    option: SingleValue<SelectOption> | null,
    actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    setSelectedOption(option as SelectOption);
    if (props.handleChange && typeof props.handleChange === 'function') {
      props.handleChange({ target: { id: id, value: selectedOption.value } })
    }
  }

  return (
    <Select
      className={className}
      id={id}
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
    />
  )
}