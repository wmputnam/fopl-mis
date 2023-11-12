import request from "superagent";

export async function Save(serverUrl: string, payload: any, memberId: string = ""): Promise<any> {
  let bresult: any;
  if (memberId === "") {
    try {
      bresult = await doPost(serverUrl, payload);
      return bresult;
    } catch (fault) {
      return fault;
    }
  } else {
    try {
      bresult = await doPut(serverUrl, memberId, payload);
      return bresult;
    } catch (fault) {
      return fault;
    }
  }
}


async function doPut(serverUrl: string, memberId: string, payload: any): Promise<any> {
  try {
    const res = await request.put(serverUrl + `/members/${memberId}`, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

async function doPatch(serverUrl: string, memberId: string, payload: any): Promise<any> {
  try {
    const res = await request.patch(serverUrl + `/members/${memberId}`, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

async function doPost(serverUrl: string, payload: any): Promise<any> {
  try {
    const res = await request.post(serverUrl + `/members/`, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

export async function SaveUpdate(serverUrl: string, payload: any, memberId: string): Promise<any> {
  let bresult: any;
  if (memberId !== "") {
    try {
      bresult = await doPatch(serverUrl, memberId, payload);
      return bresult;
    } catch (fault) {
      return fault;
    }

  }
}
const DataUpdater = {};
export default DataUpdater;

