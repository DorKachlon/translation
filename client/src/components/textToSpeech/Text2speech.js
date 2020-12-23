import React, { useEffect, useState } from "react";
// import ReactAudioPlayer from "react-audio-player";
import "./style.css";
import network from "../../services/network";
import PlayAgainButton from "./PlayAgainButton";
export default function Text2speech({
  startRecording,
  clientAudio,
  // setAudio,
  // stop,
  // setStop,
  answerStatus,
  setAnswerStatus,
  setSaidWord,
}) {
  const [counter, setCounter] = useState(0);
  const [serverAudio, setServerAudio] = useState();
  const [stopPlay, setStopPlay] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await network.post("/api/v1/exercise");
      setServerAudio(data.audio);
    })();
  }, []);

  //when we have clientAudio its means that custom recorded his answer
  //and we need to send req to /answer and get feedback
  useEffect(() => {
    (async () => {
      if (clientAudio) {
        const { data } = await network.post("/api/v1/answer", clientAudio);
        setSaidWord(data.response);
        setServerAudio(data.audio);
      }
    })();
  }, [clientAudio]);

  const getAnExercise = async () => {
    const { data } = await network.post("/api/v1/exercise");
    setServerAudio(data.audio);
    setStopPlay(false);
    setCounter(0);
  };

  useEffect(() => {
    (async () => {
      if (serverAudio && !stopPlay) {
        if (counter <= serverAudio.length) {
          playAudio();
        }
      }
    })();
  }, [counter]);

  useEffect(() => {
    (async () => {
      if (serverAudio) {
        setStopPlay(false);
        playAudio();
      }
    })();
  }, [serverAudio]);

  const playAudio = () => {
    if (counter < serverAudio.length) {
      debugger;
      const audioToPlay = new Audio(`data:audio/ogg;base64, ${serverAudio[counter].base64}`);
      audioToPlay.play();
      audioToPlay.onended = () => {
        setCounter((prev) => prev + 1);
      };
    } else {
      startRecording();
      setStopPlay(true);
      setCounter(0);
      // console.log(answerStatus);
      // if (answerStatus === "success") {
      //   setAnswerStatus("waitToAnswer");
      //   setStopPlay(true);
      //   getAnExercise();
      // } else if (answerStatus === "tryAgain") {
      //   setAnswerStatus("waitToAnswer");
      //   setStopPlay(true);
      //   getAnExercise();
      // } else {
      //   startRecording();
      //   setStopPlay(true);
      //   setCounter(0);
      // }
    }
  };

  const getClassName = (itsWord, index) => {
    if (itsWord) {
      if (!stopPlay) {
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
        if (!stopPlay) {
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
      <PlayAgainButton playAudio={playAudio} />
      {serverAudio && (
        <div>
          {serverAudio.map((obj, i) => (
            <span className={getClassName(obj.itsWord, i)}>{obj.text} </span>
          ))}
        </div>
      )}
    </>
  );
}
