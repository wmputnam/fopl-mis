import { IAddress } from "./IAddress";
import { INames } from "./INames";
import { INotes } from "./INotes";
import { IRemittance } from "./IRemittance";
import { IStatus } from "./IStatus";
import { IVolunteer } from "./IVolunteer";


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
