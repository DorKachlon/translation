import React from "react";
import LeftBottom from "./leftBottom.svg";
import Girl from "./girl.svg";
import RightTop from "./rightTop.svg";
import rightBottom from "./rightBottom.svg";

import "./style.css";

export default function Landing() {
  return (
    <div className="landing-background">
      <img className="left-bottom" src={LeftBottom} />
      <img className="girl" src={Girl} />
      <img className="right-top" src={RightTop} />
      <img className="right-bottom" src={rightBottom} />
    </div>
  );
}
