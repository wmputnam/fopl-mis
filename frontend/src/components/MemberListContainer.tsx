/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import MemberListHeader from "./MemberListHeader";
import MemberListFooter from "./MemberListFooter";
import { MemberListContainerProps, MemberListContainerState } from "../interfaces";
import MemberList from "./MemberList";


const MAXROWS = 20;


export const MemberListContainer = ({ getAppState, setAppState }: MemberListContainerProps) => {

  const [pageState, setPageState] = React.useState<MemberListContainerState>(
    {
      maxRows: MAXROWS,
      pageNumber: 1,
      listFilter: { lastName: "" },
      numberOfFilteredPages: 0
    }
  );


  React.useEffect(() => {
    console.log(`MemberListContainer: is mounted\n    ${JSON.stringify(pageState)}`);
    return (() => console.log(`MemberListContainer: will unmount\n    ${JSON.stringify(pageState)}`))
  },
    [pageState]);

  return (
    <>

      <MemberListHeader
        getAppState={getAppState}
        setAppState={setAppState}
        pageState={pageState}
        updatePageState={setPageState}
      />
      <MemberList
        getAppState={getAppState}
        setAppState={setAppState}
        updatePageState={setPageState}
        pageState={pageState}
      />
      <MemberListFooter
        getAppState={getAppState}
        setAppState={setAppState}
        updatePageState={setPageState}
        pageState={pageState}
      />
    </>
  );
}
export default MemberListContainer;
