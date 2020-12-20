import React, { useState, useEffect } from "react";
import Recorder from "./Recorder";
import axios from "axios";
import useSound from "use-sound";
import SoundIn from "../../sound-effect/sound-in.mp3";
import SoundOut from "../../sound-effect/sound-out.mp3";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import Text2speech from "../textToSpeech/Text2speech";

export default function Records7() {
  const [record, setRecord] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [response, setResponse] = useState("");
  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);

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
    const { data } = await axios.post("/api/v1/answer", formData);
    setResponse(data.response);
    setRecord(null);
  }

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
      <Text2speech startRecording={startRecording} STOPRecording={STOPRecording} />
    </div>
  );
}
