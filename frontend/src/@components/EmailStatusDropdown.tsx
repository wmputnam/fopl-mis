import React from "react";
import { DropDown } from "./DropDown";
import { DropDownElement } from "./DropDownItem";

export function EmailStatusDropdown(props: any) {

  const [value, setValue] = React.useState<any>({ label: "Click me", value: null })
  console.log(`props keys: ${Object.keys(props)}`)

  const handleItemClick = (value: any) => {
    console.log(`: ${value}`);
    setValue(value);
    console.log(`type of props.parentHandleClick: ${typeof props.parentHandleClick} `);
  }

  const choices = [{ label: "Unchecked", value: "unchecked" },
  { label: "Bounced", value: "bounced" },
  { label: "None", value: "none" },
  { label: "Verified", value: "verified" }
  ]

  const choiceElements = (c: any) => {
    if (c) {
      return c.map((choice: any) => {
        return <DropDownElement
          className="email-status--item fm-dd--item"
          name={choice.value}
          content={choice.label}
          handleClick={() => { handleItemClick(choice); }} />
      });
    }
  }
  return (
    <DropDown
      ddLabel="Email status"
      className="email-status-dd fm-dd"
      id="email-status"
      label={value.label}
      currentValueLabel={value.label}
      closeAfterSelect={true}
    >
      {choiceElements(choices)}
    </DropDown>
  )
}