import { IStatus } from "packages/IStatus";

export class Status implements IStatus {
  active: boolean;   // false => OUT  (see notes)
  postMail: boolean; // false => do not mail -- may be due to RM or member request or lack of address  (see notes)
  email: boolean;    // false => do not email -- may be due to not being verified or returned email or member request (see notes)
  newsletter: 'email' | 'post' | 'none';
  constructor() {
    this.active = false;
    console.log(`Status class constructor setting postMail to false`)
    this.postMail = false;
    this.email = false;
    this.newsletter = 'none'
  }
}

export default Status;

// new member
// Status.active = true
// Status.postMail = true
// Status.email = false
// Status.newletter = 'email'
// VolunteerPrefs.push('NEW') to indicate that they need new member orientation -- deleted once oriented