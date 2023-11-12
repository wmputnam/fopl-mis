import { Remittance } from "./Remittance";
import { Names } from "./Names";
import { Volunteer } from "./Volunteer";
import { Notes } from "./Notes";
import { IAddress } from "./IAddress";
import { IStatus } from "./IStatus";
export interface IMember extends IAddress, IStatus {
    _id?: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    volunteer?: Volunteer[];
    mmb?: string;
    paidThrough?: Date;
    joined?: Date;
    lastUpdated?: Date;
    remittances?: Remittance[];
    notes?: Notes[];
    names?: Names[];
    mem?: string;
}
