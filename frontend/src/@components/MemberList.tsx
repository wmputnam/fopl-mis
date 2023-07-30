import React from "react";
// import members from "../assets/data/member-data.json"
import MemberListRow from "./MemberListRow";
import MemberListHeader from "./MemberListHeader"
import { AllMemberProps } from "../@interfaces/MemberProps";
// import membersActions from "../actions/members.actions";
import MembersReducers from "../reducers/members.reducers";
import useAxios from "axios-hooks";
import { MemberViewStates } from "../@interfaces/enums";
import { ServerContext } from "../App";


const MemberList = ({ updateViewState = (a: string | undefined): any => { }, updateCurrentMember = (a: string | undefined): any => { } }: Partial<AllMemberProps>) => {

  let { serverURL } = React.useContext(ServerContext);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  console.log(`getting data from ${serverURL}`);
  const [{ data, error, loading }] = useAxios<AllMemberProps[]>(
    { baseURL: serverURL, url: "/members" }, { manual: false, useCache: false }

  );
  const members = data;

  console.log(`fe-member-list: data\n${JSON.stringify(members)}`)

  let memberElements;
  if (members) {
    memberElements = members.map((m) => {
      return (
        <MemberListRow
          key={m._id}
          recordId={m?._id ? m._id : ""}
          name={MembersReducers.reduceMemberFullName(m)}
          address={MembersReducers.reduceAddressForMemberList(m)}
          phone={m?.phone}
          email={m?.email}
          paidThroughString={MembersReducers.reducePaidThroughForMemberList(m)}
          updateViewState={updateViewState}
          mmb={m.mmb ? m.mmb : "VOL"}
          updateCurrentMember={updateCurrentMember}
          mode=""
        />
      )
    });
  }

  const handleNewClick = () => {
    updateCurrentMember("");
    updateViewState(MemberViewStates.new);
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
