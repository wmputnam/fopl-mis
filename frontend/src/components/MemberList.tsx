/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import MemberListRow from "./MemberListRow";
import { MemberListFilter, type MemberListProps } from "../interfaces";
import { MembersListRowFormatter } from "../formatters";
import useAxios from "axios-hooks";
import { getServerUrl, isEmptyObject, setNumberOfFilteredPages } from "../services";
import { IMemberDocument } from "member-document";
import { MemberListContainerState } from "../interfaces";

interface MemberListData {
  data: IMemberDocument[];
  count: number;
}

interface IMemberDataParams {
  limit: number;
  page?: number;
  filter: string;
}

const getMemberDataParams = (maxRows: number, pageNumber: number, pageFilter: MemberListFilter) => {
  let result: IMemberDataParams = { limit: maxRows } as IMemberDataParams;

  if (pageNumber > 1) {
    result = { ...result, page: pageNumber }
  }
  if (pageFilter.lastName !== "") {
    // pageFilter`lastName:${"/" + pageFilter.toUpperCase() + "/"}"` 
    let lastNameFilter: string;
    if (pageFilter.lastName instanceof RegExp) {

      lastNameFilter = "lastName:/^" + pageFilter.lastName.toString().replace("/", "").toUpperCase() + "/";
    } else {
      lastNameFilter = "lastName:/^" + pageFilter.lastName.toUpperCase() + "/";
    }
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
    console.log(`MemberList: filter is "${JSON.stringify(pageState.listFilter)}"`);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [haveFilter]);


  const members = data?.data;
  const filteredMemberCount = data?.count;
  const filteredPages = filteredMemberCount ? Math.ceil(filteredMemberCount / pageState.maxRows) : 1;

  React.useEffect(() => {
    if (filteredPages !== pageState.numberOfFilteredPages) {
      setNumberOfFilteredPages(filteredPages, pageState, updatePageState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPages])

  if (loading || pageState.listFilter === undefined) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  if (members) {
    let memberElements;
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m?._id ? m._id : ""}
          name={MembersListRowFormatter.formatMemberFullNameForListRow(m)}
          address={MembersListRowFormatter.formatAddressForMemberList(m)}
          phone={m.phone !== undefined ? MembersListRowFormatter.formatPhoneForMemberList(m) : ""}
          email={m.email !== undefined ? MembersListRowFormatter.formatEmailForMemberList(m) : ""}
          paidThrough={MembersListRowFormatter.formatPaidThroughForMemberList(m)}
          mmb={m.mmb ? MembersListRowFormatter.formatMmbForMemberList(m) : "VOL"}
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
