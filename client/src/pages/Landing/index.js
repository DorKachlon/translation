import React from "react";
import LeftBottom from "./leftBottom.svg";
import Girl from "./girl.svg";
import RightTop from "./rightTop.svg";
import rightBottom from "./rightBottom.svg";

import "./style.css";

export default function Landing() {
  return (
    <div className="landing-background">
      <img className="left-bottom" src={LeftBottom} alt="" />
      <img className="girl" src={Girl} alt="" />
      <img className="right-top" src={RightTop} alt="" />
      <img className="right-bottom" src={rightBottom} alt="" />
      <div className="landing-paragraph">
        <div className="landing-title-1">Better then ever</div>
        <div className="landing-title-2">Anna lets you learn</div>
        <div className="landing-title-3">without lifting a finger.</div>
      </div>
    </div>
  );
}
