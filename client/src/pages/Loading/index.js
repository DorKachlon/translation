import React from "react";
import Logo from "./Logo.svg";
import "./style.css";
export default function Loading() {
  return (
    <div className="loading-page">
      <img className="loading-logo" src={Logo} alt=""></img>
    </div>
  );
}
