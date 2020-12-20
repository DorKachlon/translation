import React, { useEffect, useState } from "react";
import axios from "axios";
// import ReactAudioPlayer from "react-audio-player";
import LoopIcon from "@material-ui/icons/Loop";
import "./style.css";

export default function Text2speech({
  startRecording,
  STOPRecording,
  setWord,
  audio,
  setAudio,
  stop,
  setStop,
}) {
  const [nameOfClass, setNameOfClass] = useState("play-again");
  const [counter, setCounter] = useState(0);

  console.log(audio);
  useEffect(() => {
    (async () => {
      // const { data } = await axios.post("/api/v1/exercise", {
      //   textInput: `hey ${"dor"}, how are you?`,
      // });
      const { data } = await axios.post("/api/v1/exercise");
      console.log(data);
      setWord(data.word);
      setAudio(data.audio);
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
    if (counter < audio.length) {
      const audioToPlay = new Audio(`data:audio/ogg;base64, ${audio[counter].base64}`);
      audioToPlay.play();
      audioToPlay.onended = () => {
        setCounter((prev) => prev + 1);
      };
    } else {
      startRecording();
      setStop(true);
      setCounter(0);
    }
  };

  const playAgain = () => {
    setStop(false);
    playAudio();
  };
  const MouseDown = () => {
    setNameOfClass("play-again down");
  };
  const MouseUp = () => {
    setNameOfClass("play-again");
  };
  const getClassName = (itsWord, index) => {
    if (itsWord) {
      if (!stop) {
        if (index > counter) {
          return "word-bold hidden";
        } else {
          return "word-bold";
        }
      } else {
        return "word-bold";
      }
    } else {
      if (index > counter) {
        if (!stop) {
          return "regular hidden";
        } else {
          return "regular";
        }
      } else {
        return "regular";
      }
    }
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
          {audio.map((obj, i) => (
            <span className={getClassName(obj.itsWord, i)}>{obj.text} </span>
          ))}
        </div>
      )}
    </>
  );
}
