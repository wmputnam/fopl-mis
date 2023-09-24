export default interface AddMemberInterface {
  firstName: string;
  lastName: string;
  phone?:string;
  email?:string;
  address?:string;
  unit?:string;
  city?:string;
  state?:string;
  postalCode?:string;
  initialRemitance?: {
    date?: Date;
    remits?: {
      memo?: 'dues'|'donation',
      amount: string,
    }[],
  };

}