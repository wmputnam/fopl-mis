
import React, { Profiler } from "react"
import { RenderCallBackI } from "../App";
import { Member } from "../services/Member";
import { MemberService } from "../services/MemberService";

const stringForMmbDate = (dt: Date | string | undefined) => {
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

export const MemberFormMmbGroup = (memberObj: Member | undefined, onRenderCallback: ({ id, phase }: Partial<RenderCallBackI>) => void) => {
  if (memberObj) {
    const mmbGroup =
      (
        <>
          <Profiler id="MemberMmb" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
            <div className="member-form--mmb-group"
              data-testid="member-form--mmb-group">
              <div className="existing-member--mmb"
                data-testid="member--mmb-wrapper">
                <label htmlFor="mmb">MMB </label>
                <input
                  type="text"
                  maxLength={10}
                  readOnly={true}
                  id="mmb"
                  className="member--mmb readonly-input"
                  data-testid="member--mmb"
                  value={memberObj.mmb} />
              </div>
              {!MemberService.isLifeMember(memberObj) &&
                <div className="existing-member--paid-through"
                  data-testid="member--paid-through-wrapper">
                  <label htmlFor="paidThrough" >Paid through </label>
                  <input
                    id="paidThrough"
                    type="text"
                    readOnly={true}
                    className="form-paid-through width-date readonly-input" data-testid="member-paid-through"
                    value={stringForMmbDate(memberObj.paidThrough)} />
                </div>
              }
              <div className="existing-member--joined"
                data-testid="member--joined-wrapper">
                <label htmlFor="joined">Joined </label>
                <input
                  type="text"
                  readOnly={true}
                  id="joined"
                  className="form--joined width-date readonly-input" data-testid="member--joined"
                  value={stringForMmbDate(memberObj.joined)} />
              </div>
              <div className="existing-member--last-updated"
                data-testid="member--last-updated-wrapper">
                <label htmlFor="last-updated">Last updated </label>
                <input
                  type="text"
                  readOnly={true}
                  id="last-updated"
                  className="form--last-updated width-date readonly-input" data-testid="member--last-updated"
                  value={stringForMmbDate(memberObj.lastUpdated)} />
              </div>

            </div></Profiler>
        </>
      );
    console.log("mmb group!");
    return mmbGroup;
  } else {
    return <><p>No member object provided</p></>
  }
};
