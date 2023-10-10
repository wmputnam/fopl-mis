
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
    const memberActive = (memberObj.status && memberObj.status.isActive)
      ? "Active"
      : "OUT";
    const memberPost = (memberObj.status && memberObj.status.validPostMail)
      ? true
      : false;
    const memberEmail = (memberObj.status && memberObj.status.validEmail)
      ? memberObj.status.validEmail
      : 'none';
    const memberNews = (memberObj.status && memberObj.status.newsletterType)
      ? memberObj.status.newsletterType
      : 'None';

    const mmbGroup =
      (
        <>
          <Profiler id="MemberMmb" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
            <div className="member-form--mmb-group"
              data-testid="member-form--mmb-group">
              {memberActive === 'Active' &&
                <div className="member--mmb-wrapper"
                  data-testid="member--mmb-wrapper">
                  <label htmlFor="mmb">MMB </label>
                  <input
                    type="text"
                    maxLength={10}
                    readOnly={true}
                    id="mmb"
                    className="member--mmb--input readonly-input width-mmb"
                    data-testid="member--mmb--input"
                    value={memberObj.mmb} />
                </div>}
              {memberActive === 'Active' && !MemberService.isLifeMember(memberObj) &&
                <div className="member--paid-through-wrapper"
                  data-testid="member--paid-through-wrapper">
                  <label htmlFor="paidThrough" >Paid through </label>
                  <input
                    id="paidThrough"
                    type="text"
                    readOnly={true}
                    className="member-paid-through--input width-date readonly-input" data-testid="member-paid-through--input"
                    value={stringForMmbDate(memberObj.paidThrough)} />
                </div>
              }
              {memberActive === 'Active' &&
                <div className="member--joined-wrapper"
                  data-testid="member--joined-wrapper">
                  <label htmlFor="joined">Joined </label>
                  <input
                    type="text"
                    readOnly={true}
                    id="joined"
                    className="member--joined--input width-date readonly-input"
                    data-testid="member--joined--input"
                    value={stringForMmbDate(memberObj.joined)} />
                </div>}
              <div className="member--last-updated-wrapper"
                data-testid="member--last-updated-wrapper">
                <label htmlFor="last-updated">Last updated </label>
                <input
                  type="text"
                  readOnly={true}
                  id="last-updated"
                  className="member--last-updated--input width-date readonly-input" data-testid="member--last-updated--input"
                  value={stringForMmbDate(memberObj.lastUpdated)} />
              </div>

              <div className="member--active-wrapper"
                data-testid="member--active-wrapper">
                <label htmlFor="active">Status </label>
                <input
                  type="text"
                  readOnly={true}
                  id="active"
                  className="member--active--input width-date readonly-input"
                  data-testid="member--active--input"
                  value={memberActive} />
              </div>
              {memberActive === 'Active' &&
                <div className="member--post-mail-wrapper"
                  data-testid="member--post-mail-wrapper">
                  <label htmlFor="post-mail">US Post status </label>
                  <input
                    type="checkbox"
                    readOnly={true}
                    id="post-mail"
                    className="member--post-mail--input width-date readonly-input" data-testid="member--post-mail--input"
                    checked={memberPost} />
                </div>}
              {memberActive ===
                'Active' &&
                <div className="member--email-status-wrapper"
                  data-testid="member--email-status-wrapper">
                  <label htmlFor="email-status">Email status </label>
                  <input
                    type="text"
                    readOnly={true}
                    id="email-status"
                    className="member--email-status--input width-date readonly-input" data-testid="member--email-status--input"
                    value={memberEmail} />
                </div>}
              {memberActive === 'Active' &&
                <div className="member--newsletter-status-wrapper"
                  data-testid="member--newsletter-status-wrapper">
                  <label htmlFor="newsletter-status">Newsletter status </label>
                  <input
                    type="text"
                    readOnly={true}
                    id="newsletter-status"
                    className="member--newsletter-status--input width-date readonly-input" data-testid="member--newsletter-status--input"
                    value={memberNews} />
                </div>}

            </div></Profiler>
        </>
      );
    console.log("mmb group!");
    return mmbGroup;
  } else {
    return <><p>No member object provided</p></>
  }
};
