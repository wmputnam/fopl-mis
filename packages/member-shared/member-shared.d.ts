import { Remittance } from "./Remittance";
import { Names } from "./Names";
import { Volunteer } from "./Volunteer";
export interface IMember {
    _id: string;
    firstName: string;
    lastName: string;
    names: Names[];
    email: string;
    phone: string;
    address: string;
    unit: string;
    city: string;
    state: string;
    postalCode: string;
    volunteerPreferences: Volunteer[];
    mmb: string;
    paidThrough: Date;
    joined: Date;
    lastUpdated: Date;
    remittances: Remittance[];
}
