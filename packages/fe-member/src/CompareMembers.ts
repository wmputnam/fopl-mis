import { Member } from "./Member.js"

export const compareMembers = (a: Partial<Member>, b: Partial<Member>): { same: boolean; messages: string[] } => {
  let isSame = true;
  const messages: string[] = new Array<string>();
  // id
  if (a._id && b._id) {
    if (a._id !== b._id) {
      messages.push(`id: > ${a._id} < ${b._id}`);
      isSame = false;
    }
  }
  else if (a._id) {
    messages.push(`id: > ${a._id} <`);
    isSame = false;
  } else if (b._id) {
    messages.push(`id: >< ${b._id}`);
    isSame = false;
  } else {
    messages.push(`id: undefined`);
  }

  // firstName
  if (a.firstName && b.firstName) {
    if (a.firstName !== b.firstName) {
      messages.push(`firstName: > ${a.firstName} < ${b.firstName}`);
      isSame = false;
    }
  } else if (a.firstName) {
    messages.push(`firstName: > ${a.firstName} < `);
    isSame = false;
  } else if (b.firstName) {
    messages.push(`firstName: >< ${b.firstName}`);
    isSame = false;
  }
  // lastName
  if (a.lastName && b.lastName) {
    if (a.lastName !== b.lastName) {
      messages.push(`lastName: > ${a.lastName} < ${b.lastName}`);
      isSame = false;
    }
  } else if (a.lastName) {
    messages.push(`lastName: > ${a.lastName} <`);
    isSame = false;
  } else if (b.lastName) {
    messages.push(`lastName: >< ${b.lastName}`);
    isSame = false;
  }
  // address
  if (a.address && b.address) {
    if (a.address !== b.address) {
      messages.push(`address: > ${a.address} < ${b.address}`);
      isSame = false;
    }
  } else if (a.address) {
    messages.push(`address: > ${a.address} <`);
    isSame = false;
  } else if (b.address) {
    messages.push(`address: >< ${b.address}`);
    isSame = false;
  }
  // unit
  if (a.unit && b.unit) {
    if (a.unit !== b.unit) {
      messages.push(`unit: > ${a.unit} < ${b.unit}`);
      isSame = false;
    }
  } else if (a.unit) {
    messages.push(`unit: > ${a.unit} <`);
    isSame = false;
  } else if (b.unit) {
    messages.push(`unit: >< ${b.unit}`);
    isSame = false;
  }
  // city
  if (a.city && b.city) {
    if (a.city !== b.city) {
      messages.push(`city: > ${a.city} < ${b.city}`);
      isSame = false;
    }
  } else if (a.city) {
    messages.push(`city: > ${a.city} <`);
    isSame = false;
  } else if (b.city) {
    messages.push(`city: >< ${b.city}`);
    isSame = false;
  }
  // state
  if (a.state && b.state) {
    if (a.state !== b.state) {
      messages.push(`state: > ${a.state} < ${b.state}`);
      isSame = false;
    }
  } else if (a.state) {
    messages.push(`state: > ${a.state} <`);
    isSame = false;
  } else if (b.state) {
    messages.push(`state: >< ${b.state}`);
    isSame = false;
  }
  // postalCode
  if (a.postalCode && b.postalCode) {
    if (a.postalCode !== b.postalCode) {
      messages.push(`postalCode: > ${a.postalCode} < ${b.postalCode}`);
      isSame = false;
    }
  } else if (a.postalCode) {
    messages.push(`postalCode: > ${a.postalCode} <`);
    isSame = false;
  } else if (b.postalCode) {
    messages.push(`postalCode: >< ${b.postalCode}`);
    isSame = false;
  }
  // email
  if (a.email && b.email) {
    if (a.email !== b.email) {
      messages.push(`email: > ${a.email} < ${b.email}`);
      isSame = false;
    }
  } else if (a.email) {
    messages.push(`email: > ${a.email} <`);
    isSame = false;
  } else if (b.email) {
    messages.push(`email: >< ${b.email}`);
    isSame = false;
  }
  // phone
  if (a.phone && b.phone) {
    if (a.phone !== b.phone) {
      messages.push(`phone: > ${a.phone} < ${b.phone}`);
      isSame = false;
    }
  } else if (a.phone) {
    messages.push(`phone: > ${a.phone} <`);
    isSame = false;
  } else if (b.phone) {
    messages.push(`phone: >< ${b.phone}`);
    isSame = false;
  }
  // volunteerPreferences
  if (a.volunteerPreferences && b.volunteerPreferences) {
    if (a.volunteerPreferences.length !== b.volunteerPreferences.length) {
      messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.volunteerPreferences.length; i++) {
        if ((a.volunteerPreferences[i].role !== b.volunteerPreferences[i].role) ||
          (a.volunteerPreferences[i]?.lastWorkDate !== b.volunteerPreferences[i]?.lastWorkDate)) {
          messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
          isSame = false;
        }
      }
    }
  } else if (a.volunteerPreferences) {
    messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} <`);
    isSame = false;
  } else if (b.volunteerPreferences) {
    messages.push(`volunteerPreferences: > ${JSON.stringify(a.volunteerPreferences)} < + ${JSON.stringify(b.volunteerPreferences)}`);
    messages.push(`volunteerPreferences: >< ${JSON.stringify(b.volunteerPreferences)}`);
    isSame = false;
  }
  // mmb
  if (a.mmb && b.mmb) {
    if (a.mmb !== b.mmb) {
      messages.push(`mmb: > ${a.mmb} < ${b.mmb}`);
      isSame = false;
    }
  } else if (a.mmb) {
    messages.push(`mmb: > ${a.mmb} <`);
    isSame = false;
  } else if (b.mmb) {
    messages.push(`mmb: >< ${b.mmb}`);
    isSame = false;
  }
  // paidThrough
  if (a.paidThrough && b.paidThrough) {
    if (a.paidThrough !== b.paidThrough) {
      messages.push(`paidThrough: > ${a.paidThrough} < ${b.paidThrough}`);
      isSame = false;
    }
  } else if (a.paidThrough) {
    messages.push(`paidThrough: > ${a.paidThrough} <`);
    isSame = false;
  } else if (b.paidThrough) {
    messages.push(`paidThrough: >< ${b.paidThrough}`);
    isSame = false;
  }
  // joined
  if (a.joined && b.joined) {
    if (a.joined !== b.joined) {
      messages.push(`joined: > ${a.joined} < ${b.joined}`);
      isSame = false;
    }
  } else if (a.joined) {
    messages.push(`joined: > ${a.joined} <`);
    isSame = false;
  } else if (b.joined) {
    messages.push(`joined: >< ${b.joined}`);
    isSame = false;
  }
  // remittances
  if (a.remittances && b.remittances) {
    if (a.remittances.length !== b.remittances.length) {
      messages.push(`remittances: > ${JSON.stringify(a.remittances)} < + ${JSON.stringify(b.remittances)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.remittances.length; i++) {
        if ((a.remittances[i].date !== b.remittances[i].date) ||
          (a.remittances[i].amount !== b.remittances[i].amount) ||
          (a.remittances[i].memo !== b.remittances[i].memo)) {
          messages.push(`remittances: > ${JSON.stringify(a.remittances)} < + ${JSON.stringify(b.remittances)}`);
          isSame = false;
        }
      }
    }
  } else if (a.remittances) {
    messages.push(`remittances: > ${JSON.stringify(a.remittances)} <`);
    isSame = false;
  } else if (b.remittances) {
    messages.push(`remittances: >< ${JSON.stringify(b.remittances)}`);
    isSame = false;
  }

  // notes
  if (a.notes && b.notes) {
    if (a.notes.length !== b.notes.length) {
      messages.push(`notes: > ${JSON.stringify(a.notes)} < + ${JSON.stringify(b.notes)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.notes.length; i++) {
        if ((a.notes[i].date !== b.notes[i].date) ||
          (a.notes[i].note !== b.notes[i].note)) {
          messages.push(`notes: > ${JSON.stringify(a.notes)} < + ${JSON.stringify(b.notes)}`);
          isSame = false;
        }
      }
    }
  } else if (a.notes) {
    messages.push(`notes: > ${JSON.stringify(a.notes)} <`);
    isSame = false;
  } else if (b.notes) {
    messages.push(`notes: >< ${JSON.stringify(b.notes)}`);
    isSame = false;
  }
  // dataEntryErrors
  if (a.dataEntryErrors && b.dataEntryErrors) {
    if (a.dataEntryErrors.length !== b.dataEntryErrors.length) {
      messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} < + ${JSON.stringify(b.dataEntryErrors)}`);
      isSame = false;
    } else {
      for (let i = 0; i < a.dataEntryErrors.length; i++) {
        if ((a.dataEntryErrors[i].date !== b.dataEntryErrors[i].date) ||
          (a.dataEntryErrors[i].note !== b.dataEntryErrors[i].note)) {
          messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} < + ${JSON.stringify(b.dataEntryErrors)}`);
          isSame = false;
        }
      }
    }
  } else if (a.dataEntryErrors) {
    messages.push(`dataEntryErrors: > ${JSON.stringify(a.dataEntryErrors)} <`);
    isSame = false;
  } else if (b.dataEntryErrors) {
    messages.push(`>< ${JSON.stringify(b.dataEntryErrors)}`);
    isSame = false;
  }
  // lastUpdated
  if (a.lastUpdated && b.lastUpdated) {
    if (a.lastUpdated !== b.lastUpdated) {
      messages.push("lastUpdated: >" + a.lastUpdated + "<" + b.lastUpdated);
      isSame = false;
    }
  } else if (a.lastUpdated) {
    messages.push("lastUpdated: >" + a.lastUpdated + "<");
    isSame = false;
  } else if (b.lastUpdated) {
    messages.push("lastUpdated: ><" + b.lastUpdated);
    isSame = false;
  }
  // remit suspense values on Member that are not on iMember
  // remitDate
  if (a.remitDate && b.remitDate) {
    if (a.remitDate !== b.remitDate) {
      messages.push("remitDate: >" + a.remitDate + "<" + b.remitDate);
      isSame = false;
    }
  } else if (a.remitDate) {
    messages.push("remitDate: >" + a.remitDate + "<");
    isSame = false;
  } else if (b.remitDate) {
    messages.push("remitDate: ><" + b.remitDate);
    isSame = false;
  }
  // remitDues
  if (a.remitDues && b.remitDues) {
    if (a.remitDues !== b.remitDues) {
      messages.push("remitDues: >" + a.remitDues + "<" + b.remitDues);
      isSame = false;
    }
  } else if (a.remitDues) {
    messages.push("remitDues: >" + a.remitDues + "<");
    isSame = false;
  } else if (b.remitDues) {
    messages.push("remitDues: ><" + b.remitDues);
    isSame = false;
  }
  // remitDonation
  if (a.remitDonation && b.remitDonation) {
    if (a.remitDonation !== b.remitDonation) {
      messages.push("remitDonation: >" + a.remitDonation + "<" + b.remitDonation);
      isSame = false;
    }
  } else if (a.remitDonation) {
    messages.push("remitDonation: >" + a.remitDonation + "<");
    isSame = false;
  } else if (b.remitDonation) {
    messages.push("remitDonation: ><" + b.remitDonation);
    isSame = false;
  }

  // status isActive
  if (a.status && a.status.isActive !== undefined && b.status && b.status.isActive !== undefined) {
    if (a.status.isActive !== b.status.isActive) {
      messages.push("status.isActive: >" + a.status.isActive + "<" + b.status.isActive);
      isSame = false;
    }
  } else if (a.status && a.status.isActive) {
    messages.push("status.isActive: >" + a.status.isActive + "<");
    isSame = false;
  } else if (b.status && b.status.isActive) {
    messages.push("status.isActive: ><" + b.status.isActive);
    isSame = false;
  }

  // status isNewMember
  if (a.status && a.status.isNewMember !== undefined && b.status && b.status.isNewMember !== undefined) {
    if (a.status.isNewMember !== b.status.isNewMember) {
      messages.push("status.isNewMember: >" + a.status.isNewMember + "<" + b.status.isNewMember);
      isSame = false;
    }
  } else if (a.status && a.status.isNewMember) {
    messages.push("status.isNewMember: >" + a.status.isNewMember + "<");
    isSame = false;
  } else if (b.status && b.status.isNewMember) {
    messages.push("status.isNewMember: ><" + b.status.isNewMember);
    isSame = false;
  }
  // status validEmail
  if (a.status && a.status.validEmail !== undefined && b.status && b.status.validEmail !== undefined) {
    if (a.status.validEmail !== b.status.validEmail) {
      messages.push("status.validEmail: >" + a.status.validEmail + "<" + b.status.validEmail);
      isSame = false;
    }
  } else if (a.status && a.status.validEmail) {
    messages.push("status.validEmail: >" + a.status.validEmail + "<");
    isSame = false;
  } else if (b.status && b.status.validEmail) {
    messages.push("status.validEmail: ><" + b.status.validEmail);
    isSame = false;
  }
  // status validPostMail
  if (a.status && a.status.validPostMail !== undefined && b.status && b.status.validPostMail !== undefined) {
    if (a.status.validPostMail !== b.status.validPostMail) {
      messages.push("status.validPostMail: >" + a.status.validPostMail + "<" + b.status.validPostMail);
      isSame = false;
    }
  } else if (a.status && a.status.validPostMail) {
    messages.push("status.validPostMail: >" + a.status.validPostMail + "<");
    isSame = false;
  } else if (b.status && b.status.validPostMail) {
    messages.push("status.validPostMail: ><" + b.status.validPostMail);
    isSame = false;
  }
  // status newsletterType
  if (a.status && a.status.newsletterType !== undefined && b.status && b.status.newsletterType !== undefined) {
    if (a.status.newsletterType !== b.status.newsletterType) {
      messages.push("status.newsletterType: >" + a.status.newsletterType + "<" + b.status.newsletterType);
      isSame = false;
    }
  } else if (a.status && a.status.newsletterType) {
    messages.push("status.newsletterType: >" + a.status.newsletterType + "<");
    isSame = false;
  } else if (b.status && b.status.newsletterType) {
    messages.push("status.newsletterType: ><" + b.status.newsletterType);
    isSame = false;
  }

  return { same: isSame, messages: messages };
}