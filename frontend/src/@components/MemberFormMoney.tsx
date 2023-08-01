/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { EditMemberProps, AllMemberProps } from "../@interfaces/MemberProps";
import { CurrentMemberContext, ServerContext } from "../App"
import Home from "./CancelBtn";
import membersReducers from "../reducers/members.reducers";
import loadData from "./DataLoader";
import { Remittance } from "packages/Remittance";
import RemittancesListRow from "./MoneyListRow";
import BackToMemberBtn from "./BackToMemberBtn";
import CancelBtn from "./CancelBtn";
import RemittancesListHeader from "./MoneyListHeader";


const MemberFormMoney = ({ updateViewState, updateCurrentMember, mode }: EditMemberProps) => {
  const { serverURL } = React.useContext(ServerContext);
  const serverUrl = serverURL === undefined ? "http://localhost:3030" : serverURL;
  const memberId = React.useContext(CurrentMemberContext);

  function isEmptyObject(obj: Object) {
    for (let i in obj) return false;
    return true;
  }
  const dataInitial: any = React.useRef({});

  React.useEffect(() => {
    // memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
    if (isEmptyObject(dataInitial.current)) {
      loadData(serverUrl, memberId, "")
        .then((loadRes: any) => {
          if ([200, 201].includes(loadRes.status)) {
            console.log("successful load")
            dataInitial.current = loadRes.body;
            setMemberData(dataInitial.current)
          }
        })
        .catch((fault) => {
          return { status: 500, error: `fault occured: ${JSON.stringify(fault)}` };
        });
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
  const [memberData, setMemberData] = React.useState(dataInitial.current as AllMemberProps);

  const remitArr: Remittance[] = memberData.remittances ? memberData.remittances : [];

  let remittancesElements;

  remittancesElements = remitArr.map((m) => {
    return (
      <>
        <RemittancesListRow
          key={m?.date.toString()}
          date={m?.date !== undefined ? new Date(m.date) : new Date()}
          amount={m?.amount}
          memo={m.memo}
        />
      </>
    )
  });

  if (remitArr) {
    return (
      <>
        <BackToMemberBtn updateViewState={updateViewState} />
        <Home updateViewState={updateViewState} />
        <CancelBtn updateViewState={updateViewState} updateAppMessages={() => { }} />
        {/* {!!data && <MemberListHeader />} */}
        <h3>Remittances for {memberData.firstName + " " + memberData.lastName}</h3>
        {!!remitArr && <RemittancesListHeader />}
        {!!remitArr && remittancesElements}
      </>
    );
  } else {
    return (
      <p>No members to display</p>
    );
  }
}

export default MemberFormMoney;