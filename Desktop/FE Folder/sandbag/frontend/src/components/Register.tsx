import React, { useContext, useState } from "react";
import { SandbagContext } from "../App";
import { LoginButton } from "./Login";
import { LoginTextField } from "./Login";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewUserDetails(
      { ...newUserDetails, 
        [e.target.name]: e.target.value
      });
  };

  async function createUser(){
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

  function userCreateRedirect(){
    handleToggle()
    setTimeout(createUser, 2000)
    // navigate("/")
    // handleClose()
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
          <LoginButton variant="contained" onClick={userCreateRedirect}>
            Register
          </LoginButton>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
            transitionDuration={80}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
            </div>
        </div>
      </div>
    </div>
  )
}