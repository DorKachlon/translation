import React, { useEffect, useState } from "react";
import axios from "axios";
// import ReactAudioPlayer from "react-audio-player";
import LoopIcon from "@material-ui/icons/Loop";
import "./style.css";

export default function Text2speech() {
  const [audio, setAudio] = useState();
  const [nameOfClass, setNameOfClass] = useState("play-again");
  const [counter, setCounter] = useState(0);
  const [stop, setStop] = useState(false);

  console.log(audio);
  useEffect(() => {
    (async () => {
      // const { data } = await axios.post("/api/v1/exercise", {
      //   textInput: `hey ${"dor"}, how are you?`,
      // });
      const { data } = await axios.post("/api/v1/exercise");
      console.log(data);
      setAudio(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (audio && !stop) {
        playAudio();
      }
    })();
  }, [audio, counter]);

  const playAudio = () => {
    debugger;
    if (counter < audio.length) {
      const audioToPlay = new Audio(`data:audio/ogg;base64, ${audio[counter].base64}`);
      audioToPlay.play();
      audioToPlay.onended = () => {
        setCounter((prev) => prev + 1);
      };
    } else {
      setStop(true);
      setCounter(0);
    }
  };

  const playAgain = () => {
    playAudio();
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
      {audio && (
        <div>
          {audio.map((obj) => (
            <span className={obj.itsWord ? "word-bold" : "regular"}>{obj.text} </span>
          ))}
        </div>
      )}
    </>
  );
}
