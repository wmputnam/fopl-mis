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


export function EmailStatusDropdown(props: any) {
  /*
            className='email-mail--status'
          defaultValue='unchecked'
          id='email-status'
*/
  const id = props.id && props.id !== "" ? props.id : 'email--status';

  const className = props.className && props.className !== "" ? props.className : 'email-status';

  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(getOptionByLabel(props.defaultValue) as unknown as SelectOption);
  console.log(`props keys: ${Object.keys(props)}`)

  const onChange = (option: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SingleValue<SelectOption>>|null) => {
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
