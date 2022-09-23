import React, { useState, useContext } from "react";
import Header from "./Header";
import { Grid } from "@mui/material";
import { InfoTextField } from "./Login";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { SandbagContext } from "../App";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

type newRound = {
  course: string,
  tees : string,
  par: string,
  slope: string,
  courseRating: string,
  date: Date,
  field: string,
  score: string,
  threePutts: string,
  lostBalls: string,
  swearing: boolean,
  clubThrow: boolean,
  highlight: string,
  openingHandicap: string,
  courseHC: string,
  differential: string,
  exceptional: boolean,
  playerEmail: string
}

export default function NewRound(){

  const { loggedInUser, setChangesMade, userHandicap, serverPort } = useContext(SandbagContext)

  const navigate = useNavigate()

  const defaultRound: newRound = {
    course: "",
    tees : "",
    par: "",
    slope: "",
    courseRating: "",
    date: new Date(),
    field: "",
    score: "",
    threePutts: "",
    lostBalls: "",
    swearing: false,
    clubThrow: false,
    highlight: "",
    openingHandicap: "",
    courseHC: "",
    differential: "",
    exceptional: false,
    playerEmail: loggedInUser.email
  }

  const [newRoundDetails, setNewRoundDetails] = useState(defaultRound)

  const [alignment, setAlignment] = useState('AM');

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewRoundDetails(
      { ...newRoundDetails, 
        [e.target.name]: e.target.value
      });
      console.log(newRoundDetails)
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    console.log(alignment)
  };

  async function postRound(){
    let courseH = Math.round((parseFloat(loggedInUser.handicap)*parseFloat(newRoundDetails.slope))/(113 + (parseFloat(newRoundDetails.courseRating)-parseFloat(newRoundDetails.par))))
    let diff = Math.round(((parseFloat(newRoundDetails.score) - parseFloat(newRoundDetails.courseRating))*(113/parseFloat(newRoundDetails.slope)))*10)/10
    const newRound = {
      ...newRoundDetails,
      field: alignment,
      date: new Date(newRoundDetails.date),
      playerEmail: loggedInUser.email,
      openingHandicap: loggedInUser.handicap,
      courseHC: courseH,
      differential: diff,
      exceptionalOne: (diff +7.0) < courseH,
      exceptionalTwo:  (diff +10.0) < courseH,
      exceptionalAdjustment: 0
    }
    await fetch(`${serverPort}addRound`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRound)
    })
      .then(response => console.log(response))
      .then(setChangesMade((prev: number) => prev + 1))
      .then(()=> navigate("/account"))
      .then(()=>handleClose())
      .catch((error: any) =>{
        window.alert(error)
        return
    })
  }

  function loadPostRound(){
    handleToggle()
    setTimeout(postRound, 1000)
  }

  return (
    <div>
      <Header />
      <div className="content-container">
      <p className="slogan round-slogan"><span className="green-bold">Open a new round </span>with your <span className="bolder">very accurate</span> and <span className="bolder">extremely official </span> handicap</p>
        <div className="grid-container">
        <Grid container spacing={0.5} sx={{justifyContent: 'center'}}>
          <Grid item xs={12}>
            <InfoTextField
              name="course" 
              label="Course name"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }}
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={8}>
            <InfoTextField 
              name="tees" 
              label="Tees"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }}
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={4}>
            <InfoTextField
              name="par" 
              label="Par"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }}
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={6}>
            <InfoTextField
              name="slope" 
              label="Slope"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }} 
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={6}>
            <InfoTextField
              name="courseRating" 
              label="Course Rating"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }} 
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={6}>
          <InfoTextField
              name="date" 
              type="date"
              fullWidth
              id="text-input"
              variant="filled"
              InputLabelProps={{
              style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                }}
              onChange={handleTextChange} />
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              fullWidth
              sx={{minHeight: 56}}
              >
              <ToggleButton value="AM" sx={{'&.Mui-selected': {backgroundColor: '#F0C9C9', color: 'black'}}}>AM</ToggleButton>
              <ToggleButton value="PM" sx={{'&.Mui-selected': {backgroundColor: '#F0C9C9', color: 'black'}}}>PM</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <p className="course-hc-title">Course H/C</p>
        <div className="course-hc-circle">
          <p className="course-hc-text">
            {userHandicap === ""
            ? Math.round((parseFloat(loggedInUser.handicap)*parseFloat(newRoundDetails.slope))/(113 + (parseFloat(newRoundDetails.courseRating)-parseFloat(newRoundDetails.par))))
            : Math.round((parseFloat(userHandicap)*parseFloat(newRoundDetails.slope))/(113 + (parseFloat(newRoundDetails.courseRating)-parseFloat(newRoundDetails.par))))
            }
          </p>
        </div>
        <Grid container spacing={0.5} sx={{justifyContent: 'center'}}>
          <Grid item xs={4}>
            <InfoTextField 
                name="score"
                label="Score"
                fullWidth
                id="text-input"
                variant="filled"
                InputLabelProps={{
                style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                  }}
                onChange={handleTextChange}
                />
          </Grid>
          <Grid item xs={4}>
            <InfoTextField
                name="threePutts" 
                label="3+ putts"
                fullWidth
                id="text-input"
                variant="filled"
                InputLabelProps={{
                style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                  }} 
                onChange={handleTextChange}  />
          </Grid>
          <Grid item xs={4}>
            <InfoTextField 
                name="lostBalls"
                label="Lost balls"
                fullWidth
                id="text-input"
                variant="filled"
                InputLabelProps={{
                style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
                  }} 
                onChange={handleTextChange} />
          </Grid>
        </Grid>
        <div className="checkboxes">
          <FormGroup sx={{margin: '0 auto'}}>
            <FormControlLabel name="swearing" control={<Checkbox sx={{'&.Mui-checked': {color: '#4BAEA0'}}} />} label="swearing" />
            <FormControlLabel name="clubThrow" control={<Checkbox sx={{'&.Mui-checked': {color: '#4BAEA0'}}} />} label="club throw" />
          </FormGroup>
        </div>
        <InfoTextField
          name="highlight" 
          label="Highlight"
          fullWidth
          id="text-input"
          variant="filled"
          InputLabelProps={{
          style: { color: '#4BAEA0', fontFamily: 'Source Sans Pro, sans-serif' },
            }} 
          onChange={handleTextChange} />
          <p className="course-hc-title">Differential</p>
          <div className="course-hc-circle">
            <p className="course-hc-text">
              {Math.round(((parseFloat(newRoundDetails.score) - parseFloat(newRoundDetails.courseRating))*(113/parseFloat(newRoundDetails.slope)))*10)/10}
            </p>
        </div>
        </div>
        <SubmitButton onClick={()=> loadPostRound()}>
          Submit
        </SubmitButton>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
          >
          <CircularProgress color="inherit" />
        </Backdrop>

      </div>
    </div>
  )
}

const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#F0C9C9'),
  backgroundColor: '#F0C9C9',
  border: 'solid black 2px',
  fontFamily: 'Source Sans Pro',
  padding: '0.5em 2em',
  marginTop: '1em',
  marginBottom:'2em',
  '&:hover': {
    backgroundColor: '#FFE5E5'
  },
}));