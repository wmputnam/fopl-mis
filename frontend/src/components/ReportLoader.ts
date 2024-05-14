// eslint-disable-next-line @typescript-eslint/no-unused-vars
import request from "superagent";

import { IMemberDocument } from "member-document";


export async function fetchReport(serverUrl: string, reportName: string): Promise<any> {
  let bresult: any;
  switch (reportName) {
    case "new":
      try {
        bresult = await getReport(serverUrl, reportName);
        return bresult;
      } catch (fault) {
        return fault;
      }

    default:
      return {} as Promise<IMemberDocument[]>;
  }
}

async function getReport(serverUrl: string, reportName: string): Promise<any> {

  console.log(`fe-data-loader--get URL:${serverUrl}/v1/reports/members/${reportName} `);
  try {
    const res = await request.get(serverUrl + `/v1/reports/members/${reportName}`)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

export default function nop() { }