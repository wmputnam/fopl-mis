import React from "react";


export function DropDown(props: any) {

  const [doDisplay, setDoDisplay] = React.useState<string>('none');

  console.log(`DropDown props keys ${Object.keys(props)}`);

  console.log(`props.children # ${React.Children.count(props.children)}`);

  const ddHandleClick = () => {
    console.log(`in handleClick ${doDisplay}`)
    doDisplay === 'none' ? setDoDisplay('block') : setDoDisplay('none');
  }

  let morphedChildren;
  if (props.closeAfterSelect) {
    console.log(`DropDown morphing`)
    // add this handleClick to each child as a prop parentHandleClick
    morphedChildren = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, { parentHandleClick: ddHandleClick })
    });
  } else {
    console.log(`DropDown copying`)
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
const _default = {};
export default _default;