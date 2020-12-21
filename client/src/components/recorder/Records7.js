import React, { useState, useEffect } from "react";
import Recorder from "./Recorder";
import axios from "axios";
import useSound from "use-sound";
import SoundIn from "../../sound-effect/sound-in.mp3";
import SoundOut from "../../sound-effect/sound-out.mp3";
import SoundFail from "../../sound-effect/fail.mp3";
import SoundSuccess from "../../sound-effect/success.mp3";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import Text2speech from "../textToSpeech/Text2speech";

export default function Records7() {
  const [record, setRecord] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [response, setResponse] = useState("");
  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);
  const [playSoundFail] = useSound(SoundFail);
  const [playSoundSuccess] = useSound(SoundSuccess);

  const [word, setWord] = useState("");
  const [audio, setAudio] = useState();
  const [stop, setStop] = useState(false);

  const [answerStatus, setAnswerStatus] = useState(""); // success / fail /waitToAnswer

  const startRecording = () => {
    let rec = null;
    let constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        const audioContext = new window.AudioContext();
        setAudioStream(stream);
        const input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        playSoundIn();
        rec.record();
        setRecord(rec);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const STOPRecording = async () => {
    if (record) {
      record.stop();
      playSoundOut();
      audioStream.getAudioTracks()[0].stop();
      record.exportWAV(uploadSoundData);
    }
  };

  async function uploadSoundData(blob) {
    //create FormData with Buffer
    let filename = new Date().toISOString();
    let formData = new FormData();
    formData.append("audio_data", blob, filename);
    //axios request
    const { data } = await axios.post(`/api/v1/answer/${word.text}/${word.id}`, formData);
    console.log(data);
    setAnswerStatus(data.status);
    if (data.status === "fail" || data.status === "tryAgain") {
      await playSoundFailFunction();
    } else if (data.status === "success") {
      await playSoundSuccessFunction();
    }
    setStop(false);
    setResponse(data.response);
    setRecord(null);
    setAudio(data.audio);
  }
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const playSoundFailFunction = async () => {
    await playSoundFail();
    await timeout(2000);
  };
  const playSoundSuccessFunction = async () => {
    playSoundSuccess();
    await timeout(2000);
  };
  return (
    <div>
      <button
        className={record ? "recording-button down" : "recording-button"}
        // onMouseDown={startRecording}
        // onMouseUp={STOPRecording}
        onClick={record ? STOPRecording : startRecording}
      >
        <MicIcon style={{ fontSize: "40px", color: "white" }} />
      </button>
      <div>{response}</div>
      <Text2speech
        startRecording={startRecording}
        STOPRecording={STOPRecording}
        setWord={setWord}
        audio={audio}
        setAudio={setAudio}
        stop={stop}
        setStop={setStop}
        answerStatus={answerStatus}
        setAnswerStatus={setAnswerStatus}
      />
    </div>
  );
}
