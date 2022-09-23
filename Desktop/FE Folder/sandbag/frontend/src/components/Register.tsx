import React, { useContext, useState } from "react";
import { SandbagContext } from "../App";
import { LoginButton } from "./Login";
import { LoginTextField } from "./Login";

type newUser = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  handicap: number
}

const defaultUser: newUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  handicap: 0
}

export default function Register(){

  const [newUserDetails, setNewUserDetails] = useState(defaultUser)

  const { serverPort } = useContext(SandbagContext)

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewUserDetails(
      { ...newUserDetails, 
        [e.target.name]: e.target.value
      });
  };

  async function createUser(e: any){
    e.preventDefault()
      const newUser = { ...newUserDetails }

    await fetch(`${serverPort}addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .catch(error=>{
      window.alert(error)
      return
    })
  }

  return (
    <div className="login-container">
      <div className="content-container">
        <img src={require("../golf-cart.png")} alt="" className="logo"/>
        <h3 className="title">Sandbag</h3>
        <p className="slogan">The <span className="bolder">very accurate</span> and <span className="bolder">extremely official</span> handicap app</p>
        <div className="login-box">
          <h5 className="box-title">Login</h5>
          <div className="input-group">
          <LoginTextField
            name="firstName"
            label="first name"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginTextField
            name="lastName"
            label="last name"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginTextField
            name="handicap"
            label="last known handicap"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginTextField
            name="email"
            label="email address"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginTextField
            name="password"
            label="password"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginTextField
            name="confirmPassword"
            label="confirm password"
            id="text-input"
            variant="filled"
            InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }}
            onChange={handleChange}
            />
          <LoginButton variant="contained" onClick={createUser}>
            Register
          </LoginButton>
            </div>
        </div>
      </div>
    </div>
  )
}