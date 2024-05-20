/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import MemberListRow from "./MemberListRow";
import { type MemberListProps } from "../interfaces";
import { MembersListRowFormatter } from "../formatters";
import useAxios from "axios-hooks";
import { getServerUrl, isEmptyObject } from "../services";
import { IMemberDocument } from "member-document";
import { MemberListContainerState } from "./MemberListContainer";

interface MemberListData {
  data: IMemberDocument[];
  count: number;
}

interface IMemberDataParams {
  limit: number;
  page?: number;
  filter: string;
}

const getMemberDataParams = (maxRows: number, pageNumber: number, pageFilter: string) => {
  let result: IMemberDataParams = { limit: maxRows } as IMemberDataParams;
  if (pageNumber > 1) {
    result = { ...result, page: pageNumber }
  }
  if (pageFilter !== "") {
    // pageFilter`lastName:${"/" + pageFilter.toUpperCase() + "/"}"` 
    const lastNameFilter = "lastName:/^" + pageFilter.toUpperCase() + "/";
    result = { ...result, filter: lastNameFilter }
  }
  return result;
}



export const MemberList = ({ getAppState, setAppState, pageState, updatePageState }: MemberListProps) => {

  const memberDataUrl = `/v1/members`;
  const memberDataParams = getMemberDataParams(pageState.maxRows, pageState.pageNumber, pageState.listFilter);

  const [{ data, error, loading }] = useAxios<MemberListData>(
    { baseURL: getServerUrl(), url: memberDataUrl, params: memberDataParams }, { manual: false, useCache: false }

  );

  const haveFilter = pageState.listFilter !== undefined;


  React.useEffect(() => {
    console.log(`MemberList: filter is "${pageState.listFilter}"`);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [haveFilter]);

  if (loading || pageState.listFilter === undefined) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  const members = data?.data;
  const filteredMemberCount = data?.count;
  const filteredPages = filteredMemberCount ? Math.ceil(filteredMemberCount / pageState.maxRows) : 1;

  if (filteredPages !== pageState.numberOfFilteredPages) {
    updatePageState((oldState: MemberListContainerState) => ({ ...oldState, numberOfFilteredPages: filteredPages }))
  }

  if (members) {
    let memberElements;
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m?._id ? m._id : ""}
          name={MembersListRowFormatter.getMemberFullNameForListRow(m)}
          address={MembersListRowFormatter.getAddressForMemberList(m)}
          phone={m.phone !== undefined ? MembersListRowFormatter.reducePhoneForMemberList(m) : ""}
          email={m.email !== undefined ? m.email : ""}
          paidThrough={MembersListRowFormatter.reducePaidThroughForMemberList(m)}
          mmb={m.mmb ? m.mmb : "VOL"}
          getAppState={getAppState}
          setAppState={setAppState}
        />
      )
    });

    return (
      <>
        {!!data && memberElements}
      </>
    );
  } else {
    return (
      <>
        <p>No member data to display</p>
      </>
    );
  }

}
export default MemberList;
