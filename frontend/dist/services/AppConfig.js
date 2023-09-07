import data from "../assets/config/config.mjs";
var AppConfig = /** @class */ (function () {
    function AppConfig() {
        this.configData = data();
    }
    AppConfig.getInstance = function () {
        if (!this.instance) {
            this.instance = new AppConfig();
        }
        return this.instance;
    };
    AppConfig.prototype.getConfigData = function () {
        return this.configData;
    };
    AppConfig.prototype.getDaoSource = function () {
        return this.configData.dao ? this.configData.dao.source : "json";
    };
    AppConfig.prototype.getServerUrl = function () {
        var _a, _b;
        return ((_a = process.env) === null || _a === void 0 ? void 0 : _a.REACT_APP_SERVER_URL) ? (_b = process.env) === null || _b === void 0 ? void 0 : _b.REACT_APP_SERVER_URL :
            (this.configData.webserver && this.configData.webserver.host && this.configData.webserver.port ?
                "http://" + this.configData.webserver.host + ":" + this.configData.webserver.port :
                "http://localhost:3030");
    };
    return AppConfig;
}());
export { AppConfig };
export var getServerUrl = function () { return AppConfig.getInstance().getServerUrl(); };
//# sourceMappingURL=AppConfig.js.map