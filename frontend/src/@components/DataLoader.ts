// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
// import UseAxios from "axios-hooks";
import request from "superagent";

import { IMember } from "packages/member-shared";


// export default function DataLoader(serverUrl: string, memberId: string = ""): any {

//   const [{ data, error, loading }] = UseAxios<IMember>({
//     baseURL: serverURL,
//     url: `/members/${memberId}`
//   },
//     {
//       manual: false,
//       useCache: false
//     });

//   return { data, error, loading };
// }

export default async function loadData(serverUrl: string, memberId: string, mode: string): Promise<any> {
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

  console.log(`fe-data-loasder--get URL:${serverUrl}/members/${memberId} `);
  try {
    const res = await request.get(serverUrl + `/members/${memberId}`)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}
/*
async function doPost(serverUrl: string, payload: any): Promise<any> {
  try {
    const res = await request.post(serverUrl + `/members/`, payload)
    .accept('json')
    .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }*/