/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import members from "../assets/data/member-data.json"
import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader"
import { FrontendProps } from "../@interfaces/MemberProps";
// import membersActions from "../actions/members.actions";
import MembersReducers from "../reducers/members.reducers";
import useAxios from "axios-hooks";
// import { MemberViewStates } from "../@interfaces/enums";
import { getServerUrl } from "../services/AppConfig";
import { IMember } from "packages";


const MemberList = ({ getAppState, setAppState }: FrontendProps) => {

  const [{ data, error, loading }] = useAxios<IMember[]>(
    { baseURL: getServerUrl(), url: "/members" }, { manual: false, useCache: false }

  );  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  const members = data;
  if (members) {
    let memberElements;
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m?._id ? m._id : ""}
          name={MembersReducers.reduceMemberFullName(m)}
          address={MembersReducers.reduceAddressForMemberList(m)}
          phone={m?.phone}
          email={m?.email}
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
