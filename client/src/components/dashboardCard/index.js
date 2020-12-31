import React, { useState } from "react";
import Gauge from "../gauge";
import ReactCardFlip from "react-card-flip";

import "./style.css";
export default function DashboardCard({ word, translateWord, totalScore }) {
  const [isFlipped, SetIsFlipped] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    SetIsFlipped((prevState) => !prevState);
  }
  return (
    <div className="dashboard-word-container" onClick={handleClick}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="card card-front">
          <div className="card-word">{translateWord}</div>
          <Gauge value={totalScore} />
        </div>
        <div className="card card-back">
          <div className="card-word">{word}</div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
