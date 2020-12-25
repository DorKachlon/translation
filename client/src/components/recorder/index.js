import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import SoundIn from "../../sound-effect/sound-in.mp3";
import SoundOut from "../../sound-effect/sound-out.mp3";
import Analyzer from "../../ts/AudioAnalyzer";
import MicIcon from "@material-ui/icons/Mic";
import Text2speech from "../textToSpeech/Text2speech";
import useRecorder from "../../hook/useRecorder";
import "./style.css";

export default function Recorder() {
  const [saidWord, setSaidWord] = useState("");

  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);

  const {
    clientAudio,
    isRecording,
    startRecording,
    stopRecording,
    audioFile,
    audioStream,
    audioBlob,
    getAudioFromBuffer,
  } = useRecorder();

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
    }
  };

  return (
    <div className="recorder-container">
      <button
        className={isRecording ? "recording-button down" : "recording-button"}
        // onMouseDown={startRecording}
        // onMouseUp={StopRecording}
        onClick={isRecording ? stopHandler : startHandler}
      >
        <MicIcon style={{ fontSize: "40px", color: "white" }} />
      </button>
      <div>{saidWord}</div>
      <Text2speech
        startRecording={startHandler}
        clientAudio={clientAudio}
        setSaidWord={setSaidWord}
      />
      {isRecording && (
        <>
          <Analyzer mediaStream={audioStream} height={150} width={300} />
        </>
      )}
    </div>
  );
}
