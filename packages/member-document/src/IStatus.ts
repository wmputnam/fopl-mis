export interface IStatus {
  isActive?: boolean;   // false => OUT  (see notes)
  validPostMail?: 'valid' | 'returned mail' | 'none'; // false => do not mail -- may be due to RM or member request or lack of address  (see notes)
  validEmail?: 'verified' | 'bounced' | 'unchecked' | 'none';    // false => do not email -- may be due to not being verified or returned email or member request (see notes)
  newsletterType?: 'email' | 'post' | 'none';
  isNewMember?:boolean;
}

// new member set up
// Status.isActive = true
// Status.validPostMail = true unless we have no data (false)
// Status.validEmail = 'unchecked'
// Status.newletterType = 'email' unless we have no email ('none')
// VolunteerPrefs.push('NEW') to indicate that they need new member orientation -- deleted once oriented