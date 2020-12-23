import React, { useState, useEffect } from "react";
// import Recorder from "../../helper/Recorder";
import useSound from "use-sound";
import SoundIn from "../../sound-effect/sound-in.mp3";
import SoundOut from "../../sound-effect/sound-out.mp3";
import SoundFail from "../../sound-effect/fail.mp3";
import SoundSuccess from "../../sound-effect/success.mp3";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import Text2speech from "../textToSpeech/Text2speech";
import network from "../../services/network";
import useRecorder from "../../hook/useRecorder";

export default function Records7() {
  const [saidWord, setSaidWord] = useState("");
  const [answerStatus, setAnswerStatus] = useState(""); // success / fail /waitToAnswer

  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);
  const [playSoundFail] = useSound(SoundFail);
  const [playSoundSuccess] = useSound(SoundSuccess);

  // const [audio, setAudio] = useState();
  // const [stop, setStop] = useState(false);

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

  const stopHandler = async () => {
    if (isRecording) {
      stopRecording();
    }
  };

  // async function uploadSoundData(blob) {
  //   //create FormData with Buffer
  //   let filename = new Date().toISOString();
  //   let formData = new FormData();
  //   formData.append("audio_data", blob, filename);
  //   //axios request
  //   const { data } = await network.post(`/api/v1/answer`, formData);
  //   console.log(data);
  //   setAnswerStatus(data.status);
  //   if (data.status === "fail" || data.status === "tryAgain") {
  //     await playSoundFailFunction();
  //   } else if (data.status === "success") {
  //     await playSoundSuccessFunction();
  //   }
  //   setStop(false);
  //   setResponse(data.response);
  //   setRecord(null);
  //   setAudio(data.audio);
  // }

  // function timeout(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // const playSoundFailFunction = async () => {
  //   useSoundPlaySoundFail();
  //   await timeout(2000);
  // };
  // const playSoundSuccessFunction = async () => {
  //   useSoundPlaySoundSuccess();
  //   await timeout(2000);
  // };
  return (
    <div>
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
        // setAudio={setAudio}
        // stop={stop}
        // setStop={setStop}
        setSaidWord={setSaidWord}
        answerStatus={answerStatus}
        setAnswerStatus={setAnswerStatus}
      />
    </div>
  );
}
