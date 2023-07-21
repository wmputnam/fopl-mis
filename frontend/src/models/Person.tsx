export default interface Person {
  firstName: string;
  lastName: string;
}

export const createPerson = (fname:string,lname:string):Person => { 
  return {
    firstName:fname, 
    lastName:lname,
   }
}
