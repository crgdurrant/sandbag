import React, { useContext, useEffect } from "react";
import Header from "./Header"
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { SandbagContext } from "../App";
import { useNavigate } from "react-router-dom";
import { GetRounds, HandicapCalculation } from "../helpers/utils"

export default function Home(){

  const {loggedInUser, allUserRounds, userHandicap, setUserHandicap, setAllUserRounds, changesMade} = useContext(SandbagContext)

  const navigate = useNavigate()

  useEffect(()=> {
    GetRounds(loggedInUser, setAllUserRounds)
    HandicapCalculation(allUserRounds, setUserHandicap)
    console.log(userHandicap)
    console.log(allUserRounds)
  },[])

  useEffect(()=> {
    GetRounds(loggedInUser, setAllUserRounds)
    HandicapCalculation(allUserRounds, setUserHandicap)
    console.log(userHandicap)
    console.log(allUserRounds)
  },[changesMade])

  return (
    <div>
      <Header />
      <div className="content-container">
        <p className="slogan home-slogan">Hi {loggedInUser.firstName}, your <span className="bolder">very accurate</span> and <span className="bolder">extremely official</span> handicap index is</p>
        <div className="circle">
          <h2 className="handicap-large">
            {userHandicap === "" 
            ? "N/A" 
            : userHandicap}
          </h2>
        </div>
        <IconButton onClick={()=>navigate("/newround")} sx={{backgroundColor: '#F1F0CF', marginTop: '3em','&:hover': {backgroundColor: '#f2f1d3'}}}>
          <AddIcon />
        </IconButton>
        <p className="new-round-text">new round</p>
      </div>
    </div>
  )
} 