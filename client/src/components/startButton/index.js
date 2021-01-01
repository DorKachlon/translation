import React from "react";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import "./style.css";
export default function StartButton({ setStart }) {
  return (
    <div className="start-button-page">
      <button className="start-button" onClick={() => setStart(true)}>
        <PlayArrowRoundedIcon style={{ fontSize: "40px", color: "white" }} />
      </button>
    </div>
  );
}
