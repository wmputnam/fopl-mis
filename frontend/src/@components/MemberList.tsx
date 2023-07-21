import React from "react";
// import members from "../assets/data/member-data.json"
import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader"
import { nanoid } from "nanoid"
import { AllMemberProps } from "../@interfaces/MemberProps";
// import membersActions from "../actions/members.actions";
import membersReducers from "../reducers/members.reducers";
import useAxios from "axios-hooks";


const MemberList = ({ updateViewState, updateCurrentMember }: AllMemberProps) => {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{ data, error, loading }] = useAxios<AllMemberProps[]>(
    { baseURL: "http://localhost:3030", url: "/members" }, { manual: false, useCache: false }

  );
  const members = data;

  let memberElements;
  if (members) {
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m._id}
          name={membersReducers.reduceMemberFullName(m)}
          address={membersReducers.reduceAddressForMemberList(m)}
          phone={m?.phone}
          email={m?.email}
          paidThrough={membersReducers.reducePaidThroughForMemberList(m)}
          updateViewState={updateViewState}
          mmb={m.mmb ? m.mmb : "VOL"}
          updateCurrentMember={updateCurrentMember}
        />
      )
    });
  }

  const handleNewClick = () => {
    updateCurrentMember("");
    updateViewState("new");
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>
  if (members) {
    return (
      <>
        <button onClick={handleNewClick}>New</button>
        {!!data && <MemberListHeader />}
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
// //{membersReducers.reduceMemberFullName(m)}
////         address={ m?.address+" "+m?.postalCode}
//         phone = {m?.phone}
//         email = {m?.email}
//         paidThrough={m.paidThrough}
//         mmb={m.mmb?m.mmb:"VOL"}
