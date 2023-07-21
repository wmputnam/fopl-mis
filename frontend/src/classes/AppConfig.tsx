import data  from "../assets/config/config.mjs"
export class AppConfig {
    private static instance:AppConfig;
    private configData:IAppConfig;

    private constructor() {
        // console.log(JSON.stringify(data()))
        this.configData = data() as unknown as IAppConfig;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppConfig()
        }
        return this.instance;
    }

    public getConfigData() {
        return this.configData
    }

    public getDaoSource() {
        return this.configData.dao.source;
    }

}
export interface IAppConfig {
    dao:{
        source:"json"|"mongdb";
        json: {
          file: string;
        },
        mongodb:{  
        }
    }
}