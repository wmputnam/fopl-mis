import React from "react";
import Select, { SingleValue, ActionMeta } from "react-select";
import { SelectOption, getOptionByLabel } from "./helpers/SelectOptionHelper"

const options: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Post", value: "post" },
  { label: "Email", value: "email" }
]

export function NewsletterTypeDropdown(props: any) {

  const id = props.id && props.id !== "" ? props.id : 'newsletter-type';

  const className = props.className && props.className !== "" ? props.className : 'newsletter-type';

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByLabel(options,props.defaultValue) as unknown as SelectOption);

  const onChange = (option: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SingleValue<SelectOption>> | null) => {
    setSelectedOption(option as SelectOption);
  }

  React.useEffect(() => {
    if (props.handleChange && typeof props.handleChange === 'function') {
      props.handleChange({ target: { id: id, value: selectedOption.value } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);


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
