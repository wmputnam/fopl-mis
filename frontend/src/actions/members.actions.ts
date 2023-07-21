import axios from "axios";
// import { useAxios } from "use-axios-client";
// import { debug } from "debug";
import { AllMemberProps } from "../@interfaces/MemberProps";


//const log:debug.IDebugger = debug("fe:members-actions")

class MembersActions {

    fetchMembers = async () => {
      let goobah:any;
      try {
        const response =  await axios.get(`http://localhost:3030/members`);
        goobah = await response.data;
        // console.log(goobah);
        return goobah;
      } catch ( error ) {
        console.log(error)
      }
      
      }
    // fetchMemberById = (id:string) => {
    //   const { data } = useAxios(`/members/${id}`);
    //   return data;
    // }
}
export default new MembersActions();