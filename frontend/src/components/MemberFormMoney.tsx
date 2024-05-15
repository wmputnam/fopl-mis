/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from "react"
import useAxios from "axios-hooks";
import { AppState, onRenderCallback } from "../interfaces";
import { CancelBtn } from "./CancelBtn";
import { getServerUrl } from "../services";
import { IMemberDocument, IRemittance } from "member-document";
import RemittancesListRow from "./MoneyListRow";
import RemittancesListHeader from "./MoneyListHeader";

export interface MemberFormRemitsProps {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;
}

const computedType = (obj: Object): string => ({}).toString.call(obj).toLowerCase();

const DATE_OBJECT = '[object date]';

const STRING_OBJECT = '[object string]';

const compareRemits = (a: IRemittance, b: IRemittance): number => {
  let result = 0;
  if (a && b) {
    let aDateValue = undefined;
    let bDateValue = undefined;
    // first level sort is date DESC
    if (a.date) {
      const aDateComputedType = computedType(a.date);
      if (aDateComputedType === DATE_OBJECT) {
        aDateValue = a.date.valueOf();
      } else if (aDateComputedType === STRING_OBJECT) {
        aDateValue = (new Date(a.date)).valueOf();
      }
    }
    if (b.date) {
      const bDateComputedType = computedType(b.date);
      if (bDateComputedType === DATE_OBJECT) {
        bDateValue = b.date.valueOf();
      } else if (bDateComputedType === STRING_OBJECT) {
        bDateValue = (new Date(b.date)).valueOf();
      }
    }
    if (aDateValue && bDateValue) {
      // careful here == wanted is Date DESC
      result = aDateValue < bDateValue ? 1 : (aDateValue > bDateValue ? -1 : 0);
    }
  }
  return result;
  // TODO then memo ===> dues, then, donation, then other memos alpha ASC TODO
}

export const MemberFormMoney = ({ getAppState, setAppState }: MemberFormRemitsProps) => {

  // jscpd:ignore-start
  const memberId = getAppState().memberId;

  const LoadFromDb = (memberId: string): Array<any> => {
    return useAxios<IMemberDocument>(
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
  // jscpd:ignore-end

  const remitArr: IRemittance[] | undefined = memberData && memberData.remittances ? memberData.remittances : undefined;

  let remittancesElements;

  if (remitArr) {
    const sortedRemitArr = remitArr.sort(compareRemits);
    remittancesElements = sortedRemitArr.map((m, indx) => {
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
