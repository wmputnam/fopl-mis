export interface MemberNoteInterface {
  date?: string;
  note?: string;
}
export interface Volunteer {
  role?: string;
  lastWorkDate?: Date;
}
export interface AddMemberInterface {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
  unit?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  mmb?: string;
  initialRemitance?: {
    date?: Date;
    remits?: {
      memo?: 'dues' | 'donation',
      amount: string,
    }[],
  };
  notes?: MemberNoteInterface[];
  volunteer?:Volunteer[];
}

export default {};