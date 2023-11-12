import React from "react";


export function DropDown(props: any) {

  const [doDisplay, setDoDisplay] = React.useState<string>('none');

  const ddHandleClick = () => {
    doDisplay === 'none' ? setDoDisplay('block') : setDoDisplay('none');
  }

  let morphedChildren;
  if (props.closeAfterSelect) {
    // add this handleClick to each child as a prop parentHandleClick
    morphedChildren = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, { parentHandleClick: ddHandleClick })
    });
  } else {
    morphedChildren = props.children
  }

  return (
    <>
      <label htmlFor={props.id}>{props.ddLabel}</label>
      <div
        className={props.className}
        id={props.id}
        onClick={ddHandleClick}
        data-value={props.currentValue}
      >
        {props.currentValueLabel}
        <div style={{ display: doDisplay }}>
          {morphedChildren}
        </div>
      </div>
    </>
  );
}

const dropDown = DropDown;
export default dropDown;