import { IStatus } from "member-document";

export class Status implements IStatus {
  /*
  isActive?: boolean;   // false => OUT  (see notes)
  validPostMail?: boolean; // false => do not mail -- may be due to RM or member request or lack of address  (see notes)
  validEmail?: 'verified' | ' bounced' | 'unchecked' | 'none';    // false => do not email -- may be due to not being verified or returned email or member request (see notes)
  newsletterType?: 'email' | 'post' | 'none';
  */
  isActive: boolean;   // false => OUT  (see notes)
  validPostMail: 'valid' | 'returned mail' | 'none'; // false => do not mail -- may be due to RM or member request or lack of address  (see notes)
  validEmail: 'verified' | 'bounced' | 'unchecked' | 'none';    // false => do not email -- may be due to not being verified or returned email or member request (see notes)
  newsletterType: 'email' | 'post' | 'none';
  isNewMember: boolean;
  constructor() {
    this.isActive = false;
    // console.log(`Status class constructor setting validPostMail to "none"`)
    this.validPostMail = "none";
    this.validEmail = 'unchecked';
    this.newsletterType = 'none';
    this.isNewMember = true;
  }
}

export default Status;

// new member
// Status.isActive = true
// Status.isNew = true
// Status.validPostMail = 'none'
// Status.validEmail = 'unchecked'
// Status.newletterType = 'post'
