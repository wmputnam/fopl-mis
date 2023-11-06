//http://localhost:3030/v1/reports/members/new
import React from "react";
import { fetchReport } from "./ReportLoader";
import { getServerUrl } from "../services/AppConfig";
import { Volunteer } from "packages/Volunteer";

// type SaveBtnProps = { updateCurrentMember: (x: any) => any }
export function NewMemberReport(): any {

  const headerLine = '"Name","Email","MMB","Volunteer","Phone","Joined","Updated"';

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const memberListRaw = await fetchReport(getServerUrl(), "new");
    console.log(`now use member list`);
    if (memberListRaw.status === 200 && memberListRaw.body.count > 0) {
      const fileLines = [];
      let fileData = '';
      fileLines.push(headerLine);
      for (let i = 0; i < memberListRaw.body.count; i++) {
        const fn = memberListRaw.body.data[i].firstName ? memberListRaw.body.data[i].firstName : "";
        const ln = memberListRaw.body.data[i].lastName ? memberListRaw.body.data[i].lastName : "";
        const name = fn.concat(" ").concat(ln);
        const email = memberListRaw.body.data[i].email ? memberListRaw.body.data[i].email : "";
        const mmb = memberListRaw.body.data[i].mmb ? memberListRaw.body.data[i].mmb : "";
        const volunteer: string = (memberListRaw.body.data[i].volunteer as Volunteer[])
          .map((v: Volunteer) => v.role as string).join(",");
        const phone = memberListRaw.body.data[i].phone ? memberListRaw.body.data[i].phone : "";
        const joined = memberListRaw.body.data[i].joined ? (memberListRaw.body.data[i].joined as string).substring(0, 10) : "";
        const lastUpdated = memberListRaw.body.data[i].lastUpdated ? (memberListRaw.body.data[i].lastUpdated as string).substring(0, 10) : "";
        fileLines.push(`"${name}","${email}","${mmb}","${volunteer}","${phone}","${joined}","${lastUpdated}"`)
      }
      fileData += fileLines.join('\n')
      console.log(`now use fileData`);
      const dataBlob = URL.createObjectURL(new Blob([fileData], { type: "text/csv" }));
      let anchorEl =
        document.createElement(
          "a");
      anchorEl.setAttribute('id', "download-link");
      anchorEl.setAttribute('download', "new-members.csv");
      anchorEl.setAttribute('href', dataBlob);
      anchorEl.hidden = true;
      document.body.append(anchorEl)
      anchorEl?.click();
      anchorEl?.parentNode?.removeChild(anchorEl);
    }
  }

  return (
    <div
      className="new-member-report-container"
      data-testid="new-member-report-container"
      role="button">
      <button
        className="new-member-report-btn basic-button"
        type="submit"
        onClick={handleClick}
        data-testid="new-member-report-btn">New members
      </button>
    </div>
  )
}
const obj = {}
export default obj
