import { IAddress } from "./IAddress.js";
import { INames } from "./INames.js";
import { INotes } from "./INotes.js";
import { IRemittance } from "./IRemittance.js";
import { IStatus } from "./IStatus.js";
import { IVolunteer } from "./IVolunteer.js";


export interface IMemberDocument extends IAddress, IStatus {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  volunteer?: IVolunteer[];
  mmb?: string;
  paidThrough?: Date;
  joined?: Date;
  lastUpdated?: Date;
  remittances?: IRemittance[];
  notes?: INotes[];
  names?: INames[];
  mem?: string;     // legacy status word

}
