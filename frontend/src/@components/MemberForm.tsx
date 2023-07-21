/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { EditMemberProps,AllMemberProps } from "../@interfaces/MemberProps";
import {CurrentMemberContext} from "../App"
import Home from "./Home";
import useAxios from "axios-hooks";


const MemberForm = ({updateViewState , updateCurrentMember, mode  }: EditMemberProps) => {
  let memberId = React.useContext(CurrentMemberContext)
  console.log(memberId+"\n")

  const fetchData = (id:string) => {
    return ({recordId:id,firstName:"William",lastName:"Putnam",address:"649 Albert Way", city:"Petaluma",postalCode:"94954-3741"})
  }
  const [{ data, error, loading }] = useAxios<AllMemberProps>(
    { baseURL: "http://localhost:3030", url: `/members/${memberId}` }, { manual: false, useCache: false }
  );
  // const members = data;
  if( mode ==="new") {
      return( 
      <>
        <form className="member-form">
          <div className="member-form--name-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" className="new-member--first-name" placeholder="First name"   />
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" className="new--member--last-name" placeholder="Last name" />
          </div>
          <div className="member-form--address-group" >
            <label htmlFor="address">Address</label>
            <input type="text" id="address" className="new-member--address" placeholder="Address" />
            <label htmlFor="unit">Unit</label>
            <input type="text" id="unit" className="new-member--unit" placeholder="Unit"  />
            <br/>
            <label htmlFor="city">City</label>
            <input type="text" id="city" className="new-member--city" placeholder="City" />
            <label htmlFor="state">State</label>
            <input type="text" id="state" className="new-member--state" placeholder="State"  />
            <label htmlFor="postal-code">ZIP code</label>
            <input type="text" id="postal-code" className="new-member--postal-code" placeholder="ZIP code" />
          </div>
          <div className="member-form--contact-group">
          <label htmlFor="phone">Phone</label>
            <input type="telephone" id="phone" className="new-member--phone" placeholder="Phone"  />
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="new-member--email" placeholder="Email" />
          </div>
        </form>
      <Home updateViewState={updateViewState}/>
      </>);
  } else {
    // let data = fetchData(memberId) as AllMemberProps
    return( 
      <>
        <form className="member-form">
          <div className="member-form--name-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" className="existing-member--first-name" placeholder="First name" value={data?.firstName} />
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" className="existing-member--last-name" placeholder="Last name" value={data?.lastName}/>
          </div>
          <div className="member-form--address-group" >
            <label htmlFor="address">Address</label>
            <input type="text" id="address" className="existing-member--address" placeholder="Address" value={data?.address}/>
            <label htmlFor="unit">Unit</label>
            <input type="text" id="unit" className="existing-member--unit" placeholder="Unit" value={data?.hasOwnProperty("unit")?data.unit:""}/>
            <br/>
            <label htmlFor="city">City</label>
            <input type="text" id="city" className="existing-member--city" placeholder="City" value={data?.city}/>
            <label htmlFor="state">State</label>
            <input type="text" id="state" className="existing-member--state" placeholder="State" value={data?.hasOwnProperty("state")?data.state:"CA"}/>
            <label htmlFor="postal-code">ZIP code</label>
            <input type="text" id="postal-code" className="existing-member--postal-code" placeholder="ZIP code" value={data?.postalCode}/>
          </div>
          <div className="member-form--contact-group">
          <label htmlFor="phone">Phone</label>
            <input type="telephone" id="phone" className="existing-member--phone" placeholder="Phone" value={data?.hasOwnProperty("phone")?data.phone:""}/>
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="existing-member--email" placeholder="Email" value={data?.hasOwnProperty("email")?data.email:""}/>
          </div>
          <div className="member-form--mmb-group">
            <div className="existing-member--mmb">
            <label htmlFor="mmb">mmb </label>
            <span id="mmb" className="data-box">{data?.hasOwnProperty("mmb")?data.mmb:""}</span>
            </div>
            <div className="existing-member--paid-through">
              <label htmlFor="paidThrough" >Paid through </label>
              <span id="paidThrough"  className="data-box">{data?.hasOwnProperty("paidThrough")?data.paidThrough:""}</span>
            </div>
          </div>
        </form>
      </>);
  }
}

export default MemberForm;