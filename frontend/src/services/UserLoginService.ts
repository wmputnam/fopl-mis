import { IUserInfo } from "src/interfaces";
import request from "superagent";

async function login(serverUrl: string, payload: any): Promise<any> {
  let bresult: any;
  const loginActionPath = "/v1/user/login";
  const loginUrl = serverUrl + loginActionPath;
  try {
    bresult = await doPost(loginUrl, {});
    return bresult;
  } catch (fault) {
    return fault;
  }
}

async function logout(serverUrl: string, payload: any): Promise<any> {
  let bresult: any;
  const loginActionPath = "/v1/user/logout";
  const logoutUrl = serverUrl + loginActionPath;
  try {
    bresult = await doPost(logoutUrl, {});
    return bresult;
  } catch (fault) {
    return fault;
  }
}

async function getUserInfo(serverUrl: string): Promise<IUserInfo | any> {
  let bresult: any;
  const userInfoActionPath = "/v1/user/info";
  const userInfoUrl = serverUrl + userInfoActionPath;
  try {
    console.log(`getUserInfo`)
    bresult = await doGet(userInfoUrl);
    return bresult.body;
  } catch (fault) {
    return fault;
  }
}

async function doPost(url: string, payload: any): Promise<any> {
  try {
    const res = await request.post(url, payload)
      .accept('json')
      .ok(res => res.status < 500);
    return res;
  } catch (fault) {
    return fault;
  }
}

async function doGet(url: string): Promise<any> {
  try {
    console.log(`doGet: url - ${url}`)
    const res = await request.get(url)
      .accept('json')
      .ok(res => res.status < 500);
    console.log(`doGet: res.body ${JSON.stringify(res.body)}`)
    return res;
  } catch (fault) {
    console.log(`doGet: fault ${fault}`)
    return fault;
  }
}

export { login, logout, getUserInfo }
