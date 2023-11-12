import request from "superagent";

import { IMember } from "packages/member-shared";


export default async function loadData(serverUrl: string, mode: string, memberId: string): Promise<any> {
  let bresult: any;
  if (mode !== "new") {
    try {
      bresult = await doGet(serverUrl, memberId);
      return bresult;
    } catch (fault) {
      return fault;
    }

  } else { return {} as Promise<IMember>; }
}

async function doGet(serverUrl: string, memberId: string): Promise<any> {

  console.log(`fe-data-loader--get URL:${serverUrl}/members/${memberId} `);
  try {
    const res = await request.get(serverUrl + `/members/${memberId}`)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}
