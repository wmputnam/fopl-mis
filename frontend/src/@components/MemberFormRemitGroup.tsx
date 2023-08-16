
import React, { Profiler } from "react"
import CurrencyFormat from "react-currency-format";
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";
import { MemberService } from "../services/MemberService";

export interface FormRemitComponentGroupI {
  onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void;
  memberObj: Member | undefined;
  setMemberObj: React.Dispatch<React.SetStateAction<Member>>;
}
const stringForRemitDate = (dt: Date | string | undefined) => {
  if (dt) {
    if (typeof dt === 'string') {
      return dt.substring(0, 10);
    } else if (typeof dt === 'object' && dt instanceof Date) {
      return dt.toISOString().substring(0, 10);
    } else {
      return "";
    }
  } else {
    return ""
  };
};


export const MemberFormRemitGroup = ({
  onRenderCallback,
  memberObj,
  setMemberObj
}: FormRemitComponentGroupI) => {

  const handleRemitDateChange = (e:any) => {
    if(e.target.id === "money-date") {
      setMemberObj((oldObj) => ({ ...oldObj, remitDate: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  const handleRemitDuesChange = (e:any) => {
    if (e.target.id === "money-dues-amount") {
      setMemberObj((oldObj) => ({ ...oldObj, remitDues: e.target.value, lastUpdated: new Date() } as Member));
    }
  }
  const handleRemitDonationChange = (e:any) => {
    if (e.target.id === "money-donation-amount") {
      setMemberObj((oldObj) => ({ ...oldObj, remitDonation: e.target.value, lastUpdated: new Date() } as Member));
    }
  }

  if( memberObj) {
    const remitGroup =  (
    <>
    <Profiler id="memberFormRemit" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
      <div className="member-form--money-group">
        <label htmlFor="money-date">Date</label>
        <input type="date" id="money-date" className="new-member--money-date width-date"
              onChange={handleRemitDateChange} value={stringForRemitDate(memberObj.remitDate)}
        />
        <div className="new-member--remit-error">{memberObj.remitError}</div>

        {!MemberService.isLifeMember(memberObj) && <label htmlFor="money-dues-amount">Dues</label>}
        {!MemberService.isLifeMember(memberObj) && <CurrencyFormat id="money-dues-amount"
          prefix={"$"} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}
          className="new-member--dues-amount width-money" placeholder="Dues amount"
              onChange={handleRemitDuesChange} value={memberObj.remitDues}
        />}
        <label htmlFor="money-donation-amount">Donation</label>
        <CurrencyFormat id="money-donation-amount"
          prefix={"$"} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true}
          className="new-member--donation-amount width-money" placeholder="Donation amount"
              onChange={handleRemitDonationChange} value={memberObj.remitDonation}
        />
        <div className="new-member--remit-warn">{memberObj.remitWarn}</div>
      </div>
      </Profiler>
    </>);
    console.log("remit group");
    return remitGroup;  
  } else {
      return <><p>No member object provided</p></>
    }};

