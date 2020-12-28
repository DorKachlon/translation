import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import network from "../../services/network";
import PlayAgainButton from "./PlayAgainButton";
import useSound from "use-sound";
import SoundFail from "../../sound-effect/fail.mp3";
import SoundSuccess from "../../sound-effect/success.mp3";
import { ManualMode } from "../../context/ManualMode";

export default function Text2speech({
  startRecording,
  clientAudio,
  setSaidWord,
  setHistoryConversation,
}) {
  const [counter, setCounter] = useState(null);
  const [serverAudio, setServerAudio] = useState();
  const [success, setSuccess] = useState(false);
  const ManualModeContext = useContext(ManualMode);

  const [playSoundFail] = useSound(SoundFail);
  const [playSoundSuccess] = useSound(SoundSuccess);

  useEffect(() => {
    (async () => {
      const { data } = await network.post("/api/v1/exercise");
      UpdateHistoryConversation(data.audio);
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
        setHistoryConversation((prev) => [...prev, { status: "answer", text: data.response }]);
        setSuccess(data.success);
        if (data.success) {
          playSoundSuccess();
        } else {
          playSoundFail();
        }
        setTimeout(() => {
          UpdateHistoryConversation(data.audio);
          setServerAudio(data.audio);
        }, 2000);
      }
    })();
  }, [clientAudio]);

  const getAnExercise = async () => {
    const { data } = await network.post("/api/v1/exercise");
    setServerAudio(data.audio);
    UpdateHistoryConversation(data.audio);
    setSuccess(false);
    setSaidWord("");
  };

  const UpdateHistoryConversation = (array) => {
    const texts = array.map((obj) => obj.text);
    setHistoryConversation((prev) => [...prev, { status: "exercise", text: texts.join("") }]);
  };

  useEffect(() => {
    (async () => {
      if (serverAudio) {
        if (counter <= serverAudio.length) {
          playAudio();
        }
      }
    })();
  }, [counter]);

  useEffect(() => {
    (async () => {
      if (serverAudio) {
        setCounter(0);
      }
    })();
  }, [serverAudio]);

  const playAudio = () => {
    if (counter < serverAudio.length) {
      const audioToPlay = new Audio(`data:audio/ogg;base64, ${serverAudio[counter].base64}`);
      audioToPlay.play();
      audioToPlay.onended = () => {
        setCounter((prev) => prev + 1);
      };
    } else {
      if (success) {
        getAnExercise();
      } else {
        startRecording();
      }
    }
  };

  const getClassName = (itsWord, index) => {
    if (itsWord) {
      if (index > counter) {
        return "word-bold hidden";
      } else {
        return "word-bold";
      }
    } else {
      if (index > counter) {
        return "regular hidden";
      } else {
        return "regular";
      }
    }
  };

  return (
    <>
      {/* <PlayAgainButton playAudio={playAudio} /> */}
      {serverAudio && !ManualModeContext.manualMode && (
        <div className="server-text">
          {serverAudio.map((obj, i) => (
            <span className={getClassName(obj.itsWord, i)}>{obj.text} </span>
          ))}
        </div>
      )}
    </>
  );
}
