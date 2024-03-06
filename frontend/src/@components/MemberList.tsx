/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader"
import { FrontendProps } from "../@interfaces/MemberProps";
import MembersReducers from "../reducers/members.reducers";
import useAxios from "axios-hooks";
import { getServerUrl } from "../services/AppConfig";
import { IMemberDocument } from "../../../packages/member-document/";

interface MemberListData {
  data: IMemberDocument[]
}

const getMemberDataParams = (pageNumber: number, pageFilter: string) => {
  let result = {};
  if (pageNumber > 0) {
    result = { ...result, skip: pageNumber }
  }
  if (pageFilter && pageFilter !== "") {
    result = { ...result, filter: `lastName:${pageFilter.toUpperCase()}` }
  }

  return result;
}



const MemberList = ({ getAppState, setAppState }: FrontendProps) => {

  const [pageNumber, setPageNumber] = React.useState<number>(0);
  // const [pageFilter,setPageFilter] = React.useState<string>("");
  const memberDataUrl = `/v1/members`;
  const memberDataParams = getMemberDataParams(pageNumber, getAppState().listViewFilter);

  const [{ data, error, loading }] = useAxios<MemberListData>(
    { baseURL: getServerUrl(), url: memberDataUrl, params: memberDataParams }, { manual: false, useCache: false }

  );
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  const gotoPage = (pageNumber: number) => {
    setPageNumber(pageNumber);
  }

  // const updateFilter = (lastName:string) =>{
  //   setPageFilter(lastName);
  // }

  const members = data?.data;
  if (members) {
    let memberElements;
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m?._id ? m._id : ""}
          name={MembersReducers.reduceMemberFullName(m)}
          address={MembersReducers.reduceAddressForMemberList(m)}
          phone={m.phone !== undefined ? MembersReducers.reducePhoneForMemberList(m) : ""}
          email={m.email !== undefined ? m.email : ""}
          paidThrough={MembersReducers.reducePaidThroughForMemberList(m)}
          mmb={m.mmb ? m.mmb : "VOL"}
          getAppState={getAppState}
          setAppState={setAppState}
        />
      )
    });

    return (
      <>

        {!!data && <MemberListHeader
          getAppState={getAppState}
          setAppState={setAppState}
        />}
        {!!data && memberElements}
      </>
    );
  } else {
    return (
      <p>No members to display</p>
    );
  }

}
export default MemberList;
