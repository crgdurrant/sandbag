import React from "react";
import Menu from "./Menu";


export default function Header(){
  return (
    <div className="header-container">
      <Menu />
        <h3 className="small-title">Sandbag</h3>
        <img src={require("../golf-cart.png")} alt="sandbag-logo" className="sandbag-logo"/>
    </div>
  )
}