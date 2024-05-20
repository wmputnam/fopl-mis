/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader";
import MemberListFooter from "./MemberListFooter";
import { MemberListContainerProps } from "../interfaces";
// import { MembersListRowFormatter } from "../formatters";
// import useAxios from "axios-hooks";
// import { getServerUrl } from "../services";
// import { IMemberDocument } from "member-document";
import MemberList from "./MemberList";

// interface MemberListData {
//   data: IMemberDocument[]
// }

// const getMemberDataParams = (pageNumber: number, pageFilter: string) => {
//   let result = {};
//   if (pageNumber > 0) {
//     result = { ...result, skip: pageNumber }
//   }
//   if (pageFilter && pageFilter !== "") {
//     result = { ...result, filter: `lastName:${pageFilter.toUpperCase()}` }
//   }

//   return result;
// }

export interface MemberListContainerState {
  pageNumber: number;
  maxRows: number;
  listFilter: string;
  numberOfFilteredPages: number;

}

const MAXROWS = 20;


export const MemberListContainer = ({ getAppState, setAppState }: MemberListContainerProps) => {

  const [pageState, setPageState] = React.useState<MemberListContainerState>(
    {
      maxRows: MAXROWS,
      pageNumber: 1,
      listFilter: "",
      numberOfFilteredPages: 0
    }
  );

  const gotoPage = (pageNumber: number) => {
    setPageState((oldState: MemberListContainerState) => ({ ...oldState, pageNumber: pageNumber }));
  }
  const getPageState = () => pageState;
  const getPageFilter = () => pageState.listFilter


  React.useEffect(() => {
    console.log(`MemberListContainer: is mounted\n    ${JSON.stringify(pageState)}`);
    return (() => console.log(`MemberListContainer2: will unmount\n    ${JSON.stringify(pageState)}`))
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
  // } else {
  //   return (
  //     <p>No members to display</p>
  //   );
  // }

}
export default MemberListContainer;
