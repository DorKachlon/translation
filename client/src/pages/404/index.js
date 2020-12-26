import React from "react";
import svg from "./404.svg";
import "./style.css";
export default function NotFound() {
  return (
    <div className="not-found-page">
      <img className="not-found-svg" src={svg} alt="not found" />
      <div className="not-found-oops">OOPS!</div>
      <div className="not-found-not-found">PAGE NOT FOUND</div>
    </div>
  );
}
