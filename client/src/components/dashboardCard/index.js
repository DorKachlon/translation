import React, { useState } from "react";
import Gauge from "../gauge";
import ReactCardFlip from "react-card-flip";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import IconButton from "@material-ui/core/IconButton";
import network from "../../services/network";
import "./style.css";
export default function DashboardCard({ word, translateWord, totalScore, language }) {
  const [isFlipped, SetIsFlipped] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    SetIsFlipped((prevState) => !prevState);
  }

  const handleSpeaker = async (event) => {
    event.stopPropagation();
    const { data } = await network.post("/api/v1/create-speech", { text: translateWord, language });
    const audioToPlay = new Audio(`data:audio/ogg;base64, ${data.audio}`);
    audioToPlay.play();
  };
  return (
    <div className="dashboard-word-container" onClick={handleClick}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="card card-front">
          <div className="card-word">{translateWord}</div>
          <IconButton onClick={(event) => handleSpeaker(event)}>
            <VolumeUpIcon />
          </IconButton>
          <Gauge value={totalScore} />
        </div>
        <div className="card card-back">
          <div className="card-word">{word}</div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
