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
      // console.log(`getLast: member array is ${memberArray.length} long`)
      // return;
      let mostRecent = 0;
      let checkDate = referenceDate ? referenceDate.valueOf() : memberArray[mostRecent].lastUpdated.valueOf();
      // console.log(`checkDate: ${checkDate}`)
      for (let i = 1; i < memberArray.length; i++) {
        const tryDate = new Date(memberArray[i].lastUpdated).valueOf()
        // if (memberArray[i].lastUpdated) { console.log(`${i} -- tryDate: ${tryDate} for ${memberArray[i].lastName}`) } else { console.log(`${i} -- not lastUpdated for ${memberArray[i].lastName}`) }
        if (memberArray[i].lastUpdated && tryDate > checkDate) {
          mostRecent = i;
          checkDate = tryDate
          // console.log(`new checkDate: ${checkDate}`)
        }
      }
      // console.log(`mostRecent: ${JSON.stringify(memberArray[mostRecent])}`);
      return memberArray[mostRecent];
    } else {
      throw new Error("unable to read members list --- sigh")
    }
  }
}