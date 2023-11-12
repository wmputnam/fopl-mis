import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";
import {SelectOption, getOptionByLabel} from "./helpers/SelectOptionHelper"

//'valid' | 'returned mail' | 'none'
const options: SelectOption[] = [
  { label: "Valid", value: 'valid' },
  { label: "Returned mail", value: 'returned mail' },
  { label: "No address", value: 'none' },

]
export function PostMailStatusDropdown(props: any) {

  const id = props.id && props.id !== "" ? props.id : 'post-mail--status';

  const className = props.className && props.className !== "" ? props.className : 'post-mail--status';

  // jscpd:ignore-start
  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByLabel(options, props.defaultValue) as unknown as SelectOption);

  const onChange = (
    option: SingleValue<SelectOption> | null,
    actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    setSelectedOption(option as SelectOption);
  }

  React.useEffect(() => {
    if (props.handleChange && typeof props.handleChange === 'function') {
      props.handleChange({ target: { id: id, value: selectedOption.value } })
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [selectedOption]);
  // jscpd:ignore-end

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