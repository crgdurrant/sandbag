import React, {useContext, useState} from "react";
import Header from "./Header";
import { SandbagContext } from "../App";
import RoundModal from "./RoundModal"

export default function Scores(){

  const { allUserRounds } = useContext(SandbagContext)

  const orderedRounds = [...allUserRounds].reverse()
  
  return (
    <div>
      <Header />
      <div className="content-container">
        <p className="slogan home-slogan">Here are your <span className="bolder">very accurate</span> and <span className="bolder">extremely official </span><span className="green-bold">scores</span></p>
        <div className="scores-container">
            {orderedRounds.map((round:any)=> {
              return (
                <RoundModal detail={round} />
                )
            })}
        </div>
      </div>
      </div>
  )
}