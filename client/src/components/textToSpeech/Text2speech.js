import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import LoopIcon from "@material-ui/icons/Loop";
import "./style.css";
export default function Text2speech() {
  const [audio, setAudio] = useState();
  const [nameOfClass, setNameOfClass] = useState("play-again");

  console.log(audio);
  useEffect(async () => {
    const { data } = await axios.post("/api/v1/exercise");
    setAudio(data);
  }, []);

  useEffect(async () => {
    const audioToPlay = new Audio(`data:audio/ogg;base64, ${audio}`);
    audioToPlay.play();
  }, [audio]);

  const playAgain = () => {
    const audioToPlay = new Audio(`data:audio/ogg;base64, ${audio}`);
    audioToPlay.play();
  };
  const MouseDown = () => {
    setNameOfClass("play-again down");
  };
  const MouseUp = () => {
    setNameOfClass("play-again");
  };
  return (
    <>
      <button
        className={nameOfClass}
        onClick={() => playAgain()}
        onMouseDown={() => MouseDown()}
        onMouseUp={() => MouseUp()}
      >
        <LoopIcon style={{ fontSize: "40px", color: "white" }} />
      </button>
      {/* <div>{audio && <audio controls autoPlay src={`data:audio/ogg;base64, ${audio}`}></audio>}</div> */}
      {/* {audio && <ReactAudioPlayer src={`data:audio/ogg;base64, ${audio}`} autoPlay controls />} */}
    </>
  );
}
