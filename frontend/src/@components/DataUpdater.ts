// import axios from "axios";
import request from "superagent";
import { SaveResponse } from "../@interfaces/SaveResponse";

export default async function Save(serverUrl: string, payload: any, memberId: string = ""): Promise<any> {
  let bresult: any;
  if (memberId === "") {
    console.log(`fe-data-updater--save URL:${serverUrl}/members [NEW] `);
    console.log(`fe-data-updater--save payload:\n    ${JSON.stringify(payload)}`);
    try {
      bresult = await doPost(serverUrl, payload);
      return bresult;
    } catch (fault) {
      return fault;
    }
  } else {
    console.log(`fe-data-updater--save URL:${serverUrl}/members/${memberId} `);
    console.log(`fe-data-updater--save payload:\n    ${JSON.stringify(payload)}`);
    try {
      bresult = await doPut(serverUrl, memberId, payload);
      return bresult;
    } catch (fault) {
      return fault;
    }
  }
}


async function doPut(serverUrl: string, memberId: string, payload: any): Promise<any> {
  console.log(`fe-data-updater--save URL:${serverUrl}/members/${memberId} `);
  try {
    const res = await request.put(serverUrl + `/members/${memberId}`, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

async function doPost(serverUrl: string, payload: any): Promise<any> {
  console.log(`fe-data-updater--save URL:${serverUrl}/members/ NEW `);
  try {
    const res = await request.post(serverUrl + `/members/`, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}


