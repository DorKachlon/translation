import React, { useState, useEffect, useRef, useContext } from "react";
import useSound from "use-sound";
import SoundIn from "../../sound-effect/sound-in.mp3";
import SoundOut from "../../sound-effect/sound-out.mp3";
import Analyzer from "../../ts/AudioAnalyzer";
import MicIcon from "@material-ui/icons/Mic";
import Text2speech from "../textToSpeech/Text2speech";
import useRecorder from "../../hook/useRecorder";
import Chat from "../chat";
import "./style.css";
import { Mode } from "../../context/Mode";
export default function Recorder() {
  const [saidWord, setSaidWord] = useState("");
  const recorderButtonRef = useRef(null);
  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);
  const [historyConversation, setHistoryConversation] = useState([]);
  const ModeContext = useContext(Mode);
  const { clientAudio, isRecording, startRecording, stopRecording, audioStream } = useRecorder();
  const [disabledButton, setDisabledButton] = useState(true);
  const startHandler = () => {
    startRecording();
  };

  useEffect(() => {
    if (isRecording) {
      playSoundIn();
    } else {
      playSoundOut();
    }
  }, [isRecording]);

  const stopHandler = () => {
    if (isRecording) {
      stopRecording();
      recorderButtonRef.current.style.width = `200px`;
      recorderButtonRef.current.style.height = `200px`;
      recorderButtonRef.current.style.margin = `150px`;
    }
  };

  return (
    <div className={ModeContext.chatMode ? "recorder-container row" : "recorder-container"}>
      <div className="recording-button-container">
        <button
          disabled={disabledButton}
          ref={recorderButtonRef}
          className={isRecording ? "recording-button down" : "recording-button"}
          // onMouseDown={startRecording}
          // onMouseUp={StopRecording}
          onClick={isRecording ? stopHandler : startHandler}
          style={disabledButton ? { backgroundColor: "rgba(144,101,46,0.4)" } : {}}
        >
          <MicIcon style={{ fontSize: "40px", color: "white" }} />
        </button>
      </div>
      {saidWord && !ModeContext.chatMode && <div>{saidWord}</div>}
      <Text2speech
        startRecording={startHandler}
        clientAudio={clientAudio}
        setSaidWord={setSaidWord}
        setHistoryConversation={setHistoryConversation}
        setDisabledButton={setDisabledButton}
      />
      {isRecording && (
        <>
          <Analyzer
            mediaStream={audioStream}
            height={150}
            width={300}
            recorderButtonRef={recorderButtonRef}
          />
        </>
      )}
      {ModeContext.chatMode && <Chat historyConversation={historyConversation} />}
    </div>
  );
}
