import { AppConfig} from "./AppConfig"
const appConfig:AppConfig = AppConfig.getInstance();
console.log(appConfig.getDaoSource())