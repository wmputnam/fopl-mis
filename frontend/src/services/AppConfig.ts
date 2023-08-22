import data from "../assets/config/config.cjs"
export class AppConfig {
    private static instance: AppConfig;
    private configData: IAppConfig;

    private constructor() {
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
        return this.configData.dao ? this.configData.dao.source : "json";
    }
    public getServerUrl() {
        return process.env?.REACT_APP_SERVER_URL ? process.env?.REACT_APP_SERVER_URL :
            (this.configData.webserver && this.configData.webserver.host && this.configData.webserver.port ?
                "http://" + this.configData.webserver.host + ":" + this.configData.webserver.port :
                "http://localhost:3030");
    }
}
export interface IAppConfig {
    webserver?: {
        host: string;
        port: number;
    },
    dao?: {
        source: "json" | "mongdb";
        json: {
            file: string;
        },
        mongodb: {
        }
    }
}
export const getServerUrl = () => AppConfig.getInstance().getServerUrl();