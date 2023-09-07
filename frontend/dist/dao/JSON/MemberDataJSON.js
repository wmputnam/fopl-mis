import { AppConfig } from "../../services/AppConfig";
import memberData from "../../assets/data/member-data.json";
var MemberDataJSON = /** @class */ (function () {
    function MemberDataJSON() {
        this.memData = memberData;
    }
    MemberDataJSON.getMemberData = function () {
        if (AppConfig.getInstance().getDaoSource() === "json") {
            if (!this.instance) {
                this.instance = new MemberDataJSON();
            }
            return this.instance.memData;
        }
        else {
            throw new Error("using JSON adaptor when not configured");
        }
    };
    return MemberDataJSON;
}());
export { MemberDataJSON };
;
//# sourceMappingURL=MemberDataJSON.js.map