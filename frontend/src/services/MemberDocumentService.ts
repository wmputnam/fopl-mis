import { IStatus } from "packages/IStatus"

class MemberDocumentService {
  foo = async () => { }

  updateMemberStatus = async (memberId: string, newStatus: IStatus) => {
    // const result = await member.updateOne(
    //   { _id: memberId },
    //   {
    //     $set:{
    //       status: newStatus,
    //       lastUpdated: new Date()
    //     },
    //   },
    //   { upsert:false }
    // );
  }
}