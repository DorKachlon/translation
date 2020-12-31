import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import network from "../../services/network";
// import PlayAgainButton from "./PlayAgainButton";
import useSound from "use-sound";
import SoundFail from "../../sound-effect/fail.mp3";
import SoundSuccess from "../../sound-effect/success.mp3";
import { Mode } from "../../context/Mode";
import { CurrentLanguage } from "../../context/CurrentLanguage";

export default function Text2speech({
  startRecording,
  clientAudio,
  setSaidWord,
  setHistoryConversation,
  setDisabledButton,
}) {
  const [counter, setCounter] = useState(null);
  const [serverAudio, setServerAudio] = useState();
  const [success, setSuccess] = useState(false);
  const ModeContext = useContext(Mode);
  const CurrentLanguageContext = useContext(CurrentLanguage);

  const [playSoundFail] = useSound(SoundFail);
  const [playSoundSuccess] = useSound(SoundSuccess);

  useEffect(() => {
    (async () => {
      if (CurrentLanguageContext.currentLanguage) {
        console.log(CurrentLanguageContext.currentLanguage);
        setHistoryConversation([]);
        const { data } = await network.post("/api/v1/exercise");
        UpdateHistoryConversation(data.audio);
        setServerAudio(data.audio);
      }
    })();
  }, [CurrentLanguageContext.currentLanguage]);

  //when we have clientAudio its means that custom recorded his answer
  //and we need to send req to /answer and get feedback
  useEffect(() => {
    (async () => {
      if (clientAudio) {
        const { data } = await network.post("/api/v1/answer", clientAudio);
        setSaidWord(data.response);
        if (data.response !== "") {
          setHistoryConversation((prev) => [
            ...prev,
            { status: "answer", textsAndSignificance: [{ text: data.response }] },
          ]);
        }
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
    const texts = array.map((obj) => ({ text: obj.text, significance: obj.significance }));
    setHistoryConversation((prev) => [
      ...prev,
      { status: "exercise", textsAndSignificance: texts },
    ]);
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
        setDisabledButton(true);
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
        if (ModeContext.manualMode) {
          setDisabledButton(false);
        } else {
          setDisabledButton(false);
          startRecording();
        }
      }
    }
  };

  const getClassName = (significance, index) => {
    if (significance === "word") {
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
      {serverAudio && !ModeContext.chatMode && (
        <div className="server-text">
          {serverAudio.map((obj, i) => (
            <span className={getClassName(obj.significance, i)} key={i}>
              {obj.text}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
