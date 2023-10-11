import React from "react";

export function DropDownElement(props: any) {
  const content = props.content;

  console.log(`DropDownItem props keys ${Object.keys(props)}`);


  const handleClick = props.handleClick ? props.handleClick
    : () => { console.log(`default handleClick for ${content}`) };

  const parentHandleClick = props.parentHandleClick && typeof props.parentHandleClick === 'function' ? props.parentHandleClick
    : () => { console.log(`default parentHandleClick for ${content}`) };;

  const elementClickHandler = (e: any) => {
    e.preventDefault();
    handleClick && handleClick(content);
    parentHandleClick && parentHandleClick(content);
  }

  return (
    <div>
      <div
        className={props.className}
        onClick={elementClickHandler}>
        {content}
      </div>
    </div>
  )
}

const _default = {};
export default _default; 