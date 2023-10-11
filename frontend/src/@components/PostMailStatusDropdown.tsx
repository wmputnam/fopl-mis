import React from "react";
import { DropDown } from "./DropDown";
import { DropDownElement } from "./DropDownItem";

export function PostMailStatusDropdown(props: any) {

  const [value, setValue] = React.useState<any>({ label: "Click me", value: null })
  console.log(`props keys: ${Object.keys(props)}`)

  const handleItemClick = (value: any) => {
    console.log(`: ${value}`);
    setValue(value);
    console.log(`type of props.parentHandleClick: ${typeof props.parentHandleClick} `);
  }

  const choices = [{ label: "Valid", value: "valid" }, { label: "Returned mail", value: "returned-mail" }]

  const choiceElements = (c: any) => {
    if (c) {
      return c.map((choice: any) => {
        return <DropDownElement
          className="post-mail-status--item fm-dd--item"
          name={choice.value}
          content={choice.label}
          handleClick={() => { handleItemClick(choice); }} />
      });
    }
  }
  return (
    <DropDown
      ddLabel="PostMail status"
      className="post-mail-status-dd fm-dd"
      id="post-mail-status"
      label={value.label}
      currentValueLabel={value.label}
      closeAfterSelect={true}
    >
      {choiceElements(choices)}
    </DropDown>
  )
}