import React, {useContext} from "react";
import Header from "./Header";
import { InfoTextField } from "./Login";
import { SandbagContext } from "../App";

export default function Account(){

  const {loggedInUser} = useContext(SandbagContext)

  const accountDetails = loggedInUser

  return (
    <div>
      <Header />
      <div className="content-container">
        <p className="slogan home-slogan">Here are your <span className="bolder">very accurate</span> and <span className="bolder">extremely official </span><span className="green-bold">account details</span></p>
        <div className="account-pic">
          <img className="smile-face" src={require("../smile.png")} alt="" />
        </div>
        <InfoTextField 
          disabled
          value={accountDetails.firstName}
          label="first name"
          id="text-input"
          variant="filled"
          InputLabelProps={{
            style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
          sx={{marginBottom: '0.15em'}} />
         
        <InfoTextField 
          disabled
          value={accountDetails.lastName}
          label="last name"
          id="text-input"
          variant="filled"
          InputLabelProps={{
            style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
          sx={{marginBottom: '0.15em'}} />
        <InfoTextField 
          disabled
          value={accountDetails.email}
          label="email"
          id="text-input"
          variant="filled"
          InputLabelProps={{
            style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
          sx={{marginBottom: '0.15em'}} />
        <InfoTextField 
          disabled
          value={accountDetails.password}
          label="password"
          id="text-input"
          variant="filled"
          InputLabelProps={{
            style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
          sx={{marginBottom: '0.15em'}} />
      </div>

    </div>
  )

}