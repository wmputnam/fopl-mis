import { AppConfig } from "../../classes/AppConfig"
import memberData from "../../assets/data/member-data.json"

export class MemberDataJSON {
  private static instance: MemberDataJSON;
  private memData:any;
  // private static instance:AppConfig;

  private constructor() {
    this.memData = memberData;
  }

  public static getMemberData():any {
      if ( AppConfig.getInstance().getDaoSource() === "json" ) {
        if (!this.instance) {
          this.instance = new MemberDataJSON()
        }
        return this.instance.memData;  
      } else {
          throw new Error("using JSON adaptor when not configured");
      }
  }
};