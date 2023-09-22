/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from "react"
import { Remittance } from "packages/Remittance";
import RemittancesListRow from "./MoneyListRow";
import CancelBtn from "./CancelBtn";
import RemittancesListHeader from "./MoneyListHeader";
// import { MemberService } from "../services/MemberService";
import { getServerUrl } from "../services/AppConfig";
import { AppState, onRenderCallback } from "../App";
import useAxios from "axios-hooks";
import { IMember } from "packages";
import { MemberViewStates } from "../@interfaces/enums";

export interface MemberFormRemitsProps {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;
}
const MemberFormMoney = ({ getAppState, setAppState }: MemberFormRemitsProps) => {
  const memberId = getAppState().memberId;

  // function isEmptyObject(obj: Object) {
  //   for (let i in obj) return false;
  //   return true;
  // }
  // const dataInitial: any = React.useRef({});
  const LoadFromDb = (memberId: string): Array<any> => {
    return useAxios<IMember>(
      { baseURL: getServerUrl(), url: `/members/${memberId}` }, { manual: false, useCache: false }
    );
  }
  let someData: Array<any> | undefined;
  if (memberId) {
    someData = LoadFromDb(memberId);
  } else {
    someData = undefined;
  }

  const memberData = someData && someData?.[0] && someData[0]?.data ? someData[0].data : undefined;
  console.log(`fe-formbase\n    ${JSON.stringify(memberData)}`)

  // React.useEffect(() => {
  //   // memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
  //   if (memberId && isEmptyObject(dataInitial.current)) {
  //     loadData(getServerUrl(), memberId, "")
  //       .then((loadRes: any) => {
  //         if ([200, 201].includes(loadRes.status)) {
  //           console.log("successful load")
  //           dataInitial.current = loadRes.body;
  //           setMemberData(dataInitial.current)
  //         }
  //       })
  //       .catch((fault) => {
  //         return { status: 500, error: `fault occured: ${JSON.stringify(fault)}` };
  //       });
  //   }
  // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   , []);
  // const [memberData, setMemberData] = React.useState(dataInitial.current);
  //= someData && someData?.[0] && someData[0]?.data ? someData[0].data : undefined;
  const remitArr: Remittance[] | undefined = memberData && memberData.remittances ? memberData.remittances : undefined;

  let remittancesElements;
  if (remitArr) {
    remittancesElements = remitArr.map((m, indx) => {
      return (
        <>
          <RemittancesListRow
            key={indx}
            date={m?.date !== undefined ? new Date(m.date) : new Date()}
            amount={m?.amount}
            memo={m.memo}
          />
        </>
      )
    });

    return (
      <>
        <CancelBtn
          getAppState={getAppState}
          setAppState={setAppState}
        />
        {/* {!!data && <MemberListHeader />} */}
        <Profiler id="memberRemit" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <h3>Remittances for {memberData.firstName + " " + memberData.lastName}</h3>
          {!!remitArr && <RemittancesListHeader />}
          {!!remitArr && remittancesElements}
        </Profiler>
      </>
    );
  } else {
    return (
      <p>No member data to display</p>
    );
  }
}

export default MemberFormMoney;