import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";
import { SelectOption, getOptionByLabel } from "./helpers/SelectOptionHelper";

const options: SelectOption[] = [
  { label: "Unchecked", value: "unchecked" },
  { label: "Bounced", value: "bounced" },
  { label: "None", value: "none" },
  { label: "Verified", value: "verified" }
]

export function EmailStatusDropdown(props: any) {

  const id = props.id && props.id !== "" ? props.id : 'email--status';

  const className = props.className && props.className !== "" ? props.className : 'email-status';

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByLabel(options, props.defaultValue) as unknown as SelectOption);

  // jscpd:ignore-start
  const onChange = (option: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    setSelectedOption(option as SelectOption);
  }

  React.useEffect(() => {
    if (props.handleChange && typeof props.handleChange === 'function') {
      props.handleChange({ target: { id: id, value: selectedOption.value } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);
  //jscpd:ignore-end

  return (
    <Select
      className={className}
      id={id}
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
      autoFocus={true}
    />
  )
}
