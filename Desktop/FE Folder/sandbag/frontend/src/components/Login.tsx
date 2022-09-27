import React, { useContext, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SandbagContext } from "../App"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface logInUser {
  email: string,
  password: string
}

const defaultLogIn: logInUser = {
  email: "",
  password: ""
}

export default function Login() {

  const navigate = useNavigate()

  const [logInDetails, setLogInDetails] = useState(defaultLogIn)

  const {loggedInUser, setLoggedInUser, serverPort, allUserRounds, setAllUserRounds, userHandicap,  setUserHandicap} = useContext(SandbagContext)

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLogInDetails(
      { ...logInDetails, 
        [e.target.name]: e.target.value
      });
      console.log(logInDetails)
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  async function checkLogin(){
    const userMail = logInDetails.email.replace('@','at').replace('.', 'dot')

    const response = await fetch(`${serverPort}login/${userMail}`)
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`
      window.alert(message)
      return
    }
    const userAttempt = await response.json()
    if(userAttempt.password === logInDetails.password){
      console.log("password is correct")
      console.log(userAttempt)
      setLoggedInUser(userAttempt)
      console.log(loggedInUser)
      // console.log("hello")
      setTimeout(()=>console.log("loading"), 2000)
      navigate("/home")
      handleClose()
    } else if (userAttempt.password != logInDetails.password){
      console.log("password is incorrect")
    }
  }

  function loadLogin(){
    handleToggle()
    setTimeout(checkLogin, 2000) 
  }

  return (
    <div className="login-container">
      <div className="content-container">
        <img src={require("../golf-cart.png")} alt="" className="logo"/>
        <h3 className="title">Sandbag</h3>
        <p className="slogan">The <span className="bolder">very accurate</span> and <span className="bolder">extremely official</span> handicap app</p>
        <div className="login-box">
          <h5 className="box-title">Login</h5>
          <p className="login-text">Hint: username <strong>tiger@woods.com</strong> & password <strong>1234</strong> to poke around.</p>
          <div className="input-group">
          <LoginTextField
            name="email"
            label="email"
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
          <LoginButton variant="contained" onClick={()=>loadLogin()}>
            Log in
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

export const LoginTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '2px solid #4BAEA0',
    overflow: 'hidden',
    padding:'0',
    marginBottom: 7,
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'fcfcfb',
    },
    '&.Mui-focused': {
      backgroundColor: '#fcfcfb',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: '#4BAEA0'
    }
  },
}));

export const InfoTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    padding:'0',
    marginBottom: 7,
    margin:0,
    borderRadius: 4,
    backgroundColor: 'rgb(241,240,207,0.75)',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'fcfcfb',
    },
    '&.Mui-focused': {
      backgroundColor: '#F1F0CF',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: '#4BAEA0'
    }
  },
}));

export const LoginButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#4BAEA0'),
  backgroundColor: '#4BAEA0',
  width: 'fit-content',
  fontColor: 'fcfcfb',
  margin: '1em auto 0 auto',
  padding: '0.5em 2em',
  fontFamily: 'Source Sans Pro, sans-serif',
  '&:hover': {
    backgroundColor: "#4BAEA0",
  },
}));

