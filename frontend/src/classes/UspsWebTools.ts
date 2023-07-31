const requestOptions:Partial<RequestInit> = {
  method: 'GET',
  redirect: 'follow'
};

interface USPS_ADDRESS_VALIDATION_REQUEST {
  address1?:string;
  address2?:string;
  city?:string;
  state:string;
  zip5:string;
  zip4:string;
}
const userId = '8THEFR1N44845';  // TODO get this from ENV
const passwd = 'P1680OY20P4768P'; // TODO get this from ENV
const urlBase = "https://production.shippingapis.com/ShippingAPI.dll";
const WebToolsAPI = "Verify";

async function requestAddressValidation({ 
  address2 = "", 
  city = "Petaluma", 
  state = "CA" }: Partial<USPS_ADDRESS_VALIDATION_REQUEST>):Promise<any> {

  const requestUrl = `${urlBase}?API=${WebToolsAPI}&XML=<AddressValidateRequest USERID="${userId}" PASSWORD="${passwd}"><Address ID="0"><Address1></Address1><Address2>${address2}</Address2><City>${city}</City><State>${state}</State><Zip5></Zip5><Zip4></Zip4></Address></AddressValidateRequest>`;
  fetch(requestUrl, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export default requestAddressValidation;