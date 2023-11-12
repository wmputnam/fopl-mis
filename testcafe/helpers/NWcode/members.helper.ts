import http from "node:http"

export default class MemberHelpers {

  static async getMembers(): Promise<any[]> {
    let memberArray: any[] = [];
    const url = "http://localhost:3030/members";

    const promise = new Promise((resolve, reject) => {
      let rawData = '';
      http.get(url, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => { rawData += chunk; })
        res.on('end', () => {
          resolve(rawData);

        })
      })
    })
    const result = await promise;
    return JSON.parse(result as string);
  }

  static async getMember(id: string): Promise<any> {
    let memberArray: any[] = [];
    const url = `http://localhost:3030/members/${id}`;

    const promise = new Promise((resolve, reject) => {
      let rawData = '';
      http.get(url, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => { rawData += chunk; })
        res.on('end', () => {
          resolve(rawData);

        })
      })
    })
    const result = await promise;
    return JSON.parse(result as string);
  }

  static async getLastUpdatedMember(referenceDate?: Date) {
    let memberArray: any[] = await this.getMembers() as any[];
    if (memberArray) {
      let mostRecent = 0;
      let checkDate = referenceDate ? referenceDate.valueOf() : memberArray[mostRecent].lastUpdated.valueOf();
      for (let i = 1; i < memberArray.length; i++) {
        const tryDate = new Date(memberArray[i].lastUpdated).valueOf()
        if (memberArray[i].lastUpdated && tryDate > checkDate) {
          mostRecent = i;
          checkDate = tryDate
        }
      }
      return memberArray[mostRecent];
    } else {
      throw new Error("unable to read members list --- sigh")
    }
  }
}