import React, { useState } from "react";
import LoopIcon from "@material-ui/icons/Loop";
import "./style.css";

export default function PlayAgainButton({ playAudio }) {
  const [nameOfClass, setNameOfClass] = useState("play-again");

  const playAgain = () => {
    // setStop(false);
    playAudio();
  };
  const MouseDown = () => {
    setNameOfClass("play-again down");
  };
  const MouseUp = () => {
    setNameOfClass("play-again");
  };
  return (
    <button
      className={nameOfClass}
      onClick={() => playAgain()}
      onMouseDown={() => MouseDown()}
      onMouseUp={() => MouseUp()}
    >
      <LoopIcon style={{ fontSize: "40px", color: "white" }} />
    </button>
  );
}
